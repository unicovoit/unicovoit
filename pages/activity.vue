<template>
    <v-tabs
        v-model="tab"
        grow
    >
        <v-tab>Réservations</v-tab>
        <v-tab>Mes annonces</v-tab>

        <v-tab-item
            key="0"
        >
            <v-container
                fluid
            >
                <h5
                    class="text-h5 font-weight-bold"
                >
                    Trajets à venir
                </h5>
                <DisplayBookedTrips
                    :bookings="upcomingBookings"
                    type="edit"
                    @refresh="$fetch"
                ></DisplayBookedTrips>

                <v-divider class="my-5"></v-divider>

                <h5
                    class="text-h5 font-weight-bold"
                >
                    Trajets passés
                </h5>
                <DisplayBookedTrips
                    :bookings="oldBookings"
                    @refresh="$fetch"
                ></DisplayBookedTrips>
            </v-container>
        </v-tab-item>

        <v-tab-item
            key="1"
        >
            <v-container
                fluid
            >
                <h5
                    class="text-h5 font-weight-bold"
                >
                    Trajets à venir
                </h5>
                <LazyDisplayTrips
                    :trips="upcomingTrips"
                    type="edit"
                    @refresh="$fetch"
                ></LazyDisplayTrips>

                <v-divider class="my-5"></v-divider>

                <h5
                    class="text-h5 font-weight-bold"
                >
                    Trajets passés
                </h5>
                <LazyDisplayTrips
                    :trips="oldTrips"
                    @refresh="$fetch"
                ></LazyDisplayTrips>
            </v-container>
        </v-tab-item>
    </v-tabs>
</template>

<script>

export default {
    name: "DisplayBookingsAndTrips",
    data() {
        return {
            dialog: false,
            bookings: [],
            trips: [],
            tab: 0,
        };
    },
    computed: {
        now() {
            return new Date()
        },
        oldTrips() {
            return this.trips.filter(trip => new Date(trip.departure_time) < this.now)
        },
        upcomingTrips() {
            return this.trips.filter(trip => new Date(trip.departure_time) >= this.now)
        },
        oldBookings() {
            return this.bookings.filter(booking => new Date(booking.trip.departure_time) < this.now)
        },
        upcomingBookings() {
            return this.bookings.filter(booking => new Date(booking.trip.departure_time) >= this.now)
        },
    },
    methods: {
        initialise() {
            if (this.$route.query.hasOwnProperty('trips'))
                this.tab = 1
        },
    },
    async fetch() {
        try {
            this.bookings = await this.$axios.$get('/api/v1/users/bookings')
            this.trips = await this.$axios.$get('/api/v1/users/trips')
        } catch (err) {
            console.error(err.response.data)
        }
    },
    activated() {
        this.$fetch()
        this.initialise()
    },
    mounted() {
        this.initialise()
    }
}
</script>

<style scoped lang="sass">
.v-tab
    border-radius: .4rem
    margin: .2rem .2rem .29rem
</style>
