import logger from './signale'
import {Trip} from '../models/Trip'
import {User} from '../models/User'


export const testData = [{
    from: [47.972292, -2.737387],
    to: [48.1110706956896, -1.52818191449501],
    price: '2',
    description: 'ok',
    departure_time: '2022-07-07T20:30:38.700Z',
    driver_id: 'auth0|623f93c6c665610070aa3d75',
    places: '3',
    distance: 0,
    duration: 0,
    id: 'db6a8265-4244-4f1d-809a-e616b1f7ad53',
    fromName: 'Bel Air, Réguiny',
    fromCity: 'Réguiny',
    toName: 'Espace Nominoë, Rue Julien Neveu, undefined',
    toCity: 'undefined'
}, {
    from: [48.138244, -1.53536],
    to: [47.655162, -2.788994],
    price: '7',
    description: 'venez avec moi svp je me sens seul sinon :snif:',
    departure_time: '2022-07-20T19:35:56.400Z',
    driver_id: 'auth0|623f93c6c665610070aa3d75',
    places: '3',
    id: '1d866cb1-342f-4492-b679-c3be592544cf',
    distance: 128,
    duration: 90,
    fromName: '10 Rue de la Montagne des Oliviers, Acigné',
    fromCity: 'Acigné',
    toName: '5 Rue de la Fenaison, Vannes',
    toCity: 'Vannes'
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
 * Book a trip
 * @param t the trip to book
 */
export const bookTrip: Function = async (t: object) => {
    let countBook = 0

    try {
        const tmp = new Trip(t)
        await tmp.save()
        logger.log('Booked : ' + tmp.fullId)
        countBook++
    } catch (err) {
        throw err
    }

    logger.info('------------------')
    logger.info(countBook + ' booked elements')
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
        for (let trip of testData) {
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
 * Get user's picture url and name by id
 * @param   id the id of the user
 * @returns the picture url and name
 */
export const getUserAvatarAndNameById: Function = async (id: string) => {
    return User.findById(id).then(user => {
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
