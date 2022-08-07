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

        <v-container
            id="main"
            class="pb-md-12"
        >
            <v-sheet
                class="mx-auto"
                max-width="1240"
            >
                <h2
                    class="text-h2 my-5"
                >
                    On va où ?
                </h2>
            </v-sheet>
            <div
                class="d-md-flex flex-md-column justify-center align-center"
            >
                <div
                    v-if="!$device.isMobileOrTablet"
                    class="d-md-block"
                    style="height: 1rem; width: 1rem"
                ></div>
                <TripForm
                    class="mb-md-0"
                />
            </div>
        </v-container>


        <v-container
            class="mb-5 pt-0"
            id="advantages"
        >
            <v-img
                class="d-md-none"
                aspect-ratio="1"
                contain
                max-width="500"
                src="/car-rental.svg"
            ></v-img>
            <v-row
                v-for="advantage in advantages"
                :key="advantage.title"
                :class="advantage.colour"
                class="d-flex align-start mb-2"
            >
                <v-col
                    cols="2"
                >
                    <v-icon :class="advantage.colour" size="35">{{ advantage.icon }}</v-icon>
                </v-col>
                <v-col
                    class="px-0"
                    cols="9"
                >
                    <h6 class="text-h6 font-weight-bold">
                        {{ advantage.title }}
                    </h6>
                    <p
                        class="mb-0"
                    >
                        {{ advantage.content }}
                    </p>
                </v-col>
            </v-row>

            <NuxtLink
                v-if="$device.isMobileOrTablet"
                class="mt-2 text-decoration-none text--secondary"
                to="/about"
            >
                <v-icon>mdi-information</v-icon>
                En savoir plus
            </NuxtLink>
        </v-container>


        <v-card
            id="presentation"
            flat
            rounded="20"
        >
            <v-card-title
                class="text-h5"
            >
                UniCovoit, c'est quoi ?
            </v-card-title>
            <v-card-text
                class="text-body-1"
            >
                <p>
                    UniCovoit est une plateforme de covoiturage pour les étudiants.
                </p>
                <p>
                    L'objectif est d'encourager le covoiturage entre étudiants, sans prendre de commission sur le prix
                    du trajet.
                </p>
            </v-card-text>
        </v-card>

        <FAQ class="mt-5"/>

        <v-container
            class="text--secondary text-caption ma-0 pa-0 mt-10"
        >
            <div>
                <v-icon
                    size="18"
                >mdi-image-outline
                </v-icon>
                Illustration de la collection
                <a class="text--secondary" href="https://icons8.com/illustrations" rel="noreferrer noopener"
                   target="_blank">
                    Ouch!
                </a>
            </div>
            <div>
                <v-icon
                    size="18"
                >mdi-image-outline
                </v-icon>
                Logo par
                <a class="text--secondary" href="https://www.instagram.com/feun_art/" rel="noreferrer noopener"
                   target="_blank">
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
        advantages: [{
            colour: 'yellow--text text--darken-3',
            icon: 'mdi-piggy-bank',
            title: 'Petits Prix',
            content: `UniCovoit contribue à maintenir des prix bas en ne prenant aucune commission sur les trajets.`
        }, {
            colour: 'primary--text',
            icon: 'mdi-lock',
            title: 'Sécurité',
            content: `Profitez de trajets exclusivement entre étudiants.`
        }, {
            colour: 'light-green--text text--darken-2',
            icon: 'mdi-account-multiple-check',
            title: 'Transparence',
            content: `UniCovoit est conçu pour des étudiants, par des étudiants. Le code de l'application est entièrement ouvert.`
        }]
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

<style lang="sass" scoped>
@media screen and (min-width: 767px)
    .container#main
        width: 100vw
        max-width: 100vw
        position: relative
        top: -1rem
        left: calc(-50vw + 50%)

/*background-image: url("/landscape.svg")
        background-position: center center
        background-repeat: no-repeat
        background-size: cover*/
</style>
