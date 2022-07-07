import * as db from '../util/db'
import logger from '../util/signale'
import {auth} from "express-oauth2-jwt-bearer"
import {Router} from "express"

const router: Router = Router()

const isDev = process.env.NODE_ENV !== 'production'
const checkJwt = auth({
    jwksUri: 'https://iucovoit.eu.auth0.com/.well-known/jwks.json',
    issuer: 'https://iucovoit.eu.auth0.com/',
    audience: 'https://iucovoit.eu.auth0.com/api/v2/',
})


/**
 * @route   GET /api/v1/users/
 * @desc    Get user by id
 * @access  Private
 */
router.get('/', checkJwt, async (req, res) => {
    try {
        // @ts-ignore
        const user = await db.getUserById(req.auth.sub)
        if (user) {
            res.status(200).json(user)
        } else {
            res.status(404).json({
                error: 'User not found'
            })
        }
    } catch (e) {
        logger.error(e)
        res.status(500).json({
            error: 'Server error'
        })
    }
})


/**
 * @route   GET /api/v1/users/bookings
 * @desc    Get user bookings
 * @access  Private
 */
router.get('/bookings', checkJwt, async (req, res) => {
    try {
        // @ts-ignore
        const trips = await db.getUserBookings(req.auth?.payload.sub)
        if (trips) {
            res.json(trips)
        } else {
            res.status(404).json({
                error: 'User or bookings not found'
            })
        }
    } catch (e: any) {
        logger.error(e)
        res.status(500).json({
            error: isDev ? e.message : 'Server error'
        })
    }
})


/**
 * @route   DELETE /api/v1/users/bookings/:id
 * @desc    Delete user booking
 * @access  Private
 */
router.delete('/bookings/:id', checkJwt, async (req, res) => {
    try {
        const trip = await db.deleteBooking(req.params.id, req.auth?.payload.sub)
        if (trip) {
            res.json(trip)
        } else {
            res.status(404).json({
                error: 'User or booking not found'
            })
        }
    } catch (e: any) {
        logger.error(e)
        res.status(500).json({
            error: isDev ? e.message : 'Server error'
        })
    }
})


/**
 * @route   GET /api/v1/users/trips
 * @desc    Get user trips
 * @access  Private
 */
router.get('/trips', checkJwt, async (req, res) => {
    try {
        const trips = await db.getUserTrips(req.auth?.payload.sub)
        if (trips) {
            res.json(trips)
        } else {
            res.status(404).json({
                error: 'User or trips not found'
            })
        }
    } catch (e: any) {
        logger.error(e)
        res.status(500).json({
            error: isDev ? e.message : 'Server error'
        })
    }
})


/**
 * @route   GET /api/v1/users/profile/:id
 * @desc    Get user public profile by id
 * @access  Public
 */
router.get('/profile/:id', async (req, res) => {
    try {
        const user = await db.getPublicProfile(req.params.id)
        if (user) {
            res.status(200).json(user)
        } else {
            res.status(404).json({
                error: 'User not found'
            })
        }
    } catch (e) {
        logger.error(e)
        res.status(500).json({
            error: 'Server error'
        })
    }
})




/**
 * @route   POST /api/v1/users/login
 * @desc    Login user and save to db
 * @access  Public
 */
router.post('/login', async (req, res) => {
    try {
        logger.info(req)
        // TODO perform validity check on the id
        const user = await db.getUserBySub(req.body.sub)
        if (user) {
            res.status(200).json(user)
        } else {
            res.status(404).json({
                error: 'User not found'
            })
        }
    } catch (e) {
        logger.error(e)
        res.status(500).json({
            error: 'Server error'
        })
    }
})


/**
 * @route   POST /api/v1/users/add
 * @desc    Add user
 * @access  Private
 */
router.post('/add', checkJwt, async (req, res) => {
    try {
        logger.info(req.body)
        const user = await db.addUser(req.body)
        if (user) {
            res.status(200).json(user)
        } else {
            res.status(404).json({
                error: 'User not found'
            })
        }
    } catch (e) {
        logger.error(e)
        res.status(500).json({
            error: 'Server error'
        })
    }
})


/**
 * @route   PUT /api/v1/users/picture
 * @desc    Update user picture
 * @access  Private
 */
router.put('/picture', checkJwt, async (req, res) => {
    try {
        logger.info(req.body)
        return res.sendStatus(200)
        const user = await db.updateUserPicture(req.params.id, req.body)
        if (user) {
            res.status(200).json(user)
        } else {
            res.status(404).json({
                error: 'User not found'
            })
        }
    } catch (e) {
        logger.error(e)
        res.status(500).json({
            error: 'Server error'
        })
    }
})


module.exports = {router}
