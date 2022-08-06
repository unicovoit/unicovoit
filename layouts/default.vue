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
            clipped-left
            flat
            class="mx-md-auto"
        >
            <v-sheet
                max-width="1280"
                color="transparent"
                width="100%"
                tile
                class="mx-md-auto d-flex align-center"
            >
                <NuxtLink to="/">
                    <v-img
                        alt="UniCovoit"
                        contain
                        max-height="40"
                        max-width="150"
                        src="/icon_long.png"
                    ></v-img>
                </NuxtLink>
                <div
                    v-if="!$device.isMobileOrTablet"
                    class="ml-4"
                >
                    <v-btn
                        v-for="item in menu1"
                        :key="item.id"
                        :to="item.to"
                        color="primary"
                        exact
                        router
                        text
                    >
                        <v-icon>{{ item.icon }}</v-icon>
                        {{ item.title }}
                    </v-btn>
                    <v-btn
                        v-if="!$device.isMobileOrTablet"
                        color="primary"
                        exact
                        router
                        text
                        to="/about"
                    >
                        <v-icon>mdi-information</v-icon>
                        À propos
                    </v-btn>
                </div>
                <v-spacer></v-spacer>
                <div
                    v-if="!$device.isMobileOrTablet"
                    class="mr-4"
                >
                    <v-btn
                        v-if="!isLoggedIn"
                        color="primary"
                        exact
                        router
                        text
                        to="/login"
                    >
                        <v-icon>mdi-account-circle</v-icon>
                        Connexion
                    </v-btn>
                    <v-btn
                        v-for="item in menu2"
                        v-else
                        :key="item.id"
                        :to="item.to"
                        class="mr-1"
                        color="primary"
                        exact
                        router
                        text
                    >
                        <v-icon>{{ item.icon }}</v-icon>
                        {{ item.title }}
                    </v-btn>
                </div>
                <v-tooltip
                    :left="$device.isMobileOrTablet"
                    :right="!$device.isMobileOrTablet"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <NuxtLink
                            class="text-decoration-none"
                            to="/trips/add"
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
            </v-sheet>
        </v-app-bar>

        <v-main
            class="mt-15"
        >
            <v-sheet
                class="mx-md-auto mt-md-5"
                max-width="1080"
            >
                <v-container
                    class="pt-0"
                >
                    <Nuxt
                        :keep-alive-props="{exclude: ['pages/trips/index.vue']}"
                        class="px-md-16"
                        keep-alive
                    />
                </v-container>
            </v-sheet>
        </v-main>

        <v-bottom-navigation
            v-if="$device.isMobileOrTablet"
            v-model="activeBtn"
            :dark="$vuetify.theme.dark"
            app
            color="primary"
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
                exact
                router
                to="/login"
            >
                <span>Connexion</span>

                <v-icon>mdi-account-circle</v-icon>
            </v-btn>
            <v-btn
                v-for="item in menu2"
                v-else
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
                if (!(this.$cookies.get('dark', {parseJSON: false}) === 'false')) {
                    this.$vuetify.theme.dark = true
                    this.$cookies.set('dark', `${this.$vuetify.theme.dark}`, {
                        path: '/',
                        sameSite: 'Strict',
                        httpOnly: false,
                    })
                }
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
