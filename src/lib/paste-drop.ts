export function setupPasteDrop(addFile: (file: File) => void, handleFiles: (files: FileList | null) => void) {
    const paste = (e: ClipboardEvent) => {
        for (const item of e.clipboardData?.items ?? []) {
            if (item.type.startsWith('image/')) {
                const f = item.getAsFile();
                if (f) addFile(f);
            }
        }
    };
    const drop = (e: DragEvent) => {
        e.preventDefault();
        handleFiles(e.dataTransfer?.files ?? null);
    };
    const prevent = (e: DragEvent) => e.preventDefault();

    window.addEventListener('paste', paste);
    window.addEventListener('drop', drop);
    window.addEventListener('dragover', prevent);

    return () => {
        window.removeEventListener('paste', paste);
        window.removeEventListener('drop', drop);
        window.removeEventListener('dragover', prevent);
    };
}
