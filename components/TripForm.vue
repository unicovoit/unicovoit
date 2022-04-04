<template>
    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        @keyup.native.enter="valid && validate($event)"
    >
        <v-row>
            <v-text-field
                v-model="from"
                :rules="rules"
                filled
                label="Lieu de départ"
                placeholder="Nom de ville"
                prepend-inner-icon="mdi-map-marker"
                required
            ></v-text-field>
        </v-row>
        <v-row>
            <v-text-field
                v-model="to"
                :rules="rules"
                filled
                label="Lieu d'arrivée"
                placeholder="Nom de ville"
                prepend-inner-icon="mdi-map-marker"
                required
            ></v-text-field>
        </v-row>
        <v-row>
            <DateSelector
                @changeDate="changeDate"
            ></DateSelector>
        </v-row>
        <v-btn
            :disabled="!valid"
            block
            class="mr-4"
            color="primary"
            style="margin-top:1.5rem"
            x-large
            @click="validate"
        >
            Rechercher
        </v-btn>
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
            valid: false,
            from: '',
            to: '',
            date: '',
            rules: [
                v => !!v || 'Merci de renseigner ce champ',
            ],
        }
    },
    mounted() {
        this.valid = false
    },
    methods: {
        validate() {
            this.$router.push({
                path: '/trips',
                query: {
                    from: this.from,
                    to: this.to,
                    date: this.date,
                },
            })
        },
        changeDate(date) {
            this.date = date
        },
    }
}
</script>

<style scoped>

</style>
