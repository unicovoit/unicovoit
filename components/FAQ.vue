<template>
    <v-container>
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
                        class="text-subtitle-1"
                        disable-icon-rotate
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
    </v-container>
</template>

<script>
export default {
    name: "FAQ",
    data() {
        return {
            faq: [
                {
                    title: "Comment fonctionne UniCovoit ?",
                    content: `Avec UniCovoit, vous pouvez proposer vos trajets, qu'ils soient courts ou longs, aux autres étudiants afin de couvrir vos frais.
                        Vous pouvez également réserver des trajets si vous cherchez à effectuer un déplacement sans avoir à conduire.<br>
                        UniCovoit ne prend pas en charge les paiements donc vous devez convenir d'un moyen de paiement entre conducteur et passagers.
                        Aucune commission n'est relevée sur le prix du trajet.`
                }, {
                    title: "Est-ce que je peux réserver plusieurs places sur un trajet ?",
                    content: `Non. Les trajets sont réservés aux étudiants, donc vous devez avoir un compte UniCovoit et montrer votre statut étudiant avant de pouvoir réserver un trajet.`
                }, {
                    title: "Qui a développé cette application ?",
                    content: "Cette application a été développée par finxol, un étudiant de l'IUT de Vannes (Bretagne)."
                }, {
                    title: "Comment traitez-vous mes données ?",
                    content: `Les informations concernant les trajets et les utilisateurs sont stockées sur les serveurs d'UniCovoit en Allemagne. Ces informations ne sont pas communiquées à des tiers.<br>
                        Les informations de connexion (identifiant, mot de passe) sont gérées par Auth0 sur des serveurs en Europe.<br>
                        Vous trouverez plus de détails dans notre <a href='/legal/privacy' class="text--secondary">Politique de Confidentialité</a>.`
                }, {
                    title: "Comment supprimer mon compte ?",
                    content: `Accédez à votre profil, puis dans l'onglet "Paramètres", cliquez sur "Supprimer mon compte.`
                }, {
                    icon: "mdi-message-processing-outline",
                    title: "Comment puis-je contacter l'équipe ?",
                    content: `Vous pouvez envoyer un mail à <a class="text--secondary" href="mailto:support@unicovoit.fr" target="_blank" rel="noopener noreferrer">support@unicovoit.fr</a>.
                        Vous pouvez également m'envoyer un message sur Discord avec finxol#8918 ou <a class="text--secondary" href="https://twitter.com/_finxol" rel="noopener noreferrer" target="_blank">Twitter</a>.`
                }
            ]
        }
    }
}
</script>

<style scoped>

</style>
