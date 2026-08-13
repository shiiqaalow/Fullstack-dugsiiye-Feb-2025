import express from 'express'
import { loginUser } from '../controllers/auth.controller'

export const authRoute = express.Router()

authRoute.post('/login',loginUser)

