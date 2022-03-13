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
            <div
                class="text-h2"
                style="margin-bottom:2rem"
                color="primary"
            >
                On va où ?
            </div>
            <TripForm></TripForm>
        </v-container>
        <v-img
            src="/car-illustration.svg"
            max-height="300"
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
    components: {IUCovoitLogo, TripForm}
}
</script>
