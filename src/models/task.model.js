import mongoose from "mongoose"

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Task title is required.']
    },
    questions: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Question",
            }
        ],
        required: true
    },
    exercises: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Exercise"
        }
    ],
    resources: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Resource",
            }
        ],
        required: true
    },
    completed: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            }
        ],
        required: true
    }
}, {timestamps: true})

export const Task = mongoose.model("Task", taskSchema)