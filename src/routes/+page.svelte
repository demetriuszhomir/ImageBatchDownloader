<script lang="ts">
    import { onMount } from "svelte";
    import JSZip from "jszip";
    import favicon from "$lib/favicon.png?url";

    interface ImageData {
        file: File;
        dataUrl: string;
    }

    let dropZone: HTMLDivElement;
    let fileInput: HTMLInputElement;
    let imagePreview: HTMLDivElement;
    let downloadBtn: HTMLButtonElement;
    let downloadZipBtn: HTMLButtonElement;
    let clearBtn: HTMLButtonElement;
    let prefixContainer: HTMLDivElement;
    let prefixInput: HTMLInputElement;

    const images: ImageData[] = [];

    function selectFiles(): void {
        fileInput.click();
    }

    onMount(() => {
        // Set favicon
        const link = document.createElement("link");
        link.rel = "icon";
        link.type = "image/x-icon";
        link.href = favicon;
        document.head.appendChild(link);

        // Prevent default drag behaviors
        ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
            dropZone.addEventListener(eventName, preventDefaults, false);
            document.body.addEventListener(eventName, preventDefaults, false);
        });

        // Highlight drop zone when item is dragged over
        ["dragenter", "dragover"].forEach((eventName) => {
            dropZone.addEventListener(eventName, highlight, false);
        });

        ["dragleave", "drop"].forEach((eventName) => {
            dropZone.addEventListener(eventName, unhighlight, false);
        });

        // Handle dropped files
        dropZone.addEventListener("drop", handleDrop, false);

        // Handle paste event
        dropZone.addEventListener("paste", handlePaste, false);

        // Cleanup on component destroy
        return () => {
            ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
                dropZone?.removeEventListener(eventName, preventDefaults, false);
                document.body?.removeEventListener(eventName, preventDefaults, false);
            });
        };
    });

    function preventDefaults(e: Event): void {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight(): void {
        dropZone.classList.add("drag-over");
    }

    function unhighlight(): void {
        dropZone.classList.remove("drag-over");
    }

    function handleDrop(e: DragEvent): void {
        if (!e.dataTransfer) return;
        const files = e.dataTransfer.files;
        Array.from(files).forEach(processFile);
    }

    function handlePaste(e: ClipboardEvent): void {
        if (!e.clipboardData) return;
        const items = e.clipboardData.items;
        for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf("image") !== -1) {
                const blob = items[i].getAsFile();
                if (blob) processFile(blob);
            }
        }
    }

    function handleFiles(e: Event & { currentTarget: EventTarget & HTMLInputElement }): void {
        if (!e.currentTarget.files) return;
        const files = e.currentTarget.files;
        Array.from(files).forEach(processFile);
    }

    function processFile(file: Blob): void {
        if (!file.type.startsWith("image/")) return;

        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
            const imgData: ImageData = {
                file: file as File,
                dataUrl: e.target?.result as string,
            };
            images.push(imgData);
            renderPreview(imgData, images.length - 1);
            updateButtons();
        };
        reader.readAsDataURL(file);
    }

    function renderPreview(imgData: ImageData, index: number): void {
        const previewItem = document.createElement("div");
        previewItem.className = "preview-item";

        const img = document.createElement("img");
        img.src = imgData.dataUrl;

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "✕";
        removeBtn.className = "remove-btn";
        removeBtn.onclick = () => removeImage(index);

        previewItem.appendChild(img);
        previewItem.appendChild(removeBtn);
        imagePreview.appendChild(previewItem);
    }

    function removeImage(index: number): void {
        images.splice(index, 1);
        imagePreview.innerHTML = "";
        images.forEach((img, i) => renderPreview(img, i));
        updateButtons();
    }

    async function downloadSeparateImages(): Promise<void> {
        const prefix = prefixInput.value;
        for (let i = 0; i < images.length; i++) {
            await downloadSingleImage(images[i], i);
            await new Promise((resolve) => setTimeout(resolve, 500));
        }
    }

    function getFormattedDateTime(): string {
        const date = new Date();
        const pad = (n: number) => n.toString().padStart(2, "0");

        const tzOffset = -date.getTimezoneOffset();
        const tzHours = Math.floor(Math.abs(tzOffset) / 60);
        const tzMinutes = Math.abs(tzOffset) % 60;
        const tzSign = tzOffset >= 0 ? "+" : "-";
        const tzString = `UTC${tzSign}${pad(tzHours)}${tzMinutes ? ":" + pad(tzMinutes) : ""}`;

        return (
            `-${pad(date.getDate())}_${pad(date.getMonth() + 1)}_${date.getFullYear()}` +
            `-${pad(date.getHours())}-${pad(date.getMinutes())}-${pad(date.getSeconds())}` +
            `-${tzString}`
        );
    }

    async function downloadZipImages(): Promise<void> {
        const prefix = prefixInput.value;
        const zip = new JSZip();
        images.forEach((img, index) => {
            const ext = img.file.type.split("/")[1];
            const filename = `${prefix ? prefix + "_" : ""}image_${index + 1}${getFormattedDateTime()}.${ext}`;
            const imageData = img.dataUrl.split(",")[1];
            zip.file(filename, imageData, { base64: true });
        });
        const content = await zip.generateAsync({ type: "blob" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(content);
        link.download = `${prefix ? prefix + "_" : ""}images${getFormattedDateTime()}.zip`;
        link.click();
        URL.revokeObjectURL(link.href);
    }

    async function downloadSingleImage(img: ImageData, index: number): Promise<void> {
        const prefix = prefixInput.value;
        const link = document.createElement("a");
        link.href = img.dataUrl;
        link.download = `${prefix ? prefix + "_" : ""}image_${index + 1}${getFormattedDateTime()}.${img.file.type.split("/")[1]}`;
        link.click();
    }

    function clearImages(): void {
        images.length = 0;
        imagePreview.innerHTML = "";
        updateButtons();
    }

    function updateButtons(): void {
        const hasImages = images.length > 0;
        downloadBtn.style.display = hasImages ? "block" : "none";
        downloadZipBtn.style.display = hasImages ? "block" : "none";
        clearBtn.style.display = hasImages ? "block" : "none";
        prefixContainer.style.display = hasImages ? "block" : "none";
    }
</script>

<h1>Image Batch Downloader</h1>
<div bind:this={dropZone} id="drop-zone">
    <p>Paste images here or drag and drop files</p>
    <input bind:this={fileInput} type="file" id="file-input" multiple accept="image/*" style="display:none;" on:change={handleFiles} />
    <button on:click={selectFiles}>Select Files</button>
</div>

<div id="actions">
    <button bind:this={downloadBtn} id="download-btn" style="display:none;" on:click={downloadSeparateImages}>📥 Download Separately</button>
    <button bind:this={downloadZipBtn} id="download-zip-btn" style="display:none;" on:click={downloadZipImages}>🗜️ Download as ZIP</button>
    <div bind:this={prefixContainer} id="prefix-container" style="display:none;">
        <label for="prefix-input">Files prefix:</label>
        <input bind:this={prefixInput} type="text" id="prefix-input" placeholder="Optional prefix" />
    </div>
    <button bind:this={clearBtn} id="clear-btn" style="display:none;" on:click={clearImages}>🗑️ Clear All</button>
</div>

<div bind:this={imagePreview} id="image-preview"></div>

<style>
    @font-face {
        font-family: "PT Sans";
        src: url("$lib/PT_Sans/PTSans-Regular.ttf") format("truetype");
        font-weight: 400;
        font-style: normal;
        font-display: swap;
    }

    @font-face {
        font-family: "PT Sans";
        src: url("$lib/PT_Sans/PTSans-Bold.ttf") format("truetype");
        font-weight: 700;
        font-style: normal;
        font-display: swap;
    }

    :global(body) {
        font-family: "PT Sans", sans-serif;
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
        line-height: 1.6;
        background-color: #f9fafb;
        color: #333;
    }

    #drop-zone {
        border: 2px dashed #d1d5db;
        border-radius: 8px;
        padding: 20px;
        text-align: center;
        transition: background-color 0.3s;
        background-color: #ffffff;
    }

    :global(#drop-zone.drag-over) {
        background-color: #e5e7eb;
    }

    #image-preview {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 20px;
    }

    :global(.preview-item) {
        position: relative;
        width: 150px;
        height: 150px;
        border: 1px solid #d1d5db;
        border-radius: 8px;
        overflow: hidden;
        background-color: #ffffff;
    }

    :global(.preview-item img) {
        max-width: 100%;
        max-height: 100%;
        object-fit: cover;
    }

    :global(.remove-btn) {
        position: absolute;
        top: 5px;
        right: 5px;
        background-color: red;
        color: white;
        border: none;
        border-radius: 50%;
        width: 24px;
        height: 24px;
        cursor: pointer;
    }

    #actions {
        margin-top: 20px;
        display: flex;
        gap: 10px;
    }

    button:not(.remove-btn) {
        padding: 10px 20px;
        font-weight: 700;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    #download-btn {
        background-color: #3b82f6;
        color: white;
    }

    #download-btn:hover {
        background-color: #2563eb;
    }

    #download-zip-btn {
        background-color: #10b981;
        color: white;
    }

    #download-zip-btn:hover {
        background-color: #059669;
    }

    #clear-btn {
        background-color: #ef4444;
        color: white;
    }

    #clear-btn:hover {
        background-color: #dc2626;
    }

    #prefix-container label {
        display: inline-block;
        margin-top: 6px;
        font-weight: 600;
        color: #111827;
    }

    #prefix-container input {
        padding: 8px 12px;
        width: 200px;
        border: 1px solid #e5e7eb;
        border-radius: 6px;
        font-family: "PT Sans", sans-serif;
        transition: border-color 0.2s;
    }

    #prefix-container input:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
</style>
