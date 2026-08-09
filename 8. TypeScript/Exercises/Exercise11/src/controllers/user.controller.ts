import { Request, Response } from "express";

interface User extends Request {
    query: {
        name: string
    }
}

export const farewellMessage = async (req: User,res: Response) => {
    try {
        const name = req.query.name
        if(!name || typeof name !== 'string' ) {
            return res.json({
                success: false,
                status: 400,
                message: 'Name is missing.'
            })
        }
        return res.json({
            success: true,
            status: 200,
            message: {
                farewell: `Goodbye ${name}`
            } 
        })
    } catch (error) {
        return res.json({
            success: false,
            status: 500,
            message: 'Server site error',error
        })
    }
}