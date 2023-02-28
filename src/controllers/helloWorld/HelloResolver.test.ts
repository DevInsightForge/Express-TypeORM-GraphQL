import { testDataSource } from "../../configs/database";
import ApolloHandler from "../../handlers/ApolloHandler";

import type { ApolloServer } from "@apollo/server";

let apolloClient: ApolloServer;

const query = `
  query Hello {
      helloWorld
    }
  `;

describe("Hello World Test", () => {
  beforeAll(async () => {
    await testDataSource.initialize();
    apolloClient = await ApolloHandler();
  });

  afterAll(async () => {
    await testDataSource.destroy();
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
