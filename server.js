import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import authRoutes from './routes/auth.route.js'
import  formRoutes from './routes/form.route.js'

const app=express();

app.use(express.json());

app.use(cors());

dotenv.config();

const connectToDb=()=>{
    mongoose.connect(process.env.MONGO_DB_URL)
    .then(()=>console.log("MongoDb connected"))
    .catch(err=>console.log(err));
}

app.use('/api/auth',authRoutes)
app.use('/api/form',formRoutes)
connectToDb();
app.listen(5000,()=>console.log("The server is running on port 5000"));


