import path from "path";
import { DataSource } from "typeorm";

const isProd = process.env.NODE_ENV === "production";

const entitiesPath = path.resolve(__dirname, "../entities/*.*");
const devDatabasePath = path.resolve(__dirname, "../../db.sqlite");

const dataSource = new DataSource({
  type: "postgres",
  host: "postgres",
  port: 5432,
  database: "postgres",
  username: "postgres",
  password: "postgres",
  entities: [entitiesPath],
});

const devDataSource = new DataSource({
  type: "sqlite",
  database: devDatabasePath,
  synchronize: true,
  entities: [entitiesPath],
});

const database = isProd ? dataSource : devDataSource;

export default database;
