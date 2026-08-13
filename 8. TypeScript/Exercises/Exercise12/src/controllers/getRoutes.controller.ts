import { Request, Response } from "express"
import { ProductQuery } from "../types/productQuery"

export const GetRoute = async (req: Request<{},{},{},ProductQuery>, res: Response) => {
    try {
        
        const {page,items} = req.query
        res.json({
            success: true,
            status: 200,
            message: {
                result: 'Page and successfully fetched',
                page,items
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