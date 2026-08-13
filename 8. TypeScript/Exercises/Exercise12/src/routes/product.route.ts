import express from 'express'
import { updateProduct } from '../controllers/products.controller'

export const productRoute = express.Router()
productRoute.put('/:id',updateProduct)
