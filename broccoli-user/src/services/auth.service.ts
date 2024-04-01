import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { Document } from "mongoose";

import config from "../config";

import User from "../models/user.model";

import { LoginDTO, RegisterDTO } from "../dto/auth.dto";
import { UserDTO } from "../dto/user.dto";

const SALT_ROUNDS = 10;

class AuthService {
    public login = async (dto: LoginDTO): Promise<UserDTO> => {
        try {
            const user = await User.findOne({ email: dto.email });

            if (!user || !bcrypt.compareSync(dto.password, user.passwordHash)) {
                throw new Error("Wrong password.");
            }

            const result: UserDTO = {
                id: user.id,
                username: user.username,
                email: user.email,
                token: this.generateToken({
                    id: user.id,
                    email: user.email,
                }),
            };

            return result;
        } catch (error) {
            throw error;
        }
    };

    public register = async (dto: RegisterDTO): Promise<Document<any>> => {
        try {
            const user = new User({
                username: dto.username,
                email: dto.email,
                passwordHash: bcrypt.hashSync(dto.password, SALT_ROUNDS),
            });

            return await user.save();
        } catch (error) {
            throw error;
        }
    };

    private generateToken(payload: any) {
        try {
            const secret = config.JWT_SECRET;
            const audience = config.JWT_AUDIENCE;
            const expiresIn = config.JWT_EXPIRES_IN;

            // Create a jwt token containing the user info
            return jwt.sign(payload, secret, {
                expiresIn: expiresIn,
                audience,
            });
        } catch (error) {
            throw error;
        }
    }

    private verifyToken(token: string) {
        try {
            const secret = config.JWT_SECRET;
            const audience = config.JWT_AUDIENCE;

            const payload = jwt.verify(token, secret, { audience: audience });

            return payload;
        } catch (error) {
            throw error;
        }
    }
}

export default AuthService;
