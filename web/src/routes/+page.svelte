<script lang="ts">
    import LandingCard from "$lib/components/landing/LandingCard.svelte";
    import HeroHeader from "$lib/components/landing/HeroHeader.svelte";
    import CtaButtons from "$lib/components/landing/CtaButtons.svelte";
    import FeatureGrid from "$lib/components/landing/FeatureGrid.svelte";

    import logoUrl from "$lib/logo.svg";
    
    const siteUrl = "https://demetriuszhomir.com";
    const title = "Image Batch Downloader";
    const subtitle = "Paste images & download them in batches. Fully local, single-file, no installation.";
    const onlineUrl = "https://image-batch-downloader.demetriuszhomir.com/app";
    const downloadUrl = "https://github.com/demetriuszhomir/ImageBatchDownloader/releases/tag/v1.0.1";

    // SEO canonical URLs
    const CANONICAL_URL = "https://image-batch-downloader.demetriuszhomir.com/";
    const OG_IMAGE = "https://image-batch-downloader.demetriuszhomir.com/media.jpg"; // served from static/
</script>

<svelte:head>
    <meta name="robots" content="index, follow, max-image-preview:large" />

    <link rel="canonical" href={CANONICAL_URL} />
    <meta name="description" content={subtitle} />

    <!-- JSON-LD -->
    {@html `<script type="application/ld+json">${JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            url: CANONICAL_URL,
            name: title,
        })}</script>`}

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content={title} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={subtitle} />
    <meta property="og:url" content={CANONICAL_URL} />
    <meta property="og:image" content={OG_IMAGE} />
    <meta property="og:image:alt" content={title} />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={subtitle} />
    <meta name="twitter:image" content={OG_IMAGE} />
    <meta name="twitter:image:alt" content={title} />

    <!-- Extras -->
    <meta name="keywords" content="image downloader, batch download images, paste images, zip images, offline, local" />
</svelte:head>

<main id="main" class="min-h-[100svh] w-full grid min-md:place-items-center overflow-y-auto">
    <LandingCard>
        <HeroHeader {logoUrl} siteUrl={siteUrl} {title} {subtitle} />

        <div class="grid md:grid-cols-2 gap-4 items-start">
            <div class="flex flex-col gap-2 items-center justify-center">
                <figure class="rounded-md shadow-sm overflow-hidden border border-muted/30 bg-muted/10 max-w-[35rem]" data-testid="screenshots">
                    <enhanced:img src="$lib/app-light.png?format=avif" alt="Image Batch Downloader – light mode screenshot" class="block dark:hidden w-full h-auto" loading="lazy" />
                    <enhanced:img src="$lib/app-dark.png?format=avif" alt="Image Batch Downloader – dark mode screenshot" class="hidden dark:block w-full h-auto" loading="lazy" />
                </figure>

                <CtaButtons {onlineUrl} {downloadUrl} />
            </div>

            <FeatureGrid />
        </div>
    </LandingCard>
    
</main>
