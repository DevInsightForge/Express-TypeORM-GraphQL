import { ApolloServer } from "@apollo/server";
import { buildSchema } from "type-graphql";
import HelloResolver from "../controllers/helloWorld/hello.resolver";
import { RegisterResolver } from "../controllers/user/register/register.resolver";
import authChecker from "../utils/authChecker";
import validationErrorFormatter from "../utils/errorFormatter";

const ApolloHandler = async () => {
  const schema = await buildSchema({
    resolvers: [HelloResolver, RegisterResolver],
    authChecker,
  });

  return new ApolloServer({
    schema,
    formatError: validationErrorFormatter,
  });
};

export default ApolloHandler;
