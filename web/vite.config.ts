import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    build: {
        // assetsInlineLimit: Infinity
    },

	plugins: [tailwindcss(), sveltekit()]
});
