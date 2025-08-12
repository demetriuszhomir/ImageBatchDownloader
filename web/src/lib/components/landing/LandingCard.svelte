<script lang="ts">
    import * as Card from "@/lib/components/ui/card/index.js";
    let { children, class: className = "" } = $props();
</script>

<Card.Root class={"max-md:shadow-none max-md:border-none max-md:bg-transparent shadow-lg border-muted/40 min-md:w-[min(92vw,980px)] min-md:m-2 " + className}>
    <Card.Content>
        {@render children?.()}
    </Card.Content>
</Card.Root>
