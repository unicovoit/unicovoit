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
            <v-main
                class="text-h2 mt-n10 font-weight-regular"
                color="primary"
            >
                On va où ?
            </v-main>
            <TripForm></TripForm>
        </v-container>
        <v-img
            aspect-ratio="1"
            contain
            max-width="600"
            src="/car-illustration.svg"
        ></v-img>
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
