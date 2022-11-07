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
        publishTrip: 'Publish a trip',
    },
    builtForMobileWarning: 'UniCovoit is optimized for mobile devices. Using a computer may cause performance issues.',
    contactForm: 'contact form',
    contact: {
        title: 'Contact',
        subtitle: `Use this form to reach us.{0}
                Provide us with an email address so that we can respond to you.`,
        name: 'Name',
        email: 'Email address',
        message: 'Message',
        send: 'Send',
        sent: 'Message sent',
    },
    credits: {
        illustrations: 'Illustration from the collection',
        logo: 'Logo by'
    },
    error: {
        genericError: 'An error occurred',
        notFound: 'Page not found',
        details: 'See more details',
        backToPrevious: 'Go back to the previous page',
        tryAgain: 'Please try again later.',
        unknown: 'Unknown',
        required: 'Required',
        tooLong: 'Too long',
        tooShort: 'Too short',
        invalid: 'Invalid',
        tripDoesntExist: 'This trip does not exist',
    },
    faq: {
        title: 'FAQ',
        content: [
            {
                title: "How does UniCovoit work?",
                content: `With UniCovoit, you can offer your trips to other students, wether they are long or short.
                        You can also search for trips to join.<br>
                        No commission is taken by UniCovoit.`
            }, {
                title: "Are all users students?",
                content: `Yes, it is required to verify your student status before making a reservation or placing an offer.
                        This verification is done through your student email address.`
            }, {
                title: "What payment method is used on UniCovoit?",
                content: `UniCovoit does not handle payments so you need to arrange a payment method with your driver or passenger.`
            }, {
                title: "How do I contact my driver/passenger?",
                content: `Each person's contact information will be shared by UniCovoit at the time of booking.`
            }, {
                title: "Can I book more than one seat on a trip?",
                content: `No. Trips are for students only, so you must have a UniCovoit account and verify your student status before you can book a trip.`
            }, {
                title: "How is UniCovoit funded?",
                content: `UniCovoit does not take any commission on the price of the journey and does not sell any data.
                        Funding is provided solely through donations. If you wish to support UniCovoit, you can do so on <a href="https://ko-fi.com/unicovoit" target="_blank" rel="noopener noreferrer">Ko-Fi</a>.`
            }, {
                title: "How do you manage my data?",
                content: `Trip and user information is stored on UniCovoit servers in Germany. This information isn't shared with third parties.<br>
                        Login information (login and password) are handled by Auth0 on European servers.<br>
                        You'll find more information in our <a href='/legal/privacy'>Privacy Policy</a>.`
            }, {
                title: "Who developed this app?",
                content: "This app was developed by finxol, a student from the IUT in Vannes (Brittany)."
            }, {
                icon: "mdi-message-processing-outline",
                title: "How can I reach UniCovoit?",
                content: `You can send an email to <a href="mailto:support@unicovoit.fr" target="_blank" rel="noopener noreferrer">support@unicovoit.fr</a>,
                        use the <a href="/contact">contact form</a>,
                        or contact send us a message on <a href="https://instagram.com/unicovoit" target="_blank" rel="noopener noreferrer">Instagram</a>.`
            }
        ],
    },
    form: {
        submit: 'Submit',
        cancel: 'Cancel',
        required: 'Required',
        optional: 'Optional',
        errors: {
            invalid: 'Invalid',
            invalidEmail: 'Invalid email',
            invalidPassword: 'Invalid password',
        },
        departureCity: 'Departure place',
        arrivalCity: 'Arrival place',
        departureDate: 'Departure date',
        preciseAddress: 'Precise address',
        city: 'City',
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
    login: {
        title: 'Log In',
        description: 'By logging in, you agree to our {termsOfUse} and {privacyPolicy}.',
        universitiesList: 'To sign up, you must be a student at one of the following universities:',
        addUniversityRequest: 'If you wish to add your university, please contact us via {email} or using the {contactForm}.',
        login: 'Log In',
    },
    learnMore: 'Learn More',
    profile: {
        title: 'My Profile',
        user: 'User',
        publicProfile: 'Public profile',
        university: 'University',
        bio: 'Presentation',
        nickname: 'Nickname',
        preferences: {
            title: 'Preferences',
            smokePref: {
                yes: 'Smoke does not bother me',
                no: 'I prefer traveling smoke-free',
            },
            petsPref: {
                yes: 'Pets are welcome!',
                no: 'I prefer traveling without pets',
            },
            musicPref: {
                yes: 'I like to listen to music!',
                no: 'I prefer traveling without music',
            },
        },
        confirmEmail: {
            short: 'Click on the link sent to you by email to confirm your address.',
            title: 'Why do I need to confirm my email address?',
            description: `Verifying your email address allows us to ensure that you are the owner of the account,
                    and that the address does not contain any errors.{0}
                    If the address is incorrect, you will not receive our confirmation and notification emails.`
        },
    },
    privacyPolicy: 'Privacy Policy',
    termsOfUse: 'Terms of Use',
    tripAdd: {
        title: 'Add a trip',
        offline: 'You are offline. You cannot add a new trip.',
        added: 'Your trip has been added!',
        seeTrips: 'See my trips',
        next: 'Next',
        back: 'Back',
        send: 'Send',
        departureCity: {
            title: 'Departure place',
            subtitle: 'Select a precise location',
        },
        arrivalCity: {
            title: 'Arrival place',
            subtitle: 'Select a precise location',
        },
        departureDate: {
            title: 'Departure date and time',
        },
        seats: {
            title: 'Number of seats',
            subtitle: 'The number of passangers you can take with you',
            short: 'Seats',
        },
        price: {
            title: 'Price',
            subtitle: 'Set the price per seat',
        },
        description: {
            title: 'Description',
            subtitle: '(Examples: time flexibility, meeting and drop-off point flexibility, luggage size, etc.)',
        },
        priceExplanation: {
            short: 'We estimate that the trip will cost you',
            title: 'How is the price calculated?',
            description: `We base our estimate on the average consumption of a car, here 6 L/100km, the distance of the
                        journey, and the average price of SP95-E10 in France.{0}
                        Tolls are not taken into account.`,
        },
    },
    trips: {
        title: 'Trips',
        noTrips: 'No trips found',
        offline: 'Trip search isn\'t available offline. Please connect to the internet and try again.',
    },
    trip: {
        title: 'Trip',
        placesRemaining: {
            singular: 'place remaining',
            plural: 'places remaining',
        },
        autoBook: 'Automatic booking confirmation',
        pendingRequests: 'You have pending booking requests',
        noBookings: 'No booking requests',
        bookings: 'Bookings',
        acceptOrRejectBookings: 'Accept or reject booking requests',
        refuse: 'Refuse',
        confirmRefusal: 'Are you sure you want to refuse this booking request?',
        seatBooked: 'You have booked a seat on this trip.',
        seatBookedPending: 'Your booking request is pending.',
    },
    verify: {
        title: 'Verification',
        subtitle: 'Before you can use UniCovoit, you must verify that you are a student.',
        description: `We use your student email address to verify your student profile.
                    This verification is renewed every year.{0}
                    We will not use this address in the future.`,
        enterEmail: 'Enter your student email address',
        verify: 'Verify',
        enterCode: 'Enter the verification code sent to you by email',
        notReceived: 'Didn\'t receive the email?',
        resend: 'Resend the code',
        incorrectCode: 'Incorrect code',
        correctEmail: 'Correct the email address?',
        emailAlreadyUsed: 'This email address is already used by another account.',
        emailNotRecognised: `The format of your email address is not recognised.
                    Your university may not yet be supported by UniCovoit.`,
        success: 'Student status verified!',
    },
}
