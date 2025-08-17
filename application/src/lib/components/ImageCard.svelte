<script lang="ts">
    import { Card } from "$lib/components/ui/card";
    import { AspectRatio } from "$lib/components/ui/aspect-ratio";
    import { Button } from "$lib/components/ui/button";
    import { X } from "@lucide/svelte";
    import type { ImageData } from "$lib/file-utils";

    export let img: ImageData;
    export let onRemove: (id: number) => void;
</script>

<Card class="relative group p-2">
    <AspectRatio ratio={1}>
        <img src={img.dataUrl} alt="preview" class="object-cover w-full h-full rounded-md" />
    </AspectRatio>
    <Button
        variant="outline"
        size="icon"
        class="absolute top-2 right-2 m-1 w-8 h-8 min-w-0 min-h-0"
        aria-label="Remove"
        onclick={() => onRemove(img.id)}
    >
        <X class="w-4 h-4" />
    </Button>
</Card>
