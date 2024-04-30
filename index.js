import express from 'express';
import fs from "fs";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const readData = () => {
    try{
    const data = fs.readFileSync("./db.json");
     return JSON.parse(data);
    } catch(error) {
     console.log(error);
    }
};

const writeData = (data) => {
    try { 
        fs.writeFileSync("./db.json", JSON.stringify(data));  
        } catch(error){
            console.log(error);

        }
};
 
app.get("/" , (req , res) => {

    res.send("bienvenido");
});

app.get("/books" , (req,res) =>{
    const data = readData();
    res.json(data.books);
});

app.get("/books/:id" , (req , res) =>{
  const data = readData();
  const id = parseInt(req.params.id);
  const books = data.books.find ((books)=> books.id === id);
  res.json(books);
});


app.post("/books", (req , res) => {
    const data = readData();
    const body = req.body; 
    const newBook = {
        id: data.books.length + 1 ,
       ...body,
    };
        data.books.push(newBook);
        writeData(data);
        res.json(newBook);

});

app.put("/books/:id" , (req, res ) =>{
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const bookindex = data.books.findIndex((book) => book.id === id);
    data.books[bookindex] = {
    ...data.books[bookindex], 
    ...body,
    
};
    writeData(data);
    res.json({message:"modificacion de libro"});

}); 

app.delete("/books/:id" , (req ,res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const bookIndex = data.books.findIndex((book) => book.id === id); // Aquí se corrigió el nombre de la función findIndex
    data.books.splice(bookIndex, 1);
    writeData(data);
    res.json({message : "Libro borrado"});
});















app.listen(3000 , () => {
    console.log('server listening on port 3000');
});