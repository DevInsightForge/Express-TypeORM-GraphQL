import path from "path";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import envConfigs from "./envConfigs";

const devDatabasePath = path.resolve(__dirname, "../../db.sqlite");
const testDatabasePath = path.resolve(__dirname, "../../testdb.sqlite");

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
  dropSchema: true,
  entities: entityModels,
});

export const testDataSource = new DataSource({
  type: "sqlite",
  database: testDatabasePath,
  synchronize: true,
  dropSchema: true,
  entities: entityModels,
});

const database = envConfigs.isProd ? dataSource : devDataSource;

export default database;
