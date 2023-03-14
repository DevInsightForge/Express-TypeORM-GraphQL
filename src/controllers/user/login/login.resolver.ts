import bcrypt from "bcryptjs";
import { GraphQLError } from "graphql";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";

import { User } from "../../../entities/User";
import processTokens from "../helpers/processTokens";
import { LoginInput } from "./login.inputs";

@Resolver(User)
export class LoginResolver {
  @Mutation(() => User, { nullable: true })
  async login(
    @Arg("input")
    { email, password }: LoginInput,
    @Ctx() ctx: MyContext
  ): Promise<User> {
    try {
      const user = await User.findOneByOrFail({
        email,
      });

      const valid = await bcrypt.compare(password, user?.password);

      if (!Boolean(valid)) {
        throw new Error("Invalid password");
      }

      await processTokens({ ctx, user });

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
