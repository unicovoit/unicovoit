<template>
    <v-container>
        <h2
            class="text-h2"
        >
            A Propos
        </h2>

        <div
            class="mt-6"
        >
            <p>
                UniCovoit est une initiative étudiante pour encourager le covoiturage entre étudiants.
            </p>
            <p>
                Ce service se base sur la confiance entre étudiants.
                Les paiements ne se font pas par UniCovoit, mais directement entre passager et conducteur.
            </p>
            <p>
                Les
                <NuxtLink class="text--secondary" to="/legal">Conditions Générales d'Utilisation</NuxtLink>
                et la
                <NuxtLink class="text--secondary" to="/legal/privacy">Politique de Confidentialité</NuxtLink>
                sont disponibles sur le site.
            </p>
            <p>
                Pour prendre contact avec nous, veuillez utiliser le
                <NuxtLink
                    to="/contact"
                    class="text--secondary"
                >
                    formulaire de contact
                </NuxtLink>
                .
            </p>
            <p>
                Créé par
                <a
                    class="text--secondary"
                    href="https://github.com/unicovoit/unicovoit"
                    rel="noopener noreferrer"
                    target="_blank"
                >finxol</a>.
            </p>
            <p>
                Logo par
                <a
                    class="text--secondary"
                    href="https://www.instagram.com/feun_art/"
                    rel="noopener noreferrer"
                    target="_blank"
                >Enora Couloigner</a>.
            </p>

            <v-alert
                class="mx-auto mt-9 mt-md-14"
                color="green"
                icon="mdi-leaf"
                outlined
            >
                <span
                >
                    UniCovoit est plus propre que {{ cleanerThan }}% des pages testées par
                    <a
                        href="https://websitecarbon.com/fr/pages-web-optimiser/"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        Website Carbon</a>.
                </span>
            </v-alert>
        </div>
    </v-container>
</template>

<script>
import universities from "../api/universities"

export default {
    name: "about",
    auth: false,
    head: {
        title: "A Propos",
    },
    data: () => ({
        universities,
        cleanerThan: "79",
    }),
}
</script>

<style lang="sass" scoped>
</style>
