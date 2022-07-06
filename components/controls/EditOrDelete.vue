<template>
    <v-container
        class="ma-0 pa-0"
    >
        <v-btn
            color="primary"
            icon
            @click.prevent=""
        >
            <v-icon size="30">mdi-circle-edit-outline</v-icon>
        </v-btn>
        <v-btn
            color="error"
            icon
            @click.prevent="confirmDeletion = true"
        >
            <v-icon size="30">mdi-delete</v-icon>
        </v-btn>

        <!-- Confirm booking suppression -->
        <v-dialog
            v-model="confirmDeletion"
            max-width="500px"
        >
            <v-card>
                <v-card-title>
                    Voulez-vous vraiment supprimer ce trajet ?
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
                        @click="deleteTrip(trip.id)"
                    >
                        Supprimer
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
export default {
    name: "EditOrDelete",
    props: {
        trip: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            confirmDeletion: false,
        };
    },
    methods: {
        deleteTrip(id) {
            this.$axios.delete(`/api/v1/trips/id/${id}`)
                .then(() => {
                    this.$emit('refresh')
                    this.confirmDeletion = false
                })
                .catch(err => {
                    console.log(err)
                })
        },
    },
}
</script>

<style scoped lang="sass">
*
    word-break: keep-all
</style>
