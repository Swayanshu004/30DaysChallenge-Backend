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
        required: [true, "At least one question is required."]
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
        required: [true, "At least one resource is required."]
    }
}, {timestamps: true})

export const Task = mongoose.model("Task", taskSchema)