import { Request,Response,NextFunction } from "express";
import { User } from "../types/user";

export interface AuthRequest extends Request {
    user?: User
}


export const authenticate = (req: AuthRequest, _res: Response, next: NextFunction) => {
    const user: User = {
        id: '124',
        name: 'shiiqaalow',
        email: 'shiiqaalow@gmail.com',
        phone: '0678920087',
        isLoggedIn: true,
        lastLoggedIn: new Date()
    } 
    req.user = user
    next()
}