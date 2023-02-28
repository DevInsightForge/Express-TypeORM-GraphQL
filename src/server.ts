import "reflect-metadata";

import { startStandaloneServer } from "@apollo/server/standalone";
import ApolloHandler from "./handlers/ApolloHandler";

const main = async () => {
  const apolloServer = await ApolloHandler();
  // `startStandaloneServer` returns a `Promise` with the
  // the URL that the server is listening on.
  const { url } = await startStandaloneServer(apolloServer);

  console.log(`🚀 Server ready at ${url}`);
};

main();
