import logger from './signale'
import {Trip} from '../models/Trip'
// @ts-ignore
import mongoose, {MongooseDocument} from 'mongoose'


export const testData = [{
    id: 1,
    driver_id: 0,
    driver_name: "",
    driver_picture: "https://s.gravatar.com/avatar/371bf211f9b892f400479cb44bb6f1cf?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fdu.png",
    from: 'Paris',
    to: 'Marseille',
    price: '100',
    departure_time: new Date('2019-01-01'),
    description: 'Accompagnez-moi sur la route de Marseille. J\'ai un petit coffre donc petit bagages svp.',
}, {
    id: 2,
    driver_id: 1,
    driver_name: "finxol",
    driver_picture: "https://cdn.discordapp.com/avatars/688822573970096165/b9480f354ea3fbaf05abb964265a1cc8.png",
    from: 'Gare Montparnasse, Paris',
    to: 'Lyon',
    price: '200',
    departure_time: new Date('2019-01-01'),
    description: 'Accompagnez-moi sur la route de Lyon. J\'ai un petit coffre donc petit bagages svp.',
}, {
    id: 3,
    driver_id: 2,
    driver_name: "Elouann",
    driver_picture: "",
    from: 'Paris',
    to: 'Bordeaux',
    price: '300',
    departure_time: new Date('2019-01-01'),
    description: 'Accompagnez-moi sur la route de Bordeaux. J\'aime beaucoup discuter et écouter de la musique. Voyage non fumeur.',
}]



export const addTrip: Function = async (t: object) => {
    logger.info(t)
    try {
        const tmp = new Trip(t)
        logger.info(tmp)
        await tmp.save()
    } catch (err) {
        throw err
    }
}


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


export const getAllTrips = async () => {
    return await Trip.find({})
}


export const getTripById = async (id: string) => {
    return Trip.findById(id)
}



export const initDB = async () => {
    try {
        // delete all saved trips
        await Trip.deleteMany({})
        logger.info('DB cleared')
        // insert test values
        for (let trip of testData) {
            await addTrip(trip)
        }
        logger.info('DB initialized')
    } catch (err) {
        logger.error(err)
    }
}
