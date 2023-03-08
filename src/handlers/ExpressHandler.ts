import type { ApolloServer } from "@apollo/server";
import type { Server as HttpServer } from "http";

import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { json } from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { createServer } from "http";
import envConfigs from "../configs/envConfigs";
import ApolloHandler from "./ApolloHandler";

const ExpressHandler = async () => {
  const app: express.Express = express();
  const httpServer: HttpServer = createServer(app);

  const apolloServer: ApolloServer = await ApolloHandler();

  apolloServer.addPlugin(
    ApolloServerPluginDrainHttpServer({ httpServer: httpServer })
  );

  await apolloServer.start();

  app.use(
    "/graphql",
    cors({
      credentials: true,
      origin: true,
    }),
    json({ limit: "50mb" }),
    cookieParser(envConfigs.secret as string),
    expressMiddleware(apolloServer, {
      context: async ({ req, res }): Promise<MyContext> => ({
        req,
        res,
      }),
    })
  );

  // this is default in case of unmatched routes
  app.use(function (req, res) {
    // Invalid request
    res.status(404).json({
      error: "Invalid URL path",
      message: "Requested URL path is not available",
      statusCode: 404,
      path: req?.url,
    });
  });

  // Modified server startup
  return httpServer;
};

export default ExpressHandler;
