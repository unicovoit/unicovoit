import {initDB, removeOldTrips} from "./util/db";
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

import mongoose from "mongoose"
import logger from './util/signale'
import {universities} from "./util/mail"

import cors from 'cors'
import rateLimit from 'express-rate-limit'
import helmet from "helmet"

const {version} = require('../package.json')

const mongoUrl: string = process.env.MONGO_URL || 'localhost'
const mongoPort: string = process.env.MONGO_PORT || '27017'

logger.info('Starting...')
logger.info('Version : ' + version)
logger.info('MongoDB Url : ' + mongoUrl + ':' + mongoPort)

// Connect to MongoDB first
mongoose.connect(`mongodb://${mongoUrl}:${mongoPort}/unicovoit`, {
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASSWORD,
})
mongoose.connection.once('open', function () {
    logger.info('Mongo connected Successfully')
}).on('error', function (err) {
    logger.error('Error', err)
})

const app: express.Express = express()

let limiter: any = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 10 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})


app.disable('x-powered-by') // Disable Express header

app.use(bodyParser.json())
app.use(cookieParser())
app.use(helmet()) // Add security headers
app.use(cors()) // Set cross-origin requests headers
app.use(limiter) // Set the rate limit

app.use('/v1/trips', require('./routes/trips').router)
app.use('/v1/users', require('./routes/users').router)
app.get('/v1/universities', (req, res) => {
    res.json({
        universities: universities.map(uni => {
                const {format, ...u} = uni
                return u
            })
    })
})


// reset db if not in prod
if (process.env.NODE_ENV !== 'production') {
    logger.time('initialisation')
    setTimeout(() => {
        initDB().then(() => {
            logger.timeEnd('initialisation')
        })
    }, 1000)
}

// remove old trips every hour
setInterval(() => {
        logger.time('remove old trips')
        removeOldTrips().then(() => {
            logger.timeEnd('remove old trips')
        })
    },
    3600000 // 1 hour in milliseconds
)


export default app


// Start the server if standalone mode
if (require.main === module) {
    const port: string | number = process.env.PORT || 3001
    app.listen(port, () => {
        logger.info(`API server listening on port ${port}`)
    })
}
