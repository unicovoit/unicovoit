import mongoose from "mongoose"

const TripSchema = new mongoose.Schema({
        driver_id: {
            type: String,
            required: true,
            index: true
        },
        driver_name: {
            type: String,
        },
        driver_picture: {
            type: String,
        },
        from: {
            type: String,
            required: true,
            index: true
        },
        to: {
            type: String,
            required: true,
            index: true
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
    },
    {
        timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
    })

export const Trip = mongoose.model("Trip", TripSchema)
