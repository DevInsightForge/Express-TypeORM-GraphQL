import { GraphQLError } from "graphql";
import { Arg, Authorized, Query, Resolver } from "type-graphql";

import { User, UserRole } from "../../../entities/User";

@Resolver(User)
export class GetUserResolver {
  @Query(() => User)
  @Authorized(UserRole.admin)
  async getUser(
    @Arg("userId", { nullable: true }) userId: string
  ): Promise<User> {
    try {
      const user = await User.findOneByOrFail({ id: userId });
      return user;
    } catch (error) {
      console.log(error);
      throw new GraphQLError("Something went wrong", {
        extensions: {
          error,
        },
      });
    }
  }
}
