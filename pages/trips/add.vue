<template>
    <div>
        <v-main
            class="text-h2 mt-n10"
            color="primary"
        >
            Proposer un trajet
        </v-main>

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
                <small>Sélectionnez le lieu précis dans la ville</small>
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
                <small>Sélectionnez le lieu précis dans la ville</small>
            </v-stepper-step>
            <v-stepper-content step="2">
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
                <small>Donnez une heure précise</small>
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
                <small>Vous fixez le prix par passager vous-même. Attention à ne pas le mettre trop élevé !</small>
            </v-stepper-step>
            <v-stepper-content step="4">
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
                    filled
                    label="Facultatif"
                    name="description"
                    placeholder="Points de rencontre et horaires flexibles ou non, taille des bagages, etc."
                    value=""
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
    </div>
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
                ]
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
                console.log(rules)
                let valid = true
                rules.forEach(rule => {
                    let v = rule(value)
                    if (typeof v !== "boolean" && v !== true) {
                        valid = false
                    }
                })
                return valid
            }

            console.log(this.rules.city)

            switch (this.steps) {
                case 1:
                    if (this.trip.from && verifyRules(this.rules.city, this.trip.from)) this.steps++
                    break
                case 2:
                    if (this.trip.to && verifyRules(this.rules.city, this.trip.to)) this.steps++
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
            this.trip.departure_time.setUTCFullYear(year)
            this.trip.departure_time.setUTCMonth(month - 1)
            this.trip.departure_time.setUTCDate(day)
        },
        changeTime(time) {
            let [hour, minute] = time.split(":")
            this.trip.departure_time.setUTCHours(hour)
            this.trip.departure_time.setUTCMinutes(minute)
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

<style lang="sass" scoped>
small
    margin-top: 4px
</style>
