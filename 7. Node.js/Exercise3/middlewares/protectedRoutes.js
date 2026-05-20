import jwt from 'jsonwebtoken'
import { User } from '../models/users.js'
export const protectedRoutes = async (req,res,next) => {
    const token = req.headers.authorization?.split(' ')[1]
    if(!token)
        return res.status(401).json({message:'No token provided.' })
    try{
        const decode = jwt.verify( token, process.env.JWT_SECRET )
        console.log('Decode >',decode)
        req.user = await User.findById(decode.id).select('-password')
        console.log("USer: =>",req.user)
        next()
    }catch(err){
        res.status(401).json({message: 'Invalid or expired token'})
    }
    console.log('Token:=>',token)
}
