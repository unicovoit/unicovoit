import {Router} from 'express'
import {auth} from "express-oauth2-jwt-bearer"
import axios from "axios"
import {XMLParser} from "fast-xml-parser"
import logger from '../util/signale'
import * as db from '../util/db'
import {verifyTrip} from "../util/verifier"
import {getDistance, validateCoordinates, prepareTrip} from "../util/map"
import * as mail from "../util/mail"

import Distance from "../interfaces/Distance"
import Trip from "../interfaces/Trip"

const router: Router = Router()

const isDev = process.env.NODE_ENV !== 'production'
const checkJwt = auth({
    jwksUri: 'https://iucovoit.eu.auth0.com/.well-known/jwks.json',
    issuer: 'https://iucovoit.eu.auth0.com/',
    audience: 'https://iucovoit.eu.auth0.com/api/v2/',
})


/**
 * @route   GET /api/v1/trips
 * @desc    Get all trips
 * @access  Public
 */
router.get('/', (req, res) => {
    try {
        let date = new Date()
        if (req.query.date) {
            let [year, month, day] = String(req.query.date).split('-')
            date.setFullYear(parseInt(year))
            date.setMonth(parseInt(month) - 1)
            date.setDate(parseInt(day))
        }

        if (req.query.from && req.query.to) {
            let from: string[] = String(req.query.from).split(',')
            let to: string[] = String(req.query.to).split(',')
            validateCoordinates(from)
            validateCoordinates(to)

            db.getTrips(from.map(co => parseFloat(co)), to.map(co => parseFloat(co)), date).then(trips => {
                res.json(trips)
            }).catch(err => {
                logger.error(err)
                res.status(500).json({error: err})
            })
        } else {
            db.getAllTrips().then((trips: any) => {
                res.json(trips)
            })
        }
    } catch (e) {
        logger.error(e)
        res.status(500).json({
            error: e
        })
    }
})


/**
 * @route   GET /api/v1/trips/distance
 * @desc    Get the distance between two cities
 * @access  Private
 * @param   {string} from - The city where the trip starts
 * @param   {string} to - The city where the trip ends
 */
// @ts-ignore
router.get('/distance', checkJwt, (req: Request<RouteParameters<string>, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) => {
    if (req.query.from && req.query.to) {
        getDistance(req.query.from, req.query.to)
            .then((distance: Distance) => {
                res.json(distance)
            }).catch(err => {
                logger.error(err)
                res.status(500).json({
                    error: err
                })
            })
    } else {
        res.status(400).json({
            error: 'Missing parameters'
        })
    }
})


/**
 * @route   POST /api/v1/trips/petrol
 * @desc    Get petrol prices
 * @access  Public
 */
router.get('/petrol', (req, res) => {
    try {
        axios.get('https://api.zagaz.com/prix-moyen.php')
        .then(response => {
            let data = new XMLParser().parse(response.data)
            res.json(data['zagaz-data'].prix_moyen.e10)
        })
        .catch(error => {
            console.error(error)
        })
    } catch (e) {
        logger.error(e)
        res.status(500).json({
            error: e
        })
    }
})


/**
 * @route   GET /api/v1/trips/id/:id
 * @desc    Get trip by id
 * @access  Private
 */
// @ts-ignore
router.get('/id/:id', checkJwt, async (req: Request<RouteParameters<string>, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) => {
    try {
        const trip = await db.getTripById(req.params.id)
        if (trip) {
            res.json(trip)
        } else {
            res.status(404).json({
                error: 'Trip not found'
            })
        }
    } catch (e) {
        logger.error(e)
        res.status(500).json({
            error: e
        })
    }
})


/**
 * @route   DELETE /api/v1/trips/id/:id
 * @desc    Delete trip by id
 * @access  Private
 */
router.delete('/id/:id', checkJwt, async (req, res) => {
    try {
        await db.removeTrip(req.params.id, String(req.auth?.payload.sub))
        // TODO notify driver and users
        res.json({
            message: 'Trip deleted'
        })
    } catch (e) {
        logger.error(e)
        res.status(500).json({
            error: e
        })
    }
})


/**
 * @route   POST /api/v1/trips/bookings/:id/confirm
 * @desc    Confirm a booking
 * @access  Private
 */
router.post('/bookings/:id/confirm', checkJwt, async (req, res) => {
    try {
        const booking = await db.getBookingById(req.params.id)
        if (booking) {
            if (String(booking.trip?.driver_id) === String(req.auth?.payload.sub)) {
                await db.confirmBooking(req.params.id, String(req.auth?.payload.sub))
                await mail.sendConfirmation(booking.trip, await db.getUserById(booking.user.id), await db.getUserBySub(String(req.auth?.payload.sub)))
                res.sendStatus(200)
            } else {
                res.status(403).json({
                    error: 'You are not allowed to confirm this booking'
                })
            }
        } else {
            res.status(404).json({
                error: 'Booking not found'
            })
        }
    } catch (e: any) {
        logger.error(e)
        res.status(500).json({
            error: e.message
        })
    }
})


/**
 * @route   DELETE /api/v1/trips/bookings/:id/cancel
 * @desc    Cancel a booking
 * @access  Private
 */
router.delete('/bookings/:id/cancel', checkJwt, async (req, res) => {
    try {
        const booking = await db.getBookingById(req.params.id)
        if (booking) {
            if (String(booking.trip?.driver_id) === String(req.auth?.payload.sub)) {
                await db.deleteBooking(req.params.id)
                await mail.sendCancellation(booking.trip, await db.getUserById(booking.user.id), await db.getEmailBySub(String(req.auth?.payload.sub)))
                res.sendStatus(200)
            } else {
                res.status(403).json({
                    error: 'You are not allowed to cancel this booking'
                })
            }
        } else {
            res.status(404).json({
                error: 'Booking not found'
            })
        }
    } catch (e: any) {
        logger.error(e)
        res.status(500).json({
            error: e.message
        })
    }
})


/**
 * @route   GET /api/v1/trips/bookings/:id
 * @desc    get all bookings for a trip
 * @access  Private
 */
router.get('/bookings/:id', checkJwt, async (req, res) => {
    try {
        const requests = await db.getBookings(req.params.id, String(req.auth?.payload.sub)).catch(err => {
            logger.error(err)
            res.status(404).json({
                error: err.message
            })
        })
        res.json(requests)
    } catch (e) {
        logger.error(e)
        res.status(500).json({
            error: e
        })
    }
})


/**
 * @route   POST /api/v1/trips/add
 * @desc    Create a trip
 * @access  Private
 */
// @ts-ignore
router.post('/add', checkJwt, async (req: Request<RouteParameters<string>, any, any, ParsedQs, Record<string, any>>, res: Response<ResBody, Locals>) => {
    try {
        let tmp = verifyTrip(req.body)
        let trip: Trip = await prepareTrip(tmp, req.auth?.payload.sub)

        logger.info(typeof trip, trip)
        await db.addTrip(trip as Trip)
        res.sendStatus(200)
    } catch (e) {
        logger.error(e)
        res.status(500).json(isDev ? e : {error: 'Internal server error'})
    }
})


/**
 * @route   POST /api/v1/trips/book
 * @desc    Book a trip
 * @access  Private
 */
router.post('/book', checkJwt, async (req, res) => {
    try {
        let b = req.body
        let trip = await db.getTripById(b.trip)
        let user = await db.getUserBySub(String(req.auth?.payload.sub))
        if (trip && user) {
            const driver = await db.getUserById(trip.driver.id)
            b.confirmed = trip.driver.autoBook
            try {
                await db.bookTrip(req.body)
                if (trip.driver.autoBook) {
                    await mail.sendAutoBookConfirmation(trip, user, driver)
                } else {
                    await mail.sendRequest(trip, user, driver)
                }
                res.sendStatus(200)
            } catch (e: any) {
                logger.error('Booking error: ' + e.message)
                res.status(400).json({
                    error: e.message
                })
            }
        } else {
            res.sendStatus(404)
        }
    } catch (e) {
        logger.error(e)
        res.status(500).json(isDev ? e : {error: 'Internal server error'})
    }
})


module.exports = {router}
