<template>
    <v-menu
        ref="menu"
        v-model="timeMenu"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="time"
        max-width="290px"
        min-width="290px"
        offset-y
        transition="scale-transition"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-text-field
                v-model="time"
                :rules="rules"
                outlined
                label="Heure de départ"
                prepend-icon="mdi-clock-outline"
                readonly
                v-bind="attrs"
                v-on="on"
            ></v-text-field>
        </template>
        <v-time-picker
            v-if="timeMenu"
            v-model="time"
            :rules="rules"
            color="primary"
            format="24hr"
            full-width
            @click:minute="$refs.menu.save(time)"
            v-on:input="changeTime"
        ></v-time-picker>
    </v-menu>
</template>

<script>
export default {
    name: "TimeSelector",
    data() {
        return {
            timeMenu: false,
            time: "00:00",
            rules: [
                v => !!v || 'Merci de renseigner ce champ',
            ],
        }
    },
    methods: {
        changeTime(time) {
            this.$emit("changeTime", time)
        }
    },
}
</script>

<style scoped>

</style>
