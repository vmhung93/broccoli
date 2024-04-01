import { Request, Response } from "express";

const errorHandler = (error: Error, _req: Request, res: Response) => {
    console.error(`Error: ${error.message}`);
    return res.status(500).json({ message: "Internal server error" });
};

export default errorHandler;
