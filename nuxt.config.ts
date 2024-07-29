// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", '@nuxtjs/color-mode'],
  colorMode: {
    preference: 'light', // Set the default preference to 'dark'
  },

  runtimeConfig: {
    "midtransServerSandbox": process.env.MIDTRANS_SERVER_SANDBOX,
    "midtransClientSandbox": process.env.MIDTRANS_CLIENT_SANDBOX,
    public: {
      "midtransClientSandbox": process.env.MIDTRANS_CLIENT_SANDBOX,
      "midtransClient": process.env.MIDTRANS_CLIENT,
    }
  },

  compatibilityDate: "2024-07-29",
})