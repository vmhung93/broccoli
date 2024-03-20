interface AuthDTO {
    username: string;
    email: string;
    token: string;
}

interface LoginDTO {
    email: string;
    password: string;
}

interface RegisterDTO {
    username: string;
    email: string;
    password: string;
}

export { AuthDTO, LoginDTO, RegisterDTO };
