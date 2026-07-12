import { fileURLToPath, URL } from 'node:url'
import path from 'node:path'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    tailwindcss(),
    vueDevTools(),
    Icons({ compiler: 'vue3', autoInstall: true }),
    Components({
      dts: true,
      resolvers: [
        IconsResolver(),
        (componentName) => {
          if (componentName === 'Icon') {
            return { name: 'Icon', from: '@iconify/vue' }
          }
        },
      ],
    }),
    AutoImport({
      imports: [
        // presets
        'vue',
        'vue-router',
        '@vueuse/core',
        'pinia',
        {
          vuetify: [
            'useTheme', // Automatically import useTheme from Vuetify
            'useLocale', // Automatically import useLocale from Vuetify
            // Add any other Vuetify composables you need
          ],
        },
        {
          axios: [
            // import default export
            ['default', 'axios'],
          ],
        },
      ],
      dts: 'src/auto-imports.d.ts',
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      resolvers: [
        ((name: any) => {
          if (/^use[A-Z]/.test(name)) {
            return { importName: name, path: `@/composables/${name}` }
          }
        }) as any,
      ],
    }),
    VueI18nPlugin({
      /* options */
      // locale messages resource pre-compile option
      include: [path.resolve(__dirname, './src/i18n/**')],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
