<template>
    <v-responsive
        max-width="900"
        class="mx-auto"
    >
        <v-alert
            v-if="$fetchState.error"
            type="error"
        >
            {{ $t('error.genericError') + ' ' + $t('error.tryAgain') }}
        </v-alert>
        <v-container
            v-touch="{
                right: () => $router.go(-1)
            }"
            v-else
        >
            <h2
                class="text-h2"
            >
                {{ $t('trip.title') }}
            </h2>

            <v-alert
                v-if="pendingRequests && owner"
                class="mt-3"
                dense
                text
                icon="mdi-alert-circle"
                color="warning"
            >
                {{ $t('trip.pendingRequests') }}
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
                        <v-col
                            class="font-weight-medium cursor-pointer"
                            @click="$refs.from.click()"
                        >
                            <a
                                ref="from"
                                class="text--primary text-decoration-none"
                                :href="`https://www.google.com/maps/search/?api=1&query=${trip.from?.coordinates[1]},${trip.from?.coordinates[0]}`"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {{ trip.fromName }}
                                <div class="text-caption font-weight-regular">
                                    {{ trip.fromCity }}
                                </div>
                            </a>
                        </v-col>
                        <v-col
                            class="cursor-pointer"
                            cols="2"
                            @click="$refs.from.click()"
                        >
                            <v-icon>mdi-chevron-right</v-icon>
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
                            <v-col
                                class="font-weight-medium cursor-pointer"
                                @click="$refs.to.click()"
                            >
                                <a
                                    ref="to"
                                    class="text--primary text-decoration-none"
                                    :href="`https://www.google.com/maps/search/?api=1&query=${trip.to?.coordinates[1]},${trip.to?.coordinates[0]}`"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {{ trip.toName }}
                                    <div class="text-caption font-weight-regular">
                                        {{ trip.toCity }}
                                    </div>
                                </a>
                            </v-col>
                            <v-col
                                class="cursor-pointer"
                                cols="2"
                                @click="$refs.to.click()"
                            >
                                <v-icon>mdi-chevron-right</v-icon>
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
                    id="description"
                >
                    <span>{{ trip.description }}</span>
                </v-card-text>
                <v-card-text
                    class="cursor-pointer d-flex flex-row"
                    @click="$router.push(localePath(`/profile/${trip.driver?.id}`))"
                >
                    <v-avatar
                        class="mr-2"
                        size="60"
                    >
                        <v-img
                            :alt="trip.driver?.nickname || $t('profile.user')"
                            :src="trip.driver?.picture || '/account_circle.svg'"
                        ></v-img>
                    </v-avatar>
                    <v-list>
                        <v-list-item-title style="font-size: 120%">
                            {{ trip.driver?.nickname || trip.driver?.name || $t('profile.user') }}
                        </v-list-item-title>
                        <v-list-item-subtitle>
                            {{ trip.driver?.university || $t('error.unknown') }}
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
                            {{ trip.places }} {{this.remainingPlaces}}
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item
                    v-if="trip.driver?.autoBook"
                >
                    <v-list-item-content>
                        <v-list-item-title>
                            <v-icon class="mr-3">mdi-flash</v-icon>
                            {{ $t('trip.autoBook') }}
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-card>

            <div
                v-if="owner"
            >
                <v-card
                    id="bookings"
                    class="py-3 mt-3"
                    outlined
                >
                    <div
                        v-if="bookings.length === 0"
                    >
                        <v-card-title>
                            {{ $t('trip.noBookings') }}
                        </v-card-title>
                    </div>
                    <div
                        v-else
                    >
                        <v-card-title>
                            {{ $t('trip.bookings') }}
                        </v-card-title>
                        <v-card-subtitle
                            v-if="pendingRequests"
                            class="red--text"
                        >
                            {{ $t('trip.acceptOrRejectBookings') }}
                        </v-card-subtitle>
                        <v-list>
                            <v-list-item
                                v-for="booking in bookings"
                                :key="booking.id"
                                class="d-flex flex-row"
                            >
                                <v-list-item-content>
                                    <v-list-item-title
                                        @click.prevent="$router.push(localePath(`/profile/${booking.user?.id}`))"
                                    >
                                        <v-avatar
                                            class="mr-3"
                                            size="40"
                                        >
                                            <v-img
                                                :alt="booking.user?.nickname || $t('profile.user')"
                                                :src="booking.user?.picture || '/account_circle.svg'"
                                            ></v-img>
                                        </v-avatar>
                                        {{ booking.user?.nickname || booking.user?.name || $t('profile.user') }}
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
                                            @click="confirmCancel = true"
                                        >
                                            <v-icon>mdi-close</v-icon>
                                        </v-btn>
                                        <!-- Ask for confirmation before cancelling booking -->
                                        <v-dialog
                                            v-model="confirmCancel"
                                            max-width="500px"
                                        >
                                            <v-card>
                                                <v-card-title>
                                                    {{ $t('trip.confirmRefusal') }}
                                                </v-card-title>
                                                <v-card-actions>
                                                    <v-spacer></v-spacer>
                                                    <v-btn
                                                        class="ma-1"
                                                        color="primary"
                                                        text
                                                        @click.prevent="confirmCancel = false"
                                                    >
                                                        {{ $t('form.cancel') }}
                                                    </v-btn>

                                                    <v-btn
                                                        class="ma-1"
                                                        color="error"
                                                        outlined
                                                        :loading="cancelLoading"
                                                        @click="cancelBooking(booking)"
                                                    >
                                                        {{ $t('trip.refuse') }}
                                                    </v-btn>
                                                </v-card-actions>
                                            </v-card>
                                        </v-dialog>
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

                <LazyControlsEditOrDelete
                    v-if="!pastTrip"
                    :trip="trip"
                />
            </div>

            <v-card
                v-else-if="!owner && bookings.length > 0"
                id="bookings"
                class="py-3 mt-3"
                outlined
            >
                <v-card-text
                    v-if="bookingConfirmed"
                    class="text--primary"
                >
                    {{ $t('trip.seatBooked') }}
                </v-card-text>
                <v-card-text
                    v-else
                    class="text--primary"
                >
                    {{ $t('trip.seatBookedPending') }}
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
    head() {
        return {
            title: `${this.trip?.fromCity} - ${this.trip?.toCity}`,
        }
    },
    auth: false,
    data() {
        return {
            trip: {},
            bookings: [],
            confirmLoading: false,
            cancelLoading: false,
            confirmCancel: false,
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
            return date.toLocaleDateString(this.$i18n.locale, options)
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
        pastTrip() {
            return new Date(this.trip.departure_time) < new Date()
        },
        bookingConfirmed() {
            return this.bookings.some(b => b.confirmed)
        },
        pendingRequests() {
            return this.bookings.some(b => !b.confirmed)
        },
        remainingPlaces() {
            return this.trip.places === 1 ? this.$t('trip.placesRemaining.singular') : this.$t('trip.placesRemaining.plural')
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
                message: error.response.status === 404 ? this.$t('error.tripDoesntExist') : error.response.data
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
            return date.toLocaleTimeString(this.$i18n.locale, options)
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

#description
    white-space: pre-wrap
</style>
