import express, {Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import {authenticateToken} from '../middleware/auth.js'
import {login, me} from '../controllers/autController.js';
import "dotenv/config";

export const authRouth = express.Router();
const secret = process.env.secret as string;

router.post('/login', login)




authRouth.get('/me', authenticateToken, (req: Request, res: Response) => {
    if (req.user) {
        const { userId, agentCode, role } = req.user;
        res.status(200).json({user: {userId, agentCode, role}})
    }
})


export default router;



