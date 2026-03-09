import express from 'express';
import {login, me} from '../controllers/autController.js';

const router = express.Router();

router.post('/login', login)   
router.get('/me', me)       // create middleware for token


export default router;