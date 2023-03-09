import { GraphQLError } from "graphql";
import { Authorized, Query, Resolver } from "type-graphql";

import { User, UserRole } from "../../../entities/User";

@Resolver(User)
export class GetAllUsersResolver {
  @Query(() => [User])
  @Authorized(UserRole.admin)
  async getAllUsers(): Promise<User[]> {
    try {
      const users = await User.find();
      return users;
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
