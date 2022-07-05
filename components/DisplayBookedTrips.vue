<template>
    <v-container>
        <h4
            v-if="noBookings"
            class="text-subtitle-1"
        >
            Aucun trajet réservé pour le moment
        </h4>

        <v-list
            v-else
        >
            <v-card
                v-for="trip in bookings"
                :key="trip.id"
                class="mb-5"
                outlined
                lazy
                :to="`/trips/${trip.id}`"
            >
                <v-row
                    align="center"
                >
                    <v-col
                    >
                        <v-card-title class="text-h6">
                            {{ trip.fromCity }}
                            <v-icon color="text--primary" class="mx-2">mdi-arrow-right-bold</v-icon>
                            {{ trip.toCity }}
                        </v-card-title>
                    </v-col>
                    <v-col
                        cols="auto"
                        class="mr-2"
                    >
                        <v-btn
                            id="cancel-trip"
                            color="error"
                            icon
                            @click.prevent="confirmDeletion = true"
                        >
                            <v-icon size="35">mdi-delete</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>

                <!-- Confirm booking suppression -->
                <v-dialog
                    v-model="confirmDeletion"
                    max-width="500px"
                >
                    <v-card>
                        <v-card-title>
                            Voulez-vous vraiment supprimer cette réservation ?
                        </v-card-title>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                class="ma-1"
                                color="primary"
                                text
                                @click.prevent="confirmDeletion = false"
                            >
                                Annuler
                            </v-btn>

                            <v-btn
                                class="ma-1"
                                color="error"
                                @click="cancelBooking(trip.id)"
                            >
                                Supprimer
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

                <v-list-item justify="center">
                    <v-list-item-content>
                        <v-list-item-title class="text-body-2">
                            <v-icon class="mr-3">mdi-calendar-clock</v-icon>
                            {{ parseDateTime(trip.departure_time) }}
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item justify="center">
                    <v-list-item-content>
                        <v-list-item-title class="text-body-2">
                            <v-icon class="mr-3">mdi-currency-eur</v-icon>
                            {{ trip.price }} €
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item justify="center">
                    <v-list-item-content
                        @click.prevent="$router.push(`/profile/${trip.driver_id}`)"
                    >
                        <v-list-item-title>
                            <v-avatar
                                size="40"
                                class="mr-3"
                            >
                                <v-img
                                    :alt="trip.driver_name || 'Utilisateur'"
                                    :src="trip.driver_picture || '/account_circle.svg'"
                                ></v-img>
                            </v-avatar>
                            {{ trip.driver_name || 'Utilisateur' }}
                        </v-list-item-title>
                    </v-list-item-content>
                    <v-spacer></v-spacer>
                    <v-btn
                        v-if="!!trip.description"
                        icon
                        @click.prevent="trip.show = !trip.show"
                    >
                        <v-icon>mdi-chevron-{{ trip.show ? 'up' : 'down' }}</v-icon>
                    </v-btn>
                </v-list-item>

                <v-expand-transition>
                    <div
                        v-show="trip.show"
                        :class="`accent ${$vuetify.theme.dark ? 'darken-1' : 'lighten-3'}`"
                    >
                        <v-card-text>
                            {{ trip.description }}
                        </v-card-text>
                    </div>
                </v-expand-transition>
            </v-card>
        </v-list>
    </v-container>
</template>

<script>
import TripCard from "./TripCard"

export default {
    name: "DisplayBookedTrips",
    components: {
        TripCard
    },
    props: {
        bookings: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            confirmDeletion: false,
        }
    },
    computed: {
        noBookings() {
            return this.bookings === undefined || this.bookings.length === 0
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
        cancelBooking(id) {
            this.$axios.delete(`/api/v1/users/bookings/${id}`)
                .then(() => {
                    this.$emit('refresh')
                    this.confirmDeletion = false
                })
                .catch(err => {
                    console.log(err)
                })
        },
    }
}
</script>

<style scoped lang="sass">
*
    word-break: keep-all
</style>
