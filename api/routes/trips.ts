import {Router} from 'express'
import logger from '../util/signale'
import {addTrip} from '../util/db'
import {auth} from "express-oauth2-jwt-bearer";

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
        from: 'Paris',
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


// @route   GET /api/v1/trips
// @desc    Get all trips
// @access  Public
// @ts-ignore
router.get('/', (req: Request<RouteParameters<string>, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) => {
    res.json(testData);
    return
    try {
        Trip.find()
            .sort({date: -1})
            .then((trip: object) => {
                res.json(trip)
                logger.success(trip)
            })
            .catch((err: Error) => {
                res.status(404).json({nopostsfound: 'No trips found'})
                logger.error(err)
            })
        logger.info(Trip)
    } catch (e) {
        logger.error(e)
        res.status(500).json(isDev ? e : {error: 'Internal server error'})
    }
})


// @route   GET /api/v1/trips/:id
// @desc    Get trip by id
// @access  Private
// @ts-ignore
router.get('/:id', checkJwt, (req: Request<RouteParameters<string>, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) => {
    try {
        let trip = testData.find(trip => trip.id === parseInt(req.params.id))
        if (trip) {
            res.json(trip)
        } else {
            res.status(404).json({nopostfound: 'No trip found with that ID'})
        }
        return
        Trip.findById(req.params.id)
            .then((trip: object) => res.json(trip))
            .catch((err: Error) => {
                res.status(404).json({nopostfound: 'No trip found with that ID'})
                logger.error(err)
            })

    } catch (e: any) {
        logger.error(e)
        res.status(500).json(isDev ? {message: e.errorMessage} : {error: 'Internal server error'})
    }
})


// @route   POST /api/v1/trips
// @desc    Create a trip
// @access  Private
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
    // save a trip to the database
})


module.exports = {router}
