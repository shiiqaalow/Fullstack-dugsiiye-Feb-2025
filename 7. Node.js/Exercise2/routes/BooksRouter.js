const express = require('express')
const { getAllBooks, getBooksById, createBooks, updateBooks, deleteBooks } = require('../controllers/Books')
console.log('Express:=>',express)
const router = express.Router()

router.get('/',getAllBooks)
router.get('/:id',getBooksById)
router.post('/createBook',createBooks)
router.put('/:id',updateBooks)
router.delete('/:id',deleteBooks)

module.exports = router