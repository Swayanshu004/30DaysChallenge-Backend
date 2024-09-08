import mongoose from "mongoose"

const challengeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Challenge title is required.']
    },
    duration: {
        type: Number,
        required: [true, 'Challenge duration is required.']
    },
    coverImage: {
        type: String,
        required: [true, 'Image url is required.']
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin"
    },
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task"
        }
    ],
    enrolledUserCount: {
        type: Number,
        default: 0
    }
}, {timestamps: true})

export const Challenge = mongoose.model("Challenge", challengeSchema)