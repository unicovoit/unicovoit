import logger from './signale'

export const addTrip: Function = async (t: object) => {
    const {Trip} = require('../models/Trip')

    let countAdd = 0

    try {
        const tmp = new Trip(t)
        await tmp.save()
        logger.log('Added : ' + tmp.fullId)
        countAdd++
    } catch (err) {
        throw err
    }

    logger.info('------------------')
    logger.info(countAdd + ' added elements')
}
