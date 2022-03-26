<template>
    <v-container
        v-if="isEmpty()"
    >
        <v-card
            v-for='(trip, index) in trips'
            :key='index'
        >
            <v-card-title>
                {{ trip.from }}
                <v-icon color="text--primary">mdi-arrow-right-bold-circle-outline</v-icon>
                {{ trip.to }}
            </v-card-title>
            <v-card-subtitle>
                {{ trip.price }} €
            </v-card-subtitle>
        </v-card>
    </v-container>
    <v-container v-else>
        <v-card>
            <v-card-title>
                Aucun trajet disponible
            </v-card-title>
        </v-card>
    </v-container>
</template>

<script>
export default {
    name: 'Trajets',
    data() {
        return {
            trips: [
                {from: "Rennes", to: "Vannes", price: 0}
            ],
        }
    },
    methods: {
        isEmpty() {
            return this.trips.length > 0
        }
    },
}
</script>
