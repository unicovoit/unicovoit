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
                    formulaire de contact</NuxtLink>.
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

            <div
                id="wcb"
                class="carbonbadge mt-10"
                :class="{'wcb-d': $vuetify.theme.dark}"
            ></div>
            <script src="https://cdn.jsdelivr.net/gh/unicovoit/website-carbon-badges/public/b.min.js" defer></script>
        </div>
    </v-container>
</template>

<script>
import universities from "../api/universities"

export default {
    name: "about",
    auth: false,
    head: {
        title: "A Propos - UniCovoit",
    },
    data: () => ({
        universities
    }),
}
</script>

<style lang="sass" scoped>
</style>
