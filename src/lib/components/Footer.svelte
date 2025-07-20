<script lang="ts">
    import { Input } from "$lib/components/ui/input";
    import { Button, buttonVariants } from "$lib/components/ui/button";
    import * as AlertDialog from "$lib/components/ui/alert-dialog";
    import { Download, FileArchive, Trash } from "@lucide/svelte";

    export let prefix: string;
    export let canDownload = false;
    export let downloadAll: () => void;
    export let downloadZip: () => void;
    export let clearAll: () => void;

    let clearDialogOpen = false;
</script>

<footer
    class="fixed bottom-0 left-0 right-0 z-20 border-t bg-background/90 backdrop-blur p-3 flex flex-col items-center sm:flex-row gap-3 min-h-0 h-auto sm:h-14"
>
    <div
        class="flex items-center gap-2 w-full sm:flex-1 min-w-0 justify-center sm:justify-start max-[16rem]:flex-col max-[16rem]:items-center"
    >
        <span class="whitespace-nowrap text-sm">Files prefix</span>
        <Input
            bind:value={prefix}
            placeholder="Optional prefix"
            class="w-full sm:max-w-xs text-sm"
        />
    </div>

    <div class="flex flex-wrap items-center justify-center gap-2 w-full sm:w-auto">
        <Button onclick={downloadAll} disabled={!canDownload}>
            <Download /> <span class="hidden min-[20rem]:inline">Download</span>
        </Button>

        <Button onclick={downloadZip} disabled={!canDownload} variant="secondary">
            <FileArchive /> <span class="hidden min-[20rem]:inline">ZIP</span>
        </Button>

        <AlertDialog.Root bind:open={clearDialogOpen}>
            <AlertDialog.Trigger disabled={!canDownload} class={buttonVariants({ variant: "destructive" })}>
                <Trash /> <span class="hidden min-[20rem]:inline">Clear&nbsp;All</span>
            </AlertDialog.Trigger>

            <AlertDialog.Content position="bottom-right" interactOutsideBehavior="close">
                <AlertDialog.Header>
                    <AlertDialog.Title>Clear all images?</AlertDialog.Title>
                    <AlertDialog.Description>This action cannot be undone.</AlertDialog.Description>
                </AlertDialog.Header>

                <AlertDialog.Footer>
                    <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
                    <AlertDialog.Action
                        class={buttonVariants({ variant: "destructive" })}
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
    footer {
        font-size: inherit;
        line-height: 1.1;
    }
</style>
