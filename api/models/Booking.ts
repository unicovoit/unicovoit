import mongoose from "mongoose"

const BookingSchema: mongoose.Schema = new mongoose.Schema({
        id: {
            type: String,
            required: true,
            unique: true,
            index: true
        },
        user_id: {
            type: String,
            required: true,
            index: true
        },
        trip: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Trip',
            required: true,
        },
    }, {
        timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
    }
)


export const Booking = mongoose.connection.models.Booking || mongoose.model("Booking", BookingSchema)
