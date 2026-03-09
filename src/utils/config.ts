import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

export const config = {
    jwt_secret: process.env.jwt_secret || '1234Ss'

}