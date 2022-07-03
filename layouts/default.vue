<template>
    <v-app>
        <v-snackbar
            v-model="desktopWarning"
            elevation="20"
            timeout="-1"
        >
            <v-row>
                <v-col>
                    UniCovoit est optimisé pour les appareils mobiles.
                    En utilisant un ordinateur, vous pouvez avoir des problèmes de performances.
                </v-col>
                <v-col cols="2">
                    <v-btn
                        color="info"
                        text
                        @click="hideDesktopWarning"
                    >
                        OK
                    </v-btn>
                </v-col>
            </v-row>
        </v-snackbar>

        <v-app-bar
            absolute
            flat
        >
            <NuxtLink to="/about">
                <v-img
                    contain
                    max-height="40"
                    max-width="150"
                    src="/icon_long.png"
                ></v-img>
            </NuxtLink>
            <v-spacer></v-spacer>
            <a
                :href="'https://github.com/finxol/unicovoit/tree/v' + version"
                class="text--secondary text-decoration-none"
                rel="noreferrer noopener"
                target="_blank"
            >
                v{{ getVersion }}
            </a>
            <v-btn
                icon
                @click="changeTheme"
            >
                <v-icon>mdi-theme-light-dark</v-icon>
            </v-btn>
        </v-app-bar>

        <v-main
            class="mt-15"
        >
            <v-container>
                <Nuxt/>
            </v-container>
        </v-main>

        <v-bottom-navigation
            v-model="activeBtn"
            color="primary"
            :dark="$vuetify.theme.dark"
            app
            grow
            shift
        >
            <v-btn
                v-for="item in menu1"
                :key="item.id"
                :to="item.to"
                exact
                router
            >
                <span>{{ item.title }}</span>

                <v-icon>{{ item.icon }}</v-icon>
            </v-btn>
            <v-btn
                v-if="!isLoggedIn"
                to="/login"
                exact
                router
            >
                <span>Login</span>

                <v-icon>mdi-account-circle</v-icon>
            </v-btn>
            <v-btn
                v-else
                v-for="item in menu2"
                :key="item.id"
                :to="item.to"
                exact
                router
            >
                <span>{{ item.title }}</span>

                <v-icon>{{ item.icon }}</v-icon>
            </v-btn>
        </v-bottom-navigation>
    </v-app>
</template>

<script>
const {version} = require('../package.json')
import Settings from "../components/Settings"

export default {
    name: 'DefaultLayout',
    components: {
        Settings
    },
    data() {
        return {
            clipped: true,
            drawer: !this.$device.isMobile,
            desktopWarning: false,
            activeBtn: undefined,
            menu1: [
                {
                    icon: 'mdi-home',
                    title: 'Accueil',
                    to: '/',
                    id: '0'
                }, {
                    icon: 'mdi-car-outline',
                    title: 'Trajets',
                    to: '/trips',
                    id: '1'
                }
            ],
            menu2: [
                {
                    icon: 'mdi-plus-circle-outline',
                    title: 'Ajouter',
                    to: '/trips/add',
                    id: '2'
                }, {
                    icon: 'mdi-account-circle',
                    title: 'Profile',
                    to: '/profile',
                    id: '3'
                }
            ],
            miniVariant: false,
            title: 'UniCovoit',
            version,
        }
    },
    computed: {
        getVersion() {
            return (version || '') + (this.$config.isProd ? '' : '-dev')
        },
        isLoggedIn() {
            return this.$store.state.auth.loggedIn
        },
        pages() {
            let p = []
            this.menu1.forEach(item => {
                p.push(item.to)
            })
            this.menu2.forEach(item => {
                p.push(item.to)
            })
            return p
        },
    },
    beforeCreate() {
        try {
            if (this.$cookies.get('dark', {parseJSON: false}) === 'true') {
                this.$vuetify.theme.dark = true
            }
        } catch (e) {
            console.error(e)
        }
    },
    mounted() {
        try {
            this.desktopWarning = !this.$device.isMobile && !this.$cookies.get('desktopWarning', {parseJSON: false})
        } catch (e) {
            console.error(e)
        }
    },
    methods: {
        hideDesktopWarning() {
            this.$cookies.set('desktopWarning', 'hide', {
                maxAge: 60 * 60 * 24 * 7, // 1 week
                sameSite: 'lax',
                path: '/'
            })
            this.desktopWarning = false
        },
        changeTheme() {
            this.$vuetify.theme.dark = !this.$vuetify.theme.dark
            this.$cookies.set('dark', this.$vuetify.theme.dark, {
                maxAge: 60 * 60 * 24 * 7, // 1 week
                sameSite: 'lax',
                path: '/'
            })
        }
    }
}
</script>

<style lang="sass">
.v-avatar
    cursor: pointer
</style>
