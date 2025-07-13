<script lang="ts">
    import { onMount } from "svelte";

    import { ScrollArea } from "$lib/components/ui/scroll-area";

    import ImageCard from "$lib/components/ImageCard.svelte";
    import AddImageCard from "$lib/components/AddImageCard.svelte";
    import Footer from "$lib/components/Footer.svelte";

    import { fileToDataUrl, type ImageData, downloadAllSeparate, downloadZip } from "$lib/file-utils";
    import { setupPasteDrop } from "$lib/paste-drop";

    let images = $state<ImageData[]>([]);
    let prefix = $state("");
    let nextId = $state(0);

    onMount(() => setupPasteDrop(addFile, handleFiles));
    function handleFiles(files: FileList | null) {
        if (!files) return;
        for (let i = 0; i < files.length; i++) addFile(files[i]!);
    }
    async function addFile(file: File) {
        if (!file.type.startsWith("image/")) return;
        const dataUrl = await fileToDataUrl(file);
        images = [...images, { id: nextId++, file, dataUrl }];
    }
    function removeImg(id: number) {
        images = images.filter((i) => i.id !== id);
    }
    function clearAll() {
        images = [];
    }

    function dlAllSeparate() {
        downloadAllSeparate(images, prefix);
    }

    function dlZip() {
        downloadZip(images, prefix);
    }
</script>

<main class="flex flex-col flex-1 min-h-0 h-[100dvh] overlay-background">
    <ScrollArea
        class="flex-1 min-h-0"
        scrollbarYClasses="pt-12 pb-14 max-[40rem]:pb-27 max-[16rem]:pb-34 max-[10rem]:pb-45"
    >
        <div
            class="grid gap-3 p-3 pt-15 pb-17 max-[40rem]:pb-30 max-[16rem]:pb-37 max-[10rem]:pb-48"
            style="grid-template-columns:repeat(auto-fill,minmax(130px,1fr));"
        >
            {#each images as img (img.id)}
                <ImageCard {img} onRemove={removeImg} />
            {/each}

            <AddImageCard onFiles={handleFiles} />
        </div>
    </ScrollArea>
</main>

<Footer bind:prefix canDownload={images.length > 0} downloadAll={dlAllSeparate} downloadZip={dlZip} {clearAll} />
