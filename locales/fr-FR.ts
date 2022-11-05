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
    },
    builtForMobileWarning: 'UniCovoit est optimisé pour les appareils mobiles. En utilisant un ordinateur, vous pouvez avoir des problèmes de performances.',
    contactForm: 'formulaire de contact',
    credits: {
        illustrations: 'Illustration de la collection',
        logo: 'Logo par'
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
    learnMore: 'En savoir plus',
    privacyPolicy: 'Politique de Confidentialité',
    termsOfUse: "Conditions d'Utilisation",
}
