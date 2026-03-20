import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Replace 'swingiq-survey' with your actual GitHub repository name
export default defineConfig({
  plugins: [react()],
  base: '/swingiq-survey/',
})
