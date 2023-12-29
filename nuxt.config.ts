// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui', 'nuxt-directus', '@nuxtjs/google-fonts'],
  colorMode: {
    preference: 'light',
  },
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: '~/tailwind.config.js',
  },
  googleFonts: {
    families: {
      Ubuntu: [300, 500, 700],
    },
    // prefetch: false,
    // preconnect: false,
    // preload: false,
    // download: true,
  },
});
