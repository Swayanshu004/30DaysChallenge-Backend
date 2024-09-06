import mongoose from "mongoose"

const resourceSchema = new mongoose.Schema({
    link: {
        type: String,
        required: [true, 'Link is required.']
    },
    coverImage: {
        type: String,
        required: [true, 'Image url is required.']
    },
    type: {
        type: String,
        enum: ['Blog', 'Video', 'Document'],
        required: [true, 'Type is required.']
    }
}, {timestamps: true})

export const Resource = mongoose.model("Resource", resourceSchema)