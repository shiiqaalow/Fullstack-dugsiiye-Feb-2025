export const logger = (req,res,next) => {
    console.log(`Date => ${new Date().toDateString()},Request Url => ${req.originalUrl}`)
    next()
}