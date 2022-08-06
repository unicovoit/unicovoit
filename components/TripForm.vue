<template>
    <v-responsive
        :class="$vuetify.theme.dark ? 'grey darken-4' : 'white'"
        class="pa-sm-3 pa-md-5 rounded-lg"
        max-width="1280"
        width="100%"
    >
        <v-form
            ref="form"
            class="d-md-flex flex-md-row align-start"
            lazy-validation
        >
            <CitySelector
                :inner="mobile"
                :req="true"
                :rounded="mobile"
                class="mr-md-4"
                error="Merci de renseigner un lieu"
                label="Lieu de départ"
                @changeCity="changeFrom"
            ></CitySelector>
            <CitySelector
                :inner="mobile"
                :req="true"
                :rounded="mobile"
                class="mr-md-4"
                error="Merci de renseigner un lieu"
                label="Lieu d'arrivée"
                @changeCity="changeTo"
            ></CitySelector>
            <DateSelector
                :rounded="mobile"
                @changeDate="changeDate"
            ></DateSelector>
            <div
                style="display: flex; justify-content: space-between; align-items: flex-end;"
            >
                <v-spacer class="d-sm-block d-md-none"></v-spacer>
                <v-btn
                    class="mt-sm-4 mt-md-2 ml-md-4"
                    color="primary"
                    rounded
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
            mobile: this.$device.isMobileOrTablet,
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

<style lang="sass" scoped>
@import "vuetify/src/styles/settings/_variables.scss"

.v-text-field--outlined > .v-input__control > .v-input__slot
    background: #ffffff !important

.v-input
    border-color: transparent
</style>
