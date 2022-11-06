import logger from './signale'
import {actions} from '../../store/index'
import * as image from './image'

import {Trip} from '../models/Trip'
import ITrip from '../interfaces/Trip'
import {User} from '../models/User'
import IUser from '../interfaces/User'
import {Booking} from "../models/Booking"
import {Verification} from "../models/Verification"
import IVerification from "../interfaces/VerificationJWT"
import {Contact} from "../models/Contact"

import * as mail from './mail'
import GenericEmailData from "../interfaces/GenericEmailData"

import {v4} from "uuid"
import {Error} from "mongoose"
import {BookingError} from "../errors/BookingError"

const today: Date = new Date()
export const testTrips = [{
    from: {
        type: "Point",
        coordinates: [-2.737387, 47.972292]
    },
    to: {
        type: "Point",
        coordinates: [-1.52818191449501, 48.1110706956896]
    },
    price: 6,
    description: "on a fait de l'escalade à réguiny",
    departure_time: new Date().setDate(today.getDate() + 1),
    driver_id: 'google-oauth2|101534163227018751576',
    places: 3,
    id: '4a8c12f3-48e9-4b14-9522-69f0bbb067fb',
    distance: 114,
    duration: 80,
    fromName: 'Bel Air',
    fromCity: 'Réguiny',
    toName: 'Espace Nominoë, Rue Julien Neveu',
    toCity: 'undefined'
}, {
    from: {
        type: "Point",
        coordinates: [-1.53536, 48.138244]
    },
    to: {
        type: "Point",
        coordinates: [-2.788994, 47.655162]
    },
    price: 7,
    description: 'Geronimooooo!!!!!!!!!',
    departure_time: new Date().setDate(today.getDate() + 4),
    driver_id: 'google-oauth2|101534163227018751576',
    places: 3,
    id: '1d866cb1-342f-4492-b679-c3be592544cf',
    distance: 128,
    duration: 90,
    fromName: '10 Rue de la Montagne des Oliviers',
    fromCity: 'Acigné',
    toName: '5 Rue de la Fenaison',
    toCity: 'Vannes'
}, {
    from: {
        type: "Point",
        coordinates: [-1.586798, 49.648772]
    },
    to: {
        type: "Point",
        coordinates: [7.306975, 43.69076]
    },
    price: 75,
    description: 'Long trajet avec de nombreuses pauses. Musique la plupart du temps.\n' +
        "Je ne passerai pas par l'autoroute",
    departure_time: new Date().setDate(today.getDate() - 5),
    driver_id: 'auth0|623f93c6c665610070aa3d75',
    places: 2,
    id: '6d4126ff-e472-44b5-a891-2927d17f7e1a',
    distance: 1338,
    duration: 755,
    fromName: '61 Rue de l’Ancienne Gare',
    fromCity: 'Cherbourg-en-Cotentin',
    toName: '35 Boulevard Princesse Grace de Monaco',
    toCity: 'Nice'
}, {
    from: {
        type: "Point",
        coordinates: [42.712716, 2.889324]
    },
    to: {
        type: "Point",
        coordinates: [43.604836, 1.457352]
    },
    price: 10,
    description: '',
    departure_time: new Date().setDate(today.getDate() - 3),
    driver_id: 'auth0|623f93c6c665610070aa3d75',
    places: 2,
    id: '9c2b8635-f45f-4e43-8064-111708f23400',
    distance: 206,
    duration: 126,
    fromName: 'Avenue Marechal Joffre',
    fromCity: 'Perpignan',
    toName: '25bis Boulevard de la Gare',
    toCity: 'Toulouse'
}, {
    from: {type: 'Point', coordinates: [-1.554136, 47.218637]},
    to: {type: 'Point', coordinates: [-1.68002, 48.111339]},
    price: '5',
    description: '',
    departure_time: '2022-08-15T17:30:12.220Z',
    driver_id: 'oauth2|discord|688822573970096165',
    places: '3',
    id: '9e4ddeac-969b-4ece-905f-75be8535d042',
    distance: 111,
    duration: 92,
    fromName: 'Nantes',
    fromCity: 'Nantes',
    toName: 'Rennes',
    toCity: 'Rennes'
}]


//------------------------------------------------------
// Trip-related functions
//------------------------------------------------------
/**
 * Add a trip to the database
 * @param t the trip to add
 */
export const addTrip: Function = async (t: ITrip) => {
    let driver = await getUserBySub(String(t.driver_id))
    if (driver) {
        t.driver = driver._id
        const tmp = new Trip(t)
        await tmp.save()
        logger.success(`Trip from ${t.from.coordinates.join(',')} to ${t.to.coordinates.join(',')} on ${t.departure_time} added`)
    }
}


/**
 * Get all trips
 * @returns {Promise<Trip[]>} the array of trips
 */
export const getAllTrips = async () => {
    const now: Date = new Date()
    return Trip.find({departure_time: {$gt: now}}, {
        _id: 0,
        __v: 0,
        created_at: 0,
        updated_at: 0
    }).populate('driver', {
        id: 1,
        name: 1,
        nickname: 1,
        picture: 1,
        autoBook: 1,
        university: 1,
    }).sort({departure_time: 1})
}


/**
 * Get a trip by location and date
 * @param from the departure location
 * @param to the arrival location
 * @param date the date of the trip
 * @param distance the maximum distance from the search locations
 * @returns the array of trips
 */
export const getTrips = async (from: number[], to: number[], date: Date, distance: number = 20) => {
    const min = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    const max = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)

    const radius = distance / 6378 // distance km in radians

    return Trip.find({
        from: {
            $geoWithin: {
                $centerSphere: [from, radius]
            }
        },
        to: {
            $geoWithin: {
                $centerSphere: [to, radius]
            }
        },
        departure_time: {$gte: min, $lt: max}
    }, {
        _id: 0,
        __v: 0,
        created_at: 0,
        updated_at: 0
    }).populate('driver', {
        id: 1,
        name: 1,
        nickname: 1,
        picture: 1,
        autoBook: 1,
        university: 1,
    }).sort({departure_time: 1})
}


/**
 * Get a trip by id
 * @param id the id of the trip
 * @return the trip
 */
export const getTripById = async (id: string) => {
    return Trip.findOne({id: {$eq: id}}, {
        __v: 0,
        created_at: 0,
        updated_at: 0,
    }).populate('driver', {
        id: 1,
        name: 1,
        nickname: 1,
        picture: 1,
        autoBook: 1,
        university: 1,
    })
}


/**
 * Get all users who have booked a trip
 * @param id the id of the trip
 * @return the array of users
 */
export const getTripPassengers = async (id: string) => {
    const bookings = await Booking.find({trip: {$eq: id}}, {
        _id: 0,
        __v: 0,
        created_at: 0,
        updated_at: 0,
    }).populate({
        path: 'user',
        select: {
            id: 1,
            name: 1,
            nickname: 1,
            picture: 1,
            autoBook: 1,
            university: 1,
        },
        populate : {
            path: 'contact',
            select: {
                _id: 0,
                __v: 0,
                created_at: 0,
                updated_at: 0,
            }
        }
    })
    return bookings.map(b => b.user) as IUser[]
}


/**
 * Remove a trip by id and driver_id
 * @param id the id of the trip
 * @param driver_id the id of the driver
 * @returns the number of removed trips
 * @throws if the trip doesn't exist
 * @access Private
 */
export const removeTrip = async (id: string, driver_id: string) => {
    const trip = await Trip.findOne({id: {$eq: id}, driver_id: {$eq: driver_id}})
    if (trip) {
        await Trip.deleteOne({id: {$eq: id}, driver_id: {$eq: driver_id}})
        logger.success(`Trip ${id} removed`)
        let nbBookings = await Booking.countDocuments({trip: {$eq: trip._id}})
        await Booking.deleteMany({trip: {$eq: trip._id}})
        logger.success(`${nbBookings} bookings removed`)
    } else {
        throw new Error(`Trip ${id} doesn't exist`)
    }
}


/**
 * Initialise the database
 */
export const initDB = async () => {
    try {
        // delete all saved trips and bookings
        await Trip.deleteMany({})
        await Booking.deleteMany({})
        logger.info('DB cleared')
        // insert test values
        for (let trip of testTrips) {
            await addTrip(trip)
        }
        logger.info('DB initialised')
    } catch (err) {
        logger.error(err)
    }
}


/**
 * Remove old trips
 */
export const removeOldTrips: Function = async () => {
    try {
        const now: Date = new Date()
        const oldTrips: Array<object> = await Trip.find({departure_time: {$lt: now}})
        await Trip.deleteMany({departure_time: {$lt: now}})
        logger.complete({message: `Removed ${oldTrips.length} old trips`})
    } catch (err) {
        logger.error(err)
    }
}


//------------------------------------------------------
// User-related functions
//------------------------------------------------------
/**
 * Get a user by id
 * @param   id the id of the user
 * @returns the user
 */
export const getUserById = async (id: string) => {
    return User.findOne({id: {$eq: id}}, {
        __v: 0,
        created_at: 0,
        updated_at: 0,
    }).populate('contact', {
        __v: 0,
        created_at: 0,
        updated_at: 0,
    })
}

/**
 * Get a user by subscription id
 * @param   id the id of the subscription
 * @returns the user
 */
export const getUserBySub = async (id: string) => {
    return User.findOne({sub: {$eq: id}}, {
        __v: 0,
        created_at: 0,
        updated_at: 0,
        studentEmail: 0,
        isBlocked: 0,
    }).populate('contact', {
        __v: 0,
        created_at: 0,
        updated_at: 0,
    })
}


/**
 * Get a user's public profile
 * @param   id the id of the user
 * @returns the user
 */
export const getPublicProfile = async (id: string) => {
    return User.findOne({id: {$eq: id}}, {
        musicPref: 1,
        petsPref: 1,
        smokePref: 1,
        autoBook: 1,
        university: 1,
        picture: 1,
        nickname: 1,
        name: 1,
    })
}


/**
 * Get a user's public profile by sub
 * @param   id the id of the user
 * @returns the user
 */
export const getPublicProfileBySub = async (id: string) => {
    return User.findOne({sub: {$eq: id}}, {
        musicPref: 1,
        petsPref: 1,
        smokePref: 1,
        autoBook: 1,
        university: 1,
        picture: 1,
        nickname: 1,
        name: 1,
    })
}


/**
 * Get a user's email address from his sub
 * @param   sub the id of the user
 * @returns the user's email address
 */
export const getEmailBySub = async (sub: string) => {
    const user = await getUserBySub(sub)
    return user.contact.email
}


/**
 * Get a user's email address from his id
 * @param   id the id of the user
 * @returns the user's email address
 */
export const getEmailById = async (id: string) => {
    const user = await getUserById(id)
    return user.contact.email
}


/**
 * Create a new user
 * @param   u the user to add
 * @returns the user
 */
export const createUser = async (u: IUser) => {
    if (!u.id) u.id = v4()
    const contact = new Contact({
        sub: u.sub,
        email: u.email,
    })
    u.contact = contact._id
    const user = new User(u)
    await contact.save()
    await user.save()
    return user
}


/**
 * Book a trip
 * @param b the booking to add
 */
export const bookTrip: Function = async (b: any) => {
    b.id = v4()
    b.user = (await getUserBySub(b.user_id))?._id
    if (!b.user) {
        throw new BookingError(`User ${b.user_id} doesn't exist`)
    }
    let trip = await Trip.findOne({id: {$eq: b.trip}})
    if (!trip) {
        throw new BookingError('Ce trajet n\'existe pas')
    }
    let bookingExists = await Booking.findOne({trip: {$eq: trip._id}, user: {$eq: b.user}})
    if (bookingExists) {
        throw new BookingError('Vous avez déjà réservé ce trajet')
    }
    if (trip.driver_id === b.user_id) {
        throw new BookingError('Vous ne pouvez pas réserver votre propre trajet')
    }
    if (trip.places > 0) {
        b.trip = trip._id
        const booking = new Booking(b)
        await booking.save()

        trip.places--
        await trip.save()
        logger.success(`Trip ${b.trip} booked`)
        return trip
    } else {
        throw new BookingError('Ce trajet est complet')
    }
}


/**
 * Get all bookings of a trip
 * @param id the id of the trip
 * @param driver_id the id of the driver
 * @returns the booking requests
 */
export const getBookings = async (id: string, driver_id: string) => {
    const trip = await Trip.findOne({id: {$eq: id}})
    if (trip) {
        if (trip.driver_id === driver_id) {
            return Booking.find({trip: {$eq: trip._id}}, {
                _id: 0,
                __v: 0,
                created_at: 0,
                updated_at: 0,
            }).populate('user', {
                id: 1,
                nickname: 1,
                name: 1,
                picture: 1,
                university: 1,
            })
        } else {
            const user = await getUserBySub(driver_id)
            return Booking.find({user: {$eq: user._id}, trip: {$eq: trip._id}}, {
                _id: 0,
                __v: 0,
                created_at: 0,
                updated_at: 0,
            })
        }
    }
}


/**
 * Get a booking by id
 * @param id the id of the booking
 * @returns the booking
 */
export const getBookingById = async (id: string) => {
    return Booking.findOne({id: {$eq: id}}, {
        __v: 0,
        created_at: 0,
        updated_at: 0,
    }).populate([{
        path: 'user',
        model: 'User',
        select: {
            id: 1,
            sub: 1,
            nickname: 1,
            name: 1,
            picture: 1,
        }
    }, {
        path: 'trip',
        model: 'Trip',
        select: {
            __v: 0,
            created_at: 0,
            updated_at: 0,
        }
    }
    ])
}


/**
 * Confirm a booking
 * @param id the id of the booking
 * @param driver_sub the id of the driver
 */
export const confirmBooking = async (id: string, driver_sub: string) => {
    const booking = await getBookingById(id)
    booking.confirmed = true
    await booking.save()
    logger.success(`Booking ${id} confirmed`)
    return booking
}


/**
 * Delete a booking
 * @param id the id of the booking
 * @returns the booking
 */
export const deleteBooking = async (id: string) => {
    if (actions.validateUuidV4({}, id)) {
        const booking = await Booking.findOne({id: {$eq: id}})
        await Trip.updateOne({_id: booking.trip}, {$inc: {places: 1}})
        return Booking.findByIdAndDelete(booking._id)
    } else {
        throw new BookingError('Identifiant invalide')
    }
}


/**
 * Get user's bookings
 * @param   id the id of the user
 * @returns the user's trips
 */
export const getUserBookings = async (id: string) => {
    const user = await getUserBySub(id)
    if (user) {
        let bookings = await Booking.find({user: {$eq: user._id}}, {
            _id: 0,
            __v: 0,
            updated_at: 0,
            created_at: 0
        }).populate([{
            path: 'trip',
            model: 'Trip',
            select: {
                __v: 0,
                created_at: 0,
                updated_at: 0,
            },
            populate: {
                path: 'driver',
                select: {
                    id: 1,
                    nickname: 1,
                    name: 1,
                    picture: 1,
                    university: 1,
                }
            }
        }, {
            path: 'user',
            model: 'User',
            select: {
                id: 1,
                sub: 1,
                nickname: 1,
                name: 1,
                picture: 1,

            }
        }]).sort({'trip.departure_time': 1})
        if (bookings) {
            return bookings
        } else {
            throw new BookingError('Aucune réservation')
        }
    } else {
        throw new BookingError("User not found")
    }
}


/**
 * Get a user's published trips
 * @param   id the id of the user
 * @returns the user's trips
 */
export const getUserTrips = async (id: string | undefined) => {
    return Trip.find({driver_id: {$eq: id}}, {
        _id: 0,
        __v: 0,
        updated_at: 0,
        created_at: 0
    }).populate('driver', {
        _id: 0,
        __v: 0,
        created_at: 0,
        updated_at: 0,
        sub: 0,
        name: 0,
        email: 0,
        defaultPlaces: 0,
        verified: 0,
        studentEmail: 0,
        isBlocked: 0,
    }).sort({departure_time: 1})
}


/**
 * Update a user's nickname
 * @param   id the id of the user
 * @param   nickname the new nickname
 */
export const updateUserNickname = async (id: string, nickname: string) => {
    await User.updateOne({id: {$eq: id}}, {$set: {nickname: nickname}})
}


/**
 * Update a user's picture
 * @param   id the oauth id of the user
 * @param   picture the new picture url
 * @returns the updated user
 */
export const updateUserPictureBySub = async (id: string, picture: string) => {
    await User.updateOne({sub: {$eq: id}}, {$set: {picture: picture}}, {new: true})
}


/**
 * Save a user's travel preferences
 * @param   id the oauth id of the user
 * @param   preferences the new preferences
 */
export const saveUserPreferencesBySub = async (id: string, preferences: any) => {
    await User.updateOne({sub: {$eq: id}}, {
        $set: {
            smokePref: preferences.smokePref,
            musicPref: preferences.musicPref,
            petsPref: preferences.petsPref,
            autoBook: preferences.autoBook,
        }
    }, {new: true})
}


/**
 * Save a user's contact info
 * @param   id the oauth id of the user
 * @param   info the new contact info
 */
export const saveUserContactBySub = async (id: string, info: any) => {
    const contact = await Contact.findOne({sub: {$eq: id}})
    contact.phone = info.phone
    contact.snapchat = info.snapchat
    contact.facebook = info.facebook
    contact.instagram = info.instagram
    await contact.save()
}


// ------------------------------------------------------
// User verification-related functions
// ------------------------------------------------------
/**
 * Check if a user is verified
 * @param   user user to check
 * @returns true if verified, false otherwise
 */
export const verifiedOrSave = async (user: IVerification): Promise<boolean> => {
    const u = await getUserBySub(user.sub)
    if (u) {
        return u.verified && !u.isBlocked
    } else {
        const id = v4()
        user.picture = await image.download(String(user.picture), id)
        logger.info('User picture downloaded', user.picture)
        await createUser(<IUser>{
            id,
            sub: user.sub,
            name: user.name?.split('@')[0],
            nickname: user.username || user.nickname,
            email: user.email,
            email_verified: user.email_verified,
            studentEmail: user.email,
            picture: user.picture,
            verified: false
        })
        await mail.send('generic', String(user.email), 'Bienvenue sur UniCovoit !', {
            title: 'Bienvenue sur UniCovoit !',
            body: `<p>
                        Merci d'avoir rejoint UniCovoit !
                  </p>
                  <p>
                      Vous pouvez dès à présent renseigner vos informations de contact et préférences de trajet sur votre profil !<br>
                      Cela permettra aux autres usagers de vous contacter plus facilement après une réservation.
                  </p>`,
            url: 'https://unicovoit.fr/profile#contact',
            urlText: 'Compléter mes informations de contact'
        } as GenericEmailData)
        return false
    }
}


/**
 * Checks if a student email is already used
 * @param   email the email to check
 * @returns true if used, false otherwise
 */
export const studentEmailUsed = async (email: string): Promise<boolean> => {
    return !!await User.findOne({studentEmail: {$eq: email}})
}


/**
 * Save the user's university
 * @param   id the user's sub
 * @param   university the university
 */
export const updateUserUniversity = async (id: string, university: string) => {
    await User.updateOne({sub: {$eq: id}}, {$set: {university: university}})
}


/**
 * Save a verification code
 * @param   id the sub of the user
 * @param   email the email to verify
 * @param   code the verification code
 */
export const saveVerificationCode = async (id: string, email: string, code: string) => {
    await Verification.deleteMany({sub: {$eq: id}})
    const verification = new Verification({
        sub: id,
        email: email,
        code: code
    })
    await verification.save()
}


/**
 * Check a verification code
 * @param   id the sub of the user
 * @param   email the email to verify
 * @param   code the verification code
 * @returns true if the code is correct, false otherwise
 */
export const verifyCode = async (id: string, email: string, code: string): Promise<boolean> => {
    const valid = await Verification.findOne({sub: {$eq: id}, email: {$eq: email}, code: {$eq: code}})
    if (valid) {
        await Verification.findByIdAndDelete(valid._id)
        const user = await User.findOne({sub: {$eq: id}})
        if (user) {
            user.verified = true
            user.studentEmail = email
            await user.save()
            return true
        } else {
            logger.error(`User ${id} not found`)
            return false
        }
    }
    return false
}


/**
 * Delete a user
 * @param   user the user to delete
 */
export const deleteUser = async (user: IUser) => {
    await User.findByIdAndDelete(user._id)
    await Contact.findByIdAndDelete(user.contact)
}
