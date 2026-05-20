import { User } from "../models/users.js"
import { generateToken } from "../utils/generateToken.js"

// registet new user
export const register  = async (req,res,next) => {
    let { name,email,password,role } = req.body
    try{
        email = email.toLowerCase()
        // first check if the email is alrady registered 
        const xstUser = await User.findOne({email})
        // if the email is found when trying to register
        if(xstUser)
            return res.status(401).json({ message: `this email => ${email} is already registered` })
        // else create as new email
        const newuser = await User.create({name,email,password,role})
        // then generate unique token for each user
        const token = generateToken(newuser._id)
        res.status(201).json( { message:'you have successfully registered,you can now login.', token}, )
        console.log("Registed token =>",{token})
    }catch(err){
        next(err)
    }
}

// login user
export const login = async (req,res,next) => {
    let { email,password } = req.body
    try {
        email = email.toLowerCase()
        // check if the info is matching from database
        const user = await User.findOne({email})
        if(!user || !(await user.comparePassword(password)) )
            return res.status(401).json({ message: 'Invalid credentials.' })
        const token = generateToken(user._id)
        // res.json({ message: 'you have successfully loggedin.', },{ token })
        res.json({ message: 'you have successfully loggedin.',  token })
    } catch (err) {
        next(err)
    }
}


export const adminDashboard = (req,res,next) => {
    res.json({message: `Welcome to the admin dashboard`})
}

export const userDashboard = (req,res,next) => {
    res.json({message: `Welcome to the user dashboard`})
}


