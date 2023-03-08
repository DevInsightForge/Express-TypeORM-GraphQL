import * as jwt from "jsonwebtoken";
import { AuthChecker } from "type-graphql";
import envConfigs from "../configs/envConfigs";
import { User } from "../entities/User";

const authChecker: AuthChecker<MyContext> = async ({ context }, roles) => {
  // here we can read the user from context
  // and check his permission in the db against the `roles` argument
  // that comes from the `@Authorized` decorator, eg. ["ADMIN", "MODERATOR"]

  try {
    const payload: any = jwt.verify(
      context.req?.cookies?.__a_t,
      envConfigs.secret
    );

    const result = await User.findOneByOrFail({
      id: payload?.id,
      email: payload?.email,
    });

    const { password, ...user } = result;

    context.user = user;
    if (
      Boolean(roles.length) &&
      !Boolean(roles.some((role) => user.role === role.toLowerCase()))
    ) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
};
export default authChecker;
