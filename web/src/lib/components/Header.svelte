<script lang="ts">
    // import { Button } from "$lib/components/ui/button";
    // import { Sun, Moon, Monitor } from "@lucide/svelte";
    // import logoUrl from "$lib/logo.png";

    import type { Theme } from "$lib/theme";
    export let theme: Theme;
    export let toggleTheme: () => void;
</script>
