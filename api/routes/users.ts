import * as db from '../util/db'
import logger from '../util/signale'
import {auth} from "express-oauth2-jwt-bearer"
import {Router} from "express"
import * as jwt from 'jsonwebtoken'

const router: Router = Router()

const isDev: boolean = process.env.NODE_ENV !== 'production'
const AUTH0_DOMAIN: string = process.env.AUTH0_DOMAIN || 'localhost'
const VERIFICATION_SECRET: string = process.env.VERIFICATION_SECRET || ''
const checkJwt = auth({
    jwksUri: `https://${AUTH0_DOMAIN}/.well-known/jwks.json`,
    issuer: `https://${AUTH0_DOMAIN}/`,
    audience: `https://${AUTH0_DOMAIN}/api/v2/`,
});

/**
 * Verify the JWT token comes from the Auth0 server
 * @param req The request
 * @param res The response
 * @param next The next middleware
 */
const originCheck = async (req, res, next) => {
    try {
        const token: string = req.header('Authorization')?.replace('Bearer ', '') || ''
        logger.info(token)
        const decoded = jwt.verify(token, VERIFICATION_SECRET)
        logger.info(decoded)
        next()
    } catch (e) {
        logger.error(e)
        res.status(401).send('Unauthorized')
    }
}


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
 * @route   POST /api/v1/users/isVerified
 * @desc    Check if user is verified
 * @access  Private
 */
router.get('/isVerified', originCheck, async (req, res, next) => {
    logger.info(req)
    try {
        // @ts-ignore
        const verified: boolean = true || await db.userIsVerified(req.auth.sub)
        res.status(200).json({verified})
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
