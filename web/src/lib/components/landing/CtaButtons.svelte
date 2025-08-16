<script lang="ts">
    import Button from "@/lib/components/ui/button/button.svelte";
    import { Globe, Download } from "@lucide/svelte";

    let { onlineUrl, downloadUrl } = $props();
</script>

<div class="flex flex-wrap justify-center items-center gap-2 mt-1">
    <a href={onlineUrl} target="_blank" rel="noreferrer">
        <Button size="lg" data-testid="online-cta">
            <Globe class="mr-2 h-4 w-4" aria-hidden="true" />
            Use online
        </Button>
    </a>
    <a href={downloadUrl} target="_blank" rel="noreferrer">
        <Button variant="secondary" size="lg" data-testid="download-cta">
            <Download class="mr-2 h-4 w-4" aria-hidden="true" />
            Download
        </Button>
    </a>
</div>
