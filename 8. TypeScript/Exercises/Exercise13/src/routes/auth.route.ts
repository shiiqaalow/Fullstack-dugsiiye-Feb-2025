import express from 'express'
import { authenticate } from '../middlewares/auth.middleware'
import { getProfile, loginUser, registerUser } from '../controllers/auth.controller'

export const authRoute = express.Router()

authRoute.post('/register',registerUser)
authRoute.post('/login',loginUser)
authRoute.get('/profile',authenticate,getProfile)
