import xss from 'xss'
import {ExpressFileuploadValidator} from 'express-fileupload-validator'

const fileValidator: ExpressFileuploadValidator = new ExpressFileuploadValidator({
    minCount: 2,
    maxCount: 8,
    allowedExtensions: ['jpg', 'png', 'gif'],
    allowedMimetypes: ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'],
    maxSize: '10MB',
})


/**
 * Verify the submitted trip
 * @param {Object} trip
 * @returns {Object} the trip
 * @throws {Error} if the trip is invalid
 * @throws {Error} if the trip is not found
 */
export const verifyTrip: Function = (trip: any) => {
    // Verify the trip existence
    if (!trip) throw new Error('Trip is required')
    if (typeof trip !== 'object') throw new Error('Trip must be an object')

    // Verify trip properties existence
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
    testDate.setHours(0, 0, 0, 0)
    if (d < testDate) throw new Error('Date cannot be in the past')
    testDate.setDate(testDate.getDate() + 21)
    if (d > testDate) throw new Error('Date cannot be more than 3 weeks in the future')

    // Verify price
    if (trip.price < 0) throw new Error('Price cannot be negative')
    if (trip.price > 100) throw new Error('Price cannot be more than 100')
    if (!/^\d{1,3}$/.test(trip.price)) throw new Error('Price must be an integer between 0 and 100')

    // Verify places
    if (!/^[1-5]$/.test(trip.places)) throw new Error('Available places must be an integer between 1 and 5')

    return trip
}


/**
 * Verify the submitted user
 * @param {Object} user
 * @returns {Object} the user
 * @throws {Error} if the user is invalid
 * @throws {Error} if the user is already registered
 */
export const verifyUser: Function = (user: any) => {
    // Verify the user existence
    if (!user) throw new Error('User is required')
    if (typeof user !== 'object') throw new Error('User must be an object')

    // Verify user properties existence
    if (!user.sub) throw new Error('User oauth id is required')
    if (!user.name) throw new Error('Name is required')
    if (!user.email) throw new Error('Email is required')

    // Verify user properties format
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(user.email)) throw new Error('Email is not valid')
    if (!/^[0-9]{5}$/.test(user.postal_code)) throw new Error('Postal code is not valid')
    if (!/^[0-9]{10}$/.test(user.phone)) throw new Error('Phone is not valid')

    // Verify user properties format
    if (!/^[a-zA-Z]{2,}$/.test(user.first_name)) throw new Error('First name is not valid')
    if (!/^[a-zA-Z]{2,}$/.test(user.last_name)) throw new Error('Last name is not valid')
    if (!/^[a-zA-Z]{2,}$/.test(user.address)) throw new Error('Address is not valid')
    if (!/^[a-zA-Z]{2,}$/.test(user.city)) throw new Error('City is not valid')
    if (!/^[a-zA-Z]{2,}$/.test(user.country)) throw new Error('Country is not valid')
}


/**
 * Verify the submitted picture
 * @param   {Object} picture
 * @returns {Object} the picture
 * @throws  {Error} if the picture is invalid
 */
export const verifyPicture: Function = (picture: any) => {
    // Verify the picture existence
    if (!picture) throw new Error('Picture is required')

    // Verify the picture properties

}
