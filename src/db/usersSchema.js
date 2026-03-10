import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    agentCode: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true,
    },
    passwordHash: {
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