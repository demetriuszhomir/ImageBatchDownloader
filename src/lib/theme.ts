export type Theme = 'system' | 'light' | 'dark';

export function getSavedTheme(): Theme {
    if (typeof localStorage === 'undefined') return 'system';
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark' || saved === 'system') {
        return saved;
    }
    return 'system';
}

export function saveTheme(theme: Theme) {
    if (typeof localStorage !== 'undefined') {
        localStorage.setItem('theme', theme);
    }
}

export function applyTheme(theme: Theme) {
    if (typeof document === 'undefined') return;
    if (theme === 'system') {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    } else if (theme === 'dark') {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
}

export function nextTheme(current: Theme): Theme {
    const order: Theme[] = ['system', 'light', 'dark'];
    const i = order.indexOf(current);
    return order[(i + 1) % order.length];
}

export function setupSystemThemeListener(callback: (e: MediaQueryListEvent) => void) {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener('change', callback);
    return () => mq.removeEventListener('change', callback);
}
