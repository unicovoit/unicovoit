<template>
    <div>
        <!-- Show no connectivity -->
        <v-alert
            v-if="isOffline"
            class="mx-2 my-4"
            border="left"
            type="warning"
        >
            Vous n'êtes pas connecté à internet. Les trajets affichés ne sont peut-être pas à jour.
        </v-alert>

        <!-- Show no trips are available -->
        <v-container v-if="isEmpty">
            <v-card
                outlined
            >
                <v-card-title>
                    Aucun trajet disponible
                </v-card-title>
            </v-card>
        </v-container>

        <!-- Show trips -->
        <v-container
            v-else
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
                        <v-card-title id="trip-cities">
                            {{ trip.from.toLowerCase() }}
                            <v-icon color="text--primary" class="mx-2">mdi-arrow-right-bold</v-icon>
                            {{ trip.to.toLowerCase() }}
                        </v-card-title>
                    </v-col>
                    <v-col
                        cols="auto"
                    >
                        <v-btn
                            id="book-trip"
                            color="primary"
                            icon
                            @click="$router.push(`/trips/${trip._id}`)"
                        >
                            <v-icon size="35">mdi-car-arrow-right</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>

                <v-list-item justify="center">
                    <v-list-item-content>
                        <v-list-item-title class="text-body-2">
                            <v-icon class="mr-3">mdi-calendar-clock</v-icon>
                            {{ parseDateTime(trip.departure_time) }}
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item justify="center">
                    <v-list-item-content>
                        <v-list-item-title class="text-body-2">
                            <v-icon class="mr-3">mdi-currency-eur</v-icon>
                            {{ trip.price }} €
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item justify="center">
                    <v-list-item-content>
                        <v-list-item-title>
                            <v-avatar
                                size="40"
                                class="mr-3"
                            >
                                <v-img
                                    :alt="trip.driver_name || 'Utilisateur'"
                                    :src="trip.driver_picture || '/account_circle.svg'"
                                    @click="$router.push(`/profile/${trip.driver_id}`)"
                                ></v-img>
                            </v-avatar>
                            {{ trip.driver_name || 'Utilisateur' }}
                        </v-list-item-title>
                    </v-list-item-content>
                    <v-spacer></v-spacer>
                    <v-btn
                        v-if="!!trip.description"
                        icon
                        @click="trip.show = !trip.show"
                    >
                        <v-icon>mdi-chevron-{{ trip.show ? 'up' : 'down' }}</v-icon>
                    </v-btn>
                </v-list-item>

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
        isOffline() {
            return this.$nuxt.isOffline
        },
    },
    methods: {
        parseDateTime(dep) {
            const date = new Date(dep)
            let options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}
            let time = date.toLocaleTimeString('fr-FR').split(':')
            return `${date.toLocaleDateString('fr-FR', options)}, ${time[0]}h${time[1]}`
        },
        async getTrips() {
            // Get filters from query params
            const filters = {
                from: this.$route.query.from,
                to: this.$route.query.to,
                date: this.$route.query.date,
            }
            this.error = false

            const token = localStorage.getItem('token')
            this.$axios.get('/api/v1/trips', {
                params: filters,
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }).then(response => {
                for (let i = 0; i < response.data.length; i++) {
                    response.data[i].show = false
                }
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
    #trip-cities
        text-transform: capitalize

    #book-trip
        margin-right: .5rem
        cursor: pointer

</style>
