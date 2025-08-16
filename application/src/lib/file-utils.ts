import JSZip from 'jszip';

export interface ImageData {
    id: number;
    file: File;
    dataUrl: string;
}

export function generateTimestamp(): string {
    const d = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    const off = -d.getTimezoneOffset();
    const sign = off >= 0 ? '+' : '-';
    const hh = pad(Math.floor(Math.abs(off) / 60));
    const mm = pad(Math.abs(off) % 60);
    return `-${pad(d.getDate())}_${pad(d.getMonth() + 1)}_${d.getFullYear()}` +
        `-${pad(d.getHours())}-${pad(d.getMinutes())}-${pad(d.getSeconds())}` +
        `-UTC${sign}${hh}${mm === '00' ? '' : ':' + mm}`;
}

export function downloadSingleImage(img: ImageData, idx: number, prefix: string) {
    const ext = img.file.type.split('/')[1];
    const a = document.createElement('a');
    a.href = img.dataUrl;
    a.download = `${prefix ? prefix + '_' : ''}image_${idx + 1}${generateTimestamp()}.${ext}`;
    a.click();
}

export async function downloadAllSeparate(images: ImageData[], prefix: string) {
    for (let i = 0; i < images.length; i++) {
        downloadSingleImage(images[i], i, prefix);
        await new Promise((r) => setTimeout(r, 300));
    }
}

export async function downloadZip(images: ImageData[], prefix: string) {
    const zip = new JSZip();
    for (let i = 0; i < images.length; i++) {
        const img = images[i];
        const ext = img.file.type.split('/')[1];
        zip.file(`${prefix ? prefix + '_' : ''}image_${i + 1}${generateTimestamp()}.${ext}`,
            img.dataUrl.split(',')[1], { base64: true });
    }
    const blob = await zip.generateAsync({ type: 'blob' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${prefix ? prefix + '_' : ''}images${generateTimestamp()}.zip`;
    a.click();
    URL.revokeObjectURL(a.href);
}

export function fileToDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target!.result as string);
        reader.onerror = () => reject(new Error('failed to read file'));
        reader.readAsDataURL(file);
    });
}
