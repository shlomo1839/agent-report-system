import express, {Request, Response} from 'express';
import cors from 'cors';
import authRoute from './routes/authRoute.js';

const app = express();
const port = process.env.port || 8000;

app.use(cors())
app.use(express.json())
app.use('/auth', authRoute)

app.get('/', (req: Request, res: Response) =>{
    res.json({message: "Welcome to requirements"})
})

app.listen(port, () => {
    console.log("server runing")
})