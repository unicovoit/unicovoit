<template>
    <v-list
        id="preferences"
    >
        <h5 class="text-h5">
            Préférences de trajet
        </h5>
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
                <v-icon>mdi-smoking</v-icon>
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
        }
    },
    computed: {
        prefs() {
            return {
                smokePref: this.user.smokePref,
                petsPref: this.user.petsPref,
                musicPref: this.user.musicPref,
                autoBook: this.user.autoBook
            }
        },
    },
    watch: {
        prefs: {
            handler(prefs) {
                this.$axios.put("/api/v1/users/preferences", prefs)
            },
            deep: true
        },
    }
}
</script>

<style scoped lang="sass">

</style>
