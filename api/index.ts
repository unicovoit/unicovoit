import express from 'express'
// @ts-ignore
import createError from 'http-errors'
// @ts-ignore
import cors from 'cors'
import bodyParser from 'body-parser'
import logger from './util/signale'
// @ts-ignore
import cookieParser from 'cookie-parser'
import mongoose from "mongoose"
const {version} = require('../package.json')
// @ts-ignore
import rateLimit from 'express-rate-limit'

const mongoUrl: string = process.env.MONGO_URL || 'mongodb://localhost:27017/'

logger.info('Starting...')
logger.info('Version : ' + version)
logger.info('MongoDB Url : ' + mongoUrl)

// Connect to MongoDB first
if (process.env.NODE_ENV !== 'test') {
    mongoose.connect(`mongodb://${mongoUrl}/trips`).then(() => {
        logger.info('Mongo initialized !')
    }).catch((err) => {
        logger.error('Error while initializing mongo', err)
    })
}

const app = express()

// @ts-ignore
let limiter: any = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter);
app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())

app.use('/trips', require('./routes/trips').router)


export default app


if (require.main === module) {
    const port: string | number = process.env.PORT || 3001
    app.listen(port, () => {
        logger.info(`API server listening on port ${port}`)
    })
}
