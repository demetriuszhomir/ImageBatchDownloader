import { writable, get } from 'svelte/store';
import { applyTheme, getSavedTheme, nextTheme, saveTheme, setupSystemThemeListener, type Theme } from '../theme';

export const theme = writable<Theme>(getSavedTheme());

function handleSystemChange() {
    if (get(theme) === 'system') applyTheme(get(theme));
}

let removeListener: (() => void) | null = null;
if (typeof window !== 'undefined') {
    removeListener = setupSystemThemeListener(handleSystemChange);
}

theme.subscribe((value) => {
    saveTheme(value);
    applyTheme(value);
});

export function toggleTheme() {
    theme.update((t) => nextTheme(t));
}

export function cleanupTheme() {
    removeListener?.();
}
