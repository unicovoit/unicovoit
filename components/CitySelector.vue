<template>
    <v-autocomplete
        v-model="query"
        :rules="rules"
        :items="suggestions"
        :search-input.sync="input"
        no-filter
        outlined
        hide-selected
        hide-no-data
        hide-spin-buttons
        :label="label"
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
        label: {
            type: String,
            default: "Ville"
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
            getSuggestions: setTimeout(() => {}, 0),
            suggestions: [],
        }
    },
    methods: {
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
                    })
                }
            }, 200)
        },
    },
    watch: {
        input(val) {
            this.refreshSuggestions(val)
        },
        query(val) {
            try {
                let coord = this.searchSuggestions.find(s => s.properties.label === val).geometry.coordinates
                this.$emit("changeCity", coord)
                this.$emit("changeCityName", val)
            } catch (e) {
                console.error(e)
            }
        },
    }
}
</script>

<style scoped>

</style>
