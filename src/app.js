import express, { Router } from 'express';
import cors from 'cors';
import router from './routes/router'

const app = express();
const port = process.env.port || 8000;

app.use(cors())
app.use(express.json())
app.use('/auth', router)

app.get('/', (req, res) =>{
    res.json({message: "Welcome to requirements"})
})

app.listen(port, () => {
    console.log("server runing")
})