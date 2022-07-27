import mongoose from "mongoose"

const VerificationSchema = new mongoose.Schema({
        sub: {
            type: String,
            required: true,
            unique: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            index: true
        },
        code: {
            type: String,
            required: true,
            unique: true,
            index: true
        }
    },
    {
        timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
    })

export const Verification = mongoose.connection.models.Verification || mongoose.model("Verification", VerificationSchema)
