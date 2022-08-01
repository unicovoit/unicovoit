<template>
    <div>
        <h4
            v-if="noBookings"
            class="text-subtitle-1"
        >
            Rien à afficher pour le moment !
        </h4>

        <v-list
            v-else
        >
            <LazyTripCard
                v-for="booking in bookings"
                :key="booking.id"
                type="delete"
                :trip="booking.trip"
                :id="booking.id"
                :requestPending="!booking.confirmed"
                @refresh="$emit('refresh')"
            />
        </v-list>
    </div>
</template>

<script>
export default {
    name: "DisplayBookedTrips",
    props: {
        bookings: {
            type: Array,
            required: true
        }
    },
    computed: {
        noBookings() {
            return this.bookings?.length === 0
        }
    },
}
</script>

<style scoped lang="sass">
*
    word-break: keep-all
</style>
