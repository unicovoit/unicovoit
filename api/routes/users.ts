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
 * @route   GET /api/v1/users/:id/profile
 * @desc    Get user public profile by id
 * @access  Public
 */
router.get('/:id/profile', async (req, res) => {
    try {
        const user = await db.getUserAvatarAndNameById(req.params.id)
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
 * @route   GET /api/v1/users/:id
 * @desc    Get user by id
 * @access  Private
 */
router.get('/:id', checkJwt, async (req, res) => {
    try {
        const user = await db.getUserById(req.params.id)
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
 * @route   GET /api/v1/users/login
 * @desc    Login user and save to db
 * @access  Private
 */
router.post('/login', async (req, res) => {
    try {
        logger.info(req.body)
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
 * @route   POST /api/v1/users/:id/picture
 * @desc    Update user picture
 * @access  Private
 */
router.post('/:id/picture', checkJwt, async (req, res) => {
    try {
        // @ts-ignore
        logger.info(req.body)
        return res.status(200).json({
            message: 'Picture updated'
        })
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
