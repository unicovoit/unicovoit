import logger from './signale'
import {actions} from '../../store/index'


import {Trip} from '../models/Trip'
import ITrip from '../interfaces/Trip'
import {User} from '../models/User'
import IUser from '../interfaces/User'
import {Booking} from "../models/Booking"
import {Verification} from "../models/Verification"

import {v4} from "uuid"
import {Error} from "mongoose"
import {BookingError} from "../errors/BookingError"
import axios from "axios"

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
    driver_id: 'auth0|623f93c6c665610070aa3d75',
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
    driver_id: 'auth0|623f93c6c665610070aa3d75',
    driver_picture: 'https://pm1.narvii.com/7423/0e9230dce862b4ad9c54955d679b9935bc8f7e98r1-1153-1153v2_uhq.jpg',
    driver_name: 'Eleventh Doctor',
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
    departure_time: new Date().setDate(today.getDate() + 5),
    driver_id: 'auth0|623f93c6c665610070aa3d75',
    driver_name: 'Brice de nice',
    driver_picture: 'https://media.ouest-france.fr/v1/pictures/MjAxMzA5ZmI4ZmM0NzBlZjhlZTViMGUwZTNlZGU5ODBkMGI4YTU',
    places: 2,
    id: '6d4126ff-e472-44b5-a891-2927d17f7e1a',
    distance: 1338,
    duration: 755,
    fromName: '61 Rue de l’Ancienne Gare',
    fromCity: 'Cherbourg-en-Cotentin',
    toName: '35 Boulevard Princesse Grace de Monaco',
    toCity: 'Nice'
},  {
    from: {
        type: "Point",
        coordinates: [ 42.712716, 2.889324 ]
    },
    to: {
        type: "Point",
        coordinates: [ 43.604836, 1.457352 ]
    },
    price: 10,
    description: '',
    departure_time: new Date().setDate(today.getDate() + 6),
    driver_id: 'oauth2|discord|688822573970096165',
    places: 2,
    id: '9c2b8635-f45f-4e43-8064-111708f23400',
    distance: 206,
    duration: 126,
    fromName: 'Avenue Marechal Joffre',
    fromCity: 'Perpignan',
    toName: '25bis Boulevard de la Gare',
    toCity: 'Toulouse'
}]

axios.get(`https://randomuser.me/api/?results=${testTrips.length}`).then(res => {
    for (let i = 0; i < res.data.results.length; i++) {
        testTrips[i].driver_name = res.data.results[i].name.first + " " + res.data.results[i].name.last
        testTrips[i].driver_picture = res.data.results[i].picture.medium
    }
})

//------------------------------------------------------
// Trip-related functions
//------------------------------------------------------
/**
 * Add a trip to the database
 * @param t the trip to add
 */
export const addTrip: Function = async (t: ITrip) => {
    try {
        const tmp = new Trip(t)
        await tmp.save()
        logger.success(`Trip from ${t.from} to ${t.to} on ${t.departure_time} added`)
    } catch (err) {
        throw err
    }
}


/**
 * Get all trips
 * @returns {Promise<Trip[]>} the array of trips
 */
export const getAllTrips = async () => {
    return Trip.find({}, {
        _id: 0,
        __v: 0,
        created_at: 0,
        updated_at: 0
    }).sort({departure_time: 1})
}


/**
 * Get a trip by location and date
 * @param from the departure location
 * @param to the arrival location
 * @param date the date of the trip
 * @returns the array of trips
 */
export const getTrips = async (from: number[], to: number[], date: Date) => {
    const min = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    const max = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)

    console.log(min, max)
    console.log(from)
    console.log(to)

    return Trip.find({
        from: {
            $nearSphere: {
                $geometry: {
                    type: 'Point',
                    coordinates: from
                },
                $maxDistance: 20 * 1000
            }
        },
        departure_time: {
            $gte: min,
            $lt: max
        }
    }, {
        _id: 0,
        __v: 0
    }).sort({departure_time: 1})
}


/**
 * Get a trip by id
 * @param id the id of the trip
 * @return the trip
 */
export const getTripById = async (id: string) => {
    return Trip.findOne({id: {$eq: id}}, {
        _id: 0,
        __v: 0,
        created_at: 0,
        updated_at: 0,
    });
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
        // TODO notify driver add users
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
 * Add a user to the database
 * @param u the user to add
 */
export const addUser: Function = async (u: IUser) => {
    try {
        const tmp = new User(u)
        logger.info(tmp)
        await tmp.save()
    } catch (err) {
        throw err
    }
}


/**
 * Get a user by id
 * @param   id the id of the user
 * @returns the user
 */
export const getUserById = async (id: string) => {
    return User.findById(id)
}

/**
 * Get a user by subscription id
 * @param   id the id of the subscription
 * @returns the user
 */
export const getUserBySub = async (id: string) => {
    return User.findOne({sub: {$eq: id}}, {
        _id: 0,
        __v: 0
    })
}


/**
 * Check if a user is verified
 * @param   id user sub
 * @returns true if verified, false otherwise
 */
export const userIsVerified = async (id: string): Promise<boolean | undefined> => {
    const user = await getUserBySub(id)
    return user?.verified
}


/**
 * Get a user's public profile
 * @param   id the id of the user
 * @returns the user
 */
export const getPublicProfile = async (id: string) => {
    return User.find({id: {$eq: id}}, {
        musicPref: 1,
        petsPref: 1,
        smokingPref: 1,
        picture: 1,
        name: 1,
    })
}


/**
 * Book a trip
 * @param b the booking to add
 */
export const bookTrip: Function = async (b: any) => {
    b.id = v4()
    let trip = await Trip.findOne({id: {$eq: b.trip}})
    if (!trip) {
        throw new BookingError('Ce trajet n\'existe pas')
    }
    let bookingExists = await Booking.findOne({trip: {$eq: trip._id}, user_id: {$eq: b.user_id}})
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
    } else {
        throw new BookingError('Ce trajet est complet')
    }
}


/**
 * Delete a booking
 * @param id the id of the booking
 * @param user the id of the user
 * @returns the booking
 */
export const deleteBooking = async (id: string, user: string | undefined) => {
    if (actions.validateUuidV4({}, id)) {
        const booking = await Booking.findOne({id: {$eq: id}})
        await Trip.updateOne({_id: booking.trip}, {$inc: {places: 1}})
        return Booking.deleteOne({trip: {$eq: booking.trip}, user_id: {$eq: user}})
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
    let bookings = await Booking.find({user_id: {$eq: id}}, {
        _id: 0,
        __v: 0,
        updated_at: 0,
        created_at: 0
    }).populate("trip", {
        _id: 0,
        __v: 0,
        updated_at: 0,
        created_at: 0
    })
    if (bookings) {
        return bookings
    } else {
        throw new BookingError('Aucune réservation')
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
    })
}


/**
 * Get user's picture url and name by id
 * @param   id the id of the user
 * @returns the picture url and name
 */
export const getUserAvatarAndNameById: Function = async (id: string) => {
    return User.find({id: {$eq: id}}).then((user: any) => {
        return user ? {
            picture: user.picture,
            name: user.name
        } : false
    })
}


/**
 * Update a user's picture
 * @param   id the oauth id of the user
 * @param   picture the new picture url
 * @returns the updated user
 */
export const updateUserPicture = async (id: string, picture: string) => {
    return await User.findByIdAndUpdate({sub: {$eq: id}}, {picture: picture}, {new: true})
}


// ------------------------------------------------------
// User verification-related functions
// ------------------------------------------------------
/**
 * Save a verification code
 * @param   id the sub of the user
 * @param   email the email to verify
 * @param   code the verification code
 */
export const saveVerificationCode = async (id: string, email: string, code: string) => {
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
        await User.updateOne({sub: {$eq: id}}, {verified: true, studentEmail: email}, {new: true})
        return true
    }
    return false
}
