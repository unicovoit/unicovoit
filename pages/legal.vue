<template>
<v-container>
    <v-main
        class="text-h2 mt-n10"
        color="primary"
    >
        Légal
    </v-main>

    <nuxt-content
        :document="page"
        class="text-justify"
    />
    <!--
    <div class="text-h4">
        Présentation
    </div>
    <div class="text-body-1 my-4 text-justify">
        <p>
            Ce site web à destination exclusive des étudiants est destinée à mettre en relation des conducteurs se rendant à une destination donnée pour leur propre compte avec des passagers allant dans la même direction afin de leur permettre de partager le trajet et donc les frais qui y sont associé.
        </p>
        <p>
            Les présentes conditions générales d’utilisation ont pour objet d’encadrer l’accès et les modalités d’utilisation de ce site. Nous vous invitons à en prendre attentivement connaissance. Vous comprenez et reconnaissez que UniCovoit n’est partie à aucun accord, contrat ou relation contractuelle, de quelque nature que ce soit, conclu entre les étudiants inscrits et utilisant cette plateforme.
        </p>
        <p>
            En vertu du Règlement (UE) 2016/679 du Parlement européen et du Conseil du 27 avril 2016 (ci-après « RGPD ») et de la loi "Informatique et Libertés", du 6 janvier 1978, les données à caractère personnel recueillies auprès des utilisateurs sont destinées à UniCovoit et ne sauraient être transmises à des tiers pour un usage à des fins commerciales.
            UniCovoit s'engage à ne pas céder, à titre gratuit ou onéreux, les informations recueillies via son site. Toutefois, compte tenu des caractéristiques du réseau Internet, certaines informations à savoir le nom, la photo de profil ainsi que le numéro de téléphones sont accessibles à tous les autres étudiants inscrits.
        </p>
    </div>

    <div class="text-h4">
        Responsabilité des utilisateurs
    </div>
    <div class="text-body-1 my-4 text-justify">
        <p>
            Les étudiants visitant ce site s’engagent à ne pas utiliser les informations d’autres étudiants accessibles sur UniCovoit et sur lesquelles ils ne disposent pas de droits à des fins autres que l’organisation du service de covoiturage amical proposé. Une personne inscrite s’engage également à ne pas contacter d’autres personnes à des fins autres que celles d’effectuer un trajet en covoiturage (offres commerciales, sites de rencontre etc.)
        </p>
        <p>
            Les étudiants qui ont proposé un trajet s’engagent à répondre aux demandes de covoiturage qu’ils reçoivent par l’intermédiaire du site. En cas d’accumulation de non-réponses aux demandes, UniCovoit se réserve le droit de suspendre le compte de l’Utilisateur.
        </p>
    </div>

    <div class="text-h4">
        Engagement des conducteurs
    </div>
    <div class="text-body-1 my-4 text-justify">
        <p>
            Le conducteur s’engage à être titulaire d’un permis de conduire valide et d’une assurance couvrant les passagers. Il déclare aussi utiliser son véhicule personnel ou un véhicule que vous utilisez avec l’autorisation expresse du propriétaire, et dans tous les cas, que vous êtes autorisés à utiliser à des fins de covoiturage. Dans tous les deux cas, le véhicule doit se trouver en parfait état de fonctionnement dont le contrôle technique est à jour.
        </p>
        <p>
            Vous vous engagez à vous rendre au point de rendez-vous défini au préalable avec le passager et le déposer au point d’arrivé convenu entre vous. En cas d’incapacité à se rendre au point de rendez-vous à l’heure prévue, vous devez informer les passagers immédiatement du retard prévu ou de l’annulation du trajet. Vous devez ne pas réaliser de bénéfices sur les trajets réalisés, sous peine de sanctions prévues à l’article L.132-2 du Code de la consommation.
        </p>
        <p>
            Les passagers peuvent signaler un utilisateur au comportement non approprié aux équipes d’UniCovoit qui sera alors en mesure de prendre des mesures de restriction de l’accès au service pour le conducteur.
        </p>
    </div>

    <div class="text-h4">
        Engagement des passagers
    </div>
    <div class="text-body-1 my-4 text-justify">
        <p>
            Les passagers doivent respecter le point et l’heure de rendez-vous définis avec le conducteur, ainsi que le lieu d'arrivée convenu. Également, adopter une attitude responsable pendant la durée du trajet, qui ne compromettrait pas la capacité du Conducteur à conduire en toute sécurité. Il doit aussi respecter l’état de propreté et l’intégrité du véhicule.
        </p>
        <p>
            Le passager est tenu d’informer immédiatement le conducteur si le rendez-vous prévu ne peut plus être tenu dans les conditions préalablement convenues (annulation, retard…). Il doit aussi s’engager à payer le conducteur au prix qui était convenu lors de la réservation.
        </p>
        <p>
            Les conducteurs peuvent signaler un utilisateur au comportement non approprié aux équipes d’UniCovoit qui serait alors en mesure de prendre des mesures de restriction de l’accès au service pour le passager.
        </p>
    </div>

    <div class="text-h4">
        Responsabilité d’UniCovoit
    </div>
    <div class="text-body-1 my-4 text-justify">
        <p>
            Compte tenu du volume d’information déposé par les utilisateurs, le contrôle exercé dessus par UniCovoit ne peut être que limité. En conséquence, l'utilisateur est seul responsable du contenu qu'il dépose et UniCovoit ne garantit pas la véracité ou l’honnêteté de ce contenu. Plus généralement, UniCovoit ne pourra être tenu pour responsable de tout dommage direct ou indirect pouvant survenir de l'utilisation ou au contraire de l'impossibilité d'utiliser ce site.
        </p>
    </div>

    <div class="text-h4">
        Conditions d’inscription à la Plateforme
    </div>
    <div class="text-body-1 my-4 text-justify">
        L’utilisation de UniCovoit est réservée à tous les étudiants. Lors de l’inscription vous déclarez et garantissez être scolarisée dans un établissement de l’enseignement supérieur pour l’année en cours. Une vérification nécessitant votre adresse mail étudiante sera réalisé systématiquement. C’est seulement après cette vérification que votre compte sera réellement créé et que vous pourrez utiliser le service proposé par le site.
    </div>

    <div class="text-h4">
        Création de Compte
    </div>
    <div class="text-body-1 my-4 text-justify">
        <p>
            UniCovoit permet à chaque étudiant de publier des annonces et de réserver des trajets. Vous pouvez consulter les trajets même si vous n’êtes pas inscrit ou connecté sur le site. En revanche, vous ne pouvez ni publier une annonce de covoiturage ni en réserver un sans avoir, au préalable, créé un compte.
        </p>
        <p>
            Pour créer votre Compte, vous pouvez vous connecter avec Auth0, Microsoft ou Discord. En vous connectant avec l’une des deux dernières méthodes, UniCovoit aura accès, publiera sur son site et conservera certaines informations de votre compte.
        </p>
        <p>
            Pour vous inscrire sur la Plateforme, vous devez avoir lu et accepter les présentes CGU.
        </p>
        <p>
            A l’occasion de la création de votre compte, et ce quelle que soit la méthode choisie pour ce faire, vous vous engagez à fournir des informations personnelles exactes et conformes à la réalité et à les mettre à jour, par l’intermédiaire de votre profil afin d’en garantir la pertinence et l’exactitude tout au long de votre utilisation de cette plateforme.
        </p>
        <p>
            Vous vous engagez à ne pas créer ou utiliser, sous votre propre identité ou celle d’un tiers, d’autres compte que celui initialement créé.
        </p>
    </div>

    <div class="text-h4">
        Prix du trajet
    </div>
    <div class="text-body-1 my-4 text-justify">
        <p>
            Dans le cadre d’un trajet en covoiturage, le montant de la participation aux frais est déterminé par le conducteur, sous votre seule responsabilité. Le prix du trajet est à mentionner lors de la publication d’une offre de co-voiturage Il est strictement interdit de tirer le moindre bénéfice du fait de l’utilisation d’UniCovoit. Par conséquent, vous vous engagez à limiter le montant de la participation aux frais que vous demandez à vos passagers aux frais que vous supportez réellement pour effectuer le trajet en covoiturage.
        </p>
        <p>
            UniCovoit ne prend pas en charge le paiement des trajets. L’étudiant passager s’engage à respecter le montant mentionné lorsqu’il a confirmé sa réservation. La méthode de paiement est à conclure entre les utilisateurs. UniCovoit ne s’aurait être tenu responsable en cas d’un manquement de paiement. Cependant, si une infraction venait être signalé à plusieurs reprise, UniCovoit pourrait être en mesure de limiter l’accès d’un utilisateur au service pendant une durée déterminée ou bien de supprimer un compte.
        </p>
    </div>

    <div class="text-h4">
        Frais de Service
    </div>
    <div class="text-body-1 my-4 text-justify">
        <p>
            UniCovoit ne prendra aucun frais.
        </p>
    </div>

    <div class="text-h4">
        Modification des CGU
    </div>
    <div class="text-body-1 my-4 text-justify">
        <p>
            UniCovoit peut modifier, à tout moment et sans préavis, modifier les CGU afin de les adapter aux évolutions du site.
        </p>
    </div>

    <div class="text-h4">
        Droit applicable
    </div>
    <div class="text-body-1 my-4 text-justify">
        <p>
            Ce site internet et les CGU sont régis par le droit français, quel que soit le lieu d’utilisation. En cas de contestation, les parties sont tenues de rechercher une solution amiable avant de saisir les tribunaux français compétents.
        </p>
    </div>
    -->
</v-container>
</template>

<script>
export default {
    name: "legal",
    auth: false,
    async asyncData({ $content, error }) {
        const page = await $content("legal")
            .fetch()
            .catch(err => {
                error({ statusCode: 404, message: "Page not found" });
            });

        return {
            page
        };
    }
}
</script>

<style scoped>

</style>
