import "dotenv/config";

export default {
    PORT: process.env.PORT ?? 3001,

    MYSQL_HOST: process.env.MYSQL_HOST,
    MYSQL_ROOT_PASSWORD: process.env.MYSQL_ROOT_PASSWORD,
};
