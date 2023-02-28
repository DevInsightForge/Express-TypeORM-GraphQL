import { ApolloServer } from "@apollo/server";
import { buildSchema } from "type-graphql";
import HelloResolver from "../controllers/helloWorld/HelloResolver";
import { RegisterResolver } from "../controllers/user/RegisterResolver";

const ApolloHandler = async () => {
  const schema = await buildSchema({
    resolvers: [HelloResolver, RegisterResolver],
  });

  return new ApolloServer({
    schema,
  });
};

export default ApolloHandler;
