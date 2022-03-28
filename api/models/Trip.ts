const { Schema, model, connection } = require('mongoose')

const tripSchema: typeof Schema = new Schema({
        id: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        places: [{
            type: Schema.Types.ObjectId,
            ref: 'Place'
        }],
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    })

let Trip
try {
    Trip = connection.model('Trip')
} catch (e) {
    Trip = model('Trip', tripSchema)
}

module.exports = Trip
