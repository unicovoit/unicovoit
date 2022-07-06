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

        <v-alert
            v-if="success"
            border="left"
            class="mx-2 my-4"
            type="success"
        >
            Trajet ajouté !
        </v-alert>
        <v-alert
            v-if="error"
            border="left"
            class="mx-2 my-4"
            type="error"
        >
            Une erreur est survenue. Merci de réessayer plus tard.
        </v-alert>

        <v-stepper
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
                <small>Sélectionnez une adresse</small>
            </v-stepper-step>
            <v-stepper-content step="1">
                <CitySelector
                    :req="true"
                    :disabled="steps > 1"
                    :error="errorMessage"
                    @changeCity="changeFrom"
                    @submit="nextStep"
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
                <small>Sélectionnez une adresse</small>
            </v-stepper-step>
            <v-stepper-content
                step="2"
            >
                <CitySelector
                    :cityProp="trip.to"
                    :req="true"
                    @changeCity="changeTo"
                    @submit="nextStep"
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

            <!-- Select the price per passenger -->
            <v-stepper-step
                :complete="steps > 4"
                step="4"
            >
                Prix
                <small>Fixez le prix par passager.</small>
            </v-stepper-step>
            <v-stepper-content step="4">
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
                    placeholder="10"
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
                    <v-card-text>
                        Pour calculer le prix du trajet, nous utilisons le prix moyen instantané du SP95-E10 en France.
                        Nous le multiplions ensuite par la consommation moyenne d'une voiture, ici 5.5 L/100km,
                        et par la distance du trajet.
                        Le tout est arrondi à l'entier.<br>
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

            <!-- Select the number of available spaces -->
            <v-stepper-step
                :complete="steps > 5"
                step="5"
            >
                Nombre de places
                <small>Le nombre de passagers que vous pouvez transporter</small>
            </v-stepper-step>
            <v-stepper-content step="5">
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

            <!-- Give a short description to the trip for additional information -->
            <v-stepper-step
                :complete="steps > 6"
                step="6"
            >
                Description
                <small>
                    Il est préférable d'ajouter une description à votre trajet afin d'en définir les modalités.
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
            trip: {
                from: "",
                to: "",
                price: "",
                description: "",
                departure_time: new Date(),
                driver_id: this.$store.state.auth.user.sub,
                places: "",
            },
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
                        let coord = atob(v).split(",")
                        if (coord.length !== 2) {
                            return "Merci de renseigner un lieu valide"
                        } else {
                            if (/\d+(.\d+)?/.test(coord[0]) || /\d+(.\d+)?/.test(coord[1])) {
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
    methods: {
        nextStep() {
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
                    if (this.trip.from && verifyRules(this.rules.city, this.trip.from)) this.steps++
                    break
                case 2:
                    if (this.trip.to && verifyRules(this.rules.city, this.trip.to)) this.steps++
                    break
                case 3:
                    this.estimatePrice()
                    this.steps++
                    break
                case 4:
                    if (this.trip.price && verifyRules(this.rules.price, this.trip.price)) this.steps++
                    break
                case 5:
                    if (this.trip.places && verifyRules(this.rules.places, this.trip.places)) this.steps++
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
                    from: this.trip.from,
                    to: this.trip.to,
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
                this.$axios.post("/api/v1/trips/add", this.trip)
                    .then(r => {
                        this.success = true
                        this.error = false
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

.v-autocomplete.v-input--is-focused,
.v-input.v-input--is-label-active.v-input--is-readonly
    padding-top: .4rem !important
</style>
