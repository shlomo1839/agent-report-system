import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import type {User} from '../types/types.js';
import bcrypt from 'bcrypt';

// where db of users?
const users: User[] = [];

const JWT_SECRET = "secret_123" // move to env

export const login = async (req: Request, res: Response) => {
    try {
        const {agentCode, password} = req.body; //ts?
        // validation
        if (!agentCode || !password) {
            return res.status(400).json({message: "agent code or password missing"})
        }

        // find user? 
        const user = users.find(u => u.agentCode === agentCode);

        if (!user) {
            return res.status(401).json({message: "invalid user"})
        }

        const validPassword = await bcrypt.compare(password, user.passwordHash)

        if (!validPassword) {
            res.status(401).json({message: "invalid password"})
        }

        const token = jwt.sign({
            userId: user.id,
            agentCode: user.agentCode,
            role: user.role
        }, JWT_SECRET )
        res.status(200).json({token, user: {id: user.id, agentCode: user.agentCode, fullName: user.fullName, role: user.role}})
    } catch (error) {
        console.log("login error:", error)
        res.status(500).json({ error: "error"})
    }
}

export const me = async (req, res) {
    try {
        if (!req.user) {
            res.status(401).json({ message: "dont have authnticted"})
            return
        }

        
    }
}