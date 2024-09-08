import mongoose from "mongoose"

const enrollmentSchema = new mongoose.Schema({
    challengeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Challenge"
    },
    tasksProgress: [
        {
            taskId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Task"
            },
            completed: {
                type: Boolean,
                default: false
            }
        }
    ]
}, {timestamps: true})

export const Enrollment = mongoose.model("Enrollment", enrollmentSchema)