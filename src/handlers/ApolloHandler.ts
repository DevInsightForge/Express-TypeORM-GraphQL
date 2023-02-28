import { ApolloServer } from "@apollo/server";
import { buildSchema } from "type-graphql";
import HelloResolver from "../controllers/helloWorld/HelloResolver";

const ApolloHandler = async () => {
  const schema = await buildSchema({
    resolvers: [HelloResolver],
  });

  return new ApolloServer({
    schema,
  });
};

export default ApolloHandler;
