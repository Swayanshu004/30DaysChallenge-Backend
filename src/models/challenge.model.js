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
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Creator"
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