import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import "dotenv/config";

// Middleware function for rate limiting and timeout handling
const authentication = (req: Request, res: Response, next: NextFunction) => {
    try {
        const secret = process.env.JWT_SECRET || "";
        const audience = process.env.JWT_AUDIENCE;

        const token = getToken(req);

        if (!token) {
            return res.status(401).end();
        }

        // Authenticate JWT token and attach user to request object (req.auth)
        req.user = jwt.verify(token, secret, { audience });

        // Continue to the next middleware
        next();
    } catch (error) {
        // Abort the request
        req.destroy();

        res.status(401).end();

        throw error;
    }
};

const getToken = (req: Request) => {
    if (
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
        const token = req.headers.authorization.split(" ")[1];
        return token;
    }

    return null;
};

export default authentication;
