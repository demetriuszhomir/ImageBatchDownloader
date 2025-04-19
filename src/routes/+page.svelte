<script runes lang="ts">
    import { onMount } from "svelte";
    import JSZip from "jszip";

    import { Button } from "$lib/components/ui/button";
    import { Card } from "$lib/components/ui/card";
    import { AspectRatio } from "$lib/components/ui/aspect-ratio";
    import { ScrollArea } from "$lib/components/ui/scroll-area";
    import { Input } from "$lib/components/ui/input";
    import { Toaster } from "$lib/components/ui/sonner";
    import * as AlertDialog from "$lib/components/ui/alert-dialog";

    import { Sun, Moon, Monitor, X, Download, FileArchive, Trash } from "@lucide/svelte";

    import logoUrl from "$lib/logo.svg";

    interface ImageData {
        id: number;
        file: File;
        dataUrl: string;
    }

    // reactive state
    let images = $state<ImageData[]>([]);
    let prefix = $state("");
    let nextId = $state(0);

    // theme: "system" | "light" | "dark"
    let theme = $state<"system" | "light" | "dark">("system");
    function applyTheme() {
        if (theme === "system") {
            if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
                document.body.classList.add("dark-theme");
            } else {
                document.body.classList.remove("dark-theme");
            }
        } else if (theme === "dark") {
            document.body.classList.add("dark-theme");
        } else {
            document.body.classList.remove("dark-theme");
        }
    }
    // sync to localStorage + apply
    $effect(() => {
        localStorage.setItem("theme", theme);
        applyTheme();
    });

    onMount(() => {
        // restore
        theme = (localStorage.getItem("theme") as any) ?? "system";
        applyTheme();

        // system‑dark listener
        const mq = window.matchMedia("(prefers-color-scheme: dark)");
        const handler = (e: MediaQueryListEvent) => {
            if (theme === "system") applyTheme();
        };
        mq.addEventListener("change", handler);

        // clipboard + drag‑drop
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
            mq.removeEventListener("change", handler);
            window.removeEventListener("paste", paste);
            window.removeEventListener("drop", drop);
            window.removeEventListener("dragover", prevent);
        };
    });

    function toggleTheme() {
        const order = ["system", "light", "dark"] as const;
        const i = order.indexOf(theme);
        theme = order[(i + 1) % order.length];
    }

    let fileInputEl: HTMLInputElement;
    function addFile(file: File) {
        if (!file.type.startsWith("image/")) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            images = [...images, { id: nextId++, file, dataUrl: e.target!.result as string }];
        };
        reader.readAsDataURL(file);
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

    function ts() {
        const d = new Date();
        const pad = (n: number) => n.toString().padStart(2, "0");
        const off = -d.getTimezoneOffset();
        const sign = off >= 0 ? "+" : "-";
        const hh = pad(Math.floor(Math.abs(off) / 60));
        const mm = pad(Math.abs(off) % 60);
        return `-${pad(d.getDate())}_${pad(d.getMonth() + 1)}_${d.getFullYear()}-${pad(
            d.getHours(),
        )}-${pad(d.getMinutes())}-${pad(d.getSeconds())}-UTC${sign}${hh}${mm === "00" ? "" : ":" + mm}`;
    }

    function dlSingle(img: ImageData, idx: number) {
        const ext = img.file.type.split("/")[1];
        const a = document.createElement("a");
        a.href = img.dataUrl;
        a.download = `${prefix ? prefix + "_" : ""}image_${idx + 1}${ts()}.${ext}`;
        a.click();
    }
    async function dlAllSeparate() {
        for (let i = 0; i < images.length; i++) {
            dlSingle(images[i], i);
            await new Promise((r) => setTimeout(r, 300));
        }
    }
    async function dlZip() {
        const zip = new JSZip();
        for (let i = 0; i < images.length; i++) {
            const img = images[i];
            const ext = img.file.type.split("/")[1];
            zip.file(`${prefix ? prefix + "_" : ""}image_${i + 1}${ts()}.${ext}`, img.dataUrl.split(",")[1], { base64: true });
        }
        const blob = await zip.generateAsync({ type: "blob" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = `${prefix ? prefix + "_" : ""}images${ts()}.zip`;
        a.click();
        URL.revokeObjectURL(a.href);
    }

    // control the dialog open state
    let clearDialogOpen = $state(false);
</script>

<Toaster />

<!-- fixed header -->
<header class="fixed top-0 left-0 right-0 z-20 backdrop-blur bg-background/80 border-b p-4 flex items-center justify-between">
    <div class="flex items-center gap-2">
        <img src={logoUrl} alt="Logo" class="w-6 h-6 shrink-0" />
        <span class="font-semibold select-none">Image&nbsp;Batch&nbsp;Downloader</span>
    </div>
    <Button variant="ghost" size="icon" aria-label="Toggle theme" onclick={toggleTheme}>
        {#if theme === "light"}
            <Sun class="w-5 h-5" />
        {:else if theme === "dark"}
            <Moon class="w-5 h-5" />
        {:else}
            <Monitor class="w-5 h-5" />
        {/if}
    </Button>
</header>

<!-- main padded around header/footer -->
<main class="pt-16 pb-16 flex flex-col flex-1 overflow-hidden">
    <ScrollArea class="flex-1">
        <div class="grid gap-4 p-4" style="grid-template-columns:repeat(auto-fill,minmax(160px,1fr));">
            {#each images as img (img.id)}
                <Card class="relative group">
                    <AspectRatio ratio={1}>
                        <img src={img.dataUrl} alt="preview" class="object-cover w-full h-full rounded-md" />
                    </AspectRatio>
                    <Button
                        variant="destructive"
                        size="icon"
                        class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Remove"
                        onclick={() => removeImg(img.id)}
                    >
                        <X class="w-4 h-4" />
                    </Button>
                </Card>
            {/each}

            <Card
                class="border-2 border-dashed cursor-pointer flex items-center justify-center text-muted-foreground hover:bg-accent"
                onclick={() => fileInputEl.click()}
            >
                <div class="flex flex-col items-center gap-1 p-6 text-center select-none">
                    <span class="text-4xl leading-none">＋</span>
                    <span class="text-sm"> Paste / Drag‑n‑Drop / Click to browse </span>
                </div>

                <input
                    type="file"
                    class="hidden"
                    multiple
                    accept="image/*"
                    bind:this={fileInputEl}
                    onchange={(e) => handleFiles(e.currentTarget.files)}
                />
            </Card>
        </div>
    </ScrollArea>
</main>

<!-- fixed footer -->
<footer class="fixed bottom-0 left-0 right-0 z-20 border-t bg-background/90 backdrop-blur p-4 flex flex-col sm:flex-row sm:items-center gap-3">
    <div class="flex items-center gap-2 flex-1">
        <span class="whitespace-nowrap">Prefix&nbsp;⟶</span>
        <Input bind:value={prefix} placeholder="Optional prefix" class="max-w-xs" />
    </div>

    <div class="flex items-center gap-2">
        <Button onclick={dlAllSeparate} disabled={images.length === 0}>
            <Download class="w-4 h-4 mr-2" /> Download
        </Button>

        <Button onclick={dlZip} disabled={images.length === 0} variant="secondary">
            <FileArchive class="w-4 h-4 mr-2" /> ZIP
        </Button>

        <!-- confirm dialog -->
        <AlertDialog.Root bind:open={clearDialogOpen}>
            <AlertDialog.Trigger>
                <Button variant="destructive" disabled={images.length === 0}>
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
</style>
