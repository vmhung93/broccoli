import express, { Express, Request, Response } from "express";
import "dotenv/config";

// App instance of Express
const app: Express = express();

// Handler for route not found
app.get("/", (_req: Request, res: Response) => {
    res.send("Hello world").end;
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
