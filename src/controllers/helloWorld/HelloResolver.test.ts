import type { ApolloServer } from "@apollo/server";

import { testDatabase } from "../../configs/database";
import ApolloHandler from "../../handlers/ApolloHandler";

let apolloClient: ApolloServer;

const query = `
  query Hello {
      helloWorld
    }
  `;

describe("Hello World Test", () => {
  beforeAll(async () => {
    await testDatabase.initialize();
    apolloClient = await ApolloHandler();
  });

  afterAll(async () => {
    await testDatabase.destroy();
  });

  it("query is available", async () => {
    const response: any = await apolloClient.executeOperation({
      query,
    });

    expect(response).toBeTruthy();
  });

  it("query has correct response", async () => {
    const response: any = await apolloClient.executeOperation({
      query,
    });

    expect(response?.body?.singleResult?.data?.helloWorld).toBe("Hello World!");
  });
});
