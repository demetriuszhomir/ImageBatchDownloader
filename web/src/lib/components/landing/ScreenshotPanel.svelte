<script lang="ts">
    let {
        lightSrc,
        darkSrc,
        altLight,
        altDark,
        wrapperClass = "rounded-md shadow-sm overflow-hidden border border-muted/30 bg-muted/10 max-w-[35rem]",
    } = $props();
</script>

<figure class={wrapperClass} data-testid="screenshots">
    <img src={lightSrc} alt={altLight} class="block dark:hidden w-full h-auto" loading="lazy" />
    <img src={darkSrc} alt={altDark} class="hidden dark:block w-full h-auto" loading="lazy" />
</figure>
