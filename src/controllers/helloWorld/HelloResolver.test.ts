const query = `
    query Hello {
        helloWorld
      }
    `;

describe("Hello World Test", () => {
  it("query is available", async () => {
    const response: any = await apolloClient?.executeOperation({
      query,
    });

    expect(response).toBeTruthy();
  });

  it("query has correct response", async () => {
    const response: any = await apolloClient?.executeOperation({
      query,
    });

    expect(response?.body?.singleResult?.data?.helloWorld).toBe("Hello World!");
  });
});
