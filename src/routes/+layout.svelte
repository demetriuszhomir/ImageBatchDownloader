<script lang="ts">
    import "../app.css";
    import Header from "$lib/components/Header.svelte";
    import { onDestroy } from "svelte";
    import { applyTheme, getSavedTheme, nextTheme, saveTheme, setupSystemThemeListener, type Theme } from "$lib/theme";

    let { children } = $props();

    let theme: Theme = $state(getSavedTheme());

    const systemListener = () => {
        if (theme === "system") applyTheme(theme);
    };

    $effect(() => {
        saveTheme(theme);
    });
    $effect(() => {
        applyTheme(theme);
    });

    let removeListener: (() => void) | null = null;
    if (typeof window !== "undefined") {
        removeListener = setupSystemThemeListener(systemListener);
    }

    function toggleTheme() {
        theme = nextTheme(theme);
    }

    onDestroy(() => {
        removeListener?.();
    });
</script>

<Header {theme} {toggleTheme} />

{@render children()}
