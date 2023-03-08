import { Authorized, Ctx, Query, Resolver } from "type-graphql";

@Resolver()
class HelloResolver {
  @Query(() => String)
  @Authorized("USER")
  async helloWorld(@Ctx() ctx: MyContext) {
    console.log(ctx?.user);

    return "Hello World!";
  }
}

export default HelloResolver;
