<template>
    <v-app>
        <v-navigation-drawer
            v-model="drawer"
            :clipped="clipped"
            :mini-variant="miniVariant"
            app
            fixed
        >
            <v-list>
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
                    v-if="isLoggedIn"
                    v-for="item in menu2"
                    :key="item.id"
                    :to="item.to"
                    exact
                    router
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
            <span class="text--secondary">v{{ getVersion }}</span>
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
            drawer: false,
            fixed: false,
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
                this.$vuetify.theme.dark = true;
            }
        } catch (e) {
            console.error(e);
        }
    },
    methods: {
        goToProfile() {
            this.$router.push({path: '/profile'})
        },
        goToLogin() {
            this.$router.push({path: '/login'})
        }
    }
}
</script>

<style lang="sass">
.v-avatar
    cursor: pointer
</style>
