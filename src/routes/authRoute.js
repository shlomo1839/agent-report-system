import express from 'express';
import jwt from 'jsonwebtoken';
import "dotenv/config";
import bcrypt from 'bcrypt';
import { checkAdmin, isAuth } from '../middlewre/authMiddleware';
import {User} from '../db/usersSchema';

const authRouter = express.Router();
// const secret = process.env.secret;

authRouter.post('/login', async (req, res) => {
    try {
        const {agentCode, password} = req.body;
        if (!agentCode || !password) {
            return res.status(400).json({message: "agent code or password missing"});
        }
        const userToFind = await User.findOne({agentCode})
        if (!userToFind) {
            return res.status(400).json({message: "user not found"})
        }

        const userFound = await bcrypt.compare(password, user.passwordHash)
        if(!userFound) {
            return res.status(400).json({ message: "the password dosnt match"})
        }

        const token = jwt.sign(
        {id: user._id, role: user.role},
        "my-ses-key",
        {expiresIn: "1d"}
        );
        res.status(200).json({message: "login succsess", token})
    } catch (err){
        res.status(500).json({message: err.message})
    }
})



authRouter.get('/me', isAuth, async (req, res) => {
    try {
        const dataToken = req.user;
        if (!dataToken) {
            return res.status(400).json({message: "token not define"})
        }

        const userToFound = await User.findOne({_id: token.id})
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
});


authRouter.post('/signup', isAuth, checkAdmin, async (req, res) => {
    try {
        const { fullName, agentCode, password, role } = req.body;
        if (!fullName || !agentCode) {
            return res.status(400).json({message: "enter all fields"})
        }

        const exsistsUser = await User.findOne({agentCode})
        if (exsistsUser) {
            return res.status(400).json({message: "egents with this agent code exsists"})
        }

        const passwordToHash = role === "agent" ? fullName : password;
        const passwordHash = await bcrypt.hash(passwordToHash, 10)

        const newUser = new User({
            fullName,
            agentCode,
            passwordHash,
            role: role ? role : 'agent'
        })
        await newUser.save();

        const token = jwt.sign(
            {id: newUser._id, role: newUser._role},
            "my-sec-key",
        )
         res.status(200).json({message: "created user successs", token})
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

export default authRouter;