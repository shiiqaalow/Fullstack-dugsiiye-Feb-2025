import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import booksRouter from './routes/BooksRouter.js'
import { logger } from './middlewares/logger.js'
import { notFound } from './middlewares/notFound.js'
import { errorHandler } from './middlewares/errorHandler.js'

// load environment variables first
dotenv.config()

// create express app
const app = express()

// config values
const PORT = process.env.PORT || 7000
const MONGODB_URL = process.env.MONGODB_URL

// global middleware
app.use(morgan('combined'))

app.use(cors({
  origin: ['http://localhost:5879']
}))

app.use(express.json())

app.use(logger)

// routes
app.use('/books', booksRouter)

app.use(notFound)
app.use(errorHandler)

// database connection
mongoose.connect(MONGODB_URL)
  .then(() => {
    console.log('✅ MongoDB connected:', MONGODB_URL)
  })
  .catch((err) => {
    console.log('❌ MongoDB connection error:', err)
  })

// start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})