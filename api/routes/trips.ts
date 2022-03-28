import {Router} from 'express'
import logger from '../util/signale'

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
            name: "du7iuw5f",
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
        }])
    try {
        Trip.find()
            .sort({date: -1})
            .then((trip: object) => res.json(trip))
            .catch((err: Error) => {
                // @ts-ignore
                res.status(404).json({nopostsfound: 'No trips found'})
                logger.error(err)
            })
        console.log(Trip)
    } catch (e) {
        logger.error(e)
        res.status(500).json({error: 'Internal server error'})
    }
})

// @route   GET /api/v1/trips/:id
// @desc    Get trip by id
// @access  Public
// @ts-ignore
router.get('/:id', (req: Request, res: Response) => {
    // @ts-ignore
    Trip.findById(req.params.id)
        // @ts-ignore
        .then(trip => res.send(JSON.stringify(trip)))
})

// @route   POST /api/v1/trips
// @desc    Create a trip
// @access  Public
// @ts-ignore
router.post('/', (req: Request<RouteParameters<string>, any, any, ParsedQs, Record<string, any>>, res: Response<ResBody, Locals>) => {
    const newTrip = new Trip({
        name: req.body.name || '',
        date: req.body.date,
        location: req.body.location,
        description: req.body.description,
        image: req.body.image,
        user: req.body.user
    })

    newTrip.save().then((trip: any) => res.send(JSON.stringify(trip)))
})

module.exports = {router}
