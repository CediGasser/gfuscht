import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig, defineConfig } from 'vite';

const config: UserConfig = {
  plugins: [tailwindcss(), sveltekit()]
};

export default config;
