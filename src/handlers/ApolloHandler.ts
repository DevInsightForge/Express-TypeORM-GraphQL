import { ApolloServer } from "@apollo/server";
import { buildSchema } from "type-graphql";
import HelloResolver from "../controllers/helloWorld/hello.resolver";
import { GetAllUsersResolver } from "../controllers/user/getAllUsers/getAllUsers.resolver";
import { GetSelfResolver } from "../controllers/user/getSelf/getSelf.resolver";
import { GetUserResolver } from "../controllers/user/getUser/getUser.resolver";
import { LoginResolver } from "../controllers/user/login/login.resolver";
import { RegisterResolver } from "../controllers/user/register/register.resolver";
import authChecker from "../utils/authChecker";
import validationErrorFormatter from "../utils/errorFormatter";

const ApolloHandler = async () => {
  const schema = await buildSchema({
    resolvers: [
      HelloResolver,
      RegisterResolver,
      LoginResolver,
      GetUserResolver,
      GetSelfResolver,
      GetAllUsersResolver,
    ],
    authChecker,
  });

  return new ApolloServer({
    schema,
    formatError: validationErrorFormatter,
  });
};

export default ApolloHandler;
