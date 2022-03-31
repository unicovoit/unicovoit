<template>
    <v-container>
        <div
        >
            <v-main
                class="text-h2 mt-n10"
                color="primary"
            >
                Trajet
            </v-main>

            <v-timeline
                class="mb-10"
                dense
                justify="center"
                large
            >
                <v-timeline-item
                    color="info"
                    icon="mdi-map-marker"
                    fill-dot
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
                    icon="mdi-map-marker"
                    fill-dot
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
                outlined
                class="mt-3"
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
                outlined
                class="py-3 mt-3"
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
                            {{ trip.price }}
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-card>
        </div>
    </v-container>
</template>

<script>
export default {
    name: "book",
    computed: {
        parseDate() {
            const date = new Date(this.trip.date);
            let options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
            return date.toLocaleDateString('fr-FR', options);
        }
    },
    async asyncData({ error, params, $axios }) {
        try {
            const trip = await $axios.$get(`/api/v1/trips/${params.id}`)
            return { trip }
        } catch (e) {
            error({ statusCode: 404, message: 'Trip not found' })
        }
    }
}
</script>

<style scoped>

</style>
