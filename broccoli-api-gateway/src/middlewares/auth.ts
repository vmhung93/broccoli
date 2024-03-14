import { NextFunction, Request, Response } from "express";
import "dotenv/config";

import { Caching } from "../utils/caching";

// Define rate limit constants
const RATE_LIMIT = Number(process.env.RATE_LIMIT) || 60;
const RATE_TIME = Number(process.env.RATE_TIME) || 60;
const GATEWAY_TIMEOUT = Number(process.env.GATEWAY_TIMEOUT) || 60 * 1000;

// Stores the number of requests for each IP address in the caching service
// Configure TTL to reset request count every 'RATE_TIME' of seconds automatically
const caching = new Caching(RATE_TIME); //TODO: Testing stdTTL

// Middleware function for rate limiting and timeout handling
const rateLimitAndTimeout = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Get client IP address
    const ip = req.ip;

    if (ip === undefined) {
        return res.status(400).end();
    }

    // Update request count for the current IP
    let count = 0;

    if (caching.has(ip)) {
        count = Number(caching.retrieve(ip)) || 0;

        if (count >= RATE_LIMIT) {
            return res.status(429).end();
        }
    }

    // Store request count
    caching.store(ip, count + 1);

    // Set timeout for each request
    req.setTimeout(GATEWAY_TIMEOUT, () => {
        // Handle timeout error
        res.status(504).end();

        // Abort the request
        req.destroy();
    });

    // Continue to the next middleware
    next();
};

export default rateLimitAndTimeout;
