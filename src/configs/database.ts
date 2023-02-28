import path from "path";
import { DataSource } from "typeorm";

const isProd = process.env.NODE_ENV === "production";

const dataSource = new DataSource({
  type: "postgres",
  host: "postgres",
  port: 5432,
  database: "postgres",
  username: "postgres",
  password: "postgres",
  entities: [path.resolve(__dirname, "../entities/*.*")],
});

const devDataSource = new DataSource({
  type: "sqlite",
  database: path.resolve(__dirname, "../../db.sqlite"),
  synchronize: true,
  entities: [path.resolve(__dirname, "../entities/*.*")],
});

const database = isProd ? dataSource : devDataSource;

export default database;
