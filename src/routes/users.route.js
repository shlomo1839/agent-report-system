import express from 'express';
import { isAuth, checkAdmin } from '../middlewre/authMiddleware';
import { User } from '../db/usersSchema';

const router = express.Router();

router.get('/', isAuth, checkAdmin, async(req,res) => {
    try {
        const allUsers = await User.find();
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
});