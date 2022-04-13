import {Router} from 'express'
import logger from '../util/signale'
import * as db from '../util/db'
import {verifyTrip} from "../util/verifier"
import {auth} from "express-oauth2-jwt-bearer"
import axios from 'axios'

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
    if (isDev && false) { // Only for development
        res.json(db.testData)
    } else {
        try {
            let from = req.query.from
            let to = req.query.to
            let date = new Date()
            if (req.query.date) {
                let [year, month, day] = String(req.query.date).split('-')
                date.setFullYear(parseInt(year))
                date.setMonth(parseInt(month) - 1)
                date.setDate(parseInt(day))
            }

            if (from && to) {
                db.getTrips(String(from), String(to), date).then(trips => {
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
    }
})


/**
 * @desc    Get the distance between two cities
 * @param   {string} from - The city where the trip starts
 * @param   {string} to - The city where the trip ends
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
        const start = `${response.data[0].lon},${response.data[0].lat}`
        return axios.get('https://nominatim.openstreetmap.org/search', {
            params: {
                q: to,
                format: 'json',
            }
        }).then((response: any) => {
            const end = `${response.data[0].lon},${response.data[0].lat}`
            // Get distance between two points
            return axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${start};${end}?access_token=${process.env.MAPBOX_TOKEN}`
            ).then((r: any) => {
                return {
                    distance: parseInt(String(r.data.routes[0].distance / 1000)),
                    duration: parseInt(String(r.data.routes[0].duration / 60))
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
 * @param   {string} from - The city where the trip starts
 * @param   {string} to - The city where the trip ends
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
 * @route   POST /api/v1/trips/add
 * @desc    Create a trip
 * @access  Private
 */
// @ts-ignore
router.post('/add', checkJwt, (req: Request<RouteParameters<string>, any, any, ParsedQs, Record<string, any>>, res: Response<ResBody, Locals>) => {
    try {
        let trip = verifyTrip(req.body)
        logger.info(trip)
        db.addTrip(
            trip
        ).then((r: object) => {
            res.json(r)
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
        logger.info(req.body)
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
