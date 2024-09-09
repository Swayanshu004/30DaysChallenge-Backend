import mongoose from "mongoose"

const enrollentSchema = new mongoose.Schema({
    challengeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Challenge",
    }
}, {timestamps: true})

export const Enrollment = mongoose.model("Enrollment", enrollentSchema)