import { Router } from 'express'
const router: Router = Router()
import logger from '../util/signale'

const Trip = require('../models/Trip')

// @route   GET /api/v1/trips
// @desc    Get all trips
// @access  Public
// @ts-ignore
router.get('/', (req: Request<RouteParameters<string>, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) => {
    console.log(Trip)
    try {
        Trip.find()
            .sort({date: -1})
            .then((trip: object) => res.json(trip))
            .catch((err: Error) => {
                // @ts-ignore
                res.status(404).json({ nopostsfound: 'No trips found' })
                logger.error(err)
            })
    } catch (e) {
        logger.error(e)
        res.status(500).json({ error: 'Internal server error' })
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
