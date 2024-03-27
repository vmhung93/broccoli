import express, { Express, Request, Response } from "express";
import morgan from "morgan";

import config from "./utils/config";
import db from "./database";
import authRouter from "./routes/auth.router";

// App instance of Express
const app: Express = express();

// It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json());

// HTTP request logger
app.use(morgan("combined"));

// Open the connection to mongodb
db.connectMongoDB()
    .then(() => {
        console.info("Connected to MongoDB");
    })
    .catch((err) => console.log(err));

// Router
app.use("/auth", authRouter);

// Handler for route not found
app.use((_req: Request, res: Response) => {
    res.status(404).end();
});

// Express server
app.listen(config.PORT, () => {
    console.log(`App listening on port ${config.PORT}`);
});
