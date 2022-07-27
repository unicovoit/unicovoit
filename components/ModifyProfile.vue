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
                depressed
                block
            >
                <v-icon class="mr-2">mdi-account-edit-outline</v-icon>
                profil public
            </v-btn>
        </template>
        <v-card>
            <v-toolbar
                dark
                color="primary"
            >
                <v-btn
                    icon
                    dark
                    @click="dialog = false"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Modifier le profil public</v-toolbar-title>
            </v-toolbar>

            <v-list>
                <v-list-item>
                    <v-text-field
                        v-model="user.name"
                        :rules="rules.name"
                        :counter="20"
                        label="First name"
                        :value="getName"
                        required
                    ></v-text-field>
                </v-list-item>

                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-subtitle>
                            Avatar
                        </v-list-item-subtitle>

                        <v-list-item-group>
                            <v-avatar
                                size="80"
                            >
                                <v-img
                                    :src="user.picture"
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


            <v-container>
                <h5 class="text-h5">
                    Préférences de trajet
                </h5>
                <v-list>
                    <p class="text-subtitle-2">
                        Vous pouvez définir ici si vous préférez voyager avec des fumeurs, animaux, musique ou non.
                        Définissez également si vous voulez accepter automatiquement les réservations.
                    </p>
                    <v-list-item>
                        <v-list-item-action>
                            <v-switch
                                v-model="user.smokePref"
                                color="primary"
                                inset
                            ></v-switch>
                        </v-list-item-action>
                        <v-list-item-action-text
                            class="text-body-1">
                            <v-icon>mdi-cigar</v-icon>
                            Trajet fumeur
                        </v-list-item-action-text>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-action>
                            <v-switch
                                v-model="user.petsPref"
                                color="primary"
                                inset
                            ></v-switch>
                        </v-list-item-action>
                        <v-list-item-action-text
                            class="text-body-1">
                            <v-icon>mdi-paw</v-icon>
                            Trajet avec animaux
                        </v-list-item-action-text>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-action>
                            <v-switch
                                v-model="user.musicPref"
                                color="primary"
                                inset
                            ></v-switch>
                        </v-list-item-action>
                        <v-list-item-action-text
                            class="text-body-1">
                            <v-icon>mdi-music-note</v-icon>
                            Trajet en musique
                        </v-list-item-action-text>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-action>
                            <v-switch
                                v-model="user.autoBook"
                                color="primary"
                                inset
                            ></v-switch>
                        </v-list-item-action>
                        <v-list-item-action-text
                            class="text-body-1">
                            <v-icon>mdi-flash</v-icon>
                            Acceptation automatique
                        </v-list-item-action-text>
                    </v-list-item>
                </v-list>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: "ModifyProfile",
    props: {
        user: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            dialog: false,
            rules: {
                name: [
                    v => !!v || 'Nom requis',
                    v => v.length <= 20 || 'Nom trop long',
                ]
            }
        }
    },
    computed: {
        getName() {
            let method = this.user.sub.split("|")[0]
            if (method === "auth0") {
                return this.user.nickname
            } else {
                return this.user.name
            }
        },
    },
    methods: {
        onAvatarChange(e) {
            const file = e.target.files[0]
            const reader = new FileReader()
            reader.onload = (e) => {
                this.user.picture = e.target.result
                this.$axios.put("/api/v1/users/picture", {
                    picture: e.target.result
                })
            }
            reader.readAsDataURL(file)
            console.log(file)
        }
    },
}
</script>

<style scoped lang="sass">

</style>
