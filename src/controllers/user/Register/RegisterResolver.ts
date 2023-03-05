import * as bcrypt from "bcryptjs";
import { GraphQLError } from "graphql";
import { Arg, Mutation, Resolver } from "type-graphql";

import { User } from "../../../entities/User";
import RegisterInput from "./RegisterInputs";

@Resolver(User)
export class RegisterResolver {
  @Mutation(() => User)
  async register(
    @Arg("input")
    { email, password }: RegisterInput
  ): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(password, 12);

      const user = await User.create({
        email,
        password: hashedPassword,
      }).save();

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
