import { NextFunction, Request, Response } from "express";

import config from "../config";

import Caching from "../utils/caching";

// Define rate limit constants
const RATE_LIMIT = config.RATE_LIMIT;
const RATE_TIME = config.RATE_TIME;
const GATEWAY_TIMEOUT = config.GATEWAY_TIMEOUT;

// Stores the number of requests for each IP address in the caching service
// Configure TTL to reset request count every 'RATE_TIME' of seconds automatically
const caching = new Caching(RATE_TIME);

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

    // Handle timeout
    req.setTimeout(GATEWAY_TIMEOUT, () => {
        res.status(408).send("Request Timeout");
    });

    // Continue to the next middleware
    next();
};

export default rateLimitAndTimeout;
