import express, { Request, Response } from 'express'
import { authRoute } from './routes/auth.route'
import { pageRoute } from './routes/page.routes'
import { productRoute } from './routes/product.route'

const app = express()

const port  = 4000

app.use(express.json())

app.get('/',(req: Request, res: Response) => {
    res.send('APi is working perfect!.')
})

app.use('/auth',authRoute)
app.use('/pages',pageRoute)
app.use('/products',productRoute)


app.listen(port,()=> console.log(`Server is running on port http://localhost:${port}`))