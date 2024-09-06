import mongoose from "mongoose"

const exerciseSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, 'Question is required.']
    },
    answer: {
        type: String,
        required: [true, 'Correct answer is required.']
    }
}, {timestamps: true})

export const Exercise = mongoose.model("Exercise", exerciseSchema)