<template>
    <div>
        <!--        <IUCovoitLogo
                    style="
                position:absolute;
                z-index:0;
              "
                />-->
        <!--        <v-img
                    src="/wave.svg"
                    style="
                        position:absolute;
                        z-index:0;
                        width:50%
                    "
                ></v-img>-->
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
            src="/car-illustration.svg"
            max-width="600"
            aspect-ratio="1"
            contain
        ></v-img>
    </div>
</template>

<script>
import IUCovoitLogo from "../components/IUCovoitLogo";
import TripForm from "../components/TripForm";

export default {
    name: 'Accueil',
    components: {IUCovoitLogo, TripForm},
    auth: false
}
</script>
