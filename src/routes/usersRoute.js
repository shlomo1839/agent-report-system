import express from 'express';
import { isAuth, checkAdmin } from '../middlewre/authMiddleware';
import { User } from '../db/usersSchema';

const usersRouter = express.Router();

usersRouter.get('/', isAuth, checkAdmin, async(req,res) => {
    try {
        const allUsers = await User.find();
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
});

export default usersRouter;