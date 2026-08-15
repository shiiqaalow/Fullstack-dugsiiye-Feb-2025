import express, { Request,Response } from 'express'
import mongoose from 'mongoose'
import { authRoute } from './routes/auth.route'
import { taskRoute } from './routes/task.route'


const app = express()
app.use(express.json())

const port = 7000

app.get('/',(req: Request, res: Response)=>{
    res.send('API IS PERFECT')
})
app.use('/auth',authRoute)
app.use('/task',taskRoute)

mongoose
.connect('mongodb://localhost:27017/typescript-test')
.then(()=>{
    console.log('MONGO_DB_SUCCESSFULLY CONNECTED')
    app.listen(port,()=>console.log(`Server is running on port http://localhost:${port}`))
})
.catch((err)=>{
    console.log('FAILED TO CONNECT TO MONGO_DB',err)
    process.exit(1)
})