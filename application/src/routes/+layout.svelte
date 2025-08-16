<script lang="ts">
    import "../app.css";
    import Header from "$lib/components/Header.svelte";
    import { onDestroy } from "svelte";
    import { theme, toggleTheme, cleanupTheme } from "$lib/stores/themeStore";
    import favicon from "$lib/favicon.png";

    let { children } = $props();

    onDestroy(() => {
        cleanupTheme();
    });
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<Header theme={$theme} {toggleTheme} />

{@render children()}
