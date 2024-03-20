import bcrypt from "bcrypt";
import { Document } from "mongoose";

import User from "../models/user.model";
import { AuthDTO, LoginDTO, RegisterDTO } from "../dto/auth.dto";

const SALT_ROUNDS = 10;

const login = async (dto: LoginDTO): Promise<AuthDTO> => {
    const user = await User.findOne({ email: dto.email });

    if (!user || !bcrypt.compareSync(dto.password, user.passwordHash)) {
        throw new Error("Wrong password.");
    }

    const result: AuthDTO = {
        username: user.username,
        email: user.email,
        token: "",
    };

    return result;
};

const register = async (dto: RegisterDTO): Promise<Document<any>> => {
    const user = new User({
        username: dto.username,
        email: dto.email,
        passwordHash: bcrypt.hashSync(dto.password, SALT_ROUNDS),
    });

    return await user.save();
};

export default { login, register };
