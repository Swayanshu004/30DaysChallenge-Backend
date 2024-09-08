import mongoose from "mongoose"
import bcrypt from "bcrypt"

const adminSchema = new mongoose.Schema({
    adminName: {
        type: String,
        required: [true, 'Name is required.'],    
    },
    emailId: {
        type: String,
        required: [true, 'Email is required.'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password cannot be empty. Please enter a password.'],
        lowercase: true
    }
}, {timestamps: true})
adminSchema.pre("save" , async function(next){ 
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password , 10)
    next()
})
adminSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password , this.password)
} 

export const Admin = mongoose.model("Admin", adminSchema)