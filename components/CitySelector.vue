<template>
    <v-combobox
        v-model="city"
        :rules="rules"
        :items="cities"
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
        }
    },
    data() {
        return {
            city: this.cityProp,
            rules: [
                v => !this.req || (!!v || 'Merci de renseigner ce champ'),
            ],
            cities: [
                "Paris",
                "Lyon",
                "Marseille",
                "Toulouse",
                "Nice",
                "Nantes",
                "Strasbourg",
                "Montpellier",
                "Bordeaux",
                "Lille",
                "Rennes",
                "Reims",
                "Le Havre",
                "Saint-Étienne",
                "Toulon",
                "Grenoble",
                "Dijon",
                "Angers",
                "Villeurbanne",
                "Brest",
                "Le Mans",
                "Clermont-Ferrand",
                "Amiens",
                "Aix-en-Provence",
                "Limoges",
                "Tours",
                "Nîmes",
                "Perpignan",
                "Besançon",
                "Orléans",
                "Mulhouse",
                "Metz",
                "Rouen",
                "Caen",
                "Nancy",
                "Saint-Denis",
                "Aulnay-sous-Bois",
                "Argenteuil",
                "Montreuil",
                "Versailles",
                "Roubaix",
                "Asnieres-sur-Seine",
                "Aubervilliers",
                "Cergy",
                "Colombes",
                "Pau",
                "Mérignac",
                "Saint-Maur-des-Fossés",
                "Saint-Nazaire",
                "Saint-Quentin",
                "Saint-Priest",
                "Saint-Malo",
            ]
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
