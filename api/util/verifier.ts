import * as db from './db'
import xss from 'xss'

/**
 * Verify the submitted trip
 * @param {Object} trip
 * @returns {Object} the trip
 * @throws {Error} if the trip is invalid
 * @throws {Error} if the trip is not found
 */
export const verifyTrip: Function = (trip: any) => {
    // Verify the trip existance
    if (!trip) throw new Error('Trip is required')
    if (typeof trip !== 'object') throw new Error('Trip must be an object')

    // Verify trip properties existance
    if (!trip.driver_id) throw new Error('Driver id is required')
    if (!trip.from) throw new Error('Departure city is required')
    if (!trip.to) throw new Error('Destination city is required')
    if (!trip.departure_time) throw new Error('Departure time is required')
    if (!trip.price) throw new Error('Price is required')
    if (!trip.places) throw new Error('Available places is required')
    if (!trip.description) {
        trip.description = ''
    } else {
        trip.description = xss(trip.description)
    }

    // Verify driver existence
    // const driver = await db.getDriver(trip.driver_id)
    // if (!driver) throw new Error('Driver is not found')

    // Verify departure date
    let d = new Date(trip.departure_date)
    let testDate = new Date()
    if (d < testDate) throw new Error('Date cannot be in the past')
    testDate.setDate(testDate.getDate() + 21)
    if (d > testDate) throw new Error('Date cannot be more than 3 weeks in the future')

    // Verify price
    if (trip.price < 0) throw new Error('Price cannot be negative')
    if (trip.price > 100) throw new Error('Price cannot be more than 100')
    if (!/^[0-9]{1,3}$/.test(trip.price)) throw new Error('Price must be an integer between 0 and 100')

    // Verify places
    if (!/^[1-9]$/.test(trip.places)) throw new Error('Available places must be an integer between 1 and 9')

    return trip
}
