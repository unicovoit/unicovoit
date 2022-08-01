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
                class="ma-0 pa-0"
                fluid
            >
                <DisplayBookedTrips
                    :bookings="bookings"
                    @refresh="$fetch"
                ></DisplayBookedTrips>
            </v-container>
        </v-tab-item>

        <v-tab-item
            key="1"
        >
            <v-container
                class="ma-0 pa-0"
                fluid
            >
                <DisplayTrips
                    :trips="trips"
                    @refresh="$fetch"
                ></DisplayTrips>
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
            tab: 1,
        };
    },
    computed: {
        now() {
            return new Date()
        },
        oldTrips() {
            return this.trips.filter(trip => trip.departure_time < this.now)
        },
        upcomingTrips() {
            return this.trips.filter(trip => trip.departure_time >= this.now)
        },
        oldBookings() {
            return this.bookings.filter(booking => booking.trip.departure_time < this.now)
        },
        upcomingBookings() {
            return this.bookings.filter(booking => booking.trip.departure_time >= this.now)
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
    deactivated() {
        this.bookings = []
        this.trips = []
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
