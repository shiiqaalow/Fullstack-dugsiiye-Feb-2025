import Book from '../models/booksDB.js'
// create new books 
export const createBooks = async (req,res) => {
    const data = req.body
    try{
        // validation book title 
        if(!data.title){
            return res.status(404).json({
                message: "Title is required",
                author: data.author || ""
            });
        }
        // validation book author 
        if(!data.author){
            return res.status(404).json({
                message: "Author is required",
                title: data.title || ""
            });
        }

        const book = new Book(data)
        const savedBooks = await book.save()
        if(!savedBooks)
            return res.status(404).send(`this book is missing the ${data}.`)
        res.status(201).json(savedBooks)

         
    }catch(err){
        res.status(500).send('Server site error =>',err.message)
    }

}
// find single book
export const getBooksById = async (req,res) => {
    const id = req.params.id
    try{
        const book = await Book.findById(id)
        if(!book) 
            return res.status(404).send(`Book with this ${(id)} can not be found!`)
        res.json(book)
    }catch(err){
        res.status(500).send('Server site error =>',err)
    }
}
// get all books
export const getAllBooks = async (req,res) => {
    try{
        const books = await Book.find()
        if(!books)
            return res.status(404).send('No books found in your databases.')
        res.json(books)
    }catch(err){
        res.status(500).send('Server site error =>',err)
    }
   
}
// update books
export const updateBooks = async (req,res) => {
    const id = req.params.id
    const data = req.body
    try{
        const updatedBooks = await Book.findByIdAndUpdate(id,data,{new:true})
        if(!updatedBooks)
            return res.status(404).send({result:'Not found',message:`the book with the ${(id)} can not be updated`})
        res.json(updatedBooks)
    }catch(err){
        res.status(500).send('Server site error =>',err)
    }
   
}

// delete books
export const deleteBooks = async (req,res) => {
    const id = req.params.id
    try{
        const deletedBooks = await Book.findByIdAndDelete(id)
        if(!deletedBooks)
            return res.status(404).send({result:'Not found',message:`the book with the ${(id)} can not be deleted`})
        res.send(`Book ${(deletedBooks.title)} with the id: ${(deletedBooks.id)} has been deleted`)
    }catch(err){
        res.status(500).send('Server site error =>',err)
    }
   
}
