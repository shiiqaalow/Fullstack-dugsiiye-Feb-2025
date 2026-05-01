// Dependences installed for the project
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
// the app that runs the web
const app = express()
// the router/link runs with the app
const booksRouter = require('./routes/BooksRouter')
app.use(morgan('combined'))

app.use(cors({
    origin: ["http://localhost:5879"]
}))

mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('✅ MONGODB CONNECTED LOCALLY: =>',process.env.MONGODB_URL))
    .catch((err) => console.log('MONGODB CONNECTION ERROR.',err))

const port = process.env.PORT


app.use(express.json())
app.use('/books',booksRouter)

console.log(process.env.PORT)

app.listen(port,() => {
    console.log(`Server is running on http://localhost:${port} site`)
})