import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/o/lr-course-registrations',
  build: {
    outDir: './vite-build',
		rollupOptions: {
			external: [
				'react',
				'react-dom',
				/^(?!@clayui\/css)@clayui.*$/,
			],
		}
  },
  plugins: [react({
    jsxRuntime: 'classic',
  })],
})
