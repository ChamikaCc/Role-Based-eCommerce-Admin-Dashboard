import express  from "express";
import container from './models/index.js';
import dotenv from 'dotenv';
import bodyParser from "body-parser";

dotenv.config();

//create express app
const app = express();

//add middleware
app.use(bodyParser.json());

//to confirm API is running
app.get('/',(req,res)=>{
        res.status(200).json({msg:"API is running.."})
    }
);
//routes

//

//Server setup
const PORT = process.env.PORT || 5000;

async function startServer(){
    try {
        await container.sequelize.authenticate(); //check if the connection is working, wait until working
        console.log ("Database connected successfully!");

        await container.sequelize.sync({force:true}); //wait until, create database tables based on models
        console.log("Models synchronized with database!");

        app.listen(PORT, ()=>{
            console.log("Server is running on port ",PORT);
        })
    }catch(error){
        console.log("Unable to connect to the database or start the server: ", error.message);
        process.exit(1); //stop the app completely
}
}
startServer();

export default app;