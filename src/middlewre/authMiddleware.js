import jwt from 'jsonwebtoken';

export const checkAdmin = (req, res, next) => {
    if(req.user.role !== "admin"){
        return res.status(400).json({message: "you not alwoud"})
    }
    next();
};


export const isAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(400).json({message: "auth denied"})
    }
    const token = authHeader.split(" ")[1];   //remove spases - bearer
    try {
        const decoded = jwt.verify(token, "sec-key")
        req.user = decoded;
        next();
    } catch (error){
        return res.status(401).json({ message: "invalid token" });
    }
}