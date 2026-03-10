import express from 'express';
import jwt from 'jsonwebtoken';
import "dotenv/config";
import bcrypt from 'bcrypt';

const router = express.Router();
// const secret = process.env.secret;

router.post('/login', async (req, res) => {
    try {
        const {agentCode, password} = req.body;
        if (!agentCode || !password) {
            return res.status(400).json({message: "agent code or password missing"});
        }
        // we edd connect to mongo - after
        // const userToFind = await User...
        if (!userToFind) {
            return res.status(400).json({message: "user not found"})
        }

        const userFound = await bcrypt.compare(password, user.passwordHash)
        if(!userFound) {
            return res.status(400).json({ message: "the password dosnt match"})
        }
        
        res.status(200).json({message: "login succsess"})
    } catch (err){
        res.status(500).json({message: err.message})
    }
})





router.get('/me', async (req, res) => {
    try {
        const dataToken = req.user;
        if (!dataToken) {
            return res.status(400).json({message: "token not define"})
        }

        // connect mongo after
        // const userToFound

        
        if (!userToFound) {
            return res.status(400).json({message: "agent not found"})
        }
        const returnUser = {
            id: userToFound.Id,
            agentCode: userToFound.agentCode,
            fullName: userToFound.fullName,
            role: userToFound.role
        }
        res.status(200).json(returnUser)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})


export default router;