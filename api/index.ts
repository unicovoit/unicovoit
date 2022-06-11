import {initDB, removeOldTrips} from "./util/db";
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

import mongoose from "mongoose"
import logger from './util/signale'

import cors from 'cors'
import rateLimit from 'express-rate-limit'
import helmet from "helmet"

const {version} = require('../package.json')

const mongoUrl: string = process.env.MONGO_URL || 'localhost'

logger.info('Starting...')
logger.info('Version : ' + version)
logger.info('MongoDB Url : ' + mongoUrl)

// Connect to MongoDB first
mongoose.connect(`mongodb://${mongoUrl}:27017/unicovoit`)
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


// reset db if not in prod
if (process.env.NODE_ENV !== 'production') {
    logger.time('initialisation')
    initDB().then(() => {
        logger.timeEnd('initialisation')
    })
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
