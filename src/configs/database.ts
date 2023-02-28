import path from "path";
import { DataSource } from "typeorm";
import { User } from "../entities/User";

const isProd = process.env.NODE_ENV === "production";
const devDatabasePath = path.resolve(__dirname, "../../db.sqlite");

const entityModels = [User];

const dataSource = new DataSource({
  type: "postgres",
  host: "postgres",
  port: 5432,
  database: "postgres",
  username: "postgres",
  password: "postgres",
  entities: entityModels,
});

const devDataSource = new DataSource({
  type: "sqlite",
  database: devDatabasePath,
  synchronize: true,
  entities: entityModels,
});

export const testDataSource = new DataSource({
  type: "sqlite",
  database: devDatabasePath,
  synchronize: true,
  dropSchema: true,
  entities: entityModels,
});

const database = isProd ? dataSource : devDataSource;

export default database;
