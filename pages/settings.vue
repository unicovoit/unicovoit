<template>
    <v-container>
        <v-main
            class="text-h2 mt-n10"
            color="primary"
        >
            Paramètres
        </v-main>

        <v-card
            outlined
            @click="toggleTheme"
        >
            <v-container>
                <v-icon>mdi-theme-light-dark</v-icon>&nbsp;
                Passer en mode {{ $vuetify.theme.dark ? 'clair' : 'sombre' }}
            </v-container>
        </v-card>
    </v-container>
</template>

<script>
export default {
    name: "settings",
    auth: false,
    methods: {
        toggleTheme() {
            this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
            try {
                this.$cookies.set('dark', `${this.$vuetify.theme.dark}`, {
                    path: '/',
                    sameSite: 'Strict'
                })
            } catch (e) {
                console.error(e);
            }
        }
    }
}
</script>

<style scoped>

</style>
