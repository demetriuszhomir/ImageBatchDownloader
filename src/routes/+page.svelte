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

<main class="pt-14 pb-14 flex flex-col flex-1 overflow-hidden">
    <ScrollArea class="flex-1">
        <div class="grid gap-3 p-3" style="grid-template-columns:repeat(auto-fill,minmax(140px,1fr));">
            {#each images as img (img.id)}
                <ImageCard {img} onRemove={removeImg} />
            {/each}

            <AddImageCard onFiles={handleFiles} />
        </div>
    </ScrollArea>
</main>

<Footer bind:prefix canDownload={images.length > 0} downloadAll={dlAllSeparate} downloadZip={dlZip} {clearAll} />

<style>
    /* ensure the ScrollArea grows but doesn't hide under fixed header/footer */
    main {
        min-height: 0;
    }
</style>
