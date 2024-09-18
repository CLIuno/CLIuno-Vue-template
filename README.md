# vue Cliuno template

a vue 3 starter template or boilerplate with a lot of useful features. and integrated with TailwindCSS 3.  

This template was built to make it easier to create web projects using Vue 3.

> **NOTES**
>
> - This Project using "pnpm" as package manager. (not npm or yarn)!!!  

## Features

- [x] 💨 [Tailwind CSS v3](https://tailwindcss.com/)
- [x] 🛹 [State & Store Management (Pinia)](https://pinia.vuejs.org/)
- [x] 🚩 [Localization (i18n) & Auto Generate Locales
- [x] 📦 [Vue Composition Collection (Vueuse)](https://vueuse.org/)
- [x] 🌙 Switch Theme (light, dark, system, realtime)
- [x] 🪝 Built-in Component & Layout
- [x] Eslint & Prettier
- [x] Husky & Commitlint
- [x] Configurable Theme
  - [x] Primary Colors
  - [x] Font

## Premium Features

- [x] Built-in Unit Test
- [x] 📚 [Content Management System] [SSR]
- [x] 🇸🇦 Language Switcher
- [x] 🔔 [Icon Pack Component (unplugin-icons)](https://icones.js.org/)

## Table of Contents

- [Features](#features)
- [Table of Contents](#table-of-contents)
- [Quick Start](#quick-start)
  - [Start with this template](#start-with-this-template)
  - [Deploy as Static Site](#deploy-as-static-site)
- [Built-in Components](#built-in-components)
- [Notes](#notes)
  - [vue Content](#vue-content)
  - [Custom Workspace Snippets](#custom-workspace-snippets)
  - [Styles](#styles)
  - [Theme (Dark Mode)](#theme-dark-mode)
  - [Localization](#localization)
  - [Generate Locales](#generate-locales)
  - [Icons](#icons)
  - [Precommit and Postmerge](#precommit-and-postmerge)

## Quick Start

For detail information, go here [Getting Started](https://vue3-awesome-starter.vercel.app/getting-started)

### Start with this template

- This project using `pnpm` as package manager.

- Clone this project to your computer `git clone https://github.com/viandwi24/vue3-awesome-starter`
- Install dependencies `pnpm install --shamefully-hoist`
- Run `pnpm dev` to start development server and open `http://localhost:3000` in your browser

### Deploy as Static Site

- Run `pnpm generate` to build the project

- Serve `dist/` folder
Checkout the [deployment documentation](https://v3.vuejs.org/docs/deployment).

## Built-in Components

- [x] Footer
- [x] Button
- [x] Anchor (link)
- [x] Alert
- [x] Card
- [x] Action Sheet
- [x] Theme Toggle / Switcher
- [x] Navbar
  - [x] Navbar Builder
  - [x] Drawer (on mobile)
  - [x] Options (on mobile)
- [x] Page Layout
  - [x] Wrapper
  - [x] Header
    - [x] Title
  - [x] Body
    - [x] Section
      - [x] Section Wrapper
      - [x] Section Title
- [x] Dashboard Layout
  - [x] Sidebar
- [ ] Modal

## Notes

### vue Content

With vue Content, you can just create markdown file (recommended) inside `content` folder.  
But this is only available for SSR (Server Side Rendering) mode. Static mode still not working, you can see the issue <https://github.com/vue/content/issues/1202>
For now, you can follow

### Custom Workspace Snippets

This workspace including custom snippets for VSCode.

- **n3:content**  
  content template with markdown
- **n3:page**  
  page template

### Styles

Tailwindcss import managed by windicss.
and you can add custom styles in :

```bash
/path/to/assets/sass/app.scss
```

### Theme (Dark Mode)

ThemeManager is a plugin that allows you to switch between themes. this lib in :

```bash
/path/to/utils/theme.ts
```

`Thememanager` is a function-class construct when app.vue before mounted. theme construct inside `AppSetup()` in `/path/to/app.vue` :

```vue
<!-- /path/to/app.vue -->
<script lang="ts" setup>
import { AppSetup } from '~/utils/app';
// app setup
AppSetup()
</script>
```

To change theme, you can direct set theme from state `theme.setting`, example :

```vue
<script lang="ts" setup>
import { IThemeSettingOptions } from '~/utils/theme'
const themeSetting = useState<IThemeSettingOptions>('theme.setting')
themeSetting.value = 'dark'
</script>
```

When you change state `theme.setting`, it will automatically change theme.

Theme Setting have 4 options :

- `light`
- `dark`
- `system` (operating system theme)
- `realtime` (realtime theme, if 05:00 - 17:00, it will change to light theme, otherwise dark)

We have state `theme.current`, this state return `light` or `dark` theme. basically it's process from `theme.setting`.
dont change theme with this state.

### Localization

Localization is a plugin that allows you to switch between languages. this lib in :

```bash
/path/to/utils/lang.ts
```

`LanguageManager` is a function-class construct when app.vue before mounted.
this lib depend on [@intlify/vue3](https://github.com/intlify/vue3)
lang construct inside `AppSetup()` in `/path/to/app.vue` :\

```vue
<!-- /path/to/app.vue -->
<script lang="ts" setup>
import { AppSetup } from '~/utils/app';
// app setup
AppSetup()
</script>
```

To change language, you can direct set language from state `lang.setting`, example :

```vue
<script lang="ts" setup>
const langSetting = useState<string>('locale.setting')
langSetting.value = 'en'
</script>
```

When you change state `locale.setting`, it will automatically change language.

### Generate Locales

I made an automatic tool to automatically translate to all languages ​​that have been prepared in the ./locales/ folder
So, you can just update "locales/en.yml" and run this tools, it will automatically translate to all languages.

You can just run :

```bash
pnpm generate:locales

# or :

node ./tools/translator.js ./locales en.yml
```

### Icons

This project using unplugin-icons for auto generate and import icon as component.

You can see collection icon list in : [https://icones.js.org/](https://icones.js.org/)

you can use `<prefix-collection:icon />` or `<PrefixCollection:Icon />`.

in this project, configuration prefix as a "icon", you can see in `vue.config.ts` :

```js
export default definevueConfig({
    ...

    vite: {
        plugins: [
            UnpluginComponentsVite({
                dts: true,
                resolvers: [
                    IconsResolver({
                        prefix: 'Icon',
                    }),
                ],
            }),
        ],
    },

    ...
})
```

Example :

```vue
// use icon from collection "Simple Icons" and name icon is "vuedotjs"
<IconSimpleIcons:vuedotjs />

// use icon from collection "Unicons" and name icon is "sun"
<IconUil:sun />
```

### Precommit and Postmerge

This project using husky and commitlint for precommit and postmerge.
when you commit, it will check your commit message and running "pnpm lint-staged" to check your staged files.
configuration in : `/path/to/.husky/pre-commit` and `/path/to/commitlint.config.js`

And when Postmerge, it will run "pnpm" to automatically install new dependencies.
configuration in `/path/to/.husky/post-merge`
