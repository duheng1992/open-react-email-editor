import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/open-react-email-editor/',
  plugins: [react()],
  define: {
    'process.env': {}
  }
})
