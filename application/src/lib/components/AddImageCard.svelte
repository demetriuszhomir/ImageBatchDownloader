<script lang="ts">
    import { Card } from "$lib/components/ui/card";
    import { AspectRatio } from "$lib/components/ui/aspect-ratio";

    export let onFiles: (files: FileList | null) => void;

    let fileInputEl: HTMLInputElement;
</script>

<Card class="relative group p-2">
    <AspectRatio ratio={1}>
        <button
            type="button"
            class="w-full h-full border-2 border-dashed rounded-md flex items-center justify-center text-muted-foreground hover:bg-accent transition-colors"
            onclick={() => fileInputEl.click()}
            aria-label="Add images"
        >
            <div class="flex flex-col items-center gap-1 p-3 text-center select-none">
                <span class="text-4xl leading-none">+</span>
                <span class="text-sm"> Paste / Drag-n-Drop / Browse </span>
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
            onFiles(e.currentTarget.files);
            e.currentTarget.value = "";
        }}
    />
</Card>
