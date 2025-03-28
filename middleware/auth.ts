import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
    user?: {
        userId: string;
        username: string;
    };
}

const isAuthenticated = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        console.log("isAuthenticated func called")
        const authHeader = req.headers.authorization;
        
        if (!authHeader) {
            res.status(401).json({ message: "no token provided" });
            return;
        }
        
        if (!authHeader.startsWith('Bearer ')) {
            res.status(401).json({ message: "Invalid token format" });
            return;
        }
        
        const token = authHeader.slice(7);
        
        const decoded = jwt.verify(token, process.env.jwt_secret || "") as {
            userId: string;
            username: string;
        };
        console.log(decoded);
        req.user = decoded;
        next();
    } catch (err) {
        console.log(err);
        res.status(404).json({ "msg": "error validating user token" });
    }
};

export default isAuthenticated;
