import { DataSource } from "typeorm";
import config from ".";

const dataSource = new DataSource({
  type: "postgres",
  host: config.isProd ? "postgres" : "localhost",
  port: 5432,
  database: "postgres",
  username: "postgres",
  password: "postgres",
  synchronize: true,
  entities: [],
});

export default dataSource;
