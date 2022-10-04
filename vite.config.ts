import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


import Components from "unplugin-vue-components/vite";
// vite.config.js
import {
  AntDesignVueResolver,
} from "unplugin-vue-components/resolvers";



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // antd按需加载
    Components({
      resolvers: [AntDesignVueResolver()],
    }),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});

