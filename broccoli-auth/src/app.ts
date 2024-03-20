import express, { Express, Request, Response } from "express";
import "dotenv/config";

import db from "./db";
import authRouter from "./routes/auth.router";

// App instance of Express
const app: Express = express();

// It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json());

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

// Define port for Express server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
