import { Authorized, Ctx, Query, Resolver } from "type-graphql";
import { UserRole } from "../../entities/User";

@Resolver()
class HelloResolver {
  @Query(() => String)
  @Authorized(UserRole.user)
  async helloWorld(@Ctx() ctx: MyContext) {
    console.log(ctx?.userId, ctx?.userRole);

    return "Hello World!";
  }
}

export default HelloResolver;
