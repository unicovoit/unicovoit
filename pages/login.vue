<template>
    <v-container>
        <v-main
            class="text-h2"
            color="primary"
            style="margin-top:-3rem"
        >
            Connexion
        </v-main>
        <v-content
            style="margin-top:-1.5rem;text-align: justify"
        >
            Vous pouvez vous connecter à IUCovoit avec Auth0, Google ou Discord.
            <br>
            <br>
            Cliquez sur le bouton ci-dessous pour accéder à la page de connexion.
        </v-content>

        <v-btn
            @click="auth0Login"
            color="info"
            class="mr-4"
            block
            x-large
        >
            connexion
        </v-btn>
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
                let response = await this.$auth.loginWith('local', {data: this.login})
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
        },
        async auth0Login() {
            try {
                let response = await this.$auth.loginWith('auth0')
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
