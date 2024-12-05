import { fileURLToPath, URL } from 'node:url'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    Components({ dts: true }),
    AutoImport({
      imports: [
        // presets
        'vue',
        'vue-router',
        '@vueuse/core',
        'pinia',
        {
          axios: [
            // import default export
            ['default', 'axios']
          ]
        }
      ],
      dts: 'src/auto-imports.d.ts',
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/ // .md
      ],
      resolvers: [
        ((name: any) => {
          if (/^use[A-Z]/.test(name)) {
            return { importName: name, path: `@/composables/${name}` }
          }
        }) as any
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
