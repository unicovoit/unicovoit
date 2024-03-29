<template>
    <v-dialog
        v-model="dialog"
        :fullscreen="$vuetify.breakpoint.mobile"
        hide-overlay
        transition="dialog-bottom-transition"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                v-bind="attrs"
                v-on="on"
                class="my-4"
                block
                large
                depressed
            >
                <v-icon class="mr-2">mdi-cog</v-icon>
                {{ $t('settings.title') }}
            </v-btn>
        </template>

        <v-card
            v-touch="{
                down: () => {
                    this.dialog = false
                },
            }"
        >
            <v-toolbar
                elevation="0"
            >
                <v-btn
                    class="mr-3"
                    icon
                    @click="dialog = false"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title
                    class="text-h5"
                >
                    {{ $t('settings.title') }}
                </v-toolbar-title>
            </v-toolbar>
            <v-divider></v-divider>

            <v-container>
                <v-row class="d-flex justify-space-around">
                    <v-col
                        cols="5"
                        :class="{
                            'grey lighten-4': !dark,
                            'grey darken-3': dark,
                        }"
                        @click.prevent="toggleTheme"
                    >
                        <v-switch
                            v-model="$vuetify.theme.dark"
                            ref="themeSwitch"
                            color="primary"
                            inset
                        ></v-switch>
                        <i18n
                            path="settings.changeTheme"
                            tag="span"
                        >
                            {{ $vuetify.theme.dark ? $t('settings.lightTheme') : $t('settings.darkTheme') }}
                        </i18n>
                    </v-col>
                    <v-col
                        cols="5"
                        :class="{
                            'grey lighten-4': !dark,
                            'grey darken-3': dark,
                        }"
                        @click="logout"
                    >
                        <v-btn
                            icon
                        >
                            <v-icon size="30">mdi-logout</v-icon>
                        </v-btn>
                        {{ $t('settings.logout') }}
                    </v-col>
                </v-row>
                <v-row class="d-flex justify-space-around">
                    <v-col
                        cols="5"
                        :class="{
                            'grey lighten-4': !dark,
                            'grey darken-3': dark,
                        }"
                        @click="$router.push(localePath('/legal'))"
                    >
                        <v-btn
                            icon
                        >
                            <v-icon size="30">mdi-scale-balance</v-icon>
                        </v-btn>
                        {{ $t('termsOfUse') }}
                    </v-col>
                    <v-col
                        cols="5"
                        :class="{
                            'grey lighten-4': !dark,
                            'grey darken-3': dark,
                        }"
                        @click="$router.push(localePath('/legal/privacy'))"
                    >
                        <v-btn
                            icon
                        >
                            <v-icon size="30">mdi-scale-balance</v-icon>
                        </v-btn>
                        {{ $t('privacyPolicy') }}
                    </v-col>
                </v-row>
            </v-container>

            <v-divider class="mt-5"></v-divider>

            <v-container>
                <v-row class="d-flex justify-space-around">
                    <v-col
                        id="danger"
                        cols="5"
                        :class="{
                            'grey lighten-4': !dark,
                            'grey darken-3': dark,
                        }"
                        @click="confirmDeletion = true"
                    >
                        <v-btn
                            icon
                            color="error"
                        >
                            <v-icon size="30">mdi-trash-can-outline</v-icon>
                        </v-btn>
                        {{ $t('settings.deleteAccount.short') }}
                    </v-col>
                    <v-col
                        cols="5"
                    >
                    </v-col>
                </v-row>
            </v-container>

            <v-list>
                <v-list-item
                    class="mt-4 text-center"
                >
                    <v-list-item-subtitle>
                        <a
                            class="text--secondary text-body-2 text-decoration-none"
                            :href="`https://github.com/unicovoit/unicovoit/tree/v${$store.state.version}`"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i18n
                                path="settings.version"
                                tag="span"
                            >
                                {{ $store.getters.displayVersion }}
                            </i18n>
                        </a>
                    </v-list-item-subtitle>
                </v-list-item>
            </v-list>

            <!-- Confirm booking suppression -->
            <v-dialog
                v-model="confirmDeletion"
                max-width="500px"
            >
                <v-card>
                    <v-card-title>
                        {{ $t('settings.deleteAccount.title') }}
                    </v-card-title>
                    <v-card-text>
                        {{ $t('settings.deleteAccount.description') }}
                        <br>
                        <span class="font-weight-black text--primary">
                            {{ $t('settings.deleteAccount.warning') }}
                        </span>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            class="ma-1"
                            text
                            color="primary"
                            @click.prevent="confirmDeletion = false"
                        >
                            {{ $t('form.cancel') }}
                        </v-btn>

                        <v-btn
                            class="ma-1"
                            color="error"
                            depressed
                            @click="deleteAccount"
                            :loading="deletionLoading"
                        >
                            {{ $t('form.delete') }}
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: "Settings",
    props: {
        user: {
            type: Object,
            required: true,
        }
    },
    data () {
        return {
            dialog: false,
            confirmDeletion: false,
            deletionLoading: false,
        };
    },
    computed: {
        dark () {
            return this.$vuetify.theme.dark;
        },
    },
    methods: {
        logout() {
            this.$auth.logout()
        },
        toggleTheme(evt) {
            try {
                this.$refs.themeSwitch.$el.click()
                this.$cookies.set('dark', `${this.$vuetify.theme.dark}`, {
                    path: '/',
                    sameSite: 'Strict',
                    httpOnly: false,
                    maxAge: 365 * 24 * 60 * 60,
                })
                this.$plausible.trackEvent('darkTheme', {
                    props: {
                        variation: this.$vuetify.theme.dark
                    },
                });
            } catch (e) {
                console.error(e)
            }
        },
        deleteAccount() {
            console.log('delete account')
            this.deletionLoading = true
            this.$axios.delete('/api/v1/users')
                .then(() => {
                    this.deletionLoading = false
                    this.$auth.logout()
                })
                .catch((e) => {
                    console.error(e)
                    this.deletionLoading = false
                })
        }
    },
}
</script>

<style scoped lang="sass">
.col.col-5
    margin: 1rem 0
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    border-radius: 1rem
    text-align: center
    cursor: pointer
</style>
