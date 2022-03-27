import colors from 'vuetify/es5/util/colors'

const PLAUSIBLE_DOMAIN = 'plausible.finxol.io'
const DESCRIPTION = 'Plateforme de covoiturage entre étudiants'
const TITLE = 'UICovoit'
const META_TITLE = `${TITLE} | IUCovoit`
const DOMAIN = 'covoit.ozna.me'
const URL = 'https://' + DOMAIN
const BANNER = `${URL}/wave.svg`

export default {
    telemetry: false,
    // Enable middleware-side rendering: https://go.nuxtjs.dev/ssr-mode
    ssr: true,

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        titleTemplate: '%s | UICovoit',
        title: 'UICovoit',
        htmlAttrs: {
            lang: 'fr'
        },
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: 'Plateforme de covoiturage pour IUT'},
            {name: 'format-detection', content: 'telephone=no'},
            {
                name: 'keywords',
                content: 'covoiturage,blablacar,étudiant,dut informatique,dut,iutvannes,iut de vannes,iut vannes'
            },
            {name: 'author', content: 'finxol'},
            {name: 'language', content: 'French'},
        ],
        link: [
            {rel: 'icon', type: 'image/svg', href: '/wave.svg'}
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [],

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
        '@nuxtjs/vuetify',
        // https://go.nuxtjs.dev/pwa
        '@nuxtjs/pwa',
        // https://github.com/moritzsternemann/vue-plausible
        'vue-plausible',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
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
        // https://www.npmjs.com/package/@nuxtjs/axios
        '@nuxtjs/axios',
        // https://www.npmjs.com/package/@nuxtjs/auth-next
        '@nuxtjs/auth-next'
    ],

    auth: {
        strategies: {
            auth0: {
                domain: 'iucovoit.eu.auth0.com',
                clientId: process.env.AUTH0_CLIENTID || 'no token here :)',
            },
            discord: {
                clientId: '957274939398975499',
                clientSecret: process.env.DISCORD_SECRET || 'no secrets here :)'
            }
        }
    },

    render: {
        csp: {
            hashAlgorithm: 'sha256',
            policies: {
                'default-src': ["'self'"],
                'style-src': ["'self'", "'unsafe-inline'", 'fonts.googleapis.com', 'cdn.jsdelivr.net'],
                'font-src': ['fonts.googleapis.com', 'fonts.gstatic.com', 'cdn.jsdelivr.net'],
                'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
                'img-src': ["'self'", "s.gravatar.com", "cdn.discordapp.com", "i0.wp.com"],
                'connect-src': ["'self'", PLAUSIBLE_DOMAIN]
            }
        }
    },

    pwa: {
        meta: {
            title: TITLE,
            author: 'kernoeb',
            description: DESCRIPTION,
            lang: 'fr',
            ogSiteName: TITLE,
            ogTitle: TITLE,
            ogDescription: DESCRIPTION
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
    publicRuntimeConfig: {
        plausible: {
            domain: DOMAIN,
            apiHost: 'https://' + PLAUSIBLE_DOMAIN,
            enableAutoPageviews: true,
            enableAutoOutboundTracking: true
        }
    },

    // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
    vuetify: {
        customVariables: ['~/assets/variables.scss'],
        theme: {
            dark: false,
            lang: {
                current: 'fr'
            },
            themes: {
                dark: {
                    primary: "#F2F2F2",
                    accent: colors.grey.darken3,
                    secondary: colors.amber.darken3,
                    info: "#4A6DD9",
                    warning: "#F2B544",
                    error: colors.deepOrange.accent4,
                    success: colors.green.darken2,
                },
                light: {
                    primary: "#0D0D0D",
                    accent: colors.grey.base,
                    secondary: colors.amber.base,
                    info: "#4A6DD9",
                    warning: "#F2B544",
                    error: colors.deepOrange.base,
                    success: colors.green.base
                }
            }
        }
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {}
}
