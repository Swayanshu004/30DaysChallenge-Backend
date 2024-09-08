import mongoose from "mongoose"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'Name is required.'],    
    },
    emailId: {
        type: String,
        required: [true, 'Email is required.'],
        unique: true
    },
    pofileImage: {
        type: String,
        required: [true, 'Image url is required.']
    },
    password: {
        type: String,
        required: [true, 'Password cannot be empty. Please enter a password.'],
        lowercase: true
    },
    enrolledChallenges: [
        {
            challengeId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Challenge",
                required: true
            },
            enrolledAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
}, {timestamps: true})
userSchema.pre("save" , async function(next){ 
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password , 10)
    next()
})
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password , this.password)
} 
export const User = mongoose.model("User", userSchema)