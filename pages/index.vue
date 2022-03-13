<template>
    <div>
        <IUCovoitLogo
            style="
        position:absolute;
        z-index:0;
      "
        />
        <v-sparkline
            :value="value"
            color="rgba(255, 255, 255, .7)"
            height="100"
            padding="24"
            stroke-linecap="round"
            smooth
        >
        </v-sparkline>
        <v-container>
            <v-card-title>
                On va où ?
            </v-card-title>
            <v-form>
                <v-container>
                    <v-row>
                        <v-col>
                            <v-text-field
                                label="Lieu de départ"
                                placeholder="Nom de ville"
                                filled
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-text-field
                                label="Lieu d'arrivée"
                                placeholder="Nom de ville"
                                filled
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
        </v-container>
    </div>
</template>

<script>
import IUCovoitLogo from "../components/IUCovoitLogo";

export default {
    name: 'Accueil',
    components: {IUCovoitLogo}
}
</script>
