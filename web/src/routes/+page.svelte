<script lang="ts">
    import LandingCard from "$lib/components/landing/LandingCard.svelte";
    import HeroHeader from "$lib/components/landing/HeroHeader.svelte";
    import ScreenshotPanel from "$lib/components/landing/ScreenshotPanel.svelte";
    import CtaButtons from "$lib/components/landing/CtaButtons.svelte";
    import FeatureGrid from "$lib/components/landing/FeatureGrid.svelte";

    import logoUrl from "$lib/logo.svg";
    import appLightUrl from "$lib/app-light.png";
    import appDarkUrl from "$lib/app-dark.png";
    
    const siteUrl = "https://demetriuszhomir.com";
    const title = "Image Batch Downloader";
    const subtitle = "Paste images & download them in batches. Fully local, single-file, no installation.";
    const onlineUrl = "https://image-batch-downloader.demetriuszhomir.com/app";
    const downloadUrl = "https://github.com/demetriuszhomir/ImageBatchDownloader/releases/tag/v1.0.0";

    // SEO canonical URLs
    const CANONICAL_URL = "https://image-batch-downloader.demetriuszhomir.com/";
    const OG_IMAGE = "https://image-batch-downloader.demetriuszhomir.com/media.jpg"; // served from static/
</script>

<svelte:head>
    <link rel="canonical" href={CANONICAL_URL} />
    <meta name="description" content={subtitle} />
    <meta name="robots" content="index, follow, max-image-preview:large" />

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

<main id="main" class="min-h-[100svh] w-full grid place-items-center overflow-y-auto">
    <LandingCard>
        <HeroHeader {logoUrl} siteUrl={siteUrl} {title} {subtitle} />

        <div class="grid md:grid-cols-2 gap-4 items-start">
            <div class="flex flex-col gap-2 items-center justify-center">
                <ScreenshotPanel
                    lightSrc={appLightUrl}
                    darkSrc={appDarkUrl}
                    altLight="Image Batch Downloader – light mode screenshot"
                    altDark="Image Batch Downloader – dark mode screenshot"
                />

                <CtaButtons {onlineUrl} {downloadUrl} />
            </div>

            <FeatureGrid />
        </div>
    </LandingCard>
    
</main>
