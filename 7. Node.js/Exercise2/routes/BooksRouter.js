import express from 'express'
import { getAllBooks, getBooksById, createBooks, updateBooks, deleteBooks } from '../controllers/Books.js'
console.log('Express:=>',express)
const router = express.Router()

router.get('/',getAllBooks)
router.get('/:id',getBooksById)
router.post('/createBook',createBooks)
router.put('/:id',updateBooks)
router.delete('/:id',deleteBooks)

export default router