import {Router} from 'express'
import logger from '../util/signale'
import {addTrip, bookTrip} from '../util/db'
import {auth} from "express-oauth2-jwt-bearer"
import axios from 'axios'

const router: Router = Router()

const isDev = process.env.NODE_ENV !== 'production'
const Trip = require('../models/Trip')
const checkJwt = auth({
    jwksUri: 'https://iucovoit.eu.auth0.com/.well-known/jwks.json',
    issuer: 'https://iucovoit.eu.auth0.com/',
    audience: 'https://iucovoit.eu.auth0.com/api/v2/',
})

const testData = [{
    id: 1,
    driver: {
        id: 0,
        name: "",
        picture: "https://s.gravatar.com/avatar/371bf211f9b892f400479cb44bb6f1cf?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fdu.png"
    },
    from: 'Paris',
    to: 'Marseille',
    price: '100',
    date: '2019-01-01',
    description: 'Accompagnez-moi sur la route de Marseille. J\'ai un petit coffre donc petit bagages svp.',
    show: false,
}, {
    id: 2,
    driver: {
        id: 1,
        name: "finxol",
        picture: "https://cdn.discordapp.com/avatars/688822573970096165/b9480f354ea3fbaf05abb964265a1cc8.png"
    },
    from: 'Gare Montparnasse, Paris',
    to: 'Lyon',
    price: '200',
    date: '2019-01-01',
    description: 'Accompagnez-moi sur la route de Lyon. J\'ai un petit coffre donc petit bagages svp.',
    show: false,
}, {
    id: 3,
    driver: {id: 2, name: "Elouann", picture: ""},
    from: 'Paris',
    to: 'Bordeaux',
    price: '300',
    date: '2019-01-01',
    description: 'Accompagnez-moi sur la route de Bordeaux. J\'aime beaucoup discuter et écouter de la musique. Voyage non fumeur.',
    show: false,
}]


/**
 * @route   GET /api/v1/trips
 * @desc    Get all trips
 * @access  Public
 */
// @ts-ignore
router.get('/', (req: Request<RouteParameters<string>, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) => {
    if (isDev) {
        res.json(testData)
    } else {
        try {
            Trip.find({}, (err: Error, trips: any) => {
                if (err) {
                    logger.error(err)
                    res.status(500).json({
                        error: err
                    })
                } else {
                    res.json(trips)
                }
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
 * @returns {Promise<{ distance: number, duration: number } | Error>} - The distance and duration between the two cities
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
    if (isDev) {
        let trip = testData.find(trip => trip.id === parseInt(req.params.id))
        if (trip) {
            res.json(trip)
        } else {
            res.status(404).json({
                error: 'Trip not found'
            })
        }
    } else {
        try {
            Trip.findById(req.params.id, (err: Error, trip: any) => {
                if (err) {
                    logger.error(err)
                    res.status(500).json({
                        error: err
                    })
                } else {
                    res.json(trip)
                }
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
 * @route   POST /api/v1/trips
 * @desc    Create a trip
 * @access  Private
 */
// @ts-ignore
router.post('/', checkJwt, (req: Request<RouteParameters<string>, any, any, ParsedQs, Record<string, any>>, res: Response<ResBody, Locals>) => {
    try {
        addTrip({
            driver: {
                id: req.body.driver.id,
                name: req.body.driver.name,
                picture: req.body.driver.picture
            },
            from: req.body.from,
            to: req.body.to,
            price: req.body.price,
            description: req.body.description,
            show: req.body.show,
        }).then((r: object) => {
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
        bookTrip({
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
