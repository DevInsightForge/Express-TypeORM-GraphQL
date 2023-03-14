import path from "path";
import { DataSource } from "typeorm";
import { entityModels } from "./database";

const testDatabasePath = path.resolve(__dirname, "../../testdb.sqlite");

const testDatabase = new DataSource({
  type: "sqlite",
  database: testDatabasePath,
  synchronize: true,
  dropSchema: true,
  entities: entityModels,
});

export default testDatabase;
