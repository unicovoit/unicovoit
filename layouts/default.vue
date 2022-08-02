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
            :absolute="$device.isMobileOrTablet"
            :fixed="!$device.isMobileOrTablet"
            flat
            clipped-left
        >
            <NuxtLink to="/">
                <v-img
                    contain
                    alt="UniCovoit"
                    max-height="40"
                    max-width="150"
                    src="/icon_long.png"
                ></v-img>
            </NuxtLink>
            <v-spacer></v-spacer>
            <v-tooltip left>
                <template v-slot:activator="{ on, attrs }">
                    <NuxtLink
                        to="/trips/add"
                        class="text-decoration-none"
                    >
                        <v-icon
                            size="30"
                            v-bind="attrs"
                            v-on="on"
                        >
                            mdi-plus-circle-outline
                        </v-icon>
                    </NuxtLink>
                </template>
                <span>Publier un trajet</span>
            </v-tooltip>
        </v-app-bar>

        <v-navigation-drawer
            v-if="!$device.isMobileOrTablet"
            class="mt-16 pt-3"
            clipped
            app
            fixed
        >
            <v-list
                nav
            >
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
                <v-list-item
                    v-if="!isLoggedIn"
                    to="/login"
                    exact
                    router
                    color="primary"
                >
                    <v-list-item-action>
                        <v-icon>mdi-account-circle</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>
                            Connexion
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item
                    v-else
                    v-for="item in menu2"
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

        <v-main
            class="mt-15"
        >
            <v-container>
                <Nuxt
                    keep-alive
                    :keep-alive-props="{exclude: ['pages/trips/index.vue']}"
                    class="px-md-16"
                />
            </v-container>
        </v-main>

        <v-bottom-navigation
            v-model="activeBtn"
            v-if="$device.isMobileOrTablet"
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
                <span>Connexion</span>

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
export default {
    name: 'DefaultLayout',
    data() {
        return {
            desktopWarning: false,
            activeBtn: undefined,
            menu1: [
                {
                    icon: 'mdi-home',
                    title: 'Accueil',
                    to: '/',
                    id: '0'
                }
            ],
            menu2: [
                {
                    icon: 'mdi-car',
                    title: 'Mon activité',
                    to: '/activity',
                    id: '2'
                }, {
                    icon: 'mdi-account-circle',
                    title: 'Mon Compte',
                    to: '/profile',
                    id: '3'
                }
            ],
            title: 'UniCovoit',
        }
    },
    computed: {
        isLoggedIn() {
            return this.$store.state.auth.loggedIn
        },
    },
    async fetch() {
        if (this.isLoggedIn) {
            const payload = {
                token: this.$auth.strategy.token.get()
            }
            await this.$store.commit('user', payload)
        }
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
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                this.$vuetify.theme.dark = true
                this.$cookies.set('dark', `${this.$vuetify.theme.dark}`, {
                    path: '/',
                    sameSite: 'Strict',
                    httpOnly: false,
                })
            }

            this.desktopWarning = !this.$device.isMobile && !this.$cookies.get('desktopWarning', {parseJSON: false})

            // Request permission to show notifications
            if (Notification.permission !== "granted") {
                Notification.requestPermission()
            }
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
    }
}
</script>

<style lang="sass">
*
    word-break: keep-all !important

.v-bottom-navigation .v-btn__content
    display: flex !important

.v-bottom-navigation .v-btn.v-btn--active .v-btn__content .v-icon.v-avatar
    margin-bottom: 5px
</style>
