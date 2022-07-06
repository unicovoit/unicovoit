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

            <v-card-text class="mt-4 px-0">
                <v-list-item>
                    <v-list-item-action>
                        <v-switch
                            v-model="$vuetify.theme.dark"
                            color="info"
                            @click="toggleTheme"
                            inset
                        ></v-switch>
                    </v-list-item-action>
                    <v-list-item-action-text
                        class="text-body-1"
                    >
                        Passer en mode {{ $vuetify.theme.dark ? 'clair' : 'sombre' }}
                    </v-list-item-action-text>
                </v-list-item>
                <v-list-item
                    v-if="$store.state.auth.loggedIn"
                >
                    <v-list-item-action>
                        <v-btn
                            icon
                            @click="logout"
                        >
                            <v-icon>mdi-logout</v-icon>
                        </v-btn>
                    </v-list-item-action>
                    <v-list-item-action-text
                        class="text-body-1"
                    >
                        Déconnexion
                    </v-list-item-action-text>
                </v-list-item>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    text
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
