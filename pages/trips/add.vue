<template>
<v-container>
    <v-main
        class="text-h2 mt-n10"
        color="primary"
    >
        Proposer un trajet
    </v-main>
    <v-form>
        <v-row>
            <v-text-field
                filled
                label="Départ"
                v-model="trip.from"
                prepend-inner-icon="mdi-map-marker"
            ></v-text-field>
        </v-row>
        <v-row>
            <v-text-field
                filled
                label="Arrivée"
                v-model="trip.to"
                append-icon="mdi-map-marker"
            ></v-text-field>
        </v-row>
    </v-form>
</v-container>
</template>

<script>
export default {
    name: "add",
    data: () => ({
        trip: {
            from: "",
            to: "",
            price: "",
            description: "",
        }
    })
}
</script>

<style scoped>

</style>
