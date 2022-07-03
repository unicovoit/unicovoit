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
                <NuxtLink to="/legal" class="text--secondary">Conditions Générales d'utilisation</NuxtLink>
                sont disponibles sur le site.
            </p>
            <p>
                Créé par <a
                class="text--secondary"
                href="https://github.com/finxol/unicovoit"
                rel="noopener noreferrer"
                target="_blank"
            >finxol</a>
            </p>

            <div class="text-h4">
                FAQ
            </div>
            <v-row
                class="my-2"
                justify="center"
            >
                <v-expansion-panels
                    accordion
                >
                    <v-expansion-panel
                        v-for="item in faq"
                        :key="item.title"
                    >
                        <v-expansion-panel-header
                            disable-icon-rotate
                            class="text-subtitle-1"
                        >
                            {{ item.title }}
                            <template v-slot:actions>
                                <v-icon color="primary">
                                    {{ item.icon || "mdi-help-circle-outline" }}
                                </v-icon>
                            </template>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content
                            class="text-body-2"
                        >
                            <span v-html="item.content"></span>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-row>
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
    data() {
        return {
            faq: [
                {
                    title: "Est-ce que je peux faire des trajets en commun ?",
                    content: "Absolument ! Le but de cette application est de mettre en relation les étudiants allant au même endroit, donc nous recommandons même de proposer tous vos trajets au maximum de personnes."
                }, {
                    title: "Qui a développé cette application ?",
                    content: "Cette application a été développée par finxol, un étudiant de l'IUT de Vannes (Bretagne)."
                }, {
                    title: "Comment traitez-vous mes données ?",
                    content: `Les informations concernant les trajets et les utilisateurs sont stockées sur les serveurs d'UniCovoit en Allemagne. Ces informations ne sont pas communiquées à des tiers.<br>
                        Les informations de connexion (identifiant, mot de passe) sont gérées par Auth0 sur des serveurs en Europe.<br>
                        Vous trouverez plus de détails dans notre <a href='/privacy-policy' class="text--secondary">Politique de confidentialité</a>.`
                }, {
                    title: "Comment puis-je me désinscrire ?",
                    content: "Pour vous désinscrire, accédez à votre profil et cliquez sur \"Supprimer mon compte\" dans l'onglet administration."
                }, {
                    icon: "mdi-message-processing-outline",
                    title: "Comment puis-je contacter l'équipe ?",
                    content: `Si vous souhaitez me contacter, vous pouvez envoyer un mail à <a class="text--secondary" href="mailto:contact@finxol.io" target="_blank" rel="noopener noreferrer">contact@finxol.io</a>.
                        Vous pouvez également m'envoyer un message sur Discord avec finxol#8918 ou <a class="text--secondary" href="https://twitter.com/_finxol" rel="noopener noreferrer" target="_blank">Twitter</a>.`
                }
            ]
        }
    },
}
</script>

<style scoped lang="sass">
</style>
