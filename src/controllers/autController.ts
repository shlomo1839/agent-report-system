import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import User from '../types/types.js';
import atbash from "../utils/atbash.js";

const users: User[] = [];

const JWT_SECRET = "secret_123" // move to env

export const login = async (req: Request, res: Response) => {
    const {agentCode, password} = req.body;
    if (!agentCode || !password) {
        return res.status(400).json({message: "agent code or password missing"})
    }
    const user = users.find(u => u.agentCode === agentCode);
    if (!user || user.passwordHash !== password) {
        return res.status(400).json({message: "invalid Details"})
    }
    const token = jwt.sign(
        {id: user.id, role: user.role}, 
        JWT_SECRET, 
    )
    res.status(200).json({token, user: {id: user.id, agentCode: user.agentCode, fullName: user.fullName, role: user.role}})
}
