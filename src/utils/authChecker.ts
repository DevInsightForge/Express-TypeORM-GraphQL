import * as jwt from "jsonwebtoken";
import { AuthChecker } from "type-graphql";
import envConfigs from "../configs/envConfigs";

const authChecker: AuthChecker<MyContext> = async ({ context }, roles) => {
  // here we can read the user from context
  // and check his permission in the db against the `roles` argument
  // that comes from the `@Authorized` decorator, eg. ["ADMIN", "MODERATOR"]

  try {
    const payload: any = jwt.verify(
      context.req?.cookies?.__a_t,
      envConfigs.secret
    );

    delete payload?.iat;
    delete payload?.exp;

    context.user = payload;

    return true;
  } catch (error) {
    return false;
  }
};
export default authChecker;
