<template>
    <v-app>
        <v-snackbar
            v-model="desktopWarning"
            elevation="20"
            timeout="-1"
        >
            <v-row>
                <v-col>
                    {{ $t("builtForMobileWarning") }}
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
                <NuxtLink :to="localePath('/')">
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
                        :to="localePath('/about')"
                    >
                        <v-icon>mdi-information</v-icon>
                        {{ $t("appBar.about") }}
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
                        :to="localePath('/login')"
                    >
                        <v-icon>mdi-account-circle</v-icon>
                        {{ $t("appBar.login") }}
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
                <LangSwitcher
                    :languages="languages"
                    :current-language="$i18n.locale"
                />
                <v-tooltip
                    :left="$device.isMobileOrTablet"
                    :right="!$device.isMobileOrTablet"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <NuxtLink
                            class="text-decoration-none"
                            :to="localePath('/trips/add')"
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
                    <span>{{ $t('appBar.publishTrip') }}</span>
                </v-tooltip>
            </v-sheet>
        </v-app-bar>

        <v-main
            class="mt-15"
        >
            <v-sheet
                class="mx-md-auto mt-md-5 transparent"
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
                :to="localePath('/login')"
            >
                <span>{{ $t('appBar.login') }}</span>

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
                    title: this.$t('appBar.home'),
                    to: this.localePath('/'),
                    id: '0'
                }
            ],
            menu2: [
                {
                    icon: 'mdi-car',
                    title: this.$t('appBar.myActivity'),
                    to: this.localePath('/activity'),
                    id: '2'
                }, {
                    icon: 'mdi-account-circle',
                    title: this.$t('appBar.myProfile'),
                    to: this.localePath('/profile'),
                    id: '3'
                }
            ],
            languages: [
                {
                    id: 'en',
                    title: 'English',
                    flagSrc: '/flags/english.jpg'
                },
                {
                    id: 'fr',
                    title: 'Français',
                    flagSrc: '/flags/french.png'
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
