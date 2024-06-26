import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

import config from "../config";

import WHITELIST from "../whitelist";

// Middleware function for rate limiting and timeout handling
const authentication = (req: Request, res: Response, next: NextFunction) => {
    try {
        // Whitelist checking
        const allowAnonymous = WHITELIST.find((api) => {
            const regex = new RegExp(api.regex);
            return api.method === req.method && regex.test(req.originalUrl);
        });

        if (allowAnonymous) {
            // Continue to the next middleware
            return next();
        }

        const secret = config.JWT_SECRET;
        const audience = config.JWT_AUDIENCE;

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
