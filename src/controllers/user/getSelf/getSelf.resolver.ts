import { GraphQLError } from "graphql";
import { Authorized, Ctx, Query, Resolver } from "type-graphql";

import { User } from "../../../entities/User";

@Resolver(User)
export class GetSelfResolver {
  @Query(() => User)
  @Authorized()
  async getSelf(@Ctx() ctx: MyContext): Promise<User> {
    try {
      const user = await User.findOneByOrFail({ id: ctx?.userId });
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
