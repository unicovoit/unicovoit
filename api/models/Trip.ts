import mongoose from "mongoose"

const TripSchema: mongoose.Schema = new mongoose.Schema({
        id: {
            type: String,
            required: true,
            unique: true,
            index: true
        },
        driver_name: {
            type: String,
        },
        from: [
            {
                type: String,
                required: true,
                index: true
            }, {
                type: String,
                required: true,
                index: true
            }
        ],
        fromName: {
            type: String,
            required: true
        },
        fromCity: {
            type: String,
            required: true
        },
        to: [
            {
                type: String,
                required: true,
                index: true
            }, {
                type: String,
                required: true,
                index: true
            }
        ],
        toName: {
            type: String,
            required: true
        },
        toCity: {
            type: String,
            required: true
        },
        departure_time: {
            type: Date,
            required: true,
            index: true
        },
        price: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        },
        places: {
            type: Number,
            required: true
        },
        distance: {
            type: Number,
            required: true
        },
        duration: {
            type: Number,
            required: true
        }
    }, {
        timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
    }
)

export const Trip = mongoose.model("Trip", TripSchema)
