import express, { Express, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { createProxyMiddleware } from "http-proxy-middleware";

import config from "./config";

// Middleware
import rateLimitAndTimeout from "./middlewares/rate-limiting";
import authentication from "./middlewares/authentication";

// Proxy rules
import PROXY_RULES from "./proxy-rules";

// App instance of Express
const app: Express = express();

/*
 * Middleware setup
 */
app.use(cors()); // Enable CORS
app.use(helmet()); // Add security headers
app.disable("x-powered-by"); // Reduce Fingerprinting
app.use(morgan("combined")); // HTTP request logger

// Set up proxy middleware for each microservice
PROXY_RULES.forEach(({ route, target, auth }) => {
    // Proxy options
    const proxyOptions = {
        target,
        changeOrigin: true,
        pathRewrite: {
            [`^${route}`]: "",
        },
        // timeout: 60000, // TODO: Looks stupid but it works
        onProxyReq: (proxyReq: any, req: Request, _res: Response) => {
            // Attach authenticated user to the request headers
            if (req.user) {
                proxyReq.setHeader(
                    "X-Authenticated-User",
                    JSON.stringify(req.user)
                );
            }
        },
    };

    // Apply rate limiting and timeout middleware before proxy
    app.use(
        route,
        rateLimitAndTimeout,
        auth ? authentication : [],
        createProxyMiddleware(proxyOptions)
    );
});

// Parses JSON
app.use(express.json());

// Handler for route not found
app.use((_req: Request, res: Response) => {
    res.status(404).end();
});

// Define port for Express server
const PORT = config.PORT || 3000;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
