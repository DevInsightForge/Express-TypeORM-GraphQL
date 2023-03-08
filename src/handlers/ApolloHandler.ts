import { ApolloServer } from "@apollo/server";
import { buildSchema } from "type-graphql";
import HelloResolver from "../controllers/helloWorld/HelloResolver";
import { RegisterResolver } from "../controllers/user/register/register.resolver";
import validationErrorFormatter from "../utils/errorFormatter";

const ApolloHandler = async () => {
  const schema = await buildSchema({
    resolvers: [HelloResolver, RegisterResolver],
  });

  return new ApolloServer({
    schema,
    formatError: validationErrorFormatter,
  });
};

export default ApolloHandler;
