import express from  'express'
import { adminDashboard, userDashboard } from '../controllers/author.js'
import { protectedRoutes } from '../middlewares/protectedRoutes.js'
import { authorize } from '../middlewares/authorize.js'

export const dashboardRoures = express.Router()

dashboardRoures.post('/admin',protectedRoutes,authorize('admin'),adminDashboard)
dashboardRoures.post('/user',protectedRoutes,authorize('user'),userDashboard)