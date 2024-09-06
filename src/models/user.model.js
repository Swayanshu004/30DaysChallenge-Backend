import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    userName: {
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
    enrolledChallenges: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Challenge"
        }
    ]
}, {timestamps: true})

export const User = mongoose.model("User", userSchema)