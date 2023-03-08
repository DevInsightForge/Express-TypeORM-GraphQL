import type { JwtPayload } from "jsonwebtoken";

import jwt from "jsonwebtoken";
import { AuthChecker } from "type-graphql";
import envConfigs from "../configs/envConfigs";

const authChecker: AuthChecker<MyContext> = async ({ context }, roles) => {
  try {
    const payload: JwtPayload = jwt.verify(
      context.req?.cookies?.__a_t,
      envConfigs.secret
    ) as JwtPayload;

    context.userId = payload?.id;
    context.userRole = payload?.role;

    // Return false if roles are specified and doesn't match to user's
    if (
      Boolean(roles.length) &&
      !Boolean(roles.some((role) => payload?.role === role.toLowerCase()))
    ) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
};

export default authChecker;
