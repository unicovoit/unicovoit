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
                required
            ></v-text-field>
        </v-row>
        <v-row>
            <v-menu
                ref="menu1"
                v-model="menu1"
                :close-on-content-click="false"
                max-width="290px"
                min-width="auto"
                offset-y
                required
                transition="scale-transition"
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        v-model="dateFormatted"
                        :rules="rules"
                        filled
                        hint="Au format JJ/MM/AAAA"
                        label="Date de départ"
                        persistent-hint
                        prepend-icon="mdi-calendar"
                        required
                        v-bind="attrs"
                        @blur="date = parseDate(dateFormatted)"
                        v-on="on"
                    ></v-text-field>
                </template>
                <v-date-picker
                    v-model="date"
                    no-title
                    required
                    @input="menu1 = false"
                ></v-date-picker>
            </v-menu>
        </v-row>
        <v-btn
            :disabled="!valid"
            block
            class="mr-4"
            color="info"
            style="margin-top:1.5rem"
            x-large
            @click="validate"
        >
            Rechercher
        </v-btn>
    </v-form>
</template>

<script>
export default {
    name: "TripForm",
    data() {
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
        date(val) {
            this.dateFormatted = this.formatDate(this.date);
        },
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
            });
        },
        formatDate(date) {
            if (!date) return null;

            const [year, month, day] = date.split('-');
            return `${day}/${month}/${year}`
        },
        parseDate(date) {
            if (!date) return null;

            const [day, month, year] = date.split('/');
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        },
    }
}
</script>

<style scoped>

</style>
