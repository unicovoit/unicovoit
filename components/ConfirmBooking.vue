<template>
    <v-dialog
        v-model="dialog"
        :fullscreen="$vuetify.breakpoint.mobile"
        hide-overlay
        transition="dialog-bottom-transition"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                v-bind="attrs"
                v-on="on"
                rounded
                block
                class="mt-4"
                color="primary"
                x-large
            >
                {{ $t('book.title') }}
            </v-btn>
        </template>
        <v-card
            v-touch="{
                down: () => {
                    this.dialog = false
                },
            }"
        >
            <v-toolbar
                dark
                color="primary"
            >
                <v-btn
                    icon
                    dark
                    @click="dialog = false"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>{{ $t('book.title') }}</v-toolbar-title>
            </v-toolbar>

            <v-alert
                v-if="success"
                class="mx-2 my-4"
                border="left"
                type="success"
            >
                {{ trip.autoBook ? $t('book.booked') : $t('book.requestSent') }}
            </v-alert>
            <v-alert
                v-if="error"
                class="mx-2 my-4"
                border="left"
                type="error"
            >
                {{ error }}
            </v-alert>

            <v-alert
                class="mt-4 mx-2"
                icon="mdi-information"
                type="warning"
                border="left"
                text
            >
                <i18n
                    path="book.warning"
                    tag="span"
                >
                    <br>
                </i18n>
            </v-alert>

            <v-list
                subheader
            >
                <v-subheader>{{ $t('trip.title') }}</v-subheader>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>{{ trip.fromName }}, {{ trip.fromCity }}</v-list-item-title>
                        <v-list-item-subtitle>
                            {{ $t('book.departure') }}
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>{{ trip.toName }}, {{ trip.toCity }}</v-list-item-title>
                        <v-list-item-subtitle>
                            {{ $t('book.arrival') }}
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>{{ date }}</v-list-item-title>
                        <v-list-item-subtitle>
                            {{ $t('book.dateAndTime') }}
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>{{ trip.price }} €</v-list-item-title>
                        <v-list-item-subtitle>
                            {{ $t('book.price') }}
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>{{ this.trip.distance }} km</v-list-item-title>
                        <v-list-item-subtitle>
                            {{ $t('book.distance') }}
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            <v-divider></v-divider>

            <v-container class="mt-5 px-8">
                <v-btn
                    color="primary"
                    justify="center"
                    rounded
                    block
                    x-large
                    :loading="loading"
                    @click="confirm"
                >
                    {{ $t('book.sendBooking') }}
                </v-btn>
            </v-container>

            <v-container
                class="text-caption text--secondary mb-10 text-center"
            >
                {{ $t('book.afterConfirmationContactExchanged') }}
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: "ConfirmBooking",
    props: {
        trip: {
            type: Object,
            required: true
        },
        date: {
            type: String,
            required: true
        },
    },
    data() {
        return {
            dialog: false,
            distance: 0,
            error: '',
            success: false,
            loading: false,
        };
    },
    methods: {
        confirm() {
            if (!this.error) {
                this.loading = true
                this.$axios.post('/api/v1/trips/book', {
                    trip: this.trip.id,
                    user_id: this.$store.state.auth.user.sub
                }).then(response => {
                    this.loading = false
                    this.success = true
                    this.error = false
                }).catch(error => {
                    this.loading = false
                    this.error = error.response.data.error
                    this.success = false
                })
                window.scrollTo(0, 0)
            }
        },
    }
}
</script>

<style scoped lang="sass">

</style>
