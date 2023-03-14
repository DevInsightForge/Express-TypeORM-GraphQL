import bcrypt from "bcryptjs";
import { GraphQLError } from "graphql";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";

import { User } from "../../../entities/User";
import processTokens from "../helpers/processTokens";
import RegisterInput from "./register.inputs";

@Resolver(User)
export class RegisterResolver {
  @Mutation(() => User, { nullable: true })
  async register(
    @Arg("input")
    { email, password }: RegisterInput,
    @Ctx() ctx: MyContext
  ): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(password, 12);

      const user = await User.create({
        email,
        password: hashedPassword,
      }).save();

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
