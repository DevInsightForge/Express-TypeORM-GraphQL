import { testDataSource } from "../../../configs/database";

const query = `
  mutation Mutation($input: RegisterInput!) {
    register(input: $input) {
      email
      id
    }
  }
  `;

const variables = {
  input: {
    email: "user@test.com",
    password: "TestUser$123",
  },
};

describe("User Register Test", () => {
  beforeAll(async () => {
    await testDataSource.initialize();
  });

  afterAll(async () => {
    await testDataSource.destroy();
  });

  it("mutation has returned with a new user id", async () => {
    const response: any = await apolloClient.executeOperation({
      query,
      variables,
    });

    expect(response).toBeTruthy();
    expect(response?.body?.singleResult?.data?.register?.id).toBeTruthy();
    expect(response?.body?.singleResult?.data?.register?.email).toBe(
      variables.input.email
    );
  });

  it("mutation will fail with user exist constrain", async () => {
    const response: any = await apolloClient.executeOperation({
      query,
      variables,
    });

    expect(response).toBeTruthy();
    expect(response?.body?.singleResult?.errors).toBeTruthy();
    expect(response?.body?.singleResult?.data).toBeFalsy();
  });
});
