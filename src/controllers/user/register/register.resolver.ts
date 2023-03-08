import bcrypt from "bcryptjs";
import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import envConfigs from "../../../configs/envConfigs";

import { User } from "../../../entities/User";
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

      const accessExpires = 1 * 1 * 60 * 60; // Expires:  d * h * m * s
      // const refrshExpires = Math.floor(Date.now() / 1000) + 12 * (60 * 60); // Expires: Now + 12h

      const accessToken = jwt.sign(
        {
          id: user.id,
          role: user.role,
        },
        envConfigs.secret as string,
        {
          expiresIn: accessExpires,
        }
      );

      ctx.res?.cookie("__a_t", accessToken, {
        maxAge: accessExpires * 1000,
        path: "/graphql",
        httpOnly: true,
        secure: envConfigs.isProd as boolean,
        sameSite: "none",
      });

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
