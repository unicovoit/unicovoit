<template>
    <v-menu
        ref="dateMenu"
        v-model="dateMenu"
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
                color="primary"
                outlined
                hint="Au format JJ/MM/AAAA"
                label="Date de départ"
                persistent-hint
                prepend-icon="mdi-calendar"
                readonly
                required
                v-bind="attrs"
                @blur="date = parseDate(dateFormatted)"
                v-on="on"
            ></v-text-field>
        </template>
        <v-date-picker
            v-model="date"
            :first-day-of-week="1"
            :max="maxDate"
            :min="minDate"
            color="primary"
            locale="fr-fr"
            no-title
            required
            @input="dateMenu = false"
            v-on:input="changeDate"
        ></v-date-picker>
    </v-menu>
</template>

<script>
export default {
    name: "DateSelector",
    data() {
        return {
            date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substring(0, 10),
            dateFormatted: this.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substring(0, 10)),
            minDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substring(0, 10),
            maxDate: (() => {
                let d = new Date()
                d.setDate(d.getDate() + 21) // 3 weeks later
                return d.toISOString().substring(0, 10)
            })(),
            dateMenu: false,
            rules: [
                v => !!v || 'Merci de renseigner ce champ',
            ],
        }
    },
    mounted() {
        this.changeDate(this.date)
    },
    watch: {
        date() {
            this.dateFormatted = this.formatDate(this.date);
        },
    },
    methods: {
        formatDate(date) {
            if (!date) return null

            const [year, month, day] = date.split('-')
            return `${day}/${month}/${year}`
        },
        parseDate(date) {
            if (!date) return null

            const [day, month, year] = date.split('/')
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        },
        changeDate(date) {
            this.$emit("changeDate", date)
        }
    },
}
</script>

<style scoped>

</style>
