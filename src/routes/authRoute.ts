import express from 'express';
import {login} from '../controllers/autController.js';

const router = express.Router();

router.post('/login', login)

// router.get('/me', ) 
// rout to get currente user

export default router;