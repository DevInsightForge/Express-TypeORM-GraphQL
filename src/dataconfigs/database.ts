import path from "path";
import { DataSource } from "typeorm";
import envConfigs from "../configs/envConfigs";
import { RefreshToken } from "../entities/RefreshToken";
import { User } from "../entities/User";

const devDatabasePath = path.resolve(__dirname, "../../db.sqlite");

export const entityModels = [User, RefreshToken];

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
  // dropSchema: true,
  entities: entityModels,
});

const database = envConfigs.isProd ? dataSource : devDataSource;

export default database;
