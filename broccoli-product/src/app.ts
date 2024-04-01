import express, { Express, Request, Response } from "express";
import morgan from "morgan";

import config from "./config";

import errorHandler from "./middlewares/error.middleware";

import productRouter from "./routes/product.router";

// App instance of Express
const app: Express = express();

// It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json());

// HTTP request logger
app.use(morgan("combined"));

// Router
app.use("/product", productRouter);

// Handler for route not found
app.use((_req: Request, res: Response) => {
    res.status(404).end();
});

// Global error handling middleware
app.use(errorHandler);

// Define port for Express server
const PORT = config.PORT;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
