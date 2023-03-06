import "reflect-metadata";

import type { Server as HttpServer } from "http";

import database from "./configs/database";
import ExpressHandler from "./handlers/ExpressHandler";

const port = Boolean(process.env.PORT)
  ? parseInt(process.env.PORT as string)
  : 4000;

const server = async () => {
  // spin up database
  await database.initialize();
  const httpServer: HttpServer = await ExpressHandler();

  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));

  console.log(`Running server at http://localhost:${port}/graphql`);
};

server();
