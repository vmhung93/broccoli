import { NextFunction, Request, Response } from "express";

import AuthService from "../services/auth.service";

class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    public login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.authService.login(req.body);
            res.json(result);
        } catch (error) {
            next(error);
        }
    };

    public register = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const result = await this.authService.register(req.body);
            res.json(result);
        } catch (error) {
            next(error);
        }
    };
}

export default AuthController;
