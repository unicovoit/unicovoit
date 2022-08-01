<template>
    <div>
        <h4
            v-if="noTrips"
            class="text-subtitle-1"
        >
            Rien à afficher pour le moment !
        </h4>

        <v-list
            v-else
        >
            <LazyTripCard
                v-for='trip in trips'
                :key='trip.id'
                :trip='trip'
                type="edit"
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
