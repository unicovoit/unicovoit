export default interface Locale {
    aboutPage: {
        content: string[],
        thankYouDonors: string,
        makeADonation: string,
        unicovoitIsGreen: string,
    }
    appBar: {
        home: string,
        about: string,
        login: string,
        myActivity: string,
        myProfile: string,
        publishTrip: string,
    },
    builtForMobileWarning: string,
    contactForm: string,
    credits: {
        illustrations: string,
        logo: string
    },
    error: {
        genericError: string,
        notFound: string,
        details: string,
        backToPrevious: string,
        tryAgain: string,
    },
    faq: {
        title: string,
        content: {title: string, content: string}[],
    },
    form: {
        submit: string,
        cancel: string,
        required: string,
        errors: {
            invalid: string,
            invalidEmail: string,
            invalidPassword: string,
        },
        departureCity: string,
        arrivalCity: string,
        departureDate: string,
        preciseAddress: string,
        search: string,
    },
    home: {
        cookieWarning: string,
        title: string,
        advantages: [
            {
                title: string,
                content: string
            },
            {
                title: string,
                content: string
            },
            {
                title: string,
                content: string
            }
        ],
        presentation: {
            title: string,
            description: string
        },
    },
    login: {
        title: string,
        description: string,
        universitiesList: string,
        addUniversityRequest: string,
        login: string,
    },
    learnMore: string,
    profile: {
        title: string,
        preferences: {
            title: string,
            smokePref: {
                yes: string,
                no: string,
            },
            petsPref: {
                yes: string,
                no: string,
            },
            musicPref: {
                yes: string,
                no: string,
            },
        }
    },
    privacyPolicy: string,
    termsOfUse: string,
    trips: {
        title: string,
        noTrips: string,
        offline: string,
    },
    trip: {
        title: string,
        placesRemaining: {
            singular: string,
            plural: string,
        },
        autoBook: string,
    }
}
