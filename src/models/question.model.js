import mongoose from "mongoose"

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, 'Question is required.']
    },
    options: {
        type: [String], 
        required: [true, 'Options are required.'],
        validate: {
            validator: function (v) {
                return v.length === 4; 
            },
            message: 'There must be exactly four options.'
        }
    },
    answer: {
        type: Number,
        enum: [1, 2, 3, 4],
        required: [true, 'Correct answer is required.']
    }
}, {timestamps: true})

export const Question = mongoose.model("Question", questionSchema)