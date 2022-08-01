<template>
    <v-container>
        <h2
            class="text-h2"
        >
            Proposer un trajet
        </h2>

        <v-alert
            v-if="isOffline"
            border="left"
            class="mx-2 my-4"
            type="warning"
        >
            Vous n'êtes pas connecté à internet. Vous ne pouvez pas enregistrer de nouveaux trajet.
        </v-alert>

        <div
            v-if="success"
        >
            <v-alert
                border="left"
                class="mx-2 my-4"
                type="success"
            >
                Trajet ajouté !
            </v-alert>
            <v-btn
                class="mt-8"
                text
                block
                @click="$router.push({path: '/activity', query: {trips: 1}})"
            >
                Voir mes trajets
            </v-btn>
        </div>
        <v-alert
            v-if="error"
            border="left"
            class="mx-2 my-4"
            type="error"
        >
            Une erreur est survenue. Merci de réessayer plus tard.
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
                Lieu de départ
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
                    Suivant
                </v-btn>
            </v-stepper-content>

            <!-- Select the arrival city -->
            <v-stepper-step
                :complete="steps > 2"
                step="2"
            >
                Lieu d'arrivée
                <small>{{ details.to }}</small>
            </v-stepper-step>
            <v-stepper-content
                step="2"
            >
                <CitySelector
                    :cityProp="trip.to"
                    :req="true"
                    @changeCity="changeTo"
                    @submit="nextStep"
                    @changeCityName="val => {toCityName = val}"
                ></CitySelector>

                <v-btn
                    color="primary"
                    @click="nextStep"
                >
                    Suivant
                </v-btn>
                <v-btn
                    text
                    @click="prevStep"
                >
                    Retour
                </v-btn>
            </v-stepper-content>

            <!-- Select the departure date & time -->
            <v-stepper-step
                :complete="steps > 3"
                step="3"
            >
                Date et heure de départ
                <small>{{ details.date }}</small>
            </v-stepper-step>
            <v-stepper-content step="3">
                <DateSelector
                    @changeDate="changeDate"
                ></DateSelector>
                <TimeSelector
                    @changeTime="changeTime"
                ></TimeSelector>
                <v-btn
                    color="primary"
                    @click="nextStep"
                >
                    Suivant
                </v-btn>
                <v-btn
                    text
                    @click="prevStep"
                >
                    Retour
                </v-btn>
            </v-stepper-content>

            <!-- Select the number of available spaces -->
            <v-stepper-step
                :complete="steps > 4"
                step="4"
            >
                Nombre de places
                <small>{{ details.places }}</small>
            </v-stepper-step>
            <v-stepper-content step="4">
                <v-text-field
                    v-model="trip.places"
                    :rules="rules.places"
                    label="Places"
                    placeholder="2"
                    @keyup.native.enter="nextStep"
                ></v-text-field>
                <v-btn
                    color="primary"
                    @click="nextStep"
                >
                    Suivant
                </v-btn>
                <v-btn
                    text
                    @click="prevStep"
                >
                    Retour
                </v-btn>
            </v-stepper-content>

            <!-- Select the price per passenger -->
            <v-stepper-step
                :complete="steps > 5"
                step="5"
            >
                Prix
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
                    Nous estimons que ce trajet vous coutera environ {{ estimatedPrice }}€
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
                    :placeholder="String(Math.round(estimatedPrice/trip.places))"
                    suffix="€"
                    @keyup.native.enter="nextStep"
                ></v-text-field>
                <v-btn
                    color="primary"
                    @click="nextStep"
                >
                    Suivant
                </v-btn>
                <v-btn
                    text
                    @click="prevStep"
                >
                    Retour
                </v-btn>
            </v-stepper-content>
            <!-- Explain the price suggestion -->
            <v-dialog
                v-model="priceExplanation"
                max-width="500px"
            >
                <v-card>
                    <v-card-title>
                        Comment le prix est-il estimé ?
                    </v-card-title>
                    <v-card-text
                        class="py-0"
                    >
                        Nous basons notre estimation sur la consommation moyenne d'une voiture, ici 5.5 L/100km,
                        et la distance du trajet,
                        en prenant en compte le prix moyen du SP95-E10 en France.<br>
                        Les péages ne sont pas pris en compte.
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
                Description
                <small>
                    {{ details.description }}
                </small>
            </v-stepper-step>
            <v-stepper-content step="6">
                <v-textarea
                    v-model="trip.description"
                    auto-grow
                    :counter="150"
                    label="Facultatif"
                    name="description"
                    placeholder="Points de rencontre et horaires flexibles ou non, taille des bagages, etc."
                    value=""
                    outlined
                    :rules="rules.description"
                ></v-textarea>
                <v-btn
                    color="primary"
                    :loading="loading"
                    @click="submit"
                >
                    Envoyer
                </v-btn>
                <v-btn
                    text
                    @click="prevStep"
                >
                    Retour
                </v-btn>
            </v-stepper-content>
        </v-stepper>
    </v-container>
</template>

<script>
import CitySelector from "../../components/CitySelector"
import DateSelector from "../../components/DateSelector";
import TimeSelector from "../../components/TimeSelector";

export default {
    name: "add",
    components: {
        TimeSelector,
        DateSelector,
        CitySelector
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
                from: "Sélectionnez une adresse",
                to: "Sélectionnez une adresse",
                date: "",
                price: "Fixez le prix par passager",
                places: "Le nombre de passagers que vous pouvez transporter",
                description: "Il est préférable d'ajouter une description à votre trajet afin d'en définir les modalités"
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
                    v => !!v || "Merci de renseigner le prix",
                    v => v >= 0 || "Prix trop bas",
                    v => v <= 100 || "Prix trop élevé",
                    v => /^\d{1,3}$/.test(v) || "Prix invalide",
                ],
                places: [
                    v => !!v || "Merci de renseigner le nombre de places",
                    v => /^[1-5]$/.test(v) || "Merci d'entrer un nombre entier entre 1 et 5",
                ],
                city: [
                    v => !!v || "Merci de renseigner un lieu",
                    v => {
                        if (v.length !== 2) {
                            return "Merci de renseigner un lieu valide"
                        } else {
                            if (/\d+(.\d+)?/.test(v[0]) || /\d+(.\d+)?/.test(v[1])) {
                                return true
                            } else {
                                return "Merci de renseigner un lieu valide"
                            }
                        }
                    },
                ],
                description: [
                    v => v.length <= 150 || 'La description ne doit pas dépasser 150 caractères',
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
            return date.toLocaleDateString('fr-FR', options)
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
                    }
                    break
                case 3:
                    this.steps++
                    this.details.date = this.parseDateTime(this.trip.departure_time)
                    this.details.date = this.details.date.charAt(0).toUpperCase() + this.details.date.slice(1)
                    break
                case 4:
                    await this.estimatePrice()
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
            let d = new Date()
            this.trip.departure_time.setHours((parseInt(hour) + d.getTimezoneOffset()) % 24)
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
            const litrePerKm = 5.5 / 100
            let price = await this.getPetrolPrice()
            let distance = await this.getDistance()
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
