<template>
    <div>
        <v-container
            v-if="!isEmpty"
        >
            <v-card
                v-for='trip in trips'
                :key='trip.id'
                class="mb-5"
                outlined
                lazy
            >
                <v-row
                    align="center"
                >
                    <v-col
                    >
                        <v-card-title>
                            {{ trip.from }}
                            <v-icon color="text--primary" class="mx-2">mdi-arrow-right-bold</v-icon>
                            {{ trip.to }}
                        </v-card-title>
                    </v-col>
                    <v-col
                        cols="auto"
                    >
                        <v-btn
                            id="book-trip"
                            color="info"
                            icon
                            @click="$router.push(`/trips/${trip.id}`)"
                        >
                            <v-icon size="35">mdi-car-arrow-right</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
                <v-card-subtitle>
                    {{ trip.price }} €
                </v-card-subtitle>
                <v-card-actions>
                    <v-avatar
                        size="40"
                        class="mr-3"
                    >
                        <v-img
                            :alt="trip.driver.name || 'Utilisateur'"
                            :src="trip.driver.picture || '/account_circle.svg'"
                            @click="$router.push(`/profile/${trip.driver.id}`)"
                        ></v-img>
                    </v-avatar>
                    {{ trip.driver.name || 'Utilisateur' }}
                    <v-spacer></v-spacer>
                    <v-btn
                        v-if="!!trip.description"
                        icon
                        @click="trip.show = !trip.show"
                    >
                        <v-icon>mdi-chevron-{{ trip.show ? 'up' : 'down' }}</v-icon>
                    </v-btn>
                </v-card-actions>

                <v-expand-transition>
                    <div
                        v-show="trip.show"
                        :class="`accent ${$vuetify.theme.dark ? 'darken-1' : 'lighten-3'}`"
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

        <!-- Show an error if received error from server -->
        <v-snackbar
            :timeout="4000"
            :value="error"
            color="error"
            tile
        >
            Une erreur est survenue. Merci de réessayer plus tard.
        </v-snackbar>
    </div>
</template>

<script>
export default {
    name: 'Trips',
    auth: false,
    data() {
        return {
            trips: [],
            error: false,
        }
    },
    beforeMount() {
        this.getTrips();
    },
    computed: {
        isEmpty() {
            return this.trips.length === 0;
        },
    },
    methods: {
        async getTrips() {
            // Get filters from query params
            const filters = {
                from: this.$route.query.from,
                to: this.$route.query.to,
            }
            this.error = false

            const token = localStorage.getItem('token')
            this.$axios.get('/api/v1/trips', {
                params: filters,
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }).then(response => {
                this.trips = response.data
            })
            .catch(error => {
                this.error = true
                console.error(error)
            });
        },
    },
}
</script>

<style lang="sass">
.v-card
    #book-trip
        margin-right: .5rem
        cursor: pointer

</style>
