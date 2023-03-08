import "reflect-metadata";

import type { Server as HttpServer } from "http";

import database from "./configs/database";
import envConfigs from "./configs/envConfigs";
import ExpressHandler from "./handlers/ExpressHandler";

const server = async () => {
  // spin up database
  await database.initialize();
  const httpServer: HttpServer = await ExpressHandler();

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: envConfigs.port }, resolve)
  );

  console.log(`Running server at http://localhost:${envConfigs.port}/graphql`);
};

server();
