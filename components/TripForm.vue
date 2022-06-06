<template>
    <v-form
        ref="form"
        lazy-validation
        @keyup.native.enter="valid && validate($event)"
    >
        <v-row>
            <v-autocomplete
                v-model="fromQuery"
                :rules="rules"
                :items="fromSuggestions"
                :search-input.sync="fromInput"
                clearable
                no-filter
                outlined
                hide-selected
                hide-no-data
                hide-spin-buttons
                label="Lieu de départ"
                placeholder="Adresse précise"
                prepend-inner-icon="mdi-map-marker"
                required
            ></v-autocomplete>
        </v-row>
        <v-row>
            <v-autocomplete
                v-model="toQuery"
                :rules="rules"
                :items="toSuggestions"
                :search-input.sync="toInput"
                clearable
                no-filter
                outlined
                label="Lieu d'arrivée"
                placeholder="Adresse précise"
                hide-no-data
                hide-selected
                prepend-inner-icon="mdi-map-marker"
                required
                return-object
            ></v-autocomplete>
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
</template>

<script>
import DateSelector from "./DateSelector";

export default {
    name: "TripForm",
    components: {
        DateSelector
    },
    data() {
        return {
            fromSuggestions: [],
            fromQuery: '',
            fromInput: '',
            toSuggestions: [],
            toQuery: '',
            toInput: '',
            search: {
                from: null,
                to: null,
                date: null,
            },
            rules: [
                v => !!v || 'Merci de renseigner ce champ',
            ],
            call: setTimeout(() => {
            }, 0),
            suggestions: [],
        }
    },
    methods: {
        validate() {
            this.$router.push({
                path: '/trips',
                query: {
                    from: this.search.from,
                    to: this.search.to,
                    date: this.search.date,
                },
            })
        },
        changeDate(date) {
            this.search.date = date
        },
        refreshSuggestions(query, suggestions) {
            clearTimeout(this.getSuggestions)
            this.getSuggestions = setTimeout(() => {
                if (query !== '' && query !== null) {
                    console.log(query)
                    let req = this.$axios.create()
                    delete req.defaults.headers.common['Authorization']
                    req.get(`https://${this.$config.API_DOMAIN}/search`, {
                        params: {
                            q: query
                        }
                    }).then(res => {
                        this.suggestions = res.data.features
                        console.log(this.suggestions)
                        this[suggestions] = []
                        for(const suggestion of this.suggestions) {
                            this[suggestions].push(suggestion.properties.label)
                        }
                    })
                }
            }, 600)
        },
    },
    watch: {
        fromInput(val) {
            this.refreshSuggestions(val, "fromSuggestions")
        },
        toInput(val) {
            this.refreshSuggestions(val, "toSuggestions")
        },
        fromQuery(val) {
            console.log(val)
            let [lon, lat] = this.suggestions.find(s => s.properties.label === val).geometry.coordinates
            this.search.from = btoa(`${lon},${lat}`)
        },
        toQuery(val) {
            let [lon, lat] = this.suggestions.find(s => s.properties.label === val).geometry.coordinates
            this.search.to = btoa(`${lon},${lat}`)
        },
    }
}
</script>

<style scoped>

</style>
