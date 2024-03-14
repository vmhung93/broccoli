import express, { Express, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { createProxyMiddleware } from "http-proxy-middleware";
import "dotenv/config";

// Rate limiting middleware
import rateLimitAndTimeout from "./middlewares/rate_limiting";

// Proxy rules
import { proxyRules } from "./proxy_rules.js";

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
proxyRules.forEach(({ route, target }) => {
    // Proxy options
    const proxyOptions = {
        target,
        changeOrigin: true,
        pathRewrite: {
            [`^${route}`]: "",
        },
    };

    // Apply rate limiting and timeout middleware before proxy
    app.use(route, rateLimitAndTimeout, createProxyMiddleware(proxyOptions));
});

// Handler for route not found
app.use((_req: Request, res: Response) => {
    res.status(404).end();
});

// Define port for Express server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
