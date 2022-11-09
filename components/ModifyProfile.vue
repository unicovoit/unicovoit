<template>
    <v-list
        id="preferences"
    >
        <h5 class="text-h5">
            {{ $t('profile.preferences.title') }}
        </h5>
        <p class="text-subtitle-2">
            {{ $t('profile.preferences.description') }}
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
                {{ $t('profile.preferences.smokePref.title') }}
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
                {{ $t('profile.preferences.petsPref.title') }}
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
                {{ $t('profile.preferences.musicPref.title') }}
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
                {{ $t('trip.autoBook') }}
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
