import {Router} from 'express'
import logger from '../util/signale'
import * as db from '../util/db'
import {auth} from "express-oauth2-jwt-bearer"
import axios from 'axios'

const {version} = require("../../package.json")

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
// @ts-ignore
router.get('/', (req: Request<RouteParameters<string>, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) => {
    if (isDev && false /*|| +version.split('.')[0] < 1*/) { // Only for development or version < 1.0.0
        res.json(db.testData)
    } else {
        try {
            db.getAllTrips().then((trips: any) => {
                res.json(trips)
            })
        } catch (e) {
            logger.error(e)
            res.status(500).json({
                error: e
            })
        }
    }
})


/**
 * Get the distance between two cities
 * @param {string} from - The city where the trip starts
 * @param {string} to - The city where the trip ends
 * @returns {Promise<{ distance: number, duration: number } | Error>} - The distance and duration between the two cities
 * @private
 */
async function getDistance(from: string, to: string): Promise<{ distance: number, duration: number } | Error> {
    return await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
            q: from,
            format: 'json',
        }
    }).then((response: any) => {
        const start = `${response.data[0].lat},${response.data[0].lon}`
        return axios.get('https://nominatim.openstreetmap.org/search', {
            params: {
                q: to,
                format: 'json',
            }
        }).then((response: any) => {
            const end = `${response.data[0].lat},${response.data[0].lon}`
            // Get distance between two points
            return axios.get(`https://router.project-osrm.org/route/v1/driving/${start};${end}?overview=false`
            ).then((r: any) => {
                return {
                    distance: parseInt(String(r.data.routes[0].distance / 1000)),
                    duration: r.data.routes[0].duration,
                }
            }).catch((e: Error) => {
                logger.error(e)
                return e
            })
        }).catch((e: Error) => {
            logger.error(e)
            return e
        })
    }).catch((e: Error) => {
        logger.error(e)
        return e
    })
}


/**
 * @route   GET /api/v1/trips/distance
 * @desc    Get the distance between two cities
 * @access  Public
 * @param {string} from - The city where the trip starts
 * @param {string} to - The city where the trip ends
 */
// @ts-ignore
router.get('/distance', (req: Request<RouteParameters<string>, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) => {
    const from = req.query.from
    const to = req.query.to
    if (from && to) {
        getDistance(from, to).then((distance: { distance: number, duration: number } | Error) => {
            if (distance instanceof Error) {
                res.status(500).json({
                    error: distance
                })
            } else {
                res.json(distance)
            }
        })
    } else {
        res.status(400).json({
            error: 'Missing parameters'
        })
    }
})


/**
 * @route   GET /api/v1/trips/:id
 * @desc    Get trip by id
 * @access  Private
 */
// @ts-ignore
router.get('/:id', checkJwt, async (req: Request<RouteParameters<string>, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) => {
    if (isDev && false /*|| +version.split('.')[0] < 1*/) { // Only for development or version < 1.0.0
        let trip = db.testData.find(trip => trip.id === parseInt(req.params.id))
        if (trip) {
            res.json(trip)
        } else {
            res.status(404).json({
                error: 'Trip not found'
            })
        }
    } else {
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
    }
})


/**
 * @route   POST /api/v1/trips/add
 * @desc    Create a trip
 * @access  Private
 */
// @ts-ignore
router.post('/add', checkJwt, (req: Request<RouteParameters<string>, any, any, ParsedQs, Record<string, any>>, res: Response<ResBody, Locals>) => {
    try {
        db.addTrip(db.testData[0]).then((r: object) => {
            res.json(r)
            logger.success(r)
        }).catch((e: Error) => {
            logger.error(e)
            res.status(500).json({error: 'Internal server error'})
        })
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
// @ts-ignore
router.post('/book', checkJwt, (req: Request<RouteParameters<string>, any, any, ParsedQs, Record<string, any>>, res: Response<ResBody, Locals>) => {
    try {
        res.sendStatus(200)
        return
        db.bookTrip({
            trip: req.body.trip_id,
            user: req.body.user_id,
        }).then((r: object) => {
            res.sendStatus(200)
            logger.success(r)
        }).catch((e: Error) => {
            logger.error(e)
            res.status(500).json(isDev ? e : {error: 'Internal server error'})
        })
    } catch (e) {
        logger.error(e)
        res.status(500).json(isDev ? e : {error: 'Internal server error'})
    }
})


module.exports = {router}
