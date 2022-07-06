<template>
    <v-container>
        <h2
            class="text-h2"
        >
            Connexion
        </h2>
        <v-main
            style="text-align: justify"
        >
            Vous pouvez créer un compte ou simplement vous connecter à UniCovoit avec Google, Discord ou Microsoft.
            <br>
            <br>
            En vous inscrivant, vous acceptez les <NuxtLink to="/legal" class="text--secondary">Conditions Générales d'Utilisation</NuxtLink>.
        </v-main>

        <v-btn
            block
            class="mr-4"
            color="primary"
            x-large
            rounded
            @click="auth0Login"
        >
            connexion
        </v-btn>
    </v-container>
</template>

<script>
export default {
    name: "login",
    methods: {
        async auth0Login() {
            try {
                await this.$auth.loginWith('auth0')
            } catch (err) {
                console.error(err)
            }
        }
    }
}
</script>

<style scoped>

</style>
