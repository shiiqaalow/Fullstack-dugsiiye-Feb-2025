import { Request,Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { LoginUserInput, RegisterUserInput,User } from "../types/user";
import { UserModel } from "../models/user.model";

export const registerUser = async (req: Request<{},{},RegisterUserInput>, res: Response) => {
    try {
        const { email,name,password,phone } = req.body
        
        const existingUser = await UserModel.findOne({email})
        if(existingUser) {
            return res.json({
                success: false,
                status: 400,
                message: `(${email}) already exists`
            })
        }


        const user = await UserModel.create({
            email,name,password,phone,isLoggedIn: false
        })
        if(!user) {
            return res.json({
                success: false,
                status: 400,
                message: 'User can not be found'
            })
        }

        return res.json({
            success: true,
            status: 201,
            message: 'User successfully created',
            user
        })

    } catch (error) {
        return res.json({
            success: false,
            status: 500,
            message: 'Something went wrong',
            error: error instanceof Error ? error.message : String(error)
        })
    }
}

export const loginUser =  async (req: Request<{},{},LoginUserInput>, res: Response) => {
    try {
        const { email,password } = req.body
        const user = await UserModel.findOne({email})

        if(!user || (user.password !== password)) {
            return res.json({
                success: false,
                status: 400,
                message: 'Invalid credentials'
            })
        }
        // if the user exist update isLoggedIn and lastLoggedIn fields
        user.isLoggedIn = true
        user.lastLoggedIn = new Date()
        // then save it 
        await user.save()

        return res.status(200).json({
            success: true,
            status: 200,
            message: 'Logged in successfully',
            user
        })
        
    } catch (error) {
        return res.json({
            success: false,
            status: 500,
            message: 'Something went wrong',
            error: error instanceof Error ? error.message : String(error)
        })
    }
}



export const getProfile = (req: AuthRequest, res: Response<User>) => {
    const { user } = req

    if(!user) {
        return res.status(400).json({message: 'Un-authorized'}as any)
    }
    return res.status(200).json(user)

}