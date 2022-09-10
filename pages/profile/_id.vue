<template>
    <v-container
        v-touch="{
            right: () => $router.go(-1),
        }"
    >
        <v-container
            class="pt-0"
        >
            <v-row
                class="d-flex align-center"
            >
                <v-col
                    class="px-0"
                    cols="8"
                >
                    <span
                        class="text-h3"
                    >
                        {{ user.nickname || user.name }}
                    </span>
                </v-col>
                <v-col
                    class="pr-0 d-flex flex-row justify-space-between"
                    cols="3"
                >
                    <v-spacer></v-spacer>
                    <v-avatar
                        size="80"
                    >
                        <v-img
                            :src="user.picture"
                        ></v-img>
                    </v-avatar>
                </v-col>
            </v-row>
        </v-container>

        <v-list>
            <v-list-item class="px-0">
                <v-list-item-content>
                    <v-list-item-subtitle>
                        Université
                    </v-list-item-subtitle>
                    <v-list-item-title>
                        {{ user.university || 'Non précisé' }}
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>

        <v-card
            v-if="user.bio"
            outlined
        >
            <v-card-title>
                Présentation
            </v-card-title>
            <v-card-text>
                {{ user.bio }}
            </v-card-text>
        </v-card>

        <v-list>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-group
                        v-if="user.smokePref"
                        class="text-body-1"
                    >
                        <v-icon left>mdi-smoking</v-icon>
                        La fumée ne me dérange pas
                    </v-list-item-group>
                    <v-list-item-group
                        v-else
                        class="text-body-1"
                    >
                        <v-icon left>mdi-smoking-off</v-icon>
                        Je préfère voyager non fumeur
                    </v-list-item-group>
                </v-list-item-content>
            </v-list-item>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-group
                        v-if="user.petsPref"
                        class="text-body-1"
                    >
                        <v-icon left>mdi-paw</v-icon>
                        Les animaux de compagnie sont les bienvenus !
                    </v-list-item-group>
                    <v-list-item-group
                        v-else
                        class="text-body-1"
                    >
                        <v-icon left>mdi-paw-off</v-icon>
                        Je préfère voyager sans animaux de compagnie
                    </v-list-item-group>
                </v-list-item-content>
            </v-list-item>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-group
                        v-if="user.musicPref"
                        class="text-body-1"
                    >
                        <v-icon left>mdi-music-note</v-icon>
                        Je fais le trajet en musique !
                    </v-list-item-group>
                    <v-list-item-group
                        v-else
                        class="text-body-1"
                    >
                        <v-icon left>mdi-music-note-off</v-icon>
                        Je préfère voyager sans musique
                    </v-list-item-group>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-container>
</template>

<script>
export default {
    name: "profile",
    head() {
        return {
            title: `Profil Public de ${this.user.nickname || this.user.name}`,
        };
    },
    auth: false,
    async validate({ params, store }) {
        // Must be a uuid v4
        return store.dispatch('validateUuidV4', params.id)
    },
    data() {
        return {
            user: {},
        }
    },
    async fetch() {
        try {
            this.user = await this.$axios.$get(`/api/v1/users/profile/${this.$route.params.id}`)
        } catch (e) {
            console.error(e)
        }
    },
    activated() {
        if (!this.$fetchState.pending)
            this.$fetch()
    },
}
</script>

<style scoped>

</style>
