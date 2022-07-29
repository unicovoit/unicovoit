import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
        id: {
            type: String,
            required: true,
            unique: true,
            index: true
        },
        sub: {
            type: String,
            required: true,
            unique: true,
            index: true
        },
        name: {
            type: String,
            required: true
        },
        nickname: {
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
        smokePref: {
            type: Boolean,
            default: false
        },
        petsPref: {
            type: Boolean,
            default: false
        },
        musicPref: {
            type: Boolean,
            default: false
        },
        autoBook: {
            type: Boolean,
            default: false
        },
        defaultPlaces: {
            type: Number
        },
        verified: {
            type: Boolean,
            default: false
        },
        studentEmail: {
            type: String,
            unique: true
        },
        isBlocked: {
            type: Boolean,
            default: false
        },
    },
    {
        timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
    })

export const User = mongoose.connection.models.User || mongoose.model("User", UserSchema)
