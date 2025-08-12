<script lang="ts">
    import * as Card from "@/lib/components/ui/card/index.js";
    import Button from "@/lib/components/ui/button/button.svelte";
    import { Clipboard, MousePointerClick, FolderOpen, Download, Archive, Tag, Clock, AtSign, Globe } from "@lucide/svelte";

    import logoUrl from "$lib/logo.svg";
    import appLightUrl from "$lib/app-light.png";
    import appDarkUrl from "$lib/app-dark.png";
</script>

<div class="min-h-[100svh] w-full grid place-items-center overflow-y-auto">
    <Card.Root class="max-md:shadow-none max-md:border-none max-md:bg-transparent shadow-lg border-muted/40 min-md:w-[min(92vw,980px)] min-md:m-2">
        <Card.Content>
            <!-- Header -->
            <div class="flex flex-col gap-2 mb-3">
                <div class="flex items-start justify-between gap-3">
                    <div class="flex items-center gap-3">
                        <img src={logoUrl} alt="Image Batch Downloader logo" class="h-9 w-9" />
                        <h1 class="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight leading-tight">Image Batch Downloader</h1>
                    </div>

                    <a href="https://demetriuszhomir.com" target="_blank" rel="noreferrer" class="shrink-0">
                        <Button variant="outline" size="icon" aria-label="Open demetriuszhomir.com" data-testid="site-link">
                            <AtSign class="h-5 w-5" aria-hidden="true" />
                        </Button>
                    </a>
                </div>

                <p class="text-sm text-muted-foreground mt-1 leading-snug">
                    Paste images & download them in batches. Fully local, single-file, no installation.
                </p>
            </div>

            <!-- Content -->
            <div class="grid md:grid-cols-2 gap-4 items-start">
                <div class="flex flex-col gap-2 items-center justify-center">
                    <div class="rounded-md shadow-sm overflow-hidden border border-muted/30 bg-muted/10 max-w-[35rem]" data-testid="screenshots">
                        <img
                            src={appLightUrl}
                            alt="Image Batch Downloader – light mode screenshot"
                            class="block dark:hidden w-full h-auto"
                            loading="lazy"
                        />
                        <img
                            src={appDarkUrl}
                            alt="Image Batch Downloader – dark mode screenshot"
                            class="hidden dark:block w-full h-auto"
                            loading="lazy"
                        />
                    </div>

                    <div class="flex flex-wrap justify-center items-center gap-2 mt-1">
                        <a href="https://image-batch-downloader.demetriuszhomir.com/app" target="_blank" rel="noreferrer">
                            <Button size="lg" data-testid="online-cta">
                                <Globe class="mr-2 h-4 w-4" aria-hidden="true" />
                                Use online
                            </Button>
                        </a>
                        <a href="https://github.com/demetriuszhomir/ImageBatchDownloader/releases/tag/v1.0.0" target="_blank" rel="noreferrer">
                            <Button variant="secondary" size="lg" data-testid="download-cta">
                                <Download class="mr-2 h-4 w-4" aria-hidden="true" />
                                Download
                            </Button>
                        </a>
                    </div>
                </div>

                <!-- Feature Grid: Two categories -->
                <div class="flex flex-col gap-2 w-full max-w-md mx-auto">
                    <!-- Category: Easy Image Collection -->
                    <div>
                        <div class="text-base font-semibold mb-2">Easy Image Collection</div>
                        <div class="grid grid-cols-1 min-[20rem]:grid-cols-2">
                            <!-- Paste images -->
                            <div class="flex items-start gap-3 p-3">
                                <div class="mt-0.5 text-primary"><Clipboard class="h-4 w-4" aria-hidden="true" /></div>
                                <div class="text-sm font-medium leading-tight">Paste images directly from the clipboard</div>
                            </div>
                            <!-- Drag & drop -->
                            <div class="flex items-start gap-3 p-3">
                                <div class="mt-0.5 text-primary"><MousePointerClick class="h-4 w-4" aria-hidden="true" /></div>
                                <div class="text-sm font-medium leading-tight">Drag & drop support for files</div>
                            </div>
                            <!-- File picker -->
                            <div class="flex items-start gap-3 p-3">
                                <div class="mt-0.5 text-primary"><FolderOpen class="h-4 w-4" aria-hidden="true" /></div>
                                <div class="text-sm font-medium leading-tight">Traditional file browser selection</div>
                            </div>
                        </div>
                    </div>
                    <!-- Category: Flexible Download Options -->
                    <div>
                        <div class="text-base font-semibold mb-2">Flexible Download Options</div>
                        <div class="grid grid-cols-1 min-[20rem]:grid-cols-2">
                            <!-- Individual file downloads -->
                            <div class="flex items-start gap-3 p-3">
                                <div class="mt-0.5 text-primary"><Download class="h-4 w-4" aria-hidden="true" /></div>
                                <div class="text-sm font-medium leading-tight">Individual file downloads</div>
                            </div>
                            <!-- ZIP archive -->
                            <div class="flex items-start gap-3 p-3">
                                <div class="mt-0.5 text-primary"><Archive class="h-4 w-4" aria-hidden="true" /></div>
                                <div class="text-sm font-medium leading-tight">ZIP archive for all images</div>
                            </div>
                            <!-- Custom file naming -->
                            <div class="flex items-start gap-3 p-3">
                                <div class="mt-0.5 text-primary"><Tag class="h-4 w-4" aria-hidden="true" /></div>
                                <div class="text-sm font-medium leading-tight">Custom file naming with prefixes</div>
                            </div>
                            <!-- Automatic timestamps -->
                            <div class="flex items-start gap-3 p-3">
                                <div class="mt-0.5 text-primary"><Clock class="h-4 w-4" aria-hidden="true" /></div>
                                <div class="text-sm font-medium leading-tight">Automatic timestamps in filenames</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card.Content>
    </Card.Root>
</div>
