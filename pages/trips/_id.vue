<template>
    <v-container>
        <v-btn
            text
            class="text-caption align-content-start ml-n4"
            x-small
            @click="$router.go(-1)"
        >
            <v-icon>mdi-chevron-left</v-icon>
            Retour aux résultats
        </v-btn>

        <v-main
            class="text-h2 mt-n10 mb-n3"
            color="primary"
        >
            Trajet
        </v-main>

        <v-timeline
            appear="slide-y-transition"
            class="mb-8"
            dense
            justify="center"
            large
        >
            <v-timeline-item
                color="primary"
                fill-dot
                icon="mdi-map-marker"
                large
            >
                <v-card flat>
                    <v-card-title class="text-h5">
                        {{ trip.fromName.toLowerCase() }}
                    </v-card-title>
                </v-card>
            </v-timeline-item>
            <v-timeline-item
                color="primary"
                fill-dot
                icon="mdi-map-marker"
                large
            >
                <v-card flat>
                    <v-card-title class="text-h5">
                        {{ trip.toName.toLowerCase() }}
                    </v-card-title>
                </v-card>
            </v-timeline-item>
        </v-timeline>


        <v-card
            class="mt-3"
            outlined
        >
            <v-card-text
                class="text--primary"
                v-if="trip.description"
            >
                {{ trip.description }}
            </v-card-text>
            <v-card-text>
                <v-avatar
                    size="40"
                >
                    <v-img
                        :alt="trip.driver_name || 'Utilisateur'"
                        :src="trip.driver_picture || '/account_circle.svg'"
                        @click="$router.push(`/profile/${trip.driver_id}`)"
                    ></v-img>
                </v-avatar>
                &nbsp;{{ trip.driver_name || 'Utilisateur' }}
                <v-spacer></v-spacer>
            </v-card-text>
        </v-card>

        <v-card
            class="py-3 mt-3"
            outlined
        >
            <v-list-item justify="center">
                <v-list-item-content>
                    <v-list-item-title>
                        <v-icon class="mr-3">mdi-calendar-clock</v-icon>
                        {{ parseDateTime }}
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item justify="center">
                <v-list-item-content>
                    <v-list-item-title>
                        <v-icon class="mr-3">mdi-currency-eur</v-icon>
                        {{ trip.price }} €
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title>
                        <v-icon class="mr-3">mdi-map-marker-distance</v-icon>
                        {{ trip.distance }} km
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title>
                        <v-icon class="mr-3">mdi-clock-outline</v-icon>
                        {{ Math.floor(trip.duration / 60) }}h{{ trip.duration % 60 }}
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-card>

        <ConfirmOrder :trip="trip" :date="parseDateTime"></ConfirmOrder>
    </v-container>
</template>

<script>
import ConfirmOrder from '../../components/ConfirmOrder'

export default {
    name: "trip",
    components: {
        ConfirmOrder,
    },
    computed: {
        parseDate() {
            const date = new Date(this.trip.departure_time)
            let options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}
            return date.toLocaleDateString('fr-FR', options)
        },
        parseDateTime() {
            const date = new Date(this.trip.departure_time)
            let options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}
            let time = date.toLocaleTimeString('fr-FR').split(':')
            return `${date.toLocaleDateString('fr-FR', options)}, ${time[0]}h${time[1]}`
        }
    },
    async asyncData({error, params, $axios, $config}) {
        try {
            const trip = await $axios.$get(`/api/v1/trips/${params.id}`)
            trip.distance = 0
            trip.duration = 0

            let req = $axios.create()
            delete req.defaults.headers.common['Authorization']
            let from = await req.get(`https://${$config.API_DOMAIN}/reverse`, {
                params: {
                    lat: trip.from[0],
                    lon: trip.from[1],
                }
            })
            let tmp = from.data.features[0].properties
            trip.fromName = `${tmp.name}, ${tmp.city}`

            let to = await req.get(`https://${$config.API_DOMAIN}/reverse`, {
                params: {
                    lat: trip.to[0],
                    lon: trip.to[1],
                }
            })
            tmp = to.data.features[0].properties
            trip.toName = `${tmp.name}, ${tmp.city}`

            return {trip}
        } catch (e) {
            console.error(e)
            error({statusCode: e.code, message: e.message})
        }
    },
    async mounted() {
        [ this.trip.distance, this.trip.duration ] = await this.$axios.$get('/api/v1/trips/distance', {
                params: {
                    from: this.trip.from.join(','),
                    to: this.trip.to.join(','),
                }
            }).then(response => {
                return [response.distance, response.duration]
            })
            .catch(error => {
                console.error(error)
            })
    }
}
</script>

<style scoped lang="sass">
.text-h5
    text-transform: capitalize
    word-break: break-word
</style>
