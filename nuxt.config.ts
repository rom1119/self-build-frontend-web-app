const pkg = require('./package')
require('dotenv').config()

const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

module.exports = {
    mode: 'spa',

    /*
    ** Headers of the page
    */
    head: {
        title: pkg.name,
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: pkg.description}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},

            // {
            //   rel: 'stylesheet',
            //   href:
            //       'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css'
            // }
        ]
    },

    // router: {
    //     middleware: 'auth'
    // },

    /*
    ** Customize the progress-bar color
    */
    loading: {color: '#fff'},

    /*
    ** Global CSS
    */
    css: [
        '~/assets/scss/index.scss'
        // '~/assets/style/app.styl',
    ],

    /*
    ** Plugins to load before mounting the App
    */
    plugins: [

        // '@/plugins/bootstrap',
        '@/plugins/components',
        '~/plugins/axios',
        '~/plugins/context-menu',
        // '@/comparison-components/index',
        // '@/plugins/auth',

        // {src: '@/plugins/alertsContainer', ssr: false},
        // {src: '@/plugins/loadingDialog', ssr: false},
        {src: '@/plugins/modals/textManageModal', ssr: false},
        {src: '@/plugins/modals/backgroundManageModal', ssr: false},
        {src: '@/plugins/modals/borderManageModal', ssr: false},
        {src: '@/plugins/modals/boxModelManageModal', ssr: false},
        // {src: '@/plugins/confirmDialog', ssr: false},
        {src: '@/plugins/axiosFileDownload', ssr: false},
        {src: '@/plugins/VueUploadComponent', ssr: false},
    ],

    /*
    ** Nuxt.js modules
    */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        '@nuxtjs/auth',
        ['@nuxtjs/dotenv', {systemvars: true}],
        'bootstrap-vue/nuxt',
        'nuxt-leaflet'
    ],
    /*
    ** Axios module configuration
    */
    axios: {
        // See https://github.com/nuxt-community/axios-module#options
        prefix: process.env.API_PREFIX,
        host: process.env.API_HOST,
        port: process.env.API_PORT,
        https: process.env.API_HTTPS == 'TRUE',
        debug: process.env.AXIOS_DEBUG == 'TRUE',
    },

    auth: {
        plugins: [ '~/plugins/auth.js' ],
        redirect: {
            login: '/login',
            logout: '/login',
            home: '/',
            callback: '/'
        },
        strategies: {
            local: {
                endpoints: {
                    login: {url: process.env.API_URL_GET_TOKEN, method: 'post', propertyName: 'access_token'},
                    logout: {url: process.env.API_URL_GET_TOKEN, method: 'delete'},
                    // logout: false,
                    user: {url: '/api/oauth/user', method: 'get', propertyName: ''}
                }
            }
        }
    },

    buildModules: [
        // '@nuxtjs/vuetify'
    ],


    /*
    ** Build configuration
    */
    build: {
        // transpile: ['vuetify/lib'],
        // plugins: [new VuetifyLoaderPlugin()],
        // loaders: {
        //   stylus: {
        //     import: ["~assets/style/variables.styl"]
        //   }
        // },

        /*
        ** You can extend webpack config here
        */
        // extend(config, ctx) {
        extend() {

        }
    }
}
