import express from 'express';
import jwt from 'jsonwebtoken';
import {authenticateToken} from '../middleware/auth.js'
import {login, me} from '../controllers/autController.js';
import "dotenv/config";
import {readDb, writeDb} from '../db/jsondb.js'

export const authRouth = express.Router();
const secret = process.env.secret;

authRouth.post('/login', async (req, res) => {
    const {agentCode, password} = req.body;
    if (!agentCode || !password) {
        return res.status(400).json({message: "agent code or password missing"})
    }
    const db = await readDb();
    const newUser = db.Agents.find((u) => u.agentCode === agentCode)
    if (user) {
        res.status(400).json({message: "agent already exsists"})
    }
})




authRouth.get('/me', authenticateToken, async (req, res) => {
    try {
        const dataToken = req.user;
        if (!dataToken) {
            return res.status(400).json({message: "token not define"})
        }

        const db = await readDb();
        const user = db.Agents.find((u) => u.userId === dataToken.id)
        if (!user) {
            return res.status(400).json({message: "agent not found"})
        }
        const returnUser = {
            id: user.userId,
            agentCode: user.agentCode,
            fullName: user.fullName,
            role: user.role
        }
        res.status(200).json(returnUser)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})






