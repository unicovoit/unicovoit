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
    Trip = connection.model('User')
} catch (e) {
    Trip = model('User', tripSchema)
}

module.exports = Trip
