const routerBase =
  process.env.DEPLOY_ENV === 'GH_PAGES'
    ? {
      router: {
        routes: [
          {
            name: 'index',
            path: '/',
            component: 'pages/index.vue'
          },
          {
            name: 'dashboard',
            path: '/dashboard',
            component: 'pages/dashboard.vue'
          },
          {
            name: 'banner',
            path: '/banner',
            component: 'pages/banner.vue'
          }
        ]
      }
    }
    : {}

export default {
  ...routerBase,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "vue-nuxt-calendar",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/styles/main.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "plugins/fontawesome.js" },
    { src: "plugins/owl.js", ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    "bootstrap-vue/nuxt",
    "@nuxt/content",
    // "@nuxtjs/recaptcha",
    // {
    //   recaptcha: {
    //     hideBadge: Boolean, // Hide badge element (v3 & v2 via size=invisible)
    //     language: String, // Recaptcha language (v2)
    //     siteKey: String, // Site key for requests
    //     version: Number, // Version
    //     size: String, // Size: 'compact', 'normal', 'invisible' (v2)
    //   },
    // },
    // "axios"
  ],

  build: {
    babel: {
      compact: true,
    },
  },
};
