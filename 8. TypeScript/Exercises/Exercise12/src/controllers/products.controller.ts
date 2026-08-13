import { Request, Response } from "express"

export const updateProduct = async (req: Request<{id: string},{},{name: string, price: number}>, res: Response) => {
    try {
        const {id} = req.params
        const { name,price } = req.body 
        if( !name  || !price ) {
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
                result: `Product (${id}) Successfully updated `,
                name,price
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
