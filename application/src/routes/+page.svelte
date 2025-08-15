<script lang="ts">
    import { onMount } from "svelte";

    import { ScrollArea } from "$lib/components/ui/scroll-area";

    import ImageCard from "$lib/components/ImageCard.svelte";
    import AddImageCard from "$lib/components/AddImageCard.svelte";
    import Footer from "$lib/components/Footer.svelte";

    import { fileToDataUrl, type ImageData, downloadAllSeparate, downloadZip } from "$lib/file-utils";
    import { withWaitCursor } from "$lib/utils";
    import { setupPasteDrop } from "$lib/paste-drop";

    const title = "Image Batch Downloader";
    const subtitle = "Paste images & download them in batches. Fully local, single-file, no installation.";

    // SEO canonical URLs
    const CANONICAL_URL = "https://image-batch-downloader.demetriuszhomir.com/";
    const OG_IMAGE = "https://image-batch-downloader.demetriuszhomir.com/media.jpg"; // served from static

    let images = $state<ImageData[]>([]);
    let prefix = $state("");
    let nextId = $state(0);

    onMount(() => setupPasteDrop(addFile, handleFiles));
    function handleFiles(files: FileList | null) {
        if (!files) return;
        for (let i = 0; i < files.length; i++) addFile(files[i]!);
    }
    async function addFile(file: File) {
        await withWaitCursor(async () => {
            if (!file.type.startsWith("image/")) return;
            const dataUrl = await fileToDataUrl(file);
            images = [...images, { id: nextId++, file, dataUrl }];
        });
    }
    function removeImg(id: number) {
        images = images.filter((i) => i.id !== id);
    }
    function clearAll() {
        images = [];
    }

    function dlAllSeparate() {
        withWaitCursor(() => downloadAllSeparate(images, prefix));
    }

    function dlZip() {
        withWaitCursor(() => downloadZip(images, prefix));
    }
</script>

<svelte:head>
    <meta name="robots" content="noindex, nofollow, max-image-preview:large" />

    <link rel="canonical" href={CANONICAL_URL} />
    <meta name="description" content={subtitle} />

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content={title} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={subtitle} />
    <meta property="og:url" content={CANONICAL_URL} />
    <meta property="og:image" content={OG_IMAGE} />
    <meta property="og:image:alt" content={title} />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={subtitle} />
    <meta name="twitter:image" content={OG_IMAGE} />
    <meta name="twitter:image:alt" content={title} />

    <!-- Extras -->
    <meta name="keywords" content="image downloader, batch download images, paste images, zip images, offline, local" />
</svelte:head>

<main class="flex flex-col flex-1 min-h-0 h-[100dvh]">
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
