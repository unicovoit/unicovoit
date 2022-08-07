<template>
    <v-container>
        <div class="text-h4 ml-1">
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
                    content: `Avec UniCovoit, vous pouvez proposer vos trajets, qu'ils soient courts ou longs, à d'autres étudiants afin de couvrir vos frais.
                        Vous pouvez également trouver des conducteurs pour vos trajets.<br>
                        Aucune commission n'est relevée sur le prix du trajet.`
                }, {
                    title: "Les utilisateurs sont-ils tous des étudiants ?",
                    content: `Oui. Il est obligatoire de vérifier son statut étudiant avant de faire une réservation ou déposer une annonce.
                        Cette vérification se fait par votre adresse mail étudiante.`
                }, {
                    title: "Quelle forme de paiement est utilisée sur UniCovoit ?",
                    content: `UniCovoit ne prend pas en charge les paiements donc vous devez convenir d'un moyen de paiement avec votre conducteur ou passager.`
                }, {
                    title: "Comment puis-je contacter mon conducteur/passager ?",
                    content: `Les coordonnées de chacun seront transmises par UniCovoit au moment de la réservation.`
                }, {
                    title: "Est-ce que je peux réserver plusieurs places sur un trajet ?",
                    content: `Non. Les trajets sont réservés aux étudiants, donc vous devez avoir un compte UniCovoit et vérifier votre statut étudiant avant de pouvoir réserver un trajet.`
                }, {
                    title: "Comment est-ce que UniCovoit se finance ?",
                    content: `UniCovoit ne prend aucune commission sur le prix du trajet et ne revend aucune donnée.
                        Le financement est assuré seulement par des dons. Si vous souhaitez soutenir UniCovoit, vous pouvez le faire sur <a href="https://ko-fi.com/unicovoit" target="_blank" rel="noopener noreferrer">Ko-Fi</a>.`
                }, {
                    title: "Comment traitez-vous mes données ?",
                    content: `Les informations concernant les trajets et les utilisateurs sont stockées sur les serveurs d'UniCovoit en Allemagne. Ces informations ne sont pas communiquées à des tiers.<br>
                        Les informations de connexion (identifiant, mot de passe) sont gérées par Auth0 sur des serveurs en Europe.<br>
                        Vous trouverez plus de détails dans notre <a href='/legal/privacy'>Politique de Confidentialité</a>.`
                }, {
                    title: "Qui a développé cette application ?",
                    content: "Cette application a été développée par finxol, un étudiant de l'IUT de Vannes (Bretagne)."
                }, {
                    icon: "mdi-message-processing-outline",
                    title: "Comment puis-je contacter UniCovoit ?",
                    content: `Vous pouvez envoyer un mail à <a href="mailto:support@unicovoit.fr" target="_blank" rel="noopener noreferrer">support@unicovoit.fr</a>,
                        ou nous contacter sur <a href="https://instagram.com/unicovoit" target="_blank" rel="noopener noreferrer">Instagram</a>.`
                }
            ]
        }
    }
}
</script>

<style scoped>

</style>
