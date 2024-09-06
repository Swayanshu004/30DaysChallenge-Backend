import mongoose from "mongoose"

const enrollmentSchema = new mongoose.Schema({
    challengeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Challenge"
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true})

export const Enrollment = mongoose.model("Enrollment", enrollmentSchema)