const express = require('express');
const app = express();

const database = require('./database')

app.use(express.json());

const PORT = process.env.PORT || 3000;

//obtener todos los libros
app.get('/books',(req,res)=>{
    res.send(database);
    console.log(database)

})
//obtener libro por id
app.get('/books/:id',(req,res)=>{
    const id = parseInt(req.params.id);

    const getBook = database.find((book)=>book.id ===id)
    
    if(getBook){
        res.json(getBook)
    } else {
        res.json({message : "El libro no existe"})
    }
})
//agregar libro
app.post('/books', (req,res)=>{

    const { title, author, year } = req.body

    let id = database.length + 1

    database.push({ id:id, title:title, author:author, year:year})
    
    res.send({message: "Libro agregado"})

})
//editar libro
app.put('/books/:id', (req,res)=>{
    const id = parseInt(req.params.id);

    const getBook = database.find((book)=>book.id ===id)

    if(getBook){
        const { id, title, author, year } = req.body;

        getBook.id = id;
        getBook.title = title;
        getBook.author = author
        getBook.year = year

        res.json({message : "Libro editado"})
    } else {
        res.json({message : "El libro no existe"})
    }
})
//eliminar libro
app.delete('/books/:id',(req,res)=>{
    const id = parseInt(req.params.id);

    const getBook = database.find((book)=>book.id ===id);

    if(getBook){

        const ind = database.indexOf(getBook);
        database.splice(ind,1);
        res.json({message:"Libro eliminado"})
    } else  {
        res.json({message: "El libro no existe"})
    }
})

app.listen(PORT, ()=>{
    console.log(`server on port ${PORT}`)
})