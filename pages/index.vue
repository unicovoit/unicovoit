<template>
    <div>
        <v-snackbar
            v-model="snackbar"
            class="mb-14"
            elevation="1"
            timeout="-1"
        >
            UniCovoit est encore en phase de test.
            Faites remonter les bugs !
            <template v-slot:action="{ attrs }">
                <v-btn
                    color="info"
                    text
                    v-bind="attrs"
                    @click="hideSnackbar"
                >
                    OK
                </v-btn>
            </template>
        </v-snackbar>

        <v-container>
            <h2
                class="text-h2 mb-5"
            >
                On va où ?
            </h2>
            <div
                class="d-md-flex flex-md-column"
            >
                <TripForm></TripForm>
                <v-img
                    aspect-ratio="1"
                    contain
                    max-width="600"
                    src="/car-rental.svg"
                ></v-img>
            </div>
        </v-container>


        <v-card
            :color="`primary ${$vuetify.theme.dark ? 'darken-4' : 'lighten-5'}`"
            flat
            rounded="20"
            id="presentation"
        >
            <v-card-title
                class="text-h4 mb-5"
            >
                Qui sommes-nous ?
            </v-card-title>
            <v-card-text
                class="text-body-1"
            >
                <p>
                    UniCovoit est une plateforme de covoiturage pour les étudiants.
                </p>
                <p>
                    L'objectif est d'encourager le covoiturage entre étudiants, sans prendre de commission sur le prix du trajet.
                </p>
                <p>
                    Plus d'informations disponibles sur <NuxtLink alt="About" class="text--secondary" to="/about">cette page</NuxtLink>.
                </p>
            </v-card-text>
        </v-card>

        <FAQ class="mt-5" />

        <v-container
            class="text--secondary text-caption ma-0 pa-0 mt-10"
        >
            <div>
                <v-icon
                    size="18"
                >mdi-image-outline</v-icon>
                Illustration de la collection
                <a class="text--secondary" target="_blank" rel="noreferrer noopener"
                   href="https://icons8.com/illustrations">
                    Ouch!
                </a>
            </div>
            <div>
                <v-icon
                    size="18"
                >mdi-image-outline</v-icon>
                Logo par
                <a class="text--secondary" target="_blank" rel="noreferrer noopener"
                   href="https://www.instagram.com/feun_art/">
                    Enora Couloigner
                </a>
            </div>
        </v-container>
    </div>
</template>

<script>
export default {
    name: 'Accueil',
    auth: false,
    data: () => ({
        snackbar: false,
    }),
    computed: {
        isLoggedIn() {
            return this.$store.state.auth.loggedIn
        },
    },
    mounted() {
        if (!sessionStorage.getItem('snackbar')) {
            this.snackbar = this.$device.isMobile
        } else {
            this.snackbar = false
        }
    },
    methods: {
        hideSnackbar() {
            this.snackbar = false
            sessionStorage.setItem('snackbar', 'false')
        },
    },
}
</script>

<style scoped lang="sass">
/*h2
    background-image: url('/landscape.svg')
    background-size: cover
    background-position: center*/
</style>
