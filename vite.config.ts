/// <reference types="@sveltejs/kit" />
import { sveltekit } from '@sveltejs/kit/vite'

const config: import('vite').UserConfig = {
  plugins: [sveltekit()]
}

export default config
