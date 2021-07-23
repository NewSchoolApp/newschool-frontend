import colors from 'vuetify/es5/util/colors';

export default {
  router: {
    // uncomment for cordova release on android/ios
    mode: 'hash',
    middleware: 'auth.guard',

    extendRoutes(routes, resolve) {
      routes.push({
        path: '*',
        component: resolve(__dirname, 'pages/public/404.vue'),
      });

      routes.push({
        path: '/aluno',
        component: resolve(__dirname, 'pages/student/~student.module.vue'),
        children: [
          {
            path: '404',
            component: resolve(__dirname, 'pages/public/404.vue'),
          },
          {
            path: 'home',
            name: 'aluno-home',
            component: resolve(__dirname, 'pages/student/home.vue'),
          },
          {
            path: '/cadastro/:inviteKey',
            name: 'cadastro',
            component: resolve(__dirname, 'pages/public/signup.vue'),
          },
          {
            path: 'perfil',
            name: 'meu-perfil',
            component: resolve(__dirname, 'pages/student/profile.vue'),
          },
          {
            path: 'certificados',
            name: 'meus-certificados',
            component: resolve(__dirname, 'pages/student/certificates.vue'),
          },
          {
            path: 'lista-de-cursos/:trilha',
            name: 'lista-cursos',
            props: true,
            component: resolve(__dirname, 'pages/student/courseList.vue'),
          },
          {
            path: 'alterar-dados',
            name: 'alterar-dados',
            component: resolve(
              __dirname,
              'pages/student/change_personal_info.vue',
            ),
          },

          {
            path: 'meus-cursos',
            name: 'meus-cursos',
            component: resolve(__dirname, 'pages/student/my_courses.vue'),
          },
          {
            path: 'curso',
            component: resolve(
              __dirname,
              'pages/student/take_course/~take_course.module.vue',
            ),
            children: [
              {
                path: ':slug',
                name: 'aluno-curso',
                props: true,
                component: resolve(
                  __dirname,
                  'pages/student/take_course/course.vue',
                ),
              },
            ],
          },
          {
            path: 'curso/aulas/:id',
            component: resolve(
              __dirname,
              'pages/student/take_course/lesson_list.vue',
            ),
            props: true,
          },
          {
            path: '',
            redirect: 'home',
          },
        ],
      });

      routes.push({
        path: '/admin',
        component: resolve(__dirname, 'pages/student/~student.module.vue'),
        children: [
          {
            path: '404',
            component: resolve(__dirname, 'pages/public/404.vue'),
          },
          {
            path: 'home',
            name: 'admin-home',
            component: resolve(__dirname, 'pages/admin/home.vue'),
          },
          {
            path: 'dashboard',
            name: 'admin-dashboard',
            component: resolve(__dirname, 'pages/admin/dashboard.vue'),
          },
          {
            path: 'perfil',
            name: 'meu-perfil',
            component: resolve(__dirname, 'pages/admin/profile.vue'),
          },
          {
            path: 'curso',
            component: resolve(
              __dirname,
              'pages/student/take_course/~take_course.module.vue',
            ),
            children: [
              {
                path: ':slug',
                name: 'aluno-curso',
                props: true,
                component: resolve(
                  __dirname,
                  'pages/student/take_course/course.vue',
                ),
              },
            ],
          },
          {
            path: 'admin/aulas/:id',
            component: resolve(
              __dirname,
              'pages/student/take_course/lesson_list.vue',
            ),
            props: true,
          },
          {
            path: '',
            redirect: 'home',
          },
        ],
      });

      routes.push(
        {
          path: '',
          redirect: '/login',
        },
        {
          path: '/recuperar-senha/:token',
          component: resolve(__dirname, 'pages/public/reset_password.vue'),
        },
        {
          path: '*',
          component: resolve(__dirname, 'pages/public/404.vue'),
        },
      );
    },
  },

  env: {
    domain:
      process.env.DOMAIN_URL ||
      'http://newschool.us-east-2.elasticbeanstalk.com',
    baseUrl:
      process.env.VUE_APP_BASE_URL ||
      // 'https://9ddlz0bte4.execute-api.us-east-2.amazonaws.com/dev',
      'https://9ddlz0bte4.execute-api.us-east-2.amazonaws.com/prod',
    // 'https://q4cw73dgy1.execute-api.us-east-2.amazonaws.com/dev',
    marketUrl: 'https://q4cw73dgy1.execute-api.us-east-2.amazonaws.com/prod',
    credentials: {
      name: process.env.VUE_APP_CLIENT_CREDENTIAL_NAME || 'NEWSCHOOL@FRONT',
      secret:
        process.env.VUE_APP_CLIENT_CREDENTIAL_SECRET || 'NEWSCHOOL@FRONTSECRET',
      external: {
        name:
          process.env.VUE_APP_CLIENT_EXTERNAL_CREDENTIAL_NAME ||
          'NEWSCHOOL@EXTERNAL',
        secret:
          process.env.VUE_APP_CLIENT_EXTERNAL_CREDENTIAL_SECRET ||
          'NEWSCHOOL@EXTERNALSECRET',
      },
    },
    dateEnd: process.env.OPENING_DATE || '25/01/2020',
    endpoints: {
      // app data
      TOTAL_USERS: '/api/v1/user',

      // user role
      LOGIN: 'oauth/token',
      SIGN_UP: 'api/v1/user/student',
      FORGOT_PASSWORD: 'api/v1/user/forgot-password',
      USER_ME: 'api/v1/user/me',

      // personal data
      SCHOOL: 'api/v1/school',
      CITY: 'api/v1/city',
      STATE: 'api/v1/state',

      // social
      COMMENT: '/api/v1/comment',
      NOTIFICATIONS: 'api/v1/notification',
      FACEBOOK_LOGIN: 'oauth/facebook/token',
      GOOGLE_LOGIN: 'oauth/google/token',

      // gamification
      RANKING: '/api/v1/gamefication/ranking',
      EVENT: '/api/v1/gamefication/start-event',

      // course
      COURSE: '/api/v2/course',
      COURSE_BY_SLUG: '/api/v2/course/slug/',
      TRAILS: '/api/v2/trail',
      PILARS: '/api/v2/pilar',
      HIGHLIGHTS: '/api/v2/highlight',

      // course taken
      MY_COURSES: 'api/v2/course-taken/user/',
      INIT_COURSE: 'api/v2/course-taken/start-course',
      ADVANCE_COURSE: '/api/v2/course-taken/advance-on-course',
      STATE_COURSE: 'api/v2/course-taken',
      CURRENT_STEP: '/api/v2/course-taken/current-step',
      CERTIFICATES_ME: 'api/v2/course-taken/certificate/user/',
      CHALLENGE: '/api/v2/course-taken/challenge/',
      NPS: '/api/v2/course-taken/nps/user/',

      // lesson
      LESSON: '/api/v2/lesson',
      LESSONS_BY_COURSE: '/api/v2/lesson/course/',

      // part
      PARTS_BY_LESSON: '/api/v2/part/lesson',
      PART_BY_ID: '/api/v2/part',

      // test
      TEST: '/api/v2/test/',

      // admin dashboard
      ACTIVE_USERS: '/api/v1/dashboard/user/quantity',
      COURSE_VIEWS: '/api/v1/dashboard/course/views',
      NS_CERTIFICATED_QUANTITY: '/api/v1/dashboard/course-taken/user/quantity',
      CERTIFICATE_QUANTITY: '/api/v1/dashboard/certificate/quantity',

      MARKETPLACE: {
        ITENS: '/api/v1/item',
        ORDER: '/api/v1/order',
      },
      CMS: {
        CAMPANHAS: '/campanhas/'
      },
    },
    endpointCertificateCourseTaken: {
      CERTIFICATES_COURSE_TAKEN_ME: 'api/v2/course-taken/certificate/user/',
      LOGIN: 'oauth/token',
    },
    GATOKEN: process.env.GA_TOKEN,
    CMS: {
      URL: 'http://ec2-13-59-134-79.us-east-2.compute.amazonaws.com:1337',
      Token: ''
    },
  },
  // uncomment for cordova release on android/ios
  mode: 'spa',
  // mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      lang: 'en',
      style: 'overflow-y: auto',
    },
    titleTemplate:
      '%s | ' + 'New School | Formando os protagonistas da quebrada',
    meta: [
      {
        charset: 'utf-8',
      },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no',
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'New School | Formando os protagonistas da quebrada',
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'website',
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'newschool-frontend',
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content:
          'Levamos educação de qualidade na linguagem da quebrada para as periferias do Brasil, através da tecnologia e da curadoria de conteúdos baseados nas habilidades do futuro.',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content:
          'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/35160991368917.5e303bd02c67f.jpg',
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'http://newschool.us-east-2.elasticbeanstalk.com',
      },
      {
        hid: 'fb:app_id',
        property: 'fb:app_id',
        content: '384298599359690',
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content:
          'pública, startup, escola, cursos, cursos online, educação, estudo, periferia, comunidade, edtech, quebrada, ensino',
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Montserrat:400,600,900&display=swap',
      },
    ],
    script: [
      {
        type: 'text/javascript',
        src: 'cordova.js',
      },
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff',
  },
  /*
   ** Global CSS
   */
  css: ['~/css/main.scss', '~/css/animation.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/notifier.js',
    '~/plugins/pusher.js',
    '~/plugins/cordova.client.js',
    '~/plugins/admin-components.js',
    { src: '~/plugins/infinite-scroll.js', mode: 'client' },
    { src: '~/plugins/ga.js', mode: 'client' },
    { src: '~/plugins/redirect', mode: 'client' },
    { src: '~/plugins/vue-masonry.js', mode: 'client' },
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
    '@nuxtjs/router-extras',

    [
      '@nuxtjs/router-extras',
      {
        /* module options */
      },
    ],
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/proxy',
    'nuxt-i18n',
    '@nuxtjs/auth',
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: 'AIzaSyA501kkBnUIRx2nXQ0mriSBcZGXxQCqtqE',
          authDomain: 'new-school-app-7e24e.firebaseapp.com',
          databaseURL: 'https://new-school-app-7e24e.firebaseio.com',
          projectId: 'new-school-app-7e24e',
          storageBucket: 'new-school-app-7e24e.appspot.com',
          messagingSenderId: '968483442949',
          appId: '1:968483442949:web:ed6ac7d51296f9110ce76c',
          measurementId: 'G-3DQ0ZMJ08S',
        },
        services: {
          auth: true,
          firestore: true,
          functions: true,
          storage: true,
          database: true,
          messaging: true,
          performance: true,
          analytics: true,
          remoteConfig: true, // Just as example. Can be any other service.
        },
        remoteConfig: {
          settings: {
            fetchTimeoutMillis: 100, // default
            minimumFetchIntervalMillis: 15000, // default
          },
          defaultConfig: {
            welcome_message: 'Welcome',
          },
        },
      },
    ],
  ],
  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en-US.js',
      },
      {
        code: 'pt',
        file: 'pt-BR.js',
      },
    ],
    strategy: 'no_prefix',
    defaultLocale: 'pt',
    lazy: true,
    langDir: 'lang/',
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true,
  },
  proxy: {
    '/api': 'http://localhost:3001',
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: '#6600cc',
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
        light: {
          primary: '#6600cc',
          primary_light: '#B380E6',
        },
      },
    },
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    publicPath: '/nuxtfiles/',
    extend(config, ctx) {},
  },

  auth: {
    strategies: {
      facebook: {
        client_id: process.env.FACEBOOK_ID || '384298599359690',
        userinfo_endpoint:
          'https://graph.facebook.com/v2.12/me?fields=about,name,picture{url},email,birthday',
        scope: ['public_profile', 'email'],
      },
      google: {
        client_id:
          process.env.GOOGLE_ID ||
          '603764452531-cbbqg8im5p4hr0et4vqurcs4lbce9jrk.apps.googleusercontent.com',
      },
    },
  },
};
