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
    },
    builtForMobileWarning: string,
    contactForm: string,
    credits: {
        illustrations: string,
        logo: string
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
    learnMore: string,
    privacyPolicy: string,
    termsOfUse: string,
}
