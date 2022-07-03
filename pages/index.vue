<template>
    <div>
        <v-snackbar
            v-model="snackbar"
            elevation="20"
            timeout="-1"
        >
            UniCovoit est encore en développement.
            Faites remonter les bugs sur <a class="grey--text lighten-1" href="https://github.com/finxol/iucovoit" target="_blank" rel="noreferrer noopener">github</a>.
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
                class="text-h2 mb-10"
            >
                On va où ?
            </h2>
            <TripForm></TripForm>
        </v-container>
        <v-img
            aspect-ratio="1"
            contain
            max-width="600"
            src="/car-rental.svg"
        ></v-img>
        <v-container
            class="text--secondary text-body-2 ma-0 pa-0"
        >
            <v-icon>mdi-image-outline</v-icon>
            Illustrations par
            <a class="text--secondary" target="_blank" rel="noreferrer noopener"
               href="https://icons8.com/illustrations/author/TQQ1qAnr9rn5">
                Oleg Shcherba</a>
            de
            <a class="text--secondary" target="_blank" rel="noreferrer noopener"
               href="https://icons8.com/illustrations">
                Ouch!</a>
        </v-container>
    </div>
</template>

<script>
import TripForm from "../components/TripForm";

export default {
    name: 'Accueil',
    components: {TripForm},
    auth: false,
    data: () => ({
        snackbar: false,
    }),
    computed: {
        isLoggedIn() {
            return this.$store.state.auth.loggedIn
        },
        getProfilePicture() {
            try {
                return this.$store.state.auth.user.picture
            } catch (e) {
                return "/account_circle.svg"
            }
        },
        getProfileName() {
            try {
                return this.$store.state.auth.user.nickname
            } catch (e) {
                return "Utilisateur"
            }
        }
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
