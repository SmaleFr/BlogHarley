import tailwindcss from '@nuxtjs/tailwindcss'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    tailwindcss,
  ],
  css: ['~/assets/css/main.css'],
  dirs: { assets: 'assets' },
  nitro: {
    experimental: {
      openAPI: true,
    },
  },
  runtimeConfig: {
    session: {
      password: process.env.NUXT_SESSION_SECRET || 'dev-secret-key-change-in-production-blog-harley-2024',
    },
  },
})
