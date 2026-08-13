import express from 'express'
import { GetRoute } from '../controllers/getRoutes.controller'

export const pageRoute = express.Router()

pageRoute.get('/',GetRoute)
