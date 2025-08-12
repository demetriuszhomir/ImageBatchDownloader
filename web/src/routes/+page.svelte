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
</script>

<div class="min-h-[100svh] w-full grid place-items-center overflow-y-auto">
    <LandingCard>
        <HeroHeader {logoUrl} siteUrl={siteUrl} {title} {subtitle} />

        <!-- Content -->
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

            <!-- Feature Grid: Two categories -->
            <FeatureGrid />
        </div>
    </LandingCard>
</div>
