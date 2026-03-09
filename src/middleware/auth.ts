import type { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import 'dotenv/config'
import type { AuthPayload } from "../types/types.js";

 
export function authenticateToken(req: Request, res: Response, next: NextFunction){
    const authHeader = req.headers['authorization'];
    // only if have authHeader split it
    // remove baerer from string
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({message: "access token finish"})
    }
    jwt.verify(token, process.env.jwt_secret as string, (err, decoded) => {
        if (err) {
            return res.status(402).json({message: "token not found"})
        }

        req.user = decoded as AuthPayload;

        next();
    });
};