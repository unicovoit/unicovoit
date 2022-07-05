<template>
    <v-autocomplete
        v-model="query"
        :rules="rules"
        :items="suggestions"
        :search-input.sync="input"
        clearable
        no-filter
        outlined
        hide-selected
        hide-no-data
        hide-spin-buttons
        label="Ville"
        placeholder="Adresse précise"
        prepend-inner-icon="mdi-map-marker"
        required
    ></v-autocomplete>
</template>

<script>
export default {
    name: "CitySelector",
    props: {
        req: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            city: "",
            rules: [
                v => !this.req || (!!v || 'Merci de renseigner ce champ'),
            ],
            searchSuggestions: [],
            query: '',
            input: '',
            call: setTimeout(() => {
            }, 0),
            suggestions: [],
        }
    },
    methods: {
        changeCity(city) {
            this.$emit("changeCity", city)
        },
        refreshSuggestions(query) {
            clearTimeout(this.getSuggestions)
            this.getSuggestions = setTimeout(() => {
                if (query !== '' && query !== null) {
                    let req = this.$axios.create()
                    delete req.defaults.headers.common['Authorization']
                    req.get(`https://${this.$config.ADDOK_DOMAIN}/search`, {
                        params: {
                            q: query
                        }
                    }).then(res => {
                        this.searchSuggestions = res.data.features
                        this.suggestions = []
                        for(const suggestion of this.searchSuggestions) {
                            this.suggestions.push(suggestion.properties.label)
                        }
                        console.table(this.suggestions)
                    })
                }
            }, 600)
        },
    },
    watch: {
        input(val) {
            this.refreshSuggestions(val)
        },
        query(val) {
            let [lon, lat] = this.searchSuggestions.find(s => s.properties.label === val).geometry.coordinates
            let cityBase64 = Buffer.from(`${lat},${lon}`).toString('base64')
            this.$emit("changeCity", cityBase64)
        },
    }
}
</script>

<style scoped>

</style>
