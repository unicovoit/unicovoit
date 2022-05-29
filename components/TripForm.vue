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
                placeholder="Nom de ville"
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
                placeholder="Nom de ville"
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
            call: setTimeout(() => {}, 0),
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
                let notResult = this.suggestions.filter(s => s.place_name.toLowerCase().indexOf(query.toLowerCase()) !== -1).length === 0

                if (query !== '' && notResult) {
                    this.$axios.get('/api/v1/trips/search', {
                        params: {
                            q: query
                        }
                    }).then(res => {
                        this.suggestions = res.data
                        this[suggestions] = []
                        for(const suggestion of this.suggestions) {
                            this[suggestions].push(suggestion.place_name)
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
            this.search.from = this.suggestions.find(s => s.place_name === val).id
        },
        toQuery(val) {
            this.search.to = this.suggestions.find(s => s.place_name === val).id
        },
    }
}
</script>

<style scoped>

</style>
