import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { json } from "body-parser";
import cors, { CorsRequest } from "cors";
import express, { Request } from "express";
import http from "http";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import dataSource from "./configs/dataSource";
import HelloResolver from "./modules/test/helloWorld";

interface MyContext {
  req?: Request;
}

const main = async () => {
  await dataSource.initialize();
  // Required logic for integrating with Express
  const app = express();

  // Our httpServer handles incoming requests to our Express app.
  // Below, we tell Apollo Server to "drain" this httpServer,
  // enabling our servers to shut down gracefully.
  const httpServer = http.createServer(app);

  const schema = await buildSchema({
    resolvers: [HelloResolver],
  });

  // Same ApolloServer initialization as before, plus the drain plugin
  // for our httpServer.
  const apolloServer = new ApolloServer<MyContext>({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  // Ensure we wait for our server to start
  await apolloServer.start();

  // Set up our Express middleware to handle CORS, body parsing,
  // and our expressMiddleware function.
  app.use(
    "/graphql",
    cors<CorsRequest>(),
    json(),
    expressMiddleware(apolloServer, {
      context: async ({ req }) => ({ req }),
    })
  );

  // Modified server startup
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000/`);
};

main();
