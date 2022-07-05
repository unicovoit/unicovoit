<template>
    <v-container>
        <h4
            v-if="noTrips"
            class="text-subtitle-1"
        >
            Aucun trajet publié pour le moment
        </h4>

        <v-list
            v-else
        >
            <TripCard
                v-for='trip in trips'
                :key='trip.id'
                :trip='trip'
            ></TripCard>
        </v-list>
    </v-container>
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
    mounted() {
        console.log(this.trips)
    },
    watch: {
        trips() {
            console.log(this.trips)
        }
    },
    methods: {
        parseDateTime(dep) {
            const date = new Date(dep)
            let options = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit'
            }
            return date.toLocaleDateString('fr-FR', options)
        },
    }
}
</script>

<style scoped>

</style>
