import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@views': resolve('src/renderer/src/views'),
        '@components': resolve('src/renderer/src/components'),
        '@lib': resolve('src/lib'),
        '@assets': resolve('src/renderer/src/assets')
      }
    },
    plugins: [react()]
  }
})
