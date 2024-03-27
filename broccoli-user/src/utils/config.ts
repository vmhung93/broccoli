import "dotenv/config";

export default {
    PORT: process.env.PORT ?? 3001,

    MONGODB_SERVER: process.env.MONGODB_SERVER,

    JWT_AUDIENCE: process.env.JWT_AUDIENCE ?? "",
    JWT_SECRET: process.env.JWT_SECRET ?? "",
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? "1d",
};
