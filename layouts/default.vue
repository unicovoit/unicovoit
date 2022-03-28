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
                    v-for="(item, i) in items"
                    :key="i"
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
                <v-list-item
                    exact
                    @click="toggleTheme"
                >
                    <v-list-item-action>
                        <v-icon>mdi-theme-light-dark</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Changer le thème</v-list-item-title>
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
                size="40"
                style="cursor: pointer"
            >
                <v-icon
                    v-if="!isLoggedIn"
                    large
                    @click="goToLogin"
                >mdi-account-circle
                </v-icon>
                <v-img
                    v-else
                    :src="getProfilePicture"
                    lazy-src="/account_circle.svg"
                    :alt="getProfileName"
                    @click="goToProfile"
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
            app
        >
            <NuxtLink
                to="/about"
                class="text--secondary"
            >
                <v-icon>mdi-information</v-icon>
                A Propos d'IUCovoit
            </NuxtLink>
            <v-spacer></v-spacer>
            <span class="text--secondary">v{{ getVersion }}</span>
        </v-footer>
    </v-app>
</template>

<script>
const {version} = require('../package.json')

export default {
    name: 'DefaultLayout',
    data() {
        return {
            clipped: true,
            drawer: false,
            fixed: false,
            items: [
                {
                    icon: 'mdi-home',
                    title: 'Accueil',
                    to: '/'
                },
                {
                    icon: 'mdi-car-outline',
                    title: 'Trajets disponibles',
                    to: '/trips'
                }
            ],
            miniVariant: false,
            title: 'IUCovoit',
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
                return ""
            }
        },
        getProfileName() {
            try {
                return this.$store.state.auth.user.nickname
            } catch (e) {
                return "Account"
            }
        }
    },
    beforeMount() {
        try {
            if (this.$cookies.get('dark', {parseJSON: false}) === 'true') {
                this.$vuetify.theme.dark = true;
            }
        } catch (e) {
            console.error(e);
        }
    },
    methods: {
        toggleTheme() {
            this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
            try {
                this.$cookies.set('dark', `${this.$vuetify.theme.dark}`, {
                    path: '/',
                    sameSite: 'Strict'
                })
            } catch (e) {
                console.error(e);
            }
        },
        goToProfile() {
            this.$router.push("profile")
        },
        goToLogin() {
            this.$router.push("login")
        },
    }
}
</script>
