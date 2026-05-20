export const notFound = (req,res,next) => {
    err = new Error(`this route => ${req.originalUrl} is not found`)
    next(err)
}
