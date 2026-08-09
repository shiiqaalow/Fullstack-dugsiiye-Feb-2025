import express, { Request, Response } from 'express'
import { user_auth } from './routes/user.routes'

const app = express()

const port = 4000

app.use(express.json())

app.get('/',(req: Request,res: Response)=> {
    res.send('Server is working successFully')
})
app.use('/',user_auth)

app.listen(port,()=>{
    console.log(`Server is running on port http://localhost:${port}`)
})