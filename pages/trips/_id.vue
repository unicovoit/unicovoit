<template>
    <v-responsive
        max-width="900"
        class="mx-auto"
    >
        <v-container
            v-touch="{
                right: () => $router.go(-1)
            }"
        >
            <h2
                class="text-h2"
            >
                Trajet
            </h2>

            <v-alert
                v-if="pendingRequests && owner"
                class="mt-3"
                dense
                text
                icon="mdi-alert-circle"
                color="warning"
            >
                Vous avez une demande de réservation en attente
            </v-alert>

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
                    v-if="trip.description"
                    class="text--primary"
                >
                    {{ trip.description }}
                </v-card-text>
                <v-card-text
                    class="cursor-pointer d-flex flex-row"
                    @click="$router.push(`/profile/${trip.driver?.id}`)"
                >
                    <v-avatar
                        class="mr-2"
                        size="60"
                    >
                        <v-img
                            :alt="trip.driver?.nickname || 'Utilisateur'"
                            :src="trip.driver?.picture || '/account_circle.svg'"
                        ></v-img>
                    </v-avatar>
                    <v-list>
                        <v-list-item-title style="font-size: 120%">
                            {{ trip.driver?.nickname || trip.driver?.name || 'Utilisateur' }}
                        </v-list-item-title>
                        <v-list-item-subtitle>
                            {{ trip.driver?.university || 'Non précisé' }}
                        </v-list-item-subtitle>
                    </v-list>
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
                            <v-icon class="mr-3">mdi-piggy-bank-outline</v-icon>
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
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>
                            <v-icon class="mr-3">mdi-seat-passenger</v-icon>
                            {{ trip.places }} places restantes
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item
                    v-if="trip.driver?.autoBook"
                >
                    <v-list-item-content>
                        <v-list-item-title>
                            <v-icon class="mr-3">mdi-flash</v-icon>
                            Acceptation automatique
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-card>

            <v-card
                v-if="owner"
                id="bookings"
                class="py-3 mt-3"
                outlined
            >
                <div
                    v-if="bookings.length === 0"
                >
                    <v-card-title>
                        Aucune demande de réservation
                    </v-card-title>
                </div>
                <div
                    v-else
                >
                    <v-card-title>
                        Réservations
                    </v-card-title>
                    <v-card-subtitle
                        v-if="pendingRequests"
                        class="red--text"
                    >
                        Acceptez ou refusez les demandes de réservation
                    </v-card-subtitle>
                    <v-list>
                        <v-list-item
                            v-for="booking in bookings"
                            :key="booking.id"
                            class="d-flex flex-row"
                        >
                            <v-list-item-content>
                                <v-list-item-title
                                    @click.prevent="$router.push(`/profile/${booking.user?.id}`)"
                                >
                                    <v-avatar
                                        class="mr-3"
                                        size="40"
                                    >
                                        <v-img
                                            :alt="booking.user?.nickname || 'Utilisateur'"
                                            :src="booking.user?.picture || '/account_circle.svg'"
                                        ></v-img>
                                    </v-avatar>
                                    {{ booking.user?.nickname || booking.user?.name || 'Utilisateur' }}
                                </v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-action>
                                <div
                                    v-if="!booking.confirmed"
                                >
                                    <v-btn
                                        :loading="confirmLoading"
                                        color="success"
                                        elevation="0"
                                        fab
                                        small
                                        @click="confirmBooking(booking)"
                                    >
                                        <v-icon>mdi-check</v-icon>
                                    </v-btn>
                                    <v-btn
                                        :loading="cancelLoading"
                                        color="gray"
                                        elevation="0"
                                        fab
                                        icon
                                        small
                                        @click="cancelBooking(booking)"
                                    >
                                        <v-icon>mdi-close</v-icon>
                                    </v-btn>
                                </div>
                                <div
                                    v-else
                                >
                                    <v-icon
                                        color="success"
                                    >
                                        mdi-check-circle-outline
                                    </v-icon>
                                </div>
                            </v-list-item-action>
                        </v-list-item>
                    </v-list>
                </div>
            </v-card>

            <v-card
                v-else-if="!owner && bookings.length > 0"
                id="bookings"
                class="py-3 mt-3"
                outlined
            >
                <v-card-text
                    class="text--primary"
                >
                    Vous avez réservé une place sur ce trajet.
                </v-card-text>
            </v-card>

            <LazyConfirmBooking
                v-else-if="$auth.loggedIn && !owner"
                :date="parseDateTime"
                :trip="trip"
            />
        </v-container>
    </v-responsive>
</template>

<script>
export default {
    name: "trip",
    auth: false,
    data() {
        return {
            trip: {},
            bookings: [],
            confirmLoading: false,
            cancelLoading: false,
        }
    },
    async validate({params, store}) {
        // Must be a uuid v4
        return store.dispatch('validateUuidV4', params.id)
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
        owner() {
            return this.trip.driver_id === this.$auth.user?.sub
        },
        pendingRequests() {
            return this.bookings.some(b => !b.confirmed)
        },
    },
    async fetch() {
        try {
            this.trip = await this.$axios.$get(`/api/v1/trips/id/${this.$route.params.id}`)
            if (this.$auth.loggedIn)
                this.bookings = await this.$axios.$get(`/api/v1/trips/bookings/${this.$route.params.id}`)
        } catch (error) {
            console.error(`Trip ${this.$route.params.id}: ${error.message}`)
            this.$nuxt.error({
                statusCode: error.response.status,
                message: error.response.status === 404 ? "Ce trajet n'existe pas" : error.response.data
            })
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
        async confirmBooking(booking) {
            try {
                this.confirmLoading = true
                await this.$axios.$post(`/api/v1/trips/bookings/${booking.id}/confirm`)
                this.bookings = await this.$axios.$get(`/api/v1/trips/bookings/${this.$route.params.id}`)
                this.confirmLoading = false
                /*this.$store.dispatch('notify', {
                    title: 'Réservation acceptée',
                    message: `${booking.user.nickname || booking.user.name} part avec vous !`,
                })*/
            } catch (error) {
                console.error(`Trip ${this.$route.params.id}: ${error.message}`)
                this.$nuxt.error({
                    statusCode: error.response.status,
                    message: error.response.data
                })
            }
        },
        async cancelBooking(booking) {
            try {
                // TODO: ask for confirmation
                this.cancelLoading = true
                await this.$axios.$delete(`/api/v1/trips/bookings/${booking.id}/cancel`)
                this.bookings = await this.$axios.$get(`/api/v1/trips/bookings/${this.$route.params.id}`)
                this.cancelLoading = false
            } catch (error) {
                console.error(`Trip ${this.$route.params.id}: ${error.message}`)
                this.$nuxt.error({
                    statusCode: error.response.status,
                    message: error.response.data
                })
            }
        },
    },
    activated() {
        if (!this.$fetchState.pending)
            this.$fetch()
    },
}
</script>

<style lang="sass" scoped>
.text-h5
    text-transform: capitalize

.warning--text
    color: #ebb80f !important

.v-timeline-item
    align-items: start
</style>
