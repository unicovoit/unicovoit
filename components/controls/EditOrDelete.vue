<template>
    <v-container
        class="ma-0 pa-0"
    >
        <v-btn
            v-if="false"
            color="primary"
            icon
            @click.prevent=""
        >
            <v-icon size="30">mdi-circle-edit-outline</v-icon>
        </v-btn>
        <v-btn
            block
            class="my-4"
            color="error"
            depressed
            large
            outlined
            @click.prevent="confirmDeletion = true"
        >
            <v-icon class="mr-2">mdi-delete</v-icon>
            Supprimer le trajet
        </v-btn>

        <!-- Confirm trip deletion -->
        <v-dialog
            v-model="confirmDeletion"
            max-width="500px"
        >
            <v-card>
                <v-card-title>
                    Voulez-vous vraiment supprimer ce trajet ?
                </v-card-title>
                <v-card-text>
                    Nous notifierons tous les utilisateurs qui ont réservé une place sur ce trajet.
                    <!--                    <br><br>
                                        Si vous souhaitez seulement modifier le trajet, cliquez sur l'icône <v-icon dense>mdi-circle-edit-outline</v-icon>.-->
                </v-card-text>
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
                        :loading="loading"
                        class="ma-1"
                        color="error"
                        outlined
                        @click="deleteTrip(trip.id)"
                    >
                        Supprimer
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- Confirm trip deleted -->
        <v-dialog
            v-model="deletionConfirmed"
            max-width="500px"
        >
            <v-card>
                <v-card-title>
                    Trajet supprimé
                </v-card-title>
                <v-card-text>
                    Nous avons notifié tous les utilisateurs qui avaient réservé une place sur ce trajet.
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        class="ma-1"
                        color="primary"
                        text
                        @click="ok"
                    >
                        OK
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
            deletionConfirmed: false,
            loading: false,
        };
    },
    methods: {
        deleteTrip(id) {
            this.loading = true
            this.$axios.delete(`/api/v1/trips/id/${id}`)
                .then(() => {
                    this.loading = false
                    this.confirmDeletion = false
                    this.deletionConfirmed = true
                })
                .catch(err => {
                    console.log(err)
                    this.loading = false
                })
        },
        ok() {
            this.deletionConfirmed = false
            this.$router.push('/activity?trips')
        },
    },
}
</script>

<style lang="sass" scoped>

</style>
