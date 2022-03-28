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
