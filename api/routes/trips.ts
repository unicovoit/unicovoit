import {Router} from 'express'
import logger from '../util/signale'
import {addTrip} from '../util/db'

const router: Router = Router()

const Trip = require('../models/Trip')


// @route   GET /api/v1/trips
// @desc    Get all trips
// @access  Public
// @ts-ignore
router.get('/', (req: Request<RouteParameters<string>, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) => {
    res.json([{
        id: 1,
        driver: {
            id: 0,
            name: "",
            picture: "https://s.gravatar.com/avatar/371bf211f9b892f400479cb44bb6f1cf?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fdu.png"
        },
        from: 'Paris',
        to: 'Marseille',
        price: '100',
        description: 'Accompagnez-moi sur la route de Marseille. J\'ai un petit coffre donc petit bagages svp.',
        show: false,
    },
        {
            id: 2,
            driver: {
                id: 1,
                name: "finxol",
                picture: "https://cdn.discordapp.com/avatars/688822573970096165/b9480f354ea3fbaf05abb964265a1cc8.png"
            },
            from: 'Paris',
            to: 'Lyon',
            price: '200',
            description: 'Accompagnez-moi sur la route de Lyon. J\'ai un petit coffre donc petit bagages svp.',
            show: false,
        },
        {
            id: 3,
            driver: {id: 2, name: "Elouann", picture: ""},
            from: 'Paris',
            to: 'Bordeaux',
            price: '300',
            description: 'Accompagnez-moi sur la route de Bordeaux. J\'aime beaucoup discuter et écouter de la musique. Voyage non fumeur.',
            show: false,
        }]);
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
        res.status(500).json({error: 'Internal server error'})
    }
})


// @route   GET /api/v1/trips/:id
// @desc    Get trip by id
// @access  Public
// @ts-ignore
router.get('/:id', (req: Request<RouteParameters<string>, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) => {
    Trip.findById(req.params.id)
        .then((trip: object) => res.json(trip))
})


// @route   POST /api/v1/trips
// @desc    Create a trip
// @access  Public
// @ts-ignore
router.post('/', (req: Request<RouteParameters<string>, any, any, ParsedQs, Record<string, any>>, res: Response<ResBody, Locals>) => {
    // save a trip to the database
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
})


module.exports = {router}
