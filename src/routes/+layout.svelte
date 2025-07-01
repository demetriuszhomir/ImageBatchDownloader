<script lang="ts">
    import "../app.css";
    import Header from "$lib/components/Header.svelte";
    import { onDestroy } from "svelte";
    import { theme, toggleTheme, cleanupTheme } from "$lib/stores/themeStore";

    let { children } = $props();

    onDestroy(() => {
        cleanupTheme();
    });
</script>

<Header theme={$theme} {toggleTheme} />

{@render children()}
