<template>
    <v-dialog
        v-model="dialog"
        width="500"
        class="rounded-lg"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-list-item
                exact
                v-bind="attrs"
                v-on="on"
            >
                <v-list-item-action>
                    <v-icon>mdi-cog</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Paramètres</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </template>

        <v-card>
            <v-card-title :class="`text-h5 grey ${$vuetify.theme.dark ? 'darken' : 'lighten'}-3`">
                Paramètres
            </v-card-title>

            <v-card-text class="mt-4">
                <v-list-item>
                    <v-list-item-action>
                        <v-switch
                            v-model="$vuetify.theme.dark"
                            color="info"
                            @click="toggleTheme"
                        ></v-switch>
                    </v-list-item-action>
                    <v-list-item-action-text
                        class="text-body-1"
                    >
                        Passer en mode {{ $vuetify.theme.dark ? 'clair' : 'sombre' }}
                    </v-list-item-action-text>
                </v-list-item>
            </v-card-text>

            <v-divider></v-divider>

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
        toggleTheme() {
            try {
                this.$cookies.set('dark', `${this.$vuetify.theme.dark}`, {
                    path: '/',
                    sameSite: 'Strict',
                    httpOnly: false,
                })
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
