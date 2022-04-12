import logger from './signale'
import {Trip} from '../models/Trip'
import {User} from '../models/User'


export const testData = [{
    driver_name: "",
    driver_picture: "https://s.gravatar.com/avatar/371bf211f9b892f400479cb44bb6f1cf?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fdu.png",
    driver_id: '688822573970096165',
    from: 'Paris',
    to: 'Marseille',
    price: '100',
    places: 2,
    departure_time: new Date('2019-01-01'),
    description: 'Accompagnez-moi sur la route de Marseille. J\'ai un petit coffre donc petit bagages svp.',
}, {
    driver_name: "finxol",
    driver_picture: "https://cdn.discordapp.com/avatars/688822573970096165/b9480f354ea3fbaf05abb964265a1cc8.png",
    driver_id: '688822573970096165',
    from: 'Gare Montparnasse, Paris',
    to: 'Lyon',
    price: '200',
    places: 4,
    departure_time: new Date('2019-01-01'),
    description: 'Accompagnez-moi sur la route de Lyon. J\'ai un petit coffre donc petit bagages svp.',
}, {
    driver_name: "Elouann",
    driver_picture: "",
    driver_id: '688822573970096165',
    from: 'Paris',
    to: 'Bordeaux',
    price: '300',
    places: 1,
    departure_time: new Date('2019-01-01'),
    description: 'Accompagnez-moi sur la route de Bordeaux. J\'aime beaucoup discuter et écouter de la musique. Voyage non fumeur.',
}, {
    from: 'Le Mans',
    to: 'Rennes',
    price: '15',
    description: "accompagnez-moi svp je me sens seul j'ai pas d'amis :(",
    departure_time: '2022-04-14T18:02:31.900Z',
    driver_id: 'auth0|623f93c6c665610070aa3d75',
    places: '5'
}, {
    from: 'Vannes',
    to: 'Rennes',
    price: '8',
    description: "Salut à toutes et tous, j'espère que vous allez bien. Je suis un peu déçu par ce voyage, mais je suis sûr que vous allez bien. Je vous invite à venir me voir à la gare de Vannes, je vous attend ici. (wtf copilot)",
    departure_time: '2022-04-14T18:02:31.900Z',
    driver_id: 'auth0|623f93c6c665610070aa3d75',
    places: '5'
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
        t.from = t.from.toUpperCase()
        t.to = t.to.toUpperCase()
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
    return await Trip.find({})
}


/**
 * Get a trip by location and date
 * @param from the departure location
 * @param to the arrival location
 * @param date the date of the trip
 * @returns the array of trips
 */
export const getTrips = async (from: string, to: string, date: Date) => {
    return await Trip.find({from: from.toUpperCase(), to: to.toUpperCase(), departure_time: {$gte: date}})
}


/**
 * Get a trip by id
 * @param id the id of the trip
 * @return the trip
 */
export const getTripById = async (id: string) => {
    return Trip.findById(id)
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
