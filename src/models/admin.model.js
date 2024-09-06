import mongoose from "mongoose"

const adminSchema = new mongoose.Schema({
    adminName: {
        type: String,
        required: [true, 'Name is required.'],    
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

export const Admin = mongoose.model("Admin", adminSchema)