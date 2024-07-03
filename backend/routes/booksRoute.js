//This made for the books Model(MongoDb collection). since we separated this books specific model related HTTP requests from index.js 
        //file we can now do the same for multiple models instead of putting the all the route of every model in just this file making the 
        //code very bulky. 
//Say if we have 5 models of mongodb server, and every models has 5+ routes, then it would be 25+ routes in just one file. Instead we can 
    //refactor them into different files inside the folder "routes"
import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router(); //const router = express(); would also work, that is, just like how we do for the app variable in index.js but why would you import everything when you want just Router

//Create Book:-getting book details and then storing it to the database
router.post("/", async (request,response) => {

    //try part to check whther or not the error is from the human side by not filling and the catch part to check whether the error is from the server side 
    try{
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ){
            return response.status(400).send({
                message: 'Send all required fields: title, author,publishYear'
            })
        }
        //if every part is filled then add the title author and publishYear to the database
        const newBook= {
            title : request.body.title,
            author: request.body.author, 
            publishYear: request.body.publishYear
        }

        const book = await Book.create(newBook);

        return response.status(201).send(book)

    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message})
    }

});

//Route to Get All books from the database
router.get("/", async (request,response) => {
    try{
        const books = await Book.find({}); //Initially empty i guess. and later on it gets populated with the documents because of await. Not sure though
       // return response.status(200).json(books);//this will also work but it is better to add count too . Also note the usage of .json() instead of .send() here
        
        return response.status(200).json({
            count:books.length, //added just to tell the count
            data: books
        })
    }catch(error){
        return response.status(500).send({message: error.message})
    }
});

//Route to Get One book from the database
router.get("/:id", async (request,response) => {
    try{
        const id = request.params.id;//the below commented line is also correct and can be used as a replacement to this line
        //const {id} = request.params;
        const book = await Book.findById(id); 
                
        if (!book) {
            return response.status(404).send({ message: "Book Not Found" });
        }

        return response.status(200).json({book});
    }catch(error){
        return response.status(500).send({message: error.message})
    }
}); 

//Route to Update a Book
router.put("/:id", async (request,response) => {
    try{
        if (!request.body.title || !request.body.author || !request.body.publishYear){
            return request.status(400).send(
                {
                    message: 'Send all required fields: title, author,publishYear'
                }
            )
        }
        const id = request.params.id;// or instead of this line "const { id } = request.params;"
        const book = await Book.findByIdAndUpdate(id, request.body);

        if(!book){
            return response.status(404).send({message : "Book Not Found"})
        }

        return response.status(200).json(
            {
                message: "Book details updated successfully"
            }
        )
    }catch(error){
        response.status(500).send({message: error})
    }
});

//Route to Delete a book
router.delete("/:id",async (request,response) =>{
    try{
        const { id } = request.params;
        const result = await Book.findByIdAndDelete(id);

        if (!result){
            return response.status(404).send({message: "Book Not Found"});
        }

        return response.status(200).send({message: "Book deleted successfully"})
    }catch(error){
        console.log(error.message);
        return response.status(500).send({message:error.message});
    
    }
});

export default router;