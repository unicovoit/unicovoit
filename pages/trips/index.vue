<template>
    <div>
        <!-- Show search queries -->
        <v-card
            v-if="isSearchQueries && !isOffline"
            class="mt-2"
            :color="`grey ${$vuetify.theme.dark ? 'darken-4' : 'lighten-3'}`"
            flat
        >
            <v-card-title>
                {{ query.from }}&nbsp;
                <v-icon>
                    mdi-ray-start-end
                </v-icon>
                &nbsp;{{ query.to }}
            </v-card-title>
            <v-card-subtitle>
                {{ query.date }}
            </v-card-subtitle>
        </v-card>

        <!-- Show no connectivity -->
        <v-alert
            v-if="isOffline"
            class="mx-2 my-4"
            border="left"
            type="warning"
        >
            La recherche de trajets n'est pas disponible en mode hors-ligne. Veuillez vous connecter à internet.
        </v-alert>

        <!-- Show items are loading -->
        <v-progress-circular
            v-if="isEmpty && $fetchState.pending && !isOffline"
            class="mx-auto mt-5"
            style="width: 100%"
            color="primary"
            indeterminate
        ></v-progress-circular>

        <!-- Show no trips are available -->
        <v-container v-else-if="isEmpty && !$fetchState.pending && !isOffline">
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
            query: {
                from: "",
                to: "",
                date: ""
            }
        }
    },
    activated() {
        this.$fetch()
    },
    deactivated() {
        this.trips = []
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

            if (this.$route.query.from && this.$route.query.to && this.$route.query.date) {
                const from = this.$route.query.from.split(',')
                const to = this.$route.query.to.split(',')
                const req = this.$axios.create()
                delete req.defaults.headers.common['Authorization']
                let {data: fromData} = await req.get(`https://${this.$config.ADDOK_DOMAIN}/reverse`, {
                    params: {
                        lon: from[0],
                        lat: from[1]
                    }
                })
                this.query.from = fromData.features[0].properties.city
                let {data: toData} = await req.get(`https://${this.$config.ADDOK_DOMAIN}/reverse`, {
                    params: {
                        lon: to[0],
                        lat: to[1]
                    }
                })
                this.query.to = toData.features[0].properties.city

                let options = {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                }
                this.query.date = new Date(this.$route.query.date).toLocaleDateString('fr-FR', options)
            }
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
        isSearchQueries() {
            return this.$route.query.from && this.$route.query.to && this.$route.query.date
        }
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
