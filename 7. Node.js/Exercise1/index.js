const express = require('express')

const app = express();

app.use(express.json())

const port = 5000

let books = [
  { id: 1, title: "The Silent Code", author: "Ayaan Malik" },
  { id: 2, title: "Beyond the Horizon", author: "Lina Yusuf" },
  { id: 3, title: "The Last Algorithm", author: "David K. Mensah" },
  { id: 4, title: "Echoes of Tomorrow", author: "Fatima Noor" },
  { id: 5, title: "Digital Dreams", author: "Hassan Ali" },
  { id: 6, title: "The Hidden Variable", author: "Sophia Grant" },
  { id: 7, title: "Code of Shadows", author: "Ibrahim Said" },
//   { id: 8, title: "Infinite Loop", author: "Zara Ahmed" },
//   { id: 9, title: "The Data Whisperer", author: "Michael Osei" },
//   { id: 10, title: "Future Stack", author: "Nadia Rahman" }
];


// get data/books

app.get('/books',(req,res) => {
    res.json(books)
})

// get single data/books

app.get('/books/:id',(req,res) => {
    const id = req.params.id
    const book = books.find( book => book.id == id )
    res.json(book)
})

// register new data/books

app.post('/books',(req,res) => {
    const newBooks = {
        id: books.length +1,
        title: req.body.title,
        author : req.body.author
    }
    if (!newBooks.title)
        return res.status(400).send('Book should have a title.') 
    if (!newBooks.author) 
        return res.status(400).send('Book should have an author.') 
    
    books.push(newBooks)
    res.status(202).json(newBooks)
} )

// update data/books

app.put('/books/:id', (req, res) => {
    const id = req.params.id
    const data = req.body

    const book = books.find(b => b.id == id)

    if (!book) {
        return res.status(404).send(`Book ${id} not found!`)
    }


    // update safely
    // if (!data.title)
    //     return res.status(400).send('Book should have a title.') 
    // if (!data.author) 
    //     return res.status(400).send('Book should have an author.') 

    book.title = data.title
    book.author = data.author

    res.json(book)
})

// delete data/books

app.delete('/books/:id',(req,res) => {
    const id = req.params.id
    const book = books.find(book => book.id == id )
    if(!book)
       return res.status(404).send(`book ${id} can not be found!`)
    books = books.filter(book => book.id != id )
    res.send(`Book ${id} has been deleted`)
} )

// Running the port url

app.listen(port,()=>{
    console.log(`http://localhost:${port} is running`)
})