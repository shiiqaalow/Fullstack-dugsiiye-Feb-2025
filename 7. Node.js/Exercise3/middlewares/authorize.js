export const authorize = (...roles) => {
    return(req,res,next) => {
        if(!roles.includes(req.user.role))
            return res.json({message: `Access denied. you have to met these requirements => ${[roles.join(',')]}`})
        next()
    }

}
