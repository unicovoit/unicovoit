import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
        sub: {
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        picture: {
            type: String
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        isBlocked: {
            type: Boolean,
            default: false
        },
        isBanned: {
            type: Boolean,
            default: false
        },
    },
    {
        timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
    })

export const User = mongoose.model("User", UserSchema)
