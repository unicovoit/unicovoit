import mongoose from "mongoose"

const ContactSchema = new mongoose.Schema({
        sub: {
            type: String,
            required: true,
            unique: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        phone: {
            type: String,
        },
        snapchat: {
            type: String,
        },
        instagram: {
            type: String,
        },
        facebook: {
            type: String,
        },
    },
    {
        timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
    })

export const Contact = mongoose.connection.models.Contact || mongoose.model("Contact", ContactSchema)
