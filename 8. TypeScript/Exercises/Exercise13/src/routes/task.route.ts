import express from 'express'
import { createTask } from '../controllers/task.controller'

export const taskRoute = express.Router()

taskRoute.post('/create',createTask)

