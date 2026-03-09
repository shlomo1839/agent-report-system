import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import type {User} from '../types/types.js';
import bcrypt from 'bcrypt';
import {readDb, writeDb} from '../db/jsondb.js'
import { Agent } from 'node:http';

// where db of users?
const users: User[] = [];

const JWT_SECRET = "secret_123" // move to env

export const login = async (req: Request, res: Response) => {
    try {
        const {agentCode, password} = req.body;
        const db = await readDb()

        const user = db.Agents.find((u) => u.agentCode === agentCode);

        if (!user) {
            return res.status(401).json({message: "agent not found"})
        }

        // if (!agentCode || !password) {
        //     return res.status(400).json({message: "agent code or password missing"})
        // }

        const validPassword = await bcrypt.compare(password, user.passwordHash)
        if (!validPassword) {
            res.status(401).json({message: "invalid password"})
        }

        const token = jwt.sign(
            {id: user.id, role: user.role},
            JWT_SECRET,
            {expiresIn: "7d"}
        );
        // 
        res.status(200).json({token, user: {id: user.id, agentCode: user.agentCode, fullName: user.fullName, role: user.role}})
    } catch (error) {
        console.log("login error:", error)
        res.status(500).json({ error: "error"})
    }
}

export const me = async (req: Request, res: Response) => {
    try {
        const dataToken = req.user;
        if (!dataToken) {
            return res.status(401).json({message: "this token not defind"})
        }

        const db = await readDb();
        const user = db.Agents.find((u: any) => u.id === dataToken.id);
        if (!user) {
            return res.status(400).json({message: "agent not found"});
        }

        const returnMyUser = {
            id: user.id,
            agentCode: user.agentCode,
            fullName: user.fullName,
            role: user.role
        };
        res.status(200).json(returnMyUser)
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
}