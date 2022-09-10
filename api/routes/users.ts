import * as db from '../util/db'
import logger from '../util/signale'
import * as mail from "../util/mail"
import {verifyEmail} from "../util/mail"
import VerificationJWT from "../interfaces/VerificationJWT"
import * as image from "../util/image"

import {auth} from "express-oauth2-jwt-bearer"
import {Router} from "express"
import * as jwt from 'jsonwebtoken'
import * as crypto from "crypto"
import axios from "axios"

const router: Router = Router()

const isDev: boolean = process.env.NODE_ENV !== 'production'
const AUTH0_DOMAIN: string = process.env.AUTH0_DOMAIN || 'localhost'
const VERIFICATION_SECRET: string = process.env.VERIFICATION_SECRET || ''
const checkJwt = auth({
    jwksUri: `https://${AUTH0_DOMAIN}/.well-known/jwks.json`,
    issuer: `https://${AUTH0_DOMAIN}/`,
    audience: `https://${AUTH0_DOMAIN}/api/v2/`,
})

/**
 * Verify the JWT token comes from the Auth0 server
 * @param req The request
 * @param res The response
 * @param next The next middleware
 */
const originCheck = async (req, res, next) => {
    try {
        const token: string = req.header('Authorization')?.replace('Bearer ', '') || ''
        const decoded = jwt.verify(token, VERIFICATION_SECRET)
        logger.info(decoded)
        req.auth = {...decoded}
        next()
    } catch (e) {
        logger.error(e)
        res.sendStatus(401)
    }
}


/**
 * @route   GET /api/v1/users/
 * @desc    Get user by id
 * @access  Private
 */
router.get('/', checkJwt, async (req, res) => {
    try {
        const user = await db.getUserBySub(String(req.auth?.payload.sub))
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
        const bookings = await db.getUserBookings(String(req.auth?.payload.sub))
        if (bookings) {
            res.json(bookings)
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
        const booking = await db.getBookingById(req.params.id)
        if (booking) {
            if (booking.user.sub === req.auth?.payload.sub) {
                await db.deleteBooking(req.params.id)
                await mail.sendCancellation(booking.trip, await db.getUserBySub(String(req.auth?.payload.sub)), await db.getEmailBySub(booking.trip.driver_id))
                res.json({
                    message: 'Booking deleted'
                })
            }
        } else {
            res.status(404).json({
                error: 'Booking not found'
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
 * @route   GET /api/v1/users/profile/sub/:sub
 * @desc    Get user public profile by sub
 * @access  Public
 */
router.get('/profile/sub/:sub', originCheck, async (req, res) => {
    try {
        const user = await db.getPublicProfileBySub(req.params.sub)
        if (user) {
            res.json(user)
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
 * @route   PUT /api/v1/users/nickname
 * @desc    Update a user's nickname
 * @access  Private
 */
router.put('/nickname', checkJwt, async (req, res) => {
    try {
        const user = await db.getUserBySub(String(req.auth?.payload.sub))
        if (user) {
            await db.updateUserNickname(user.id, req.body.nickname)
            res.sendStatus(200)
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
 * @route   POST /api/v1/users/preferences
 * @desc    Update a user's travel preferences
 * @access  Private
 */
router.put('/preferences', checkJwt, async (req, res) => {
    try {
        const user = await db.getUserBySub(String(req.auth?.payload.sub))
        if (user) {
            if (verifyPrefs(req.body)) {
                await db.saveUserPreferencesBySub(String(req.auth?.payload.sub), req.body)
                res.sendStatus(200)
            } else {
                res.sendStatus(400)
            }
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
 * Validate user preferences
 * @param {Object} prefs
 * @returns {Boolean}
 */
function verifyPrefs(prefs: any) {
    if (typeof prefs.smokePref !== 'boolean')
        return false
    if (typeof prefs.petsPref !== 'boolean')
        return false
    if (typeof prefs.musicPref !== 'boolean')
        return false
    return typeof prefs.autoBook === 'boolean'
}


/**
 * @route   PUT /api/v1/users/contact
 * @desc    Update a user's contact info
 * @access  Private
 */
router.put('/contact', checkJwt, async (req, res) => {
    try {
        const user = await db.getUserBySub(String(req.auth?.payload.sub))
        if (user) {
            if (verifyContact(req.body)) {
                await db.saveUserContactBySub(String(req.auth?.payload.sub), req.body)
                res.sendStatus(200)
            } else {
                res.sendStatus(400)
            }
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
 * Validate user contact info
 * @param {Object} contact
 * @returns {Boolean}
 */
function verifyContact(contact: any) {
    const rules = {
        phone: [
            v => !v || /^\+?[\d]{10,}$/.test(v) || 'Merci de renseigner un numéro de téléphone valide',
        ],
            social: [
            v => !v || /^[\w\-.éèà]+$/.test(v) || 'Merci de renseigner un compte valide',
        ],
    }
    if (rules.phone.some(r => typeof r(contact.phone) !== "boolean"))
        return false
    if (rules.social.some(r => typeof r(contact.instagram) !== "boolean"))
        return false
    if (rules.social.some(r => typeof r(contact.facebook) !== "boolean"))
        return false
    if (rules.social.some(r => typeof r(contact.snapchat) !== "boolean"))
        return false
    return true
}


/**
 * @route   POST /api/v1/users/isVerified
 * @desc    Check if user is verified
 * @access  Private
 */
router.get('/isVerified', originCheck, async (req, res) => {
    try {
        const auth = req.auth as unknown as VerificationJWT
        // check if the user is verified and save it if doesn't exist
        const verified: boolean = await db.verifiedOrSave(auth)
        const token = jwt.sign({
            sub: auth.sub,
        }, VERIFICATION_SECRET, {expiresIn: '15m'})

        res.status(200).json({verified, token})
    } catch (e) {
        logger.error(e)
        res.status(500).json({
            error: 'Server error'
        })
    }
})


/**
 * @route   POST /api/v1/users/sendVerificationCode
 * @desc    Send verification code to user
 * @access  Private
 */
router.post('/sendVerificationCode', originCheck, async (req, res) => {
    try {
        const auth = req.auth as unknown as VerificationJWT
        if (req.body.hasOwnProperty('email')) {
            const uni = verifyEmail(String(req.body.email))
            if (uni) {
                if (await db.studentEmailUsed(String(req.body.email))) {
                    res.sendStatus(409)
                } else {
                    const bytes = crypto.randomBytes(4).toString('hex')
                    let code = String(parseInt(bytes, 16)).substring(0, 6)

                    await db.saveVerificationCode(auth.sub, req.body.email, code)
                    await mail.send('confirm_address', req.body.email, `Utilisez ${code} pour vérifier votre adresse universitaire`, {code})

                    await db.updateUserUniversity(auth.sub, uni)

                    const token = jwt.sign({
                        sub: auth.sub,
                        studentEmail: req.body.email
                    }, VERIFICATION_SECRET, {expiresIn: '3m'})

                    res.json({token})
                }
            } else {
                res.sendStatus(418)
            }
        } else {
            res.sendStatus(400)
        }
    } catch (e) {
        logger.error(e)
        res.status(500).json({
            error: e
        })
    }
})


/**
 * @route   POST /api/v1/users/verify
 * @desc    Verify user
 * @access  Private
 */
router.post('/verify', originCheck, async (req, res) => {
    try {
        const auth = req.auth as unknown as VerificationJWT
        if (req.body.hasOwnProperty('code') && /\d{6}/.test(req.body.code)) {
            const ok = await db.verifyCode(auth.sub, String(auth.studentEmail), req.body.code)

            const token = jwt.sign({
                sub: auth.sub,
                verified: ok,
                state: req.body.state
            }, VERIFICATION_SECRET, {expiresIn: '30s'})

            res.status(ok ? 200 : 418).json(ok ? {token} : '')
        } else {
            res.sendStatus(400)
        }
    } catch
        (e) {
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
        const decoded = image.base64ToBuffer(req.body.picture)
        const img = await image.compress(decoded.data)
        logger.info('Image compressed', img.length)

        const user = await db.getUserBySub(String(req.auth?.payload.sub))
        if (user) {
            const hash = crypto.createHash('sha1')
                .update(crypto.randomBytes(20))
                .digest('hex')
            const type = decoded.type.match(/\/(.*?)$/)
            if (type) {
                let name = `${user.id}_${hash}.${type[1]}`
                await image.save(img, name)
                name = `/img/${name}`
                await db.updateUserPictureBySub(user.sub, name)

                res.status(200).json({picture: name})
            } else {
                res.sendStatus(400)
            }
        } else {
            res.sendStatus(404)
        }
    } catch (e) {
        logger.error(e)
        res.status(500).json({
            error: 'Server error'
        })
    }
})


/**
 * @route   DELETE /api/v1/users
 * @desc    Delete user
 * @access  Private
 */
router.delete('/', checkJwt, async (req, res) => {
    try {
        const user = await db.getUserBySub(String(req.auth?.payload.sub))
        if (user) {
            await db.deleteUser(user)
            //await axios.delete(`https://login.auth0.com/api/v2/users/${user.sub}`)
            await mail.sendAccountDeletion(user)
            res.sendStatus(200)
        } else {
            res.sendStatus(404)
        }
    } catch (e) {
        logger.error(e)
        res.status(500).json({
            error: 'Server error'
        })
    }
})


module.exports = {router}
