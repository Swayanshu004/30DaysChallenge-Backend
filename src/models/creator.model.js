import mongoose from "mongoose"

const creatorSchema = new mongoose.Schema({
    creatorName: {
        type: String,
        required: [true, 'Creatorname is required.'],    
    },
    emailId: {
        type: String,
        required: [true, 'Email is required.'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password cannot be empty. Please enter a password.'],
        lowercase: true
    },
}, {timestamps: true})

export const Creator = mongoose.model("Creator", creatorSchema)