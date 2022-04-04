<template>
    <v-combobox
        v-model="city"
        :rules="rules"
        :items="cities"
        :disabled="disabled"
        messages="Choisissez une ville de la liste"
        filled
        label="Ville"
        prepend-inner-icon="mdi-map-marker"
        v-on:input="changeCity"
        @keyup.native.enter="$emit('submit')"
    ></v-combobox>
</template>

<script>
export default {
    name: "CitySelector",
    props: {
        cityProp: {
            type: String,
            required: true
        },
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
            city: this.cityProp,
            rules: [
                v => !this.req || (!!v || 'Merci de renseigner ce champ'),
            ],
        }
    },
    computed: {
        cities() {
            return this.$store.getters.getCities
        }
    },
    methods: {
        changeCity(city) {
            this.$emit("changeCity", city)
        },
    }
}
</script>

<style scoped>

</style>
