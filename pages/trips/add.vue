<template>
    <v-container>
        <h2
            class="text-h2"
        >
            {{ $t('tripAdd.title') }}
        </h2>

        <v-alert
            v-if="isOffline"
            border="left"
            class="mx-2 my-4"
            type="warning"
        >
            {{ $t('tripAdd.offline') }}
        </v-alert>

        <div
            v-if="success"
        >
            <v-alert
                border="left"
                class="mx-2 my-4"
                type="success"
            >
                {{ $t('tripAdd.added') }}
            </v-alert>
            <v-btn
                class="mt-8"
                text
                block
                @click="$router.push({path: localePath('/activity'), query: {trips: 1}})"
            >
                {{ $t('tripAdd.seeTrips') }}
            </v-btn>
        </div>
        <v-alert
            v-if="error"
            border="left"
            class="mx-2 my-4"
            type="error"
        >
            {{ $t('error.genericError') + '. ' + $t('error.tryAgain') }}
        </v-alert>

        <v-stepper
            v-if="!success"
            v-model="steps"
            class="mx-n2"
            outlined
            style="border: none"
            vertical
        >
            <!-- Select the departure city -->
            <v-stepper-step
                :complete="steps > 1"
                step="1"
            >
                {{ $t('tripAdd.departureCity.title') }}
                <small>{{ details.from }}</small>
            </v-stepper-step>
            <v-stepper-content step="1">
                <CitySelector
                    :req="true"
                    :disabled="steps > 1"
                    :error="errorMessage"
                    @changeCity="changeFrom"
                    @submit="nextStep"
                    @changeCityName="val => {fromCityName = val}"
                ></CitySelector>

                <v-btn
                    color="primary"
                    @click="nextStep"
                >
                    {{ $t("tripAdd.next") }}
                </v-btn>
            </v-stepper-content>

            <!-- Select the arrival city -->
            <v-stepper-step
                :complete="steps > 2"
                step="2"
            >
                {{ $t('tripAdd.arrivalCity.title') }}
                <small>{{ details.to }}</small>
            </v-stepper-step>
            <v-stepper-content
                step="2"
            >
                <LazyCitySelector
                    :cityProp="trip.to"
                    :req="true"
                    @changeCity="changeTo"
                    @submit="nextStep"
                    @changeCityName="val => {toCityName = val}"
                ></LazyCitySelector>

                <v-btn
                    color="primary"
                    @click="nextStep"
                >
                    {{ $t("tripAdd.next") }}
                </v-btn>
                <v-btn
                    text
                    @click="prevStep"
                >
                    {{ $t("tripAdd.back") }}
                </v-btn>
            </v-stepper-content>

            <!-- Select the departure date & time -->
            <v-stepper-step
                :complete="steps > 3"
                step="3"
            >
                {{ $t('tripAdd.departureDate.title') }}
                <small>{{ details.date }}</small>
            </v-stepper-step>
            <v-stepper-content step="3">
                <LazyDateSelector
                    @changeDate="changeDate"
                ></LazyDateSelector>
                <TimeSelector
                    @changeTime="changeTime"
                ></TimeSelector>
                <v-btn
                    color="primary"
                    @click="nextStep"
                >
                    {{ $t("tripAdd.next") }}
                </v-btn>
                <v-btn
                    text
                    @click="prevStep"
                >
                    {{ $t("tripAdd.back") }}
                </v-btn>
            </v-stepper-content>

            <!-- Select the number of available spaces -->
            <v-stepper-step
                :complete="steps > 4"
                step="4"
            >
                {{ $t('tripAdd.seats.title') }}
                <small>{{ details.places }}</small>
            </v-stepper-step>
            <v-stepper-content step="4">
                <v-text-field
                    v-model="trip.places"
                    :rules="rules.places"
                    :label="$t('tripAdd.seats.short')"
                    placeholder="2"
                    @keyup.native.enter="nextStep"
                ></v-text-field>
                <v-btn
                    color="primary"
                    @click="nextStep"
                >
                    {{ $t("tripAdd.next") }}
                </v-btn>
                <v-btn
                    text
                    @click="prevStep"
                >
                    {{ $t("tripAdd.back") }}
                </v-btn>
            </v-stepper-content>

            <!-- Select the price per passenger -->
            <v-stepper-step
                :complete="steps > 5"
                step="5"
            >
                {{ $t('tripAdd.price.title') }}
                <small>{{ details.price }}</small>
            </v-stepper-step>
            <v-stepper-content step="5">
                <v-alert
                    class="text-body-2"
                    color="primary"
                    border="left"
                    elevation="2"
                    colored-border
                    icon="mdi-information"
                >
                    {{ $t('tripAdd.priceExplanation.short') }}
                    {{ estimatedPrice }}€
                    <v-icon
                        dense
                        @click="priceExplanation = true"
                    >mdi-help-circle-outline
                    </v-icon>
                </v-alert>
                <v-text-field
                    v-model="trip.price"
                    :rules="rules.price"
                    label="Prix"
                    :placeholder="String(Math.ceil(estimatedPrice/trip.places))"
                    suffix="€"
                    @keyup.native.enter="nextStep"
                ></v-text-field>
                <v-btn
                    color="primary"
                    @click="nextStep"
                >
                    {{ $t("tripAdd.next") }}
                </v-btn>
                <v-btn
                    text
                    @click="prevStep"
                >
                    {{ $t("tripAdd.back") }}
                </v-btn>
            </v-stepper-content>
            <!-- Explain the price suggestion -->
            <v-dialog
                v-model="priceExplanation"
                max-width="500px"
            >
                <v-card>
                    <v-card-title>
                        {{ $t('tripAdd.priceExplanation.title') }}
                    </v-card-title>
                    <v-card-text
                        class="py-0"
                    >
                        <i18n path="tripAdd.priceExplanation.description" tag="span">
                            <br>
                        </i18n>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="primary"
                            text
                            @click="priceExplanation = false"
                        >
                            OK
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <!-- Give a short description to the trip for additional information -->
            <v-stepper-step
                :complete="steps > 6"
                step="6"
            >
                {{ $t('tripAdd.description.title') }}
                <small>
                    {{ details.description }}
                </small>
            </v-stepper-step>
            <v-stepper-content step="6">
                <v-textarea
                    v-model="trip.description"
                    auto-grow
                    :counter="150"
                    :label="$t('form.optional')"
                    name="description"
                    value=""
                    outlined
                    :rules="rules.description"
                ></v-textarea>
                <v-btn
                    color="primary"
                    :loading="loading"
                    @click="submit"
                >
                    {{ $t("tripAdd.send") }}
                </v-btn>
                <v-btn
                    text
                    @click="prevStep"
                >
                    {{ $t("tripAdd.back") }}
                </v-btn>
            </v-stepper-content>
        </v-stepper>
    </v-container>
</template>

<script>
export default {
    name: "add",
    head() {
        return {
            title: this.$t("tripAdd.title")
        }
    },
    data() {
        return {
            success: false,
            error: false,
            errorMessage: "",
            estimatedPrice: 0,
            priceExplanation: false,
            loading: false,
            details: {
                from: this.$t('tripAdd.departureCity.subtitle'),
                to: this.$t('tripAdd.arrivalCity.subtitle'),
                date: "",
                price: this.$t('tripAdd.price.subtitle'),
                places: this.$t('tripAdd.seats.subtitle'),
                description: this.$t('tripAdd.description.subtitle')
            },
            trip: {
                from: [],
                to: [],
                price: "",
                description: "",
                departure_time: new Date(),
                driver_id: this.$store.state.auth.user.sub,
                places: "",
            },
            fromCityName: "",
            toCityName: "",
            steps: 1,
            rules: {
                price: [
                    v => !!v || this.$t('error.required'),
                    v => v >= 0 || this.$t('error.tooLow'),
                    v => v <= 100 || this.$t('error.tooHigh'),
                    v => /^\d{1,3}$/.test(v) || this.$t('error.invalid')
                ],
                places: [
                    v => !!v || this.$t('error.required'),
                    v => /^[1-5]$/.test(v) || this.$t('error.invalid'),
                ],
                city: [
                    v => !!v || this.$t('error.required'),
                    v => {
                        if (v.length !== 2) {
                            return this.$t('error.invalid')
                        } else {
                            if (/\d+(.\d+)?/.test(v[0]) || /\d+(.\d+)?/.test(v[1])) {
                                return true
                            } else {
                                return this.$t('error.invalid')
                            }
                        }
                    },
                ],
                description: [
                    v => v.length <= 150 || this.$t('error.tooLong'),
                ],
            },
        }
    },
    computed: {
        isOffline() {
            return this.$nuxt.isOffline
        },
    },
    deactivated() {
        if (this.success){
            this.trip = {
                from: [],
                    to: [],
                    price: "",
                    description: "",
                    departure_time: new Date(),
                    driver_id: this.$store.state.auth.user.sub,
                    places: "",
            }
            this.details = {
                from: this.$t('tripAdd.departureCity.subtitle'),
                to: this.$t('tripAdd.arrivalCity.subtitle'),
                date: "",
                price: this.$t('tripAdd.price.subtitle'),
                places: this.$t('tripAdd.seats.subtitle'),
                description: this.$t('tripAdd.description.subtitle')
            }
            this.success = false
            this.steps = 1
        }
    },
    methods: {
        parseDateTime(date) {
            console.log(date)
            date = new Date(date)
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
        async nextStep() {
            const verifyRules = (rules, value) => {
                let valid = true
                rules.forEach(rule => {
                    let v = rule(value)
                    if (typeof v !== "boolean" && v !== true) {
                        valid = false
                    }
                })
                return valid
            }

            switch (this.steps) {
                case 1:
                    if (this.trip.from && verifyRules(this.rules.city, this.trip.from)) {
                        this.steps++
                        this.details.from = this.fromCityName
                    }
                    break
                case 2:
                    if (this.trip.to && verifyRules(this.rules.city, this.trip.to)) {
                        this.steps++
                        this.details.to = this.toCityName
                        this.estimatePrice()
                    }
                    break
                case 3:
                    this.steps++
                    this.details.date = this.parseDateTime(this.trip.departure_time)
                    this.details.date = this.details.date.charAt(0).toUpperCase() + this.details.date.slice(1)
                    break
                case 4:
                    if (this.trip.places && verifyRules(this.rules.places, this.trip.places)) {
                        this.steps++
                        this.details.places = this.trip.places
                    }
                    break
                case 5:
                    if (this.trip.price && verifyRules(this.rules.price, this.trip.price)) {
                        this.steps++
                        this.details.price = this.trip.price + " €"
                    }
                    break
                default:
                    this.steps++
                    break
            }
        },
        prevStep() {
            this.steps--
        },
        changeFrom(city) {
            this.trip.from = city
        },
        changeTo(city) {
            this.trip.to = city
        },
        changeDate(date) {
            let [year, month, day] = date.split("-")
            this.trip.departure_time.setFullYear(year)
            this.trip.departure_time.setMonth(month - 1)
            this.trip.departure_time.setDate(day)
        },
        changeTime(time) {
            let [hour, minute] = time.split(":")
            this.trip.departure_time.setHours(hour)
            this.trip.departure_time.setMinutes(minute)
        },
        async getPetrolPrice() {
            let req = await this.$axios.get("/api/v1/trips/petrol")
            return req.data
        },
        async getDistance() {
            let req = await this.$axios.get('/api/v1/trips/distance', {
                params: {
                    from: this.trip.from.join(","),
                    to: this.trip.to.join(","),
                }
            })
            return req.data.distance
        },
        async estimatePrice() {
            const litrePerKm = 6 / 100
            let [price, distance] = await Promise.all([this.getPetrolPrice(), this.getDistance()])
            this.estimatedPrice = Math.round(distance * litrePerKm * price)
        },
        submit() {
            if (!(this.success || this.error)) {
                this.loading = true
                this.$axios.post("/api/v1/trips/add", this.trip)
                    .then(r => {
                        this.success = true
                        this.error = false
                        this.loading = false
                        window.scrollTo(0, 0)
                    }).catch(error => {
                        this.error = true
                        this.success = false
                        console.error(error)
                    })
            }
        }
    },
}
</script>

<style lang="sass">
small
    margin-top: 4px

.v-autocomplete,
.v-input,
.v-textarea
    padding-top: .4rem !important
</style>
