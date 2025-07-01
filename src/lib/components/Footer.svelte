<script lang="ts">
    import { Input } from "$lib/components/ui/input";
    import { Button } from "$lib/components/ui/button";
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
    class="fixed bottom-0 left-0 right-0 z-20 border-t bg-background/90 backdrop-blur p-3 flex flex-col sm:flex-row sm:items-center gap-3 min-h-0 h-14"
>
    <div class="flex items-center gap-2 flex-1 min-w-0">
        <span class="whitespace-nowrap text-sm">Files prefix</span>
        <Input bind:value={prefix} placeholder="Optional prefix" class="max-w-xs h-9 px-3 py-1" />
    </div>

    <div class="flex items-center gap-2">
        <Button onclick={downloadAll} disabled={!canDownload} class="h-9 px-3 py-1">
            <Download class="w-4 h-4 mr-2" /> Download
        </Button>

        <Button onclick={downloadZip} disabled={!canDownload} variant="secondary" class="h-9 px-3 py-1">
            <FileArchive class="w-4 h-4 mr-2" /> ZIP
        </Button>

        <AlertDialog.Root bind:open={clearDialogOpen}>
            <AlertDialog.Trigger disabled={!canDownload}>
                <Button variant="destructive" disabled={!canDownload} class="h-9 px-3 py-1">
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
    footer {
        font-size: inherit;
        line-height: 1.1;
    }
</style>
