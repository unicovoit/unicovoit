<template>
    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
    >
        <v-row>
            <v-col>
                <v-text-field
                    label="Lieu de départ"
                    placeholder="Nom de ville"
                    filled
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-text-field
                    label="Lieu d'arrivée"
                    placeholder="Nom de ville"
                    filled
                ></v-text-field>
            </v-col>
        </v-row>
        <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate"
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
        }
    },
}
</script>

<style scoped>

</style>
