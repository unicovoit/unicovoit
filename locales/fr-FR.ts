import Locale from './locale_interface'

export default <Locale>{
    aboutPage: {
        content: [
            `UniCovoit est une initiative étudiante pour encourager le covoiturage entre étudiants.`,
            `Ce service est basé sur la confiance entre les étudiants.
            Les paiements ne sont pas effectués via UniCovoit, mais directement entre le passager et le conducteur.`,
            `Les {termsOfUse} et {privacyPolicy} sont disponibles sur le site web.`,
            `Pour nous contacter, veuillez utiliser le {contactForm}.`,
            `Créé par {finxol}.`,
            `Logo par {logoDesigner}.`,
        ],
        thankYouDonors: 'Merci aux donateurs',
        makeADonation: 'Faites un don pour soutenir le projet sur',
        unicovoitIsGreen: "UniCovoit est plus propre que {cleanerThan}% des pages testées par",
    },
    appBar: {
        home: 'Accueil',
        about: 'À propos',
        login: 'Connexion',
        myActivity: 'Mes activités',
        myProfile: 'Mon profil',
        publishTrip: 'Publier un trajet',
    },
    builtForMobileWarning: 'UniCovoit est optimisé pour les appareils mobiles. En utilisant un ordinateur, vous pouvez avoir des problèmes de performances.',
    contactForm: 'formulaire de contact',
    credits: {
        illustrations: 'Illustration de la collection',
        logo: 'Logo par'
    },
    faq: {
        title: 'FAQ',
        content: [
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
                        utiliser le <a href="/contact">formulaire de contact</a>,
                        ou nous contacter sur <a href="https://instagram.com/unicovoit" target="_blank" rel="noopener noreferrer">Instagram</a>.`
            }
        ],
    },
    form: {
        submit: 'Envoyer',
        cancel: 'Annuler',
        required: 'Requis',
        errors: {
            invalid: 'Invalide',
            invalidEmail: 'Email invalide',
            invalidPassword: 'Mot de passe invalide',
        },
        departureCity: 'Lieu de départ',
        arrivalCity: 'Lieu d\'arrivée',
        departureDate: 'Date de départ',
        preciseAddress: 'Adresse précise',
        search: 'Rechercher',
    },
    home: {
        cookieWarning: "UniCovoit utilise des cookies. Pour en savoir plus, consultez notre {privacyPolicy}",
        title: 'On va où ?',
        advantages: [
            {
                title: 'Petits Prix',
                content: 'UniCovoit contribue à maintenir des prix bas en ne prenant aucune commission sur les trajets.'
            },
            {
                title: 'Sécurité',
                content: 'Profitez de trajets exclusivement entre étudiants.'
            },
            {
                title: 'Transparence',
                content: 'UniCovoit est conçu pour des étudiants, par des étudiants. Le code de l\'application est entièrement ouvert.'
            }
        ],
        presentation: {
            title: 'UniCovoit, c\'est quoi ?',
            description: `<p> UniCovoit est une plateforme de covoiturage pour les étudiants. </p>
                        <p>L'objectif est d'encourager le covoiturage entre étudiants, sans prendre de commission sur le prix du trajet. </p>`
        },
    },
    login: {
        title: 'Connexion',
        description: 'En vous inscrivant, vous acceptez les {termsOfUse} et la {privacyPolicy}.',
        universitiesList: 'Pour vous inscrire, vous devez être étudiant de l\'une des universités suivantes :',
        addUniversityRequest: 'Si vous souhaitez ajouter votre université, prenez contact avec nous sur {email} ou le {contactForm}.',
        login: 'Me connecter',
    },
    learnMore: 'En savoir plus',
    privacyPolicy: 'Politique de Confidentialité',
    termsOfUse: "Conditions d'Utilisation",
}
