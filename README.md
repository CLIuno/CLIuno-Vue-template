# Cliuno Vue template

<img src="./public/logo.png" style="width: 540px; height: 300px; margin: auto; display: block; padding-bottom: 30px;" alt="logo">

a Cliuno vue 3 template.

This template was built to make it easier to create web projects using Vue 3.

> **NOTES**
>
> - This Project using "pnpm" as package manager. (not npm or yarn)!!!

## Features

- [x] 💨 [Tailwind CSS v3](https://tailwindcss.com/)
- [x] 📦 [Vite](https://vitejs.dev/
- [x] 💨 [UnoCSS](https://unocss.dev/)
- [x] 🛹 [State & Store Management (Pinia)](https://pinia.vuejs.org/)
- [x] 🚩 [Localization (i18n) & Auto Generate Locales
- [x] 📦 [Vue Composition Collection (Vueuse)](https://vueuse.org/)
- [x] 🌙 Switch Theme (light, dark, system, realtime)
- [x] Built-in Component & Layout
- [x] Eslint & Prettier
- [x] Husky & Commitlint
- [x] Configurable Theme
  - [x] Primary Colors
  - [x] Font

## Table of Contents

- [Cliuno Vue template](#cliuno-vue-template)
  - [Features](#features)
  - [Table of Contents](#table-of-contents)
  - [Built-in Components](#built-in-components)
  - [Installation](#installation)
  - [Clone the repository](#clone-the-repository)
  - [Usage](#usage)
  - [Notes](#notes)
    - [Styles](#styles)
    - [Theme (Dark Mode)](#theme-dark-mode)
    - [Localization](#localization)
    - [Generate Locales](#generate-locales)
    - [Icons](#icons)
    - [Precommit and Postmerge](#precommit-and-postmerge)
  - [list of endpoints](#list-of-endpoints)
    - [Auth](#auth)
    - [Users](#users)
    - [Roles](#roles)
    - [Posts](#posts)

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
- [x] Modal

## Installation

if you want to run the project locally make sure you have installed nodejs, pnpm.
to install node js go to [nodejs](https://nodejs.org/en/download/)
to install pnpm run the following command

```bash
npm install -g pnpm
```

if you want to run the project using docker make sure you have installed docker.

to install docker go to [docker](https://docs.docker.com/get-docker/)

to run the project using docker run the following command

```bash
docker compose -d up
```

or pull the image from docker hub

```bash
docker pull iru44/vue-template
```

make sure you pull the database image from docker hub as well

then run the following command

```bash
docker run -p 3000:3000 iru44/express-template
```

if you want to run the project using kubernetes make sure you have installed minikube.

to install minikube go to [minikube](https://minikube.sigs.k8s.io/docs/start/)
to install kubectl go to [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)

## Clone the repository

```bash
git clone https://github.com/CLIuno/CLIuno-Express-template.git
```

then run the following command

```bash
pnpm install
```

## Usage

to run the project run the following command

```bash
pnpm dev
```

- open `http://localhost:3000` in your browser

## Notes

### Styles

Tailwindcss import managed by windicss.
and you can add custom styles in :

```bash
/path/to/assets/sass/app.scss
```

### Theme (Dark Mode)

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
import { AppSetup } from '~/utils/app'
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

### Precommit and Postmerge

This project using husky and commitlint for precommit and postmerge.
when you commit, it will check your commit message and running "pnpm lint-staged" to check your staged files.
configuration in : `/path/to/.husky/pre-commit` and `/path/to/commitlint.config.js`

And when Postmerge, it will run "pnpm" to automatically install new dependencies.
configuration in `/path/to/.husky/post-merge`

## list of endpoints

### Auth

| Status | Endpoint Description    | Method | Path                             |
| ------ | ----------------------- | ------ | -------------------------------- |
| [x]    | Login                   | POST   | `/api/v1/auth/login`             |
| [ ]    | Register                | POST   | `/api/v1/auth/register`          |
| [ ]    | Logout                  | POST   | `/api/v1/auth/logout`            |
| [x]    | Reset Password          | POST   | `/api/v1/auth/reset-password`    |
| [x]    | Forgot Password         | POST   | `/api/v1/auth/forgot-password`   |
| [x]    | Change Password         | POST   | `/api/v1/auth/change-password`   |
| [x]    | Send Verification Email | POST   | `/api/v1/auth/send-verify-email` |
| [x]    | Verify Email            | POST   | `/api/v1/auth/verify-email`      |
| [ ]    | Check Token             | POST   | `/api/v1/auth/check-token`       |
| [ ]    | Refresh Token           | POST   | `/api/v1/auth/refresh-token`     |
| [x]    | Verify OTP              | POST   | `/api/v1/auth/otp/verify`        |
| [x]    | Disable OTP             | POST   | `/api/v1/auth/otp/disable`       |
| [x]    | Validate OTP            | POST   | `/api/v1/auth/otp/validate`      |
| [x]    | Generate OTP            | POST   | `/api/v1/auth/otp/generate`      |

### Users

| Status | Endpoint Description    | Method | Path                                 |
| ------ | ----------------------- | ------ | ------------------------------------ |
| [ ]    | Get all current user    | GET    | `/api/v1/users/current`              |
| [ ]    | Get user by username    | GET    | `/api/v1/users/username/:username`   |
| [ ]    | Get all users           | GET    | `/api/v1/users`                      |
| [ ]    | Get a user by ID        | GET    | `/api/v1/users/:id`                  |
| [ ]    | Update user by ID       | PATCH  | `/api/v1/users/:id`                  |
| [ ]    | Delete user by ID       | DELETE | `/api/v1/users/:id`                  |
| [ ]    | Get permissions by user | GET    | `/api/v1/users/:user_id/permissions` |
| [ ]    | Get posts by user       | GET    | `/api/v1/users/:user_id/posts`       |
| [ ]    | Get roles by user       | GET    | `/api/v1/users/:user_id/roles`       |
| [ ]    | Get comments by user    | GET    | `/api/v1/users/:user_id/comments`    |

### Roles

| Status | Endpoint Description    | Method | Path                                 |
| ------ | ----------------------- | ------ | ------------------------------------ |
| [ ]    | Get all roles           | GET    | `/api/v1/roles`                      |
| [ ]    | Get role by ID          | GET    | `/api/v1/roles/:id`                  |
| [ ]    | Create a role           | POST   | `/api/v1/roles`                      |
| [ ]    | Update role by ID       | PATCH  | `/api/v1/roles/:id`                  |
| [ ]    | Delete role by ID       | DELETE | `/api/v1/roles/:id`                  |
| [ ]    | Get permissions by role | GET    | `/api/v1/roles/:role_id/permissions` |
| [ ]    | Get users by role       | GET    | `/api/v1/roles/:role_id/users`       |

### Posts

| Status | Endpoint Description       | Method | Path                              |
| ------ | -------------------------- | ------ | --------------------------------- |
| [ ]    | Get all current user posts | GET    | `/api/v1/posts/current-user`      |
| [ ]    | Get all posts              | GET    | `/api/v1/posts`                   |
| [ ]    | Get post by ID             | GET    | `/api/v1/posts/:id`               |
| [ ]    | Create a post              | POST   | `/api/v1/posts`                   |
| [ ]    | Update post by ID          | PATCH  | `/api/v1/posts/:id`               |
| [ ]    | Delete post by ID          | DELETE | `/api/v1/posts/:id`               |
| [ ]    | Get users by post          | GET    | `/api/v1/posts/:post_id/user`     |
| [ ]    | Get comments by post       | GET    | `/api/v1/posts/:post_id/comments` |
