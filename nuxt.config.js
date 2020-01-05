import colors from "vuetify/es5/util/colors";

export default {
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        path: "/aluno/curso/:slug",
        component: resolve(__dirname, 'pages/student/course.vue')
      })

      routes.push({
        path: "*",
        component: resolve(__dirname, 'pages/public/404.vue')
      })

      routes.push({
        path: "", redirect: "/login"
      })
    },
    middleware: 'auth',
  },

  env: {
    baseUrl:
      process.env.VUE_APP_BASE_URL ||
      "https://newschoolbrapi-dev.herokuapp.com/",
    credentials: {
      name: process.env.VUE_APP_CLIENT_CREDENTIAL_NAME || "NEWSCHOOL@FRONT",
      secret:
        process.env.VUE_APP_CLIENT_CREDENTIAL_SECRET || "NEWSCHOOL@FRONTSECRET",
      external: {
        name:
          process.env.VUE_APP_CLIENT_EXTERNAL_CREDENTIAL_NAME ||
          "NEWSCHOOL@EXTERNAL",
        secret:
          process.env.VUE_APP_CLIENT_EXTERNAL_CREDENTIAL_SECRET ||
          "NEWSCHOOL@EXTERNALSECRET"
      }
    },
    GATOKEN: process.env.GA_TOKEN
  },
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: "%s - " + "New School - Um jeito novo de aprender",
    title: "New School - Um jeito novo de aprender",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "title",
        name: "title",
        content: "New School - Um jeito novo de aprender"
      },
      {
        hid: "description",
        name: "description",
        content:
          "Sabe qual é o primeiro passo para transformar a vida de milhares de jovens nas periferias do Brasil? Que tal dar acesso a educação de qualidade numa linguagem que faz sentido para quem realmente precisa? A New School levanta a bandeira de todos aqueles que acreditam na educação como meio para transformar o nosso país num lugar melhor e mais justo. Nosso objetivo é preparar e inserir uma nova geração de protagonistas na sociedade. Educar cidadãos do mundo, jovens e adolescentes capazes de pensar, questionar e se reinventar diante dos obstáculos que enfrentam no dia a dia de suas vidas."
      },
      {
        hid: "keywords",
        name: "keywords",
        content:
          "pública, startup, escola, cursos, cursos online, educação, estudo, periferia, comunidade, edtech, quebrada, ensino"
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Montserrat:400,600,900&display=swap"
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: ["~/css/main.scss", "~/css/animation.scss"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "~/plugins/admin-components.js",
    { src: "~/plugins/ga.js", mode: "client" }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module',
    "@nuxtjs/vuetify",
    "@nuxtjs/router-extras",

    [
      "@nuxtjs/router-extras",
      {
        /* module options */
      }
    ]
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/pwa",
    // Doc: https://github.com/nuxt-community/dotenv-module
    "@nuxtjs/dotenv",
    "@nuxtjs/proxy"
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true
  },
  proxy: {
    "/api": "http://localhost:3001"
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: "#6600cc",
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light: {
          primary: "#6600cc"
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
