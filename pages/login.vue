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
                    v-model="login.username"
                    label="Identifiant"
                    placeholder="john"
                    :rules="rules"
                    filled
                    required
                ></v-text-field>
            </v-row>
            <v-row>
                <v-text-field
                    v-model="login.password"
                    label="Mot de passe"
                    placeholder="************"
                    :rules="rules"
                    type="password"
                    filled
                    required
                ></v-text-field>
            </v-row>

            <v-btn
                :disabled="!valid"
                @click="validate"
                color="info"
                class="mr-4"
                block
                x-large
                style="margin-top:1.5rem"
            >
                Se connecter
            </v-btn>
            <v-row>
                <v-spacer></v-spacer>
                <v-btn
                    @click="discordLogin"
                    color="info"
                    style="margin-top:2rem;background-color:#5865f2"
                >
                    <v-icon>mdi-discord</v-icon>
                    &nbsp;avec Discord
                </v-btn>
                <v-spacer></v-spacer>
            </v-row>
        </v-form>
    </v-container>
</template>

<script>
export default {
    name: "login",
    data() {
        return {
            valid: false,
            login: {
                username: '',
                password: '',
            },
            rules: [
                v => !!v || 'Merci de renseigner ce champ',
            ],
        }
    },
    methods: {
        async validate() {
            try {
                let response = await this.$auth.loginWith('local', { data: this.login })
                console.log(response)
            } catch (err) {
                console.error(err)
            }
        },
        async discordLogin() {
            try {
                let response = await this.$auth.loginWith('discord')
                console.log(response)
            } catch (err) {
                console.error(err)
            }
        }
    }
}
</script>

<style scoped>

</style>
