<template>
    <v-container
        class="ma-0 pa-0"
    >
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
                    {{ $t('trip.confirmBookingCancellation') }}
                </v-card-title>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        class="ma-1"
                        color="primary"
                        text
                        @click.prevent="confirmDeletion = false"
                    >
                        {{ $t('form.cancel') }}
                    </v-btn>

                    <v-btn
                        class="ma-1"
                        color="error"
                        outlined
                        :loading="loading"
                        @click="cancelBooking(id)"
                    >
                        {{ $t('form.delete') }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
export default {
    name: "Delete",
    props: {
        trip: {
            type: Object,
            required: true,
        },
        id: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            confirmDeletion: false,
            loading: false,
        };
    },
    methods: {
        cancelBooking(id) {
            this.loading = true
            this.$axios.delete(`/api/v1/users/bookings/${id}`)
                .then(() => {
                    this.$emit('refresh')
                    this.confirmDeletion = false
                    this.loading = false
                })
                .catch(err => {
                    console.log(err)
                })
        },
    },
}
</script>

<style scoped lang="sass">

</style>
