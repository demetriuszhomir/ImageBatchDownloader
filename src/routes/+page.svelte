<script lang="ts">
    import { onMount } from "svelte";

    import { Button } from "$lib/components/ui/button";
    import { Card } from "$lib/components/ui/card";
    import { AspectRatio } from "$lib/components/ui/aspect-ratio";
    import { ScrollArea } from "$lib/components/ui/scroll-area";
    import { Input } from "$lib/components/ui/input";
    import * as AlertDialog from "$lib/components/ui/alert-dialog";
    import { X, Download, FileArchive, Trash } from "@lucide/svelte";

    import { fileToDataUrl, type ImageData, downloadAllSeparate, downloadZip } from "$lib/file-utils";

    let images = $state<ImageData[]>([]);
    let prefix = $state("");
    let nextId = $state(0);

    onMount(() => {
        const paste = (e: ClipboardEvent) => {
            for (const item of e.clipboardData?.items ?? []) {
                if (item.type.startsWith("image/")) {
                    const f = item.getAsFile();
                    if (f) addFile(f);
                }
            }
        };
        const drop = (e: DragEvent) => {
            e.preventDefault();
            handleFiles(e.dataTransfer?.files ?? null);
        };
        const prevent = (e: DragEvent) => e.preventDefault();

        window.addEventListener("paste", paste);
        window.addEventListener("drop", drop);
        window.addEventListener("dragover", prevent);

        return () => {
            window.removeEventListener("paste", paste);
            window.removeEventListener("drop", drop);
            window.removeEventListener("dragover", prevent);
        };
    });

    let fileInputEl: HTMLInputElement;
    async function addFile(file: File) {
        if (!file.type.startsWith("image/")) return;
        const dataUrl = await fileToDataUrl(file);
        images = [...images, { id: nextId++, file, dataUrl }];
    }
    function handleFiles(files: FileList | null) {
        if (!files) return;
        for (let i = 0; i < files.length; i++) addFile(files[i]!);
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

    let clearDialogOpen = $state(false);
</script>

<main class="pt-14 pb-14 flex flex-col flex-1 overflow-hidden">
    <ScrollArea class="flex-1">
        <div class="grid gap-3 p-3" style="grid-template-columns:repeat(auto-fill,minmax(140px,1fr));">
            {#each images as img (img.id)}
                <Card class="relative group p-2">
                    <AspectRatio ratio={1}>
                        <img src={img.dataUrl} alt="preview" class="object-cover w-full h-full rounded-md" />
                    </AspectRatio>
                    <Button
                        variant="destructive"
                        size="icon"
                        class="absolute top-2 right-2 m-1 w-8 h-8 min-w-0 min-h-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Remove"
                        onclick={() => removeImg(img.id)}
                    >
                        <X class="w-4 h-4" />
                    </Button>
                </Card>
            {/each}

            <Card class="relative group p-2">
                <AspectRatio ratio={1}>
                    <button
                        type="button"
                        class="w-full h-full border-2 border-dashed rounded-md cursor-pointer flex items-center justify-center text-muted-foreground hover:bg-accent"
                        onclick={() => fileInputEl.click()}
                        aria-label="Add images"
                    >
                        <div class="flex flex-col items-center gap-1 p-3 text-center select-none">
                            <span class="text-4xl leading-none">＋</span>
                            <span class="text-sm"> Paste / Drag‑n‑Drop / Click to browse </span>
                        </div>
                    </button>
                </AspectRatio>
                <input
                    type="file"
                    class="hidden"
                    multiple
                    accept="image/*"
                    bind:this={fileInputEl}
                    onchange={(e) => {
                        handleFiles(e.currentTarget.files);
                        e.currentTarget.value = "";
                    }}
                />
            </Card>
        </div>
    </ScrollArea>
</main>

<footer
    class="fixed bottom-0 left-0 right-0 z-20 border-t bg-background/90 backdrop-blur p-3 flex flex-col sm:flex-row sm:items-center gap-3 min-h-0 h-14"
>
    <div class="flex items-center gap-2 flex-1 min-w-0">
        <span class="whitespace-nowrap text-sm">Files prefix</span>
        <Input bind:value={prefix} placeholder="Optional prefix" class="max-w-xs h-9 px-3 py-1" />
    </div>

    <div class="flex items-center gap-2">
        <Button onclick={dlAllSeparate} disabled={images.length === 0} class="h-9 px-3 py-1">
            <Download class="w-4 h-4 mr-2" /> Download
        </Button>

        <Button onclick={dlZip} disabled={images.length === 0} variant="secondary" class="h-9 px-3 py-1">
            <FileArchive class="w-4 h-4 mr-2" /> ZIP
        </Button>

        <AlertDialog.Root bind:open={clearDialogOpen}>
            <AlertDialog.Trigger disabled={images.length === 0}>
                <Button variant="destructive" disabled={images.length === 0} class="h-9 px-3 py-1">
                    <Trash class="w-4 h-4 mr-2" /> Clear&nbsp;All
                </Button>
            </AlertDialog.Trigger>

            <AlertDialog.Content>
                <AlertDialog.Header>
                    <AlertDialog.Title>Clear all images?</AlertDialog.Title>
                    <AlertDialog.Description>This action cannot be undone.</AlertDialog.Description>
                </AlertDialog.Header>

                <AlertDialog.Footer>
                    <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
                    <AlertDialog.Action
                        onclick={() => {
                            clearAll();
                            clearDialogOpen = false;
                        }}
                    >
                        Clear
                    </AlertDialog.Action>
                </AlertDialog.Footer>
            </AlertDialog.Content>
        </AlertDialog.Root>
    </div>
</footer>

<style>
    /* ensure the ScrollArea grows but doesn't hide under fixed header/footer */
    main {
        min-height: 0;
    }
    footer {
        font-size: inherit;
        line-height: 1.1;
    }
</style>
