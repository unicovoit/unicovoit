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
        smokePref: {
            type: String,
            default: "No"
        },
        petsPref: {
            type: String,
            default: "No"
        },
        musicPref: {
            type: String,
            default: "Yes"
        },
        autoBook: {
            type: Boolean,
            default: false
        },
        defaultPlaces: {
            type: Number
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        studentEmail: {
            type: String,
            required: true,
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
