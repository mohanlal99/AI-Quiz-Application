import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    host: true,  // This will make it listen on all network interfaces (0.0.0.0)
    port: 3000,  // You can change the port number if needed
  },
})
