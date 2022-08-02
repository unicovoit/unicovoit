<template>
    <v-responsive
        class="py-1 px-2"
        max-width="600"
    >
        <h2
            class="text-h2 mt-md-2 pr-md-15"
        >
            Connexion
        </h2>
        <p
            class="text-justify mt-5"
        >
            En vous inscrivant, vous acceptez les <NuxtLink to="/legal" class="text--secondary">Conditions Générales d'Utilisation</NuxtLink>
            et la <NuxtLink to="/legal/privacy" class="text--secondary">Politique de Confidentialité</NuxtLink>.
        </p>

        <v-btn
            block
            class="mr-4 mt-10"
            color="primary"
            x-large
            rounded
            :loading="loading"
            @click="auth0Login"
        >
            Me connecter
        </v-btn>
    </v-responsive>
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
