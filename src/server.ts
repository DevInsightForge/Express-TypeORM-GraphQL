import "reflect-metadata";
import ExpressHandler from "./handlers/ExpressHandler";

const main = async () => {
  const appServer = await ExpressHandler();

  // Modified server startup
  await new Promise<void>((resolve) =>
    appServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000/graphql/`);
};

main();
