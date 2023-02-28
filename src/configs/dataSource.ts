import path from "path";
import { DataSource } from "typeorm";

const dataSource = new DataSource({
  type: "postgres",
  host: "postgres",
  port: 5432,
  database: "postgres",
  username: "postgres",
  password: "postgres",
  synchronize: true,
  entities: [path.resolve(__dirname, "../entities/*.*")],
});

export default dataSource;
