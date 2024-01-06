// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      salesRole: process.env.DIRECTUS_SALES_ROLE,
      partnerRole: process.env.DIRECTUS_PARTNER_ROLE,
    },
  },
  modules: ['@nuxt/ui', 'nuxt-directus', '@nuxtjs/google-fonts', '@pinia/nuxt'],
  build: {
    transpile: ['@vuepic/vue-datepicker'],
  },
  directus: {
    url: process.env.NUXT_DIRECTUS_URL,
    // token: process.env.NUXT_DIRECTUS_STATIC_TOKEN,
    // autoFetch: true,
  },
  pinia: {
    autoImports: ['defineStore', 'acceptHMRUpdate'],
  },
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
