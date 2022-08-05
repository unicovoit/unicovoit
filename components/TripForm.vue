<template>
    <v-responsive
        max-width="600"
        width="100%"
        class="pa-3"
    >
        <v-form
            ref="form"
            lazy-validation
            @keyup.native.enter="validate($event)"
        >
            <v-row>
                <CitySelector
                    :req="true"
                    label="Lieu de départ"
                    error="Merci de renseigner un lieu"
                    @changeCity="changeFrom"
                ></CitySelector>
            </v-row>
            <v-row>
                <CitySelector
                    :req="true"
                    label="Lieu d'arrivée"
                    error="Merci de renseigner un lieu"
                    @changeCity="changeTo"
                ></CitySelector>
            </v-row>
            <v-row>
                <DateSelector
                    @changeDate="changeDate"
                ></DateSelector>
            </v-row>
            <div
                style="display: flex; justify-content: space-between; align-items: flex-end;"
            >
                <v-spacer></v-spacer>
                <v-btn
                    rounded
                    class="mt-4"
                    color="primary"
                    x-large
                    @click="validate"
                >
                    Rechercher
                </v-btn>
            </div>
        </v-form>
    </v-responsive>
</template>

<script>
export default {
    name: "TripForm",
    data() {
        return {
            search: {
                from: null,
                to: null,
                date: null,
            },
            rules: [
                v => !!v || 'Merci de renseigner ce champ',
            ],
        }
    },
    methods: {
        validate() {
            this.$router.push({
                path: '/trips',
                query: {
                    from: this.search.from?.join(','),
                    to: this.search.to?.join(','),
                    date: this.search.date,
                },
            })
        },
        changeFrom(city) {
            this.search.from = city
        },
        changeTo(city) {
            this.search.to = city
        },
        changeDate(date) {
            this.search.date = date
        },
    },
}
</script>

<style scoped lang="sass">
@import "vuetify/src/styles/settings/_variables.scss"

@media screen and (min-width: #{map-get($display-breakpoints, 'md-and-up')})
    .v-form
        max-width: 50rem

.v-text-field--outlined > .v-input__control > .v-input__slot
    background: #ffffff !important
</style>
