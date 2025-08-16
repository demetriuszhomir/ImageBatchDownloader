<script lang="ts">
    import Button from "@/lib/components/ui/button/button.svelte";
    import { AtSign } from "@lucide/svelte";

    let {
        logoUrl,
        siteUrl,
        title,
        subtitle,
        siteAriaLabel = "Open demetriuszhomir.com",
        siteTestId = "site-link",
    } = $props();
</script>

<!-- Header -->
<div class="flex flex-col gap-2 mb-3">
    <div class="flex items-start justify-between gap-3">
        <div class="flex items-center gap-3">
            <!-- svelte-ignore a11y_img_redundant_alt -->
            <img src={logoUrl} alt="Image Batch Downloader logo" class="h-9 w-9" />
            <h1 class="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight leading-tight">{title}</h1>
        </div>

        <a href={siteUrl} target="_blank" rel="noreferrer" class="shrink-0">
            <Button variant="outline" size="icon" aria-label={siteAriaLabel} data-testid={siteTestId}>
                <AtSign class="h-5 w-5" aria-hidden="true" />
            </Button>
        </a>
    </div>

    <p class="text-sm text-muted-foreground mt-1 leading-snug">
        {subtitle}
    </p>
</div>
