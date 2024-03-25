import { Request, Response } from "express";

import authService from "../services/auth.service";

const login = async (req: Request, res: Response) => {
    try {
        const result = await authService.login(req.body);
        res.json(result);
    } catch (error) {
        throw error;
    }
};

const register = async (req: Request, res: Response) => {
    try {
        const result = await authService.register(req.body);
        res.json(result);
    } catch (error) {
        throw error;
    }
};

export default { login, register };
