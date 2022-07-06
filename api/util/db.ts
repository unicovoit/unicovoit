import logger from './signale'
import {Trip} from '../models/Trip'
import {User} from '../models/User'
import {Booking} from "../models/Booking";
import {v4} from "uuid";
import {Error} from "mongoose"
import {BookingError} from "../errors/BookingError"

export const testTrips = [{
    from: [ 47.972292, -2.737387 ],
    to: [ 48.1110706956896, -1.52818191449501 ],
    price: '6',
    description: "on a fait de l'escalade à réguiny",
    departure_time: '2022-07-14T18:30:51.400Z',
    driver_id: 'auth0|623f93c6c665610070aa3d75',
    places: '3',
    id: '4a8c12f3-48e9-4b14-9522-69f0bbb067fb',
    distance: 114,
    duration: 80,
    fromName: 'Bel Air',
    fromCity: 'Réguiny',
    toName: 'Espace Nominoë, Rue Julien Neveu',
    toCity: 'undefined'
}, {
    from: [48.138244, -1.53536],
    to: [47.655162, -2.788994],
    price: '7',
    description: 'Geronimooooo!!!!!!!!!',
    departure_time: '2022-07-20T19:35:56.400Z',
    driver_id: 'auth0|623f93c6c665610070aa3d75',
    driver_picture: 'https://pm1.narvii.com/7423/0e9230dce862b4ad9c54955d679b9935bc8f7e98r1-1153-1153v2_uhq.jpg',
    driver_name: 'Eleventh Doctor',
    places: '3',
    id: '1d866cb1-342f-4492-b679-c3be592544cf',
    distance: 128,
    duration: 90,
    fromName: '10 Rue de la Montagne des Oliviers',
    fromCity: 'Acigné',
    toName: '5 Rue de la Fenaison',
    toCity: 'Vannes'
}, {
    from: [ 49.648772, -1.586798 ],
    to: [ 43.69076, 7.306975 ],
    price: '75',
    description: 'Long trajet avec de nombreuses pauses. Musique la plupart du temps.\n' +
        "Je ne passerai pas par l'autoroute",
    departure_time: '2022-07-20T04:45:29.623Z',
    driver_id: 'auth0|623f93c6c665610070aa3d75',
    driver_name: 'Brice de nice',
    places: '2',
    id: '6d4126ff-e472-44b5-a891-2927d17f7e1a',
    distance: 1338,
    duration: 755,
    fromName: '61 Rue de l’Ancienne Gare',
    fromCity: 'Cherbourg-en-Cotentin',
    toName: '35 Boulevard Princesse Grace de Monaco',
    toCity: 'Nice'
}]

//------------------------------------------------------
// Trip-related functions
//------------------------------------------------------
/**
 * Add a trip to the database
 * @param t the trip to add
 */
export const addTrip: Function = async (t: any) => {
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
        __v: 0
    });
}


/**
 * Get a trip by location and date
 * @param from the departure location
 * @param to the arrival location
 * @param date the date of the trip
 * @returns the array of trips
 */
export const getTrips = async (from: { lat: number, lon: number }, to: { lat: number, lon: number }, date: Date) => {
    const min = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    const max = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)

    return Trip.find({
        from: [from.lat, from.lon],
        to: [to.lat, to.lon],
        departure_time: {
            $gte: min,
            $lt: max
        }
    }, {
        _id: 0,
        __v: 0
    });
}


/**
 * Get a trip by id
 * @param id the id of the trip
 * @return the trip
 */
export const getTripById = async (id: string) => {
    return Trip.find({id: id}, {
        _id: 0,
        __v: 0
    });
}


/**
 * Initialise the database
 */
export const initDB = async () => {
    try {
        // delete all saved trips
        await Trip.deleteMany({})
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
export const addUser: Function = async (u: object) => {
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
    return User.findOne({sub: id}, {
        _id: 0,
        __v: 0
    })
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
    const booking = new Booking(b)
    let trip = await Trip.findOne({id: {$eq: b.trip_id}})
    let bookingExists = await Booking.findOne({trip_id: {$eq: b.trip_id}, user_id: {$eq: b.user_id}})
    if (!trip) {
        throw new BookingError('Ce trajet n\'existe pas')
    }
    if (bookingExists) {
        throw new BookingError('Vous avez déjà réservé ce trajet')
    }
    if (trip.driver_id === booking.user_id) {
        throw new BookingError('Vous ne pouvez pas réserver votre propre trajet')
    }
    if (trip.places > 0) {
        trip.places--
        await trip.save()
        await booking.save()
        logger.success(`Trip ${b.trip_id} booked`)
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
    return Booking.deleteOne({trip_id: {$eq: id}, user_id: {$eq: user}})
}


/**
 * Get user's bookings
 * @param   id the id of the user
 * @returns the user's trips
 */
export const getUserBookings = async (id: string) => {
    let bookings = Booking.find({user_id: {$eq: id}}, {
        _id: 0,
        __v: 0
    })
    let list: any[] = []
    for await (let booking of bookings) {
        let trip = await Trip.findOne({id: {$eq: booking.trip_id}}, {
            _id: 0,
            __v: 0,
            updated_at: 0,
            created_at: 0
        })
        if (trip) {
            trip.booking = booking.id
            list.push(trip)
        }
    }
    return list
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
    return User.find({id}).then((user: any) => {
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
    return User.findByIdAndUpdate({sub: id}, {picture: picture}, {new: true})
}
