import { Schema, model, models } from 'mongoose'
import logger from '../util/signale'

const tripSchema: Schema = new Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true
        },
        driver: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        from: {
            type: String,
            required: true
        },
        to: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    })

let Trip: any
try {
    Trip = model('Trip', tripSchema)
} catch (e) {
    Trip = models.Trip
}
logger.info(Trip)
module.exports = Trip
