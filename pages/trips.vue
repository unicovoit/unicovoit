<template>
    <v-container
        v-if="!isEmpty"
    >
        <v-card
            v-for='(trip, index) in trips'
            :key='index'
            outlined
        >
            <v-card-title>
                {{ trip.from }}&nbsp;
                <v-icon color="text--primary">mdi-arrow-right-bold</v-icon>
                &nbsp;{{ trip.to }}
            </v-card-title>
            <v-card-subtitle>
                {{ trip.price }} €
            </v-card-subtitle>
            <v-card-actions>
                <v-avatar
                    size="40"
                >
                    <v-img
                        :src="trip.driver.picture || '/account_circle.svg'"
                        :alt="trip.driver.name"
                        @click="$router.push(`/profile/${trip.driver.id}`)"
                    ></v-img>
                </v-avatar>
                &nbsp;
                {{ trip.driver.name || '' }}
                <v-spacer></v-spacer>
                <v-btn
                    icon
                    @click="trip.show = !trip.show"
                >
                    <v-icon>mdi-chevron-{{ trip.show ? 'up' : 'down' }}</v-icon>
                </v-btn>
            </v-card-actions>

            <v-expand-transition>
                <div
                    v-show="trip.show"
                    class="accent lighten-2"
                >
                    <v-card-text>
                        {{ trip.description }}
                    </v-card-text>
                </div>
            </v-expand-transition>
        </v-card>
    </v-container>

    <!-- Show no trips are available -->
    <v-container v-else>
        <v-card
            outlined
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
        this.getTrips();
    },
    computed: {
        isEmpty() {
            return this.trips.length === 0;
        },
    },
    methods: {
        getTrips() {
            // Get filters from query params
            const filters = {
                from: this.$route.query.from,
                to: this.$route.query.to,
            };

            this.$axios.get('/api/v1/trips', {params: filters})
                .then(response => {
                    this.trips = response.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
    }
}
</script>

<style>
.v-card {
    margin: 0 auto 1.5rem;
}
</style>
