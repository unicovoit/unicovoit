<template>
    <div>
        <h2
            class="text-h2 mt-2 pr-md-15"
        >
            {{ $t("login.title") }}
        </h2>
        <i18n
            path="login.description"
            tag="p"
            class="text-justify mt-5"
        >
            <template #privacyPolicy>
                <NuxtLink
                    :to="localePath('/legal/privacy')"
                    style="color: inherit"
                >
                    {{ $t("privacyPolicy") }}</NuxtLink>
            </template>
            <template #termsOfUse>
                <NuxtLink
                    :to="localePath('/legal')"
                    style="color: inherit"
                >
                    {{ $t("termsOfUse") }}</NuxtLink>
            </template>
        </i18n>

        <p
            class="pt-8"
        >
            {{ $t("login.universitiesList") }}
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
        <i18n
            path="login.addUniversityRequest"
            tag="p"
            class="mt-4 text-subtitle-2 text--secondary"
        >
            <template #email>
                <EmailAddress />
            </template>
            <template #contactForm>
                <NuxtLink
                    :to="localePath('/contact')"
                    style="color: inherit"
                >
                    {{ $t("contactForm") }}</NuxtLink>
            </template>
        </i18n>

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
            {{ $t("login.login") }}
        </v-btn>
    </div>
</template>

<script>
import universities from "../api/universities"

export default {
    name: "login",
    auth: false,
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
