import { DataSource } from "typeorm";

const dataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "broccoli",
    entities: [`${__dirname}/entities/*.entity.{js,ts}`],
    migrations: [`${__dirname}/migrations/*{.js,.ts}`],
    synchronize: true,
});

dataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err);
    });

export default dataSource;
