<script lang="ts">
    import type { IconProps } from "@lucide/svelte";
    import type { Component } from "svelte";

    type IconCmp = Component<IconProps>;
    type Props = { Icon: IconCmp; text: string; wrapperClass?: string };

    let { Icon, text, wrapperClass = "flex items-start gap-3 p-3" }: Props = $props();
</script>

<div class={wrapperClass}>
    <div class="mt-0.5 text-primary"><Icon class="h-4 w-4" aria-hidden={true} /></div>
    <div class="text-sm font-medium leading-tight">{text}</div>
</div>
