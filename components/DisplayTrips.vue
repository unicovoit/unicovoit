<template>
    <div>
        <h4
            v-if="noTrips"
            class="text-subtitle-1"
        >
            Rien à afficher ici pour le moment !
        </h4>

        <v-list
            v-else
        >
            <TripCard
                v-for='trip in trips'
                :key='trip.id'
                :trip='trip'
                type="edit"
                @refresh="$emit('refresh')"
            ></TripCard>
        </v-list>
    </div>
</template>

<script>
import TripCard from "./TripCard"

export default {
    name: "DisplayTrips",
    components: {
        TripCard
    },
    props: {
        trips: {
            type: Array,
            required: true,
        },
    },
    computed: {
        noTrips() {
            return this.trips === undefined || this.trips.length === 0
        }
    },
}
</script>

<style scoped>

</style>
