import express from 'express';
import cors from 'cors';
import { connectionMongo } from './db/mongoDbConnection.js';
import authRouter from './routes/authRoute.js';
import reportRouter from './routes/reportRoute.js';
import usersRouter from './routes/usersRoute.js';
import fileUpload from "express-fileupload";
import dotenv from "dotenv";
dotenv.config()

const app = express();
const port = process.env.port || 8000;

app.use(cors())
app.use(express.json())
app.use(fileUpload());
app.use('/auth', authRouter);
app.use('/report', reportRouter);
app.use('/users', usersRouter);
app.use('/uploads', express.static("uploads"));


app.get('/', (req, res) =>{
    res.json({message: "Welcome to requirements"})
})

app.listen(port, () => {
    connectionMongo()
    console.log("server runing")
})