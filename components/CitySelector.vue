<template>
    <v-autocomplete
        v-model="query"
        :items="suggestions"
        :label="label || $t('form.city')"
        :rules="rules"
        :search-input.sync="input"
        hide-no-data
        hide-selected
        hide-spin-buttons
        no-filter
        outlined
        :placeholder="$t('form.preciseAddress')"
        :prepend-icon="inner ? '' : 'mdi-map-marker'"
        :prepend-inner-icon="inner ? 'mdi-map-marker' : ''"
        :required="req"
        :rounded="rounded"
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
            default: undefined
        },
        rounded: {
            type: Boolean,
            default: true
        },
        inner: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            city: "",
            rules: [
                v => !this.req || (!!v || this.$t('error.required')),
            ],
            searchSuggestions: [],
            query: '',
            input: '',
            getSuggestions: setTimeout(() => {
            }, 0),
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
                        for (const suggestion of this.searchSuggestions) {
                            this.suggestions.push(suggestion.properties.label)
                        }
                    })
                }
            }, 100)
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

<style lang="sass" scoped>
</style>
