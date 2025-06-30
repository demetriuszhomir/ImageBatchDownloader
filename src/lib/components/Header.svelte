<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import { Sun, Moon, Monitor } from "@lucide/svelte";
    import logoUrl from "$lib/logo.svg";
    import type { Theme } from "$lib/theme";
    export let theme: Theme;
    export let toggleTheme: () => void;
</script>

<header class="fixed top-0 left-0 right-0 z-20 backdrop-blur bg-background/80 border-b p-3 flex items-center justify-between min-h-0 h-12">
    <div class="flex items-center gap-2">
        <img src={logoUrl} alt="Logo" class="w-7 h-7 shrink-0" />
        <span class="font-semibold select-none">Image&nbsp;Batch&nbsp;Downloader</span>
    </div>
    <Button variant="ghost" size="icon" aria-label="Toggle theme" onclick={toggleTheme} class="w-9 h-9 min-w-0 min-h-0">
        {#if theme === "light"}
            <Sun class="w-5 h-5" />
        {:else if theme === "dark"}
            <Moon class="w-5 h-5" />
        {:else}
            <Monitor class="w-5 h-5" />
        {/if}
    </Button>
</header>
