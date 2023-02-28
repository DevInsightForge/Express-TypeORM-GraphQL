import { ApolloServer } from "@apollo/server";
import { Request } from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import HelloResolver from "../controllers/helloWorld/HelloResolver";

interface MyContext {
  req?: Request;
}
const ApolloHandler = async () => {
  const schema = await buildSchema({
    resolvers: [HelloResolver],
  });

  return new ApolloServer<MyContext>({
    schema,
  });
};

export default ApolloHandler;
