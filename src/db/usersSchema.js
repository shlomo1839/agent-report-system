import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    agentCode: {
        type: String,
        required: true,
        unique: true
    },
    fullname: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'agent'],
        default: 'agent'
    }
});

export const User = mongoose.model("user", userSchema)