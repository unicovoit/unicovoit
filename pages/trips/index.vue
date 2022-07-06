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
            <TripCard
                v-for='trip in trips'
                :key='trip.id'
                :trip='trip'
            >
            </TripCard>
        </v-container>

        <!-- Show an error if received error from server -->
        <v-snackbar
            v-if="$fetchState.error"
            :timeout="4000"
            color="error"
        >
            Une erreur est survenue. Merci de réessayer plus tard.
        </v-snackbar>
    </div>
</template>

<script>
import TripCard from "../../components/TripCard"

export default {
    name: 'Trips',
    auth: false,
    components: {
        TripCard
    },
    data() {
        return {
            trips: [],
        }
    },
    async fetch() {
        // Get filters from query params
        const filters = {
            from: this.$route.query.from,
            to: this.$route.query.to,
            date: this.$route.query.date,
        }

        try {
            let {data} = await this.$axios.get('/api/v1/trips', {
                params: filters,
            })
            this.trips = data
        } catch (e) {
            console.error(e.response.data.message)
        }
    },
    computed: {
        isEmpty() {
            return this.trips.length === 0;
        },
        isOffline() {
            return this.$nuxt.isOffline
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
