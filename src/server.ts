import "reflect-metadata";

import { startStandaloneServer } from "@apollo/server/standalone";
import database from "./configs/database";
import ApolloHandler from "./handlers/ApolloHandler";

const server = async () => {
  // spin up database
  await database.initialize();

  const apolloServer = await ApolloHandler();
  // `startStandaloneServer` returns a `Promise` with the
  // the URL that the server is listening on.
  const { url } = await startStandaloneServer(apolloServer);

  console.log(`🚀 Server ready at ${url}`);
};

server();
