import logger from './signale'

export default {
    addTrip: async (trips: Array<object>) => {
        const {Trip} = require('../models/Trip')

        let countAdd = 0
        for (const t of trips) {
            try {
                const tmp = new Trip(t)
                await tmp.save()
                logger.log('Added : ' + tmp.fullId)
                countAdd++
            } catch (err) {
                logger.error('Error : ' + err)
            }
        }

        logger.info('------------------')
        logger.info(countAdd + ' added elements')
    },
}
