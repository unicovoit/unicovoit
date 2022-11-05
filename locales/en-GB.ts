import Locale from './locale_interface'

export default <Locale>{
    aboutPage: {
        content: [
            `UniCovoit is a student initiative to encourage carpooling between students.`,
            `This service is based on trust between students.
            Payments are not made via UniCovoit, but directly between the passenger and the driver.`,
            `The {termsOfUse} and {privacyPolicy} are available on the website.`,
            `To contact us, please use the {contactForm}.`,
            `Created by {finxol}.`,
            `Logo by {logoDesigner}.`,
        ],
        thankYouDonors: 'Thank you to the donors',
        makeADonation: 'Make a donation to support the project on',
        unicovoitIsGreen: "UniCovoit is greener than {cleanerThan}% of the pages tested by",
    },
    appBar: {
        home: 'Home',
        about: 'About',
        login: 'Log in',
        myActivity: 'My activities',
        myProfile: 'My profile',
    },
    builtForMobileWarning: 'UniCovoit is optimized for mobile devices. Using a computer may cause performance issues.',
    contactForm: 'contact form',
    credits: {
        illustrations: 'Illustration from the collection',
        logo: 'Logo by'
    },
    form: {
        submit: 'Submit',
        cancel: 'Cancel',
        required: 'Required',
        errors: {
            invalid: 'Invalid',
            invalidEmail: 'Invalid email',
            invalidPassword: 'Invalid password',
        },
        departureCity: 'Departure place',
        arrivalCity: 'Arrival place',
        departureDate: 'Departure date',
        preciseAddress: 'Precise address',
        search: 'Search',
    },
    home: {
        cookieWarning: "UniCovoit uses cookies. To learn more, see our {privacyPolicy}",
        title: 'Where to next?',
        advantages: [
            {
                title: 'Low Prices',
                content: 'UniCovoit helps keep prices low by not taking any commission on rides.'
            },
            {
                title: 'Safety',
                content: 'Enjoy rides exclusively between students.'
            },
            {
                title: 'Transparency',
                content: 'UniCovoit is designed for students, by students. The application\'s source code is fully open.'
            }
        ],
        presentation: {
            title: 'What is UniCovoit?',
            description: `<p> UniCovoit is a carpooling platform for students. </p>
                        <p>The goal is to encourage carpooling between students, without taking any commission on the price of the ride. </p>`
        },
    },
    learnMore: 'Learn More',
    privacyPolicy: 'Privacy Policy',
    termsOfUse: 'Terms of Use',
}
