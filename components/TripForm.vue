<template>
    <v-form
        ref="form"
        v-model="valid"
        @keyup.native.enter="valid && validate($event)"
        lazy-validation
    >
        <v-row>
            <v-text-field
                v-model="from"
                label="Lieu de départ"
                placeholder="Nom de ville"
                :rules="rules"
                filled
                required
            ></v-text-field>
        </v-row>
        <v-row>
            <v-text-field
                v-model="to"
                label="Lieu d'arrivée"
                placeholder="Nom de ville"
                :rules="rules"
                filled
                required
            ></v-text-field>
        </v-row>
        <v-row>
            <v-menu
                ref="menu1"
                v-model="menu1"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="auto"
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        v-model="dateFormatted"
                        label="Date de départ"
                        hint="Au format JJ/MM/AAAA"
                        persistent-hint
                        prepend-icon="mdi-calendar"
                        v-bind="attrs"
                        @blur="date = parseDate(dateFormatted)"
                        v-on="on"
                        filled
                        :rules="rules"
                    ></v-text-field>
                </template>
                <v-date-picker
                    v-model="date"
                    no-title
                    @input="menu1 = false"
                    required
                ></v-date-picker>
            </v-menu>
        </v-row>
        <v-btn
            :disabled="!valid"
            color="info"
            class="mr-4"
            @click="validate"
            block
            x-large
            style="margin-top:1.5rem"
        >
            Validate
        </v-btn>
    </v-form>
</template>

<script>
export default {
    name: "TripForm",
    data(){
        return {
            valid: false,
            from: '',
            to: '',
            date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            dateFormatted: this.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substring(0, 10)),
            menu1: false,
            menu2: false,
            rules: [
                v => !!v || 'Merci de renseigner ce champ',
            ],
        }
    },
    watch: {
        date (val) {
            this.dateFormatted = this.formatDate(this.date);
        },
    },
    methods: {
        validate() {
            this.$router.push(`trips?from=${this.from}&to=${this.to}&on=${this.date}`);
        },
        formatDate (date) {
            if (!date) return null;

            const [year, month, day] = date.split('-');
            return `${day}/${month}/${year}`
        },
        parseDate (date) {
            if (!date) return null;

            const [day, month, year] = date.split('/');
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        },
    }
}
</script>

<style scoped>

</style>
