<template>
    <v-dialog
        v-model="dialog"
        width="500"
        class="rounded-lg"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                icon
                v-bind="attrs"
                v-on="on"
            >
                <v-icon>mdi-cog</v-icon>
            </v-btn>
        </template>

        <v-card>
            <v-card-title class="text-h5">
                Paramètres
            </v-card-title>

            <v-card-text class="mt-4 px-7">
                <v-row
                    align="center"
                >
                    <v-col
                        class="d-flex justify-center pa-0"
                        cols="3"
                    >
                        <v-switch
                            v-model="$vuetify.theme.dark"
                            color="primary"
                            @click="toggleTheme"
                            inset
                        ></v-switch>
                    </v-col>
                    <v-col
                        cols="auto"
                        class="text-body-1"
                    >
                        Passer en mode {{ $vuetify.theme.dark ? 'clair' : 'sombre' }}
                    </v-col>
                </v-row>
                <v-row
                    v-if="$store.state.auth.loggedIn"
                    align="center"
                    @click="logout"
                >
                    <v-col
                        class="d-flex justify-center pa-0"
                        cols="3"
                    >
                        <v-btn
                            icon
                        >
                            <v-icon>mdi-logout</v-icon>
                        </v-btn>
                    </v-col>
                    <v-col
                        cols="auto"
                        class="text-body-1"
                    >
                        Déconnexion
                    </v-col>
                </v-row>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions
                class="mx-2"
            >
                <a
                    class="text--secondary text-body-2 text-decoration-none"
                    :href="`https://github.com/unicovoit/unicovoit/tree/v${$store.state.version}`"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Version {{ $store.getters.displayVersion }}
                </a>
                <v-spacer></v-spacer>
                <v-btn
                    text
                    color="primary"
                    @click="dialog = false"
                >
                    OK
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: "Settings",
    data () {
        return {
            dialog: false,
        };
    },
    methods: {
        logout() {
            this.$auth.logout()
        },
        toggleTheme() {
            try {
                this.$cookies.set('dark', `${this.$vuetify.theme.dark}`, {
                    path: '/',
                    sameSite: 'Strict',
                    httpOnly: false,
                })
                this.$plausible.trackEvent('darkTheme', {
                    props: {
                        variation: this.$vuetify.theme.dark
                    },
                });
            } catch (e) {
                console.error(e)
            }
            return this.$vuetify.theme.dark
        }
    },
}
</script>

<style scoped>

</style>
