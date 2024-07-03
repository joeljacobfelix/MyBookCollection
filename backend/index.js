import express, { request, response } from "express";
import {PORT, mongodbURL} from "./config.js";
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute.js';
import cors from "cors";

const app = express();

//Middleware for passing request body
app.use(express.json()); 

//Middleware for handling CORS policy
//Option 1:Allow all origins with Default of cors
app.use(cors())
//Option 2:Allow Custom Origins
/*
app.use(
    cors({
        origin: "https://localhost:3000",
        methods: ["GET","POST","PUT","DELETE"],
        allowedHeaders: ["Content-Type"],
    })
);
*/


//getting request from the client from the endpoint "/" and responding with a welcome message
app.get("/",(request,response)=> {
    console.log(request);
    return response.status(234).send("Welcome to Mern Stack")
});

app.use("/books",booksRoute);

//connecting to mongoose and listening to port only if mongoose has connected to the server
mongoose
.connect(mongodbURL)
.then(() => {
    console.log("App connected to database");
    app.listen(PORT,() => {
        console.log("Listening on port "+ PORT)
    });
})
.catch((error) => {
    console.log(error);
})

