<template>
    <v-container>
        <v-main
            class="text-h2"
            color="primary"
            style="margin-top:-3rem"
        >
            Connexion
        </v-main>
        <v-form
            ref="form"
            v-model="valid"
            @keyup.native.enter="!valid && validate($event)"
            lazy-validation
        >
            <v-row>
                <v-text-field
                    v-model="id"
                    label="Identifiant"
                    placeholder="john"
                    :rules="rules"
                    filled
                    required
                ></v-text-field>
            </v-row>
            <v-row>
                <v-text-field
                    v-model="passwd"
                    label="Mot de passe"
                    placeholder="************"
                    :rules="rules"
                    filled
                    required
                ></v-text-field>
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
                Se connecter
            </v-btn>
        </v-form>
    </v-container>
</template>

<script>
export default {
    name: "login",
    data(){
        return {
            valid: false,
            id: '',
            passwd: '',
            rules: [
                v => !!v || 'Merci de renseigner ce champ',
            ],
        }
    },
    methods: {
        validate() {
            this.$router.push(`auth`)
        }
    }
}
</script>

<style scoped>

</style>
