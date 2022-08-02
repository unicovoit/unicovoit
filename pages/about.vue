<template>
    <v-container>
        <h2
            class="text-h2"
        >
            A Propos
        </h2>

        <div>
            <p>
                UniCovoit est une initiative étudiante pour encourager le covoiturage entre étudiants.
            </p>
            <p>
                Ce service se base sur la confiance entre étudiants.
                Les paiements ne se font pas par UniCovoit, mais directement entre passager et conducteur.
            </p>
            <p>
                Les
                <NuxtLink class="text--secondary" to="/legal">Conditions Générales d'utilisation</NuxtLink>
                sont disponibles sur le site.
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

            <LazyFAQ />
        </div>
    </v-container>
</template>

<script>
export default {
    name: "about",
    auth: false,
    head: {
        title: "A Propos - UniCovoit",
    },
}
</script>

<style lang="sass" scoped>
</style>
