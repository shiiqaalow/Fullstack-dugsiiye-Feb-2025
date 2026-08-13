import { Request,Response } from 'express'
import { LoginBody } from '../types/loginUser'

export const loginUser = async (req: Request<{},{},LoginBody>, res: Response) => {
    try {
        const {email,password} = req.body
    
        if( !email  || !password ) {
            return res.json({
                success: false,
                status: 400,
                message: 'Please fill the fields'
            })
        }
        return res.json({
            success: true,
            status: 200,
            message: {
                result: 'You have successfully logged in',
                email,password
            }
        })

    } catch (error) {
        res.json({
            success: false,
            status: 500,
            message: 'Server site error'
        })
    }
}
