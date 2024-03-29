<template>
    <v-responsive
        max-width="600"
    >
        <v-card
            class="mb-5"
            outlined
            lazy
            rounded="lg"
            :to="localePath(`/trips/${trip.id}`)"
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
                    class="mr-4"
                    cols="auto"
                >
                    <ViewTrip
                        v-if="type === 'view'"
                        @refresh="$emit('refresh')"
                    />
                    <EditOrDelete
                        v-else-if="type === 'edit'"
                        :trip="trip"
                        @refresh="$emit('refresh')"
                    />
                    <Delete
                        v-else-if="type === 'delete'"
                        :trip="trip"
                        :id="id"
                        @refresh="$emit('refresh')"
                    />
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
                        <v-icon class="mr-3">mdi-piggy-bank-outline</v-icon>
                        {{ trip.price }} €
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-list-item justify="center">
                <v-list-item-title>
                    <v-avatar
                        size="40"
                        class="mr-3"
                    >
                        <v-img
                            :alt="trip.driver?.nickname || $t('profile.user')"
                            :src="trip.driver?.picture || '/account_circle.svg'"
                        ></v-img>
                    </v-avatar>
                    {{ trip.driver?.nickname || trip.driver?.name || $t('profile.user') }}
                </v-list-item-title>
                <v-spacer></v-spacer>
                <v-icon
                    v-if="requestPending"
                    color="warning"
                >
                    mdi-timer-sand
                </v-icon>
                <v-icon
                    v-if="trip.driver.autoBook"
                >
                    mdi-flash
                </v-icon>
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
    </v-responsive>
</template>

<script>
import Delete from "./controls/Delete"
import EditOrDelete from "./controls/EditOrDelete"
import ViewTrip from "./controls/ViewTrip"

export default {
    name: "TripCard",
    components: {
        Delete,
        EditOrDelete,
        ViewTrip
    },
    props: {
        trip: {
            type: Object,
            required: true,
        },
        type: {
            type: String,
            default: "view"
        },
        requestPending: {
            type: Boolean,
            default: false
        },
        id: String
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
            return date.toLocaleDateString(this.$i18n.locale, options)
        },
    },
}
</script>

<style scoped lang="sass">
.v-avatar
    cursor: pointer
</style>
