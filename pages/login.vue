<template>
    <div>
        <h2
            class="text-h2 mt-2 pr-md-15"
        >
            Connexion
        </h2>
        <p
            class="text-justify mt-5"
        >
            En vous inscrivant, vous acceptez les <NuxtLink to="/legal" class="text--secondary">Conditions Générales d'Utilisation</NuxtLink>
            et la <NuxtLink to="/legal/privacy" class="text--secondary">Politique de Confidentialité</NuxtLink>.
        </p>

        <p
            class="pt-8"
        >
            Pour vous inscrire, vous devez être étudiant de l'une des universités suivantes :
        </p>
        <v-simple-table
            fixed-header
            height="150px"
        >
            <template v-slot:default>
                <tbody>
                <tr
                    v-for="item in universities"
                    :key="item.name"
                >
                    <td>{{ item.name }}</td>
                </tr>
                </tbody>
            </template>
        </v-simple-table>
        <p
            class="mt-4 text-subtitle-2 text--secondary"
        >
            Si vous souhaitez ajouter votre université, prenez contact avec nous sur <EmailAddress/>
        </p>

        <v-btn
            block
            class="mr-sm-4 mt-10 mx-md-auto"
            color="primary"
            x-large
            rounded
            :loading="loading"
            max-width="200"
            width="100%"
            @click="auth0Login"
        >
            Me connecter
        </v-btn>
    </div>
</template>

<script>
import universities from "../api/universities"

export default {
    name: "login",
    head: {
        title: "Connexion",
    },
    data() {
        return {
            loading: false,
            universities,
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

<style lang="sass" scoped>
tr:hover
    background-color: transparent !important
</style>
