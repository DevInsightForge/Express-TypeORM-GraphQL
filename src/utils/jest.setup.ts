import "reflect-metadata";

import type { ApolloServer } from "@apollo/server";
import ApolloHandler from "../handlers/ApolloHandler";

declare global {
  var apolloClient: ApolloServer;
}

const setupJest = async () => {
  global.apolloClient = await ApolloHandler();
};

setupJest();
