import "dotenv/config";

export default {
    PORT: process.env.PORT ?? 3000,

    RATE_LIMIT: Number(process.env.RATE_LIMIT) ?? 60,
    RATE_TIME: Number(process.env.RATE_TIME) * 1000 ?? 60000,
    GATEWAY_TIMEOUT: Number(process.env.GATEWAY_TIMEOUT) * 1000 ?? 60000,

    JWT_AUDIENCE: process.env.JWT_AUDIENCE ?? "",
    JWT_SECRET: process.env.JWT_SECRET ?? "",
};
