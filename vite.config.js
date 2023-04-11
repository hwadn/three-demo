import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		port: 3000,
		hmr: true,
		watch: {
			usePolling: true
		}
	}
})
