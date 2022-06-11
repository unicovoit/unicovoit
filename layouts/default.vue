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

        <v-navigation-drawer
            v-model="drawer"
            :clipped="clipped"
            :mini-variant="miniVariant"
            app
            fixed
        >
            <v-list nav>
                <v-btn
                    icon
                    @click.stop="miniVariant = !miniVariant"
                >
                    <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
                </v-btn>
                <v-list-item
                    v-for="item in menu1"
                    :key="item.id"
                    :to="item.to"
                    exact
                    router
                    color="primary"
                >
                    <v-list-item-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title v-text="item.title"/>
                    </v-list-item-content>
                </v-list-item>

                <v-divider fill-height></v-divider>
                <Settings></Settings>

                <v-list-item
                    v-for="item in menu2"
                    v-if="isLoggedIn"
                    :key="item.id"
                    :to="item.to"
                    exact
                    router
                    color="primary"
                >
                    <v-list-item-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title v-text="item.title"/>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar
            :clipped-left="clipped"
            app
            fixed
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
            <NuxtLink to="/">
                <v-img
                    :aspect-ratio="16/9"
                    contain
                    max-height="40"
                    max-width="100"
                    src="/wave.svg"
                ></v-img>
            </NuxtLink>
            <v-toolbar-title v-text="title"/>
            <v-spacer></v-spacer>
            <v-avatar
                v-if="!isLoggedIn"
                size="40"
                style="cursor: pointer"
            >
                <v-icon
                    large
                    @click="goToLogin"
                >mdi-account-circle
                </v-icon>
            </v-avatar>
            <v-avatar
                v-else
                color="brown"
                size="40"
                @click="goToProfile"
            >
                <v-img
                    :alt="getProfileName"
                    :src="getProfilePicture"
                    lazy-src="/account_circle.svg"
                ></v-img>
            </v-avatar>
        </v-app-bar>

        <v-main>
            <v-container>
                <Nuxt/>
            </v-container>
        </v-main>

        <v-footer
            :absolute="!fixed"
            align-items="center"
            app
            justify-content="center"
        >
            <NuxtLink
                class="text--secondary text-decoration-none"
                justify="center"
                to="/about"
            >
                <v-icon>mdi-information</v-icon>
                A Propos d'UniCovoit
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
        </v-footer>
    </v-app>
</template>

<script>
const {version} = require('../package.json')
import Settings from "../components/Settings";

export default {
    name: 'DefaultLayout',
    components: {
        Settings
    },
    data() {
        return {
            clipped: true,
            drawer: !this.$device.isMobile,
            fixed: false,
            desktopWarning: false,
            menu1: [
                {
                    icon: 'mdi-home',
                    title: 'Accueil',
                    to: '/',
                    id: '0'
                }, {
                    icon: 'mdi-car-outline',
                    title: 'Trajets disponibles',
                    to: '/trips',
                    id: '1'
                }
            ],
            menu2: [
                {
                    icon: 'mdi-car-2-plus',
                    title: 'Proposer un trajet',
                    to: '/trips/add',
                    id: '2'
                }, {
                    icon: 'mdi-logout',
                    title: 'Déconnexion',
                    to: '/logout',
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
        getProfilePicture() {
            try {
                return this.$store.state.auth.user.picture
            } catch (e) {
                return "/account_circle.svg"
            }
        },
        getProfileName() {
            try {
                return this.$store.state.auth.user.nickname
            } catch (e) {
                return "Utilisateur"
            }
        }
    },
    beforeCreate() {
        try {
            if (this.$cookies.get('dark', {parseJSON: false}) === 'true' /*|| window.matchMedia("(prefers-color-scheme: dark)").matches*/) {
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
        goToProfile() {
            this.$router.push({path: '/profile'})
        },
        goToLogin() {
            this.$router.push({path: '/login'})
        },
        hideDesktopWarning() {
            this.$cookies.set('desktopWarning', 'hide', {
                maxAge: 60 * 60 * 24 * 7, // 1 week
                sameSite: 'lax',
                path: '/'
            })
            this.desktopWarning = false
        },
    }
}
</script>

<style lang="sass">
.v-avatar
    cursor: pointer
</style>
