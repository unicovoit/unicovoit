<template><v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
>
    <template v-slot:activator="{ on, attrs }">
        <v-btn
            v-bind="attrs"
            v-on="on"
            class="my-4"
            depressed
            block
        >
            <v-icon class="mr-2">mdi-car</v-icon>
            Trajets et Réservations
        </v-btn>
    </template>

    <v-card>
        <v-toolbar
            dark
            color="primary"
        >
            <v-btn
                icon
                dark
                @click="dialog = false"
            >
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Trajets et Réservations</v-toolbar-title>
        </v-toolbar>

        <v-tabs
            grow
        >
            <v-tab>Réservations</v-tab>
            <v-tab>Trajets</v-tab>

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
                    ></DisplayTrips>
                </v-container>
            </v-tab-item>
        </v-tabs>
    </v-card>
</v-dialog>
</template>

<script>
import DisplayBookedTrips from "./DisplayBookedTrips"
import DisplayTrips from "./DisplayTrips"

export default {
    name: "DisplayBookingsAndTrips",
    components: {
        DisplayBookedTrips,
        DisplayTrips,
    },
    data() {
        return {
            dialog: false,
            bookings: [],
            trips: [],
        };
    },
    async fetch() {
        try {
            this.bookings = await this.$axios.$get('/api/v1/users/bookings')
            this.trips = await this.$axios.$get('/api/v1/users/trips')
        } catch (err) {
            console.log(err)
        }
    }
}
</script>

<style scoped>

</style>
