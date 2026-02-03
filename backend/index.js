import express, { json } from 'express'
import cors from 'cors'
import { configDotenv } from 'dotenv';
import authRoute from './routes/authRoute.js';



const app=express();
configDotenv();

app.use(cors())
app.use(json())
app.use("/user",authRoute)

app.get("/",(req,res,next)=>{
    res.send("Hello from server")
})


app.listen(3000,()=>{
    console.log("Server is running on 3000 port");
})