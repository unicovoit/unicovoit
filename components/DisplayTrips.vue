<template>
    <div>
        <h4
            v-if="noTrips"
            class="text-subtitle-1"
        >
            {{ $t('trips.nothingToShow') }}
        </h4>

        <v-list
            v-else
        >
            <LazyTripCard
                v-for='trip in trips'
                :key='trip.id'
                :trip='trip'
                :type="type"
                @refresh="$emit('refresh')"
            />
        </v-list>
    </div>
</template>

<script>
export default {
    name: "DisplayTrips",
    props: {
        trips: {
            type: Array,
            required: true,
        },
        type: {
            type: String,
            default: undefined,
        },
    },
    computed: {
        noTrips() {
            return this.trips?.length === 0
        }
    },
}
</script>

<style scoped>

</style>
