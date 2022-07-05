<template>
    <v-card
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
                <v-card-title id="trip-cities">
                    {{ trip.fromCity }}
                    <v-icon color="text--primary" class="mx-2">mdi-arrow-right-bold</v-icon>
                    {{ trip.toCity }}
                </v-card-title>
            </v-col>
            <v-col
                cols="auto"
            >
                <v-btn
                    id="book-trip"
                    color="primary"
                    icon
                >
                    <v-icon size="35">mdi-car-arrow-right</v-icon>
                </v-btn>
            </v-col>
        </v-row>

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
</template>

<script>
export default {
    name: "TripCard",
    props: {
        trip: {
            type: Object,
            required: true,
        },
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
    },
}
</script>

<style scoped>

</style>
