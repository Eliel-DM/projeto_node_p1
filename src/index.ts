import express,{Response,Request} from "express";
import dotenv from 'dotenv';
import path from "path";




const app =  express();
require('dotenv').config({path: 'src/.env'});

const PORT = process.env.PORT;

app.get("/",(req:Request,res:Response)=>{
    res.send("teste");
});

app.listen(PORT,()=>{
    console.log(`Servidor iniciado na porta ${PORT}: http://localhost:${PORT}`);
})