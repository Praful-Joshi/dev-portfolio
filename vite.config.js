import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/dev-portfolio/',  // <-- this is important
  plugins: [react()]
})
