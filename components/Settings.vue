<template>
    <v-dialog
        v-model="dialog"
        fullscreen
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
                Paramètres
            </v-btn>
        </template>

        <v-card>
            <v-list>
                <v-list-item
                    class="d-flex align-center"
                >
                    <v-btn
                        class="mr-3"
                        icon
                        @click="dialog = false"
                    >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <h4
                        class="text-h4"
                    >
                        Paramètres
                    </h4>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item>
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
                </v-list-item>
                <v-list-item
                    v-if="$store.state.auth.loggedIn"
                    @click="$auth.logout()"
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
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item
                    @click="confirmDeletion = true"
                >
                    <v-col
                        class="d-flex justify-center pa-0"
                        cols="3"
                    >
                        <v-btn
                            color="error"
                            icon
                        >
                            <v-icon>mdi-trash-can-outline</v-icon>
                        </v-btn>
                    </v-col>
                    <v-col
                        class="text-body-1"
                        cols="auto"
                    >
                        Supprimer mon compte
                    </v-col>
                </v-list-item>
                <v-list-item>
                    <v-list-item-subtitle>
                        <a
                            class="text--secondary text-body-2 text-decoration-none"
                            :href="`https://github.com/unicovoit/unicovoit/tree/v${$store.state.version}`"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Version {{ $store.getters.displayVersion }}
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
                        Voulez-vous vraiment supprimer votre compte ?
                    </v-card-title>
                    <v-card-text>
                        Cela supprimera tous vos trajets, réservations, et vos informations personnelles.<br>
                        <span class="font-weight-black text--primary">Cette action est irréversible.</span>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            class="ma-1"
                            color="primary"
                            text
                            @click.prevent="confirmDeletion = false"
                        >
                            Annuler
                        </v-btn>

                        <v-btn
                            class="ma-1"
                            color="error"
                            @click="deleteAccount()"
                        >
                            Supprimer
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
