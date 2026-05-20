import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { notFound } from './middlewares/notFound.js'
import { errorHandler } from './middlewares/errorHandler.js'
import { authRoutes } from './routes/authRoutes.js'
import { dashboardRoures } from './routes/dashboard.js'
dotenv.config()

const app = express()

const port = process.env.PORT

app.use(express.json())

app.use(morgan('combined'))

app.use(cors())

app.get('/', (req,res) => {
   console.log('hello')
})

app.use('/auth', authRoutes )
app.use('/dash', dashboardRoures )

app.use(notFound)

app.use(errorHandler)

mongoose.connect(process.env.MONGODB_URL)

    .then(()=>{
        console.log(`CONNECTED SUCCESSFULLY TO MONGODB DATABASE => ${process.env.MONGODB_URL}`)
        app.listen(port,() => {
            console.log(`http://localhost:${port} server is running.`)
        })
    })
    .catch((err)=>console.log('FAILED TO CONNECT TO MONGODB DATABASE',err))

