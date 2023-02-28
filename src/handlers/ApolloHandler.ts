import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { Request } from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import HelloResolver from "../modules/helloWorld/HelloResolver";

import type { Server } from "http";

interface MyContext {
  req?: Request;
}
const ApolloHandler = async (httpServer: Server) => {
  const schema = await buildSchema({
    resolvers: [HelloResolver],
  });

  // Same ApolloServer initialization as before, plus the drain plugin
  // for our httpServer.
  return new ApolloServer<MyContext>({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
};

export default ApolloHandler;
