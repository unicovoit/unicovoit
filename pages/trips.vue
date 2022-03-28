<template>
    <v-container
        v-if="isEmpty()"
    >
        <v-card
            v-for='(trip, index) in trips'
            :key='index'
            elevation="4"
        >
            <v-card-title>
                {{ trip.from }}
                <v-icon color="text--primary">mdi-arrow-right-bold</v-icon>
                {{ trip.to }}
            </v-card-title>
            <v-card-subtitle>
                {{ trip.price }} €
            </v-card-subtitle>
        </v-card>
    </v-container>
    <v-container v-else>
        <v-card
            elevation="4"
        >
            <v-card-title>
                Aucun trajet disponible
            </v-card-title>
        </v-card>
    </v-container>
</template>

<script>
export default {
    name: 'Trips',
    data() {
        return {
            trips: [],
        }
    },
    created() {
        /*this.getTrips();*/
    },
    methods: {
        /*getTrips() {
            axios.get('/api/trips')
                .then(response => {
                    this.trips = response.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },*/
        isEmpty() {
            return this.trips.length > 0;
        }
    }
}
</script>
