import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: 'jsx',  // This makes sure esbuild parses JSX syntax correctly
    include: /\.jsx?$/,  // This tells esbuild to treat both .js and .jsx files as JSX
  },
})

