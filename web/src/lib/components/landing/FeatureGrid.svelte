<script lang="ts">
    import { Clipboard, MousePointerClick, FolderOpen, Download, Archive, Tag, Clock } from "@lucide/svelte";
    import FeatureCategory from "./FeatureCategory.svelte";
</script>

<div class="flex flex-col gap-2 w-full max-w-md mx-auto">
    <div>
        <FeatureCategory
            title="Easy Image Collection"
            items={[
                { icon: Clipboard, text: "Paste images directly from the clipboard" },
                { icon: MousePointerClick, text: "Drag & drop support for files" },
                { icon: FolderOpen, text: "Traditional file browser selection" },
            ]}
        />
    </div>
    <div>
        <FeatureCategory
            title="Flexible Download Options"
            items={[
                { icon: Download, text: "Individual file downloads" },
                { icon: Archive, text: "ZIP archive for all images" },
                { icon: Tag, text: "Custom file naming with prefixes" },
                { icon: Clock, text: "Automatic timestamps in filenames" },
            ]}
        />
    </div>
</div>
