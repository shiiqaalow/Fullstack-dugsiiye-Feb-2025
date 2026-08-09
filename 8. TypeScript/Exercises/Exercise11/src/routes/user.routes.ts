import express from 'express'
import { farewellMessage } from '../controllers/user.controller'

export const user_auth = express.Router()

user_auth.get('/user',farewellMessage)