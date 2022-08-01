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
            En vous inscrivant, vous acceptez les <NuxtLink to="/legal" class="text--secondary">Conditions Générales d'Utilisation</NuxtLink>
            et la <NuxtLink to="/legal/privacy" class="text--secondary">Politique de Confidentialité</NuxtLink>.
        </v-main>

        <v-btn
            block
            class="mr-4"
            color="primary"
            x-large
            rounded
            :loading="loading"
            @click="auth0Login"
        >
            Me connecter
        </v-btn>
    </v-container>
</template>

<script>
export default {
    name: "login",
    data() {
        return {
            loading: false
        }
    },
    methods: {
        async auth0Login() {
            try {
                this.loading = true
                await this.$auth.loginWith('auth0').then(() => {
                    this.loading = false
                })
            } catch (err) {
                console.error(err)
            }
        }
    }
}
</script>

<style scoped>

</style>
