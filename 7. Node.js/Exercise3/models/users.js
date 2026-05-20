import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role:{
        type: String,
        enum: [ 'user','admin' ],
        default: 'user'
    }
})

// hashing the password

userSchema.pre('save', async function (next) {
    if(!this.isModified('password'))
        return next()
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})

// compare the hashed and the original

userSchema.methods.comparePassword = function (inputPassword) {
    return bcrypt.compare(inputPassword,this.password)
} 


export const User = mongoose.model('User',userSchema)