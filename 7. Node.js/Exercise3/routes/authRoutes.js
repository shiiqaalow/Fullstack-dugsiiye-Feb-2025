import express from  'express'
import { login, register } from '../controllers/author.js'
import { protectedRoutes } from '../middlewares/protectedRoutes.js'

export const authRoutes = express.Router()

authRoutes.post('/register',register)
authRoutes.post('/login',protectedRoutes,login)