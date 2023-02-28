import { expressMiddleware } from "@apollo/server/express4";
import { json } from "body-parser";
import cors from "cors";
import express from "express";
import http from "http";
import ApolloHandler from "./ApolloHandler";

import type { CorsRequest } from "cors";
import type { Server } from "http";

const ExpressHandler = async (): Promise<Server> => {
  // Required logic for integrating with Express
  const expressApp = express();

  // Our httpServer handles incoming requests to our Express app.
  // Below, we tell Apollo Server to "drain" this httpServer,
  // enabling our servers to shut down gracefully.
  const httpServer = http.createServer(expressApp);

  const apolloHandler = await ApolloHandler(httpServer);
  await apolloHandler.start();

  // Set up our Express middleware to handle CORS, body parsing,
  // and our expressMiddleware function.
  expressApp.use(
    "/graphql",
    cors<CorsRequest>(),
    json(),
    expressMiddleware(apolloHandler, {
      context: async ({ req }) => ({ req }),
    })
  );

  return httpServer;
};

export default ExpressHandler;
