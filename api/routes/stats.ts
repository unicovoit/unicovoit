import {Router} from "express"

import {User} from "../models/User"
import {Trip} from "../models/Trip"

const router: Router = Router()


router.get("/users", async (req, res) => {
    try {
        const users = await User.find().count()
        res.json(users)
    } catch (err: any) {
        res.status(500).json({error: err.message})
    }
})

router.get("/trips", async (req, res) => {
    try {
        const trips = await Trip.find().count()
        res.json(trips)
    } catch (err: any) {
        res.status(500).json({error: err.message})
    }
})

module.exports = {router}
