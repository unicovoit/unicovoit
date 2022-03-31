<template>
    <v-container>
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
                color="info"
                fill-dot
                icon="mdi-map-marker"
                large
            >
                <v-card flat>
                    <v-card-title class="text-h5">
                        {{ trip.from }}
                    </v-card-title>
                </v-card>
            </v-timeline-item>
            <v-timeline-item
                color="info"
                fill-dot
                icon="mdi-map-marker"
                large
            >
                <v-card flat>
                    <v-card-title class="text-h5">
                        {{ trip.to }}
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
            >
                {{ trip.description }}
            </v-card-text>
            <v-card-text>
                <v-avatar
                    size="40"
                >
                    <v-img
                        :alt="trip.driver.name || 'Utilisateur'"
                        :src="trip.driver.picture || '/account_circle.svg'"
                        @click="$router.push(`/profile/${trip.driver.id}`)"
                    ></v-img>
                </v-avatar>
                &nbsp;{{ trip.driver.name || 'Utilisateur' }}
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
                        {{ parseDate }}
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
        </v-card>

        <ConfirmOrder :trip="trip"></ConfirmOrder>
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
            const date = new Date(this.trip.date);
            let options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
            return date.toLocaleDateString('fr-FR', options);
        },
    },
    async asyncData({error, params, $axios}) {
        try {
            const trip = await $axios.$get(`/api/v1/trips/${params.id}`)
            trip.distance = 0
            return {trip}
        } catch (e) {
            console.error(e)
            error({statusCode: 404, message: 'Trip not found'})
        }
    },
    async mounted() {
        this.trip.distance = await this.$axios.$get('/api/v1/trips/distance', {
                params: {
                    from: this.trip.from,
                    to: this.trip.to
                }
            }).then(response => {
                console.log(response)
                return response.distance
            })
            .catch(error => {
                console.error(error)
            })
    }
}
</script>

<style scoped>

</style>
