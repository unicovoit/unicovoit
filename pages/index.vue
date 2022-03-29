<template>
    <div>
        <v-snackbar
            v-model="snackbar"
            elevation="20"
            timeout="-1"
        >
            IUCovoit est encore en développement.
            Faites remonter les bugs sur <a class="grey--text lighten-1" href="https://github.com/finxol/iucovoit">github</a>.
            <template v-slot:action="{ attrs }">
                <v-btn
                    color="info"
                    text
                    v-bind="attrs"
                    @click="snackbar = false"
                >
                    OK
                </v-btn>
            </template>
        </v-snackbar>
        <v-container>
            <v-main
                class="text-h2"
                color="primary"
                style="margin-top:-3rem"
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
import IUCovoitLogo from "../components/IUCovoitLogo";
import TripForm from "../components/TripForm";

export default {
    name: 'Accueil',
    components: {IUCovoitLogo, TripForm},
    auth: false,
    data: () => ({
        snackbar: true,
    }),
}
</script>
