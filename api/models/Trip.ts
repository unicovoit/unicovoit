import mongoose from "mongoose"

const TripSchema: mongoose.Schema = new mongoose.Schema({
        id: {
            type: String,
            required: true,
            unique: true,
            index: true
        },
        driver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            index: true,
        },
        driver_id: {
            type: String,
            index: true
        },
        from: {
            type: {type: String},
            coordinates: []
        },
        fromName: {
            type: String,
            required: true
        },
        fromCity: {
            type: String,
            required: true
        },
        to: {
            type: {type: String},
            coordinates: []
        },
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
            type: Number,
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
        },
        show: {
            type: Boolean,
            default: false
        }
    }, {
        timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
    }
)

TripSchema.index({from: "2dsphere"})
TripSchema.index({to: "2dsphere"})

export const Trip = mongoose.connection.models.Trip || mongoose.model("Trip", TripSchema)
