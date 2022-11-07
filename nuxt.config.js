import colors from 'vuetify/lib/util/colors'

const PLAUSIBLE_DOMAIN = 'plausible.finxol.io'
const DESCRIPTION = 'Plateforme de covoiturage entre étudiants'
const TITLE = 'UniCovoit'
const DOMAIN = 'unicovoit.fr'
const URL = `https://${DOMAIN}`
const BANNER = `${URL}/icon.png`

const ADDOK_DOMAIN = "addok.unicovoit.fr"
const LANGUAGE = "fr-FR"

const AUTH0_ID = process.env.AUTH0_CLIENTID || 'no id'
const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN || 'example.org'

const isProd = process.env.NODE_ENV === 'production'

export default {
    telemetry: false,
    // Enable scripts-side rendering: https://go.nuxtjs.dev/ssr-mode
    ssr: true,

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        titleTemplate: `%s | ${TITLE}`,
        htmlAttrs: {
            lang: LANGUAGE
        },
        contentLanguage: LANGUAGE,
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: 'Plateforme de covoiturage entre étudiants'},
            {name: 'format-detection', content: 'telephone=no'},
            {
                name: 'keywords',
                content: 'covoiturage,blablacar,étudiant,dut informatique,dut,iutvannes,iut de vannes,iut vannes'
            },
            {name: 'author', content: 'finxol <contact@finxol.io>'},
            {name: 'language', content: 'French'},
            {name: 'robots', content: 'index,follow'},
            {name: 'category', content: 'internet'},
            {hid: 'title', name: 'title', content: TITLE},

            // Facebook
            {property: 'og:type', content: 'website'},
            {property: 'og:url', content: URL + '/'},
            {hid: 'og:title', property: 'og:title', content: TITLE},
            {hid: 'og:description', property: 'og:description', content: DESCRIPTION},
            {property: 'og:image', content: BANNER},

            // Twitter
            {property: 'twitter:card', content: 'summary_large_image'},
            {property: 'twitter:url', content: URL + '/'},
            {hid: 'twitter:title', property: 'twitter:title', content: TITLE},
            {hid: 'twitter:description', property: 'twitter:description', content: DESCRIPTION},
            {property: 'twitter:image', content: BANNER}
        ],
        link: [
            {rel: 'icon', type: 'image/png', href: '/icon.png'}
        ]
    },

    loading: {color: "#4A6DD9"},

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        '@mdi/font/css/materialdesignicons.min.css',
        './assets/vuetify.css'
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Server Middleware
    router: {
        middleware: ['auth']
    },

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/typescript
        '@nuxt/typescript-build',
        // https://go.nuxtjs.dev/vuetify
        ['@nuxtjs/vuetify', {iconfont: 'mdi'}],
        // https://go.nuxtjs.dev/pwa
        '@nuxtjs/pwa',
        // https://github.com/moritzsternemann/vue-plausible
        'vue-plausible'
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://axios.nuxtjs.org/
        '@nuxtjs/axios',
        // https://www.npmjs.com/package/@nuxtjs/auth-next
        '@nuxtjs/auth-next',
        // https://www.npmjs.com/package/@nuxtjs/device
        '@nuxtjs/device',
        // https://www.npmjs.com/package/cookie-universal-nuxt
        'cookie-universal-nuxt',
        [
            '@dansmaculotte/nuxt-security',
            {
                hsts: {
                    maxAge: 15552000,
                    includeSubDomains: true,
                    preload: true
                },
                referrer: 'same-origin',
                additionalHeaders: true
            }
        ],
        // https://www.npmjs.com/package/@nuxt/content
        "@nuxt/content",
        // https://i18n.nuxtjs.org/
        '@nuxtjs/i18n'
    ],

    auth: {
        strategies: {
            auth0: {
                domain: AUTH0_DOMAIN,
                clientId: AUTH0_ID,
                audience: 'https://' + AUTH0_DOMAIN + '/api/v2/'
            }
        }
    },

    axios: {
        https: isProd,
        proxy: true
    },

    i18n: {
        locales: [
            {
                code: 'fr',
                iso: 'fr-FR',
                name: 'Français',
                file: 'fr-FR.ts'
            }, {
                code: 'en',
                iso: 'en-GB',
                name: 'English (GB)',
                file: 'en-GB.ts'
            }
        ],
        defaultLocale: 'fr',
        lazy: true,
        langDir: '~/locales/',
        defaultDirection: 'ltr',
        vueI18n: {
            fallbackLocale: 'fr'
        },
        detectBrowserLanguage: false /*{
            alwaysRedirect: false,
            fallbackLocale: 'fr',
            redirectOn: 'root',
            useCookie: true,
            cookieAge: 365,
            cookieCrossOrigin: false,
            cookieKey: 'i18n_redirected',
            cookieSecure: true
        }*/,
        seo: true,
        strategy: 'prefix_and_default'
    },

    render: {
        csp: {
            hashAlgorithm: 'sha256',
            policies: {
                'default-src': ["'self'"],
                'style-src': ["'self'", "'unsafe-inline'"],
                'font-src': ["'self'"],
                'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
                'img-src': ["'self'"],
                'connect-src': ["'self'", "bano.addok.xyz", "send.pageclip.co", ADDOK_DOMAIN, PLAUSIBLE_DOMAIN, AUTH0_DOMAIN]
            }
        }
    },

    pwa: {
        meta: {
            title: TITLE,
            author: 'finxol',
            description: DESCRIPTION,
            lang: 'fr',
            ogSiteName: TITLE,
            ogTitle: TITLE,
            ogDescription: DESCRIPTION,
            theme_color: '#ffffff'
        },
        manifest: {
            name: TITLE,
            short_name: TITLE,
            description: DESCRIPTION,
            lang: 'fr',
            display: 'standalone'
        },
        workbox: {
            cleanupOutdatedCaches: true
        }
    },

    plausible: { // Use as fallback if no runtime config is available at runtime
        domain: DOMAIN,
        enableAutoPageviews: true,
        enableAutoOutboundTracking: true
    },

    // Define runtime config
    publicRuntimeConfig: {
        plausible: {
            domain: DOMAIN,
            apiHost: 'https://' + PLAUSIBLE_DOMAIN,
            enableAutoPageviews: true,
            enableAutoOutboundTracking: true
        },
        pageclipUrl: process.env.PAGECLIP_URL || '',
        pageclipKey: process.env.PAGECLIP_KEY || '',
        isProd,
        ADDOK_DOMAIN,
        AUTH0_DOMAIN,
        LANGUAGE
    },

    // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
    vuetify: {
        customVariables: ['~assets/variables.sass'],
        defaultAssets: false,
        treeShake: true,
        theme: {
            disable: true
            /*dark: false,
            lang: {
                current: 'fr'
            },
            themes: {
                dark: {
                    primary: "#4A6DD9",
                    accent: colors.grey.darken3,
                    secondary: colors.grey.darken3,
                    info: "#03A9F4",
                    warning: colors.amber.accent3,
                    error: colors.red.darken3,
                    success: colors.green.darken2
                },
                light: {
                    primary: "#4A6DD9",
                    accent: colors.grey.base,
                    secondary: colors.grey.lighten4,
                    info: "#03A9F4",
                    warning: colors.amber.accent3,
                    error: colors.red.base,
                    success: colors.green.base
                }
            }*/
        }
    },

    serverMiddleware: {
        '/api': '~/api'
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        extractCSS: true
    }
}
