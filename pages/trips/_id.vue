<template>
    <v-container
        v-touch="{
            right: () => $router.go(-1),
        }"
    >
        <h2
            class="text-h2"
        >
            Trajet
        </h2>

        <v-timeline
            appear="slide-y-transition"
            class="mb-8 mt-3"
            dense
            justify="center"
            large
        >
            <v-timeline-item
                color="primary"
                fill-dot
                icon="mdi-map-marker"
            >
                <v-row class="pt-1">
                    <v-col cols="3">
                        <span class="font-weight-bold">{{ startTime }}</span>
                    </v-col>
                    <v-col class="font-weight-medium">
                        {{ trip.fromName }}
                        <div class="text-caption font-weight-regular">
                            {{ trip.fromCity }}
                        </div>
                    </v-col>
                </v-row>
            </v-timeline-item>
            <v-timeline-item
                color="primary"
                fill-dot
                icon="mdi-flag-checkered"
            >
                <v-row class="pt-1">
                    <v-col cols="3">
                        <span class="font-weight-bold">{{ endTime }}</span>
                    </v-col>
                    <v-col class="font-weight-medium">
                        {{ trip.toName }}
                        <div class="text-caption font-weight-regular">
                            {{ trip.toCity }}
                        </div>
                    </v-col>
                </v-row>
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
            <v-card-text
                class="text--primary"
            >
                <v-avatar
                    size="60"
                    class="mr-2"
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
        parseDateTime() {
            const date = new Date(this.trip.departure_time)
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
        startTime() {
            return this.parseTime(this.trip.departure_time)
        },
        endTime() {
            let d = new Date(this.trip.departure_time)
            d.setMinutes(d.getMinutes() + this.trip.duration)
            return this.parseTime(d)
        },
    },
    async asyncData({error, params, $axios}) {
        try {
            const trip = await $axios.$get(`/api/v1/trips/id/${params.id}`)
            return {trip}
        } catch (e) {
            console.error(e)
            error({statusCode: e.code, message: e.message})
        }
    },
    methods: {
        parseTime(time) {
            const date = new Date(time)
            let options = {
                hour: 'numeric',
                minute: '2-digit'
            }
            return date.toLocaleTimeString('fr-FR', options)
        },
    },
}
</script>

<style scoped lang="sass">
.text-h5
    text-transform: capitalize
    word-break: break-word

.v-timeline-item
    align-items: start
</style>
