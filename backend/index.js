import express from "express";
import mongoose from "mongoose";
import router from "./router.js";

const PORT = 5000;

const app = express();

app.use(express.json())
app.use('/api',router)

async function startApp(){
    try{
        mongoose.set('strictQuery', false)
        await mongoose.connect('mongodb://localhost/testDb')
        app.listen(PORT,()=>console.log('server starting'))
    }catch(e){
        console.log(e);
    }
}

startApp()
