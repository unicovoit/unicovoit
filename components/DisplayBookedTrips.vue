<template>
    <v-container>
        <h4
            v-if="noBookings"
            class="text-subtitle-1"
        >
            Aucun trajet réservé pour le moment
        </h4>

        <v-list
            v-else
        >
            <TripCard
                v-for="booking in bookings"
                :key="booking.id"
                type="delete"
                :trip="booking.trip"
                :id="booking.id"
                :requestPending="!booking.confirmed"
                @refresh="$emit('refresh')"
            >

            </TripCard>
        </v-list>
    </v-container>
</template>

<script>
import TripCard from "./TripCard"

export default {
    name: "DisplayBookedTrips",
    components: {
        TripCard
    },
    props: {
        bookings: {
            type: Array,
            required: true
        }
    },
    computed: {
        noBookings() {
            return this.bookings === undefined || this.bookings.length === 0
        }
    },
}
</script>

<style scoped lang="sass">
*
    word-break: keep-all
</style>
