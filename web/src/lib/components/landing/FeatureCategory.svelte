<script lang="ts">
    import type { Component } from "svelte";
    import FeatureTile from "./FeatureTile.svelte";

    type Item = { icon: Component<any>; text: string };
    type Props = { title: string; items: Item[] };

    let { title, items }: Props = $props();
</script>

<div>
    <div class="text-base font-semibold mb-2">{title}</div>
    <div class="grid grid-cols-1 min-[20rem]:grid-cols-2">
        {#each items as item}
            <FeatureTile Icon={item.icon} text={item.text} />
        {/each}
    </div>
</div>
