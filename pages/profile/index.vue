<template>
    <v-container>
        <h2
            class="text-h2"
        >
            Profil
        </h2>
        <v-alert
            v-if="!this.$store.state.auth.user.email_verified"
            icon="mdi-alert-circle"
            type="error"
            border="left"
            text
        >
            Cliquez sur le lien reçu pour vérifier votre adresse mail
        </v-alert>

        <v-card
            v-if="!$config.isProd"
            outlined
        >
            <v-container>
                {{ this.$store.state.auth.user }}
            </v-container>
        </v-card>


        <v-tabs
            color="primary accent-4"
            grow
        >
            <v-tab>Profil</v-tab>
            <v-tab>Paramètres</v-tab>
            <v-tab>Compte</v-tab>

            <v-tab-item
                key="0"
            >
                <v-container fluid>
                    <v-list>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-subtitle>
                                    Pseudo
                                </v-list-item-subtitle>
                                <v-list-item-title>
                                    {{ this.$store.state.auth.user.nickname }}
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-subtitle>
                                    Email
                                </v-list-item-subtitle>
                                <v-list-item-title>
                                    {{ this.$store.state.auth.user.email }}
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-subtitle>
                                    Avatar
                                </v-list-item-subtitle>

                                <v-list-item-group class="d-flex justify-space-between">
                                    <v-avatar>
                                        <v-img
                                            :src="this.$store.state.auth.user.picture"
                                        ></v-img>
                                    </v-avatar>
                                    <v-btn
                                        color="primary"
                                        icon
                                        @click="$refs.avatar.click()"
                                    >
                                        <v-icon>mdi-square-edit-outline</v-icon>
                                    </v-btn>
                                </v-list-item-group>
                                <input
                                    hidden
                                    ref="avatar"
                                    type="file"
                                    accept="image/jpeg,image/png,image/jpg"
                                    @change="onAvatarChange"
                                />
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-container>
            </v-tab-item>

            <v-tab-item
                key="1"
            >
                <v-container fluid>
                    <v-list>
                        <v-list-item>
                            <v-list-item-action-text
                                class="text-body-1"
                            >
                                Passer en mode {{ $vuetify.theme.dark ? 'clair' : 'sombre' }}
                            </v-list-item-action-text>
                            <v-spacer></v-spacer>
                            <v-list-item-action>
                                <v-switch
                                    v-model="$vuetify.theme.dark"
                                    color="primary"
                                    @click="changeTheme"
                                ></v-switch>
                            </v-list-item-action>
                        </v-list-item>
                    </v-list>
                </v-container>
            </v-tab-item>

            <v-tab-item
                key="2"
            >
                <v-container fluid>
                    content
                </v-container>
            </v-tab-item>
        </v-tabs>


        <v-container
            outlined
        >
            <v-btn
                plain
                @click="logout"
            >
                <v-icon>mdi-logout</v-icon>
                Déconnexion
            </v-btn>
        </v-container>
    </v-container>
</template>

<script>
export default {
    name: "account",
    methods: {
        logout() {
            this.$auth.logout()
        },
        changeTheme() {
            this.$cookies.set('dark', this.$vuetify.theme.dark, {
                maxAge: 60 * 60 * 24 * 7, // 1 week
                sameSite: 'lax',
                path: '/'
            })
        },
        onAvatarChange(e) {
            const file = e.target.files[0]
            const reader = new FileReader()
            reader.onload = (e) => {
                this.$store.dispatch("updateUser", {
                    picture: e.target.result
                })
            }
            reader.readAsDataURL(file)
            console.log(file)
        }
    }
}
</script>

<style scoped>

</style>
