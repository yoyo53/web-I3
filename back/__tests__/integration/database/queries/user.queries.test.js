const { prisma } = require("../../../../database/db.connection");
const userQueries = require("../../../../database/queries/user.queries");

const user1 = {
  userID: -1,
  firstname: "User",
  lastname: "Test1",
  email: "user.test1@mail.com",
  hashed_password: "password1",
};

const user2 = {
  firstname: "User",
  lastname: "Test2",
  email: "user.test2@mail.com",
  hashed_password: "password2",
};

beforeEach(async () => {
  await prisma.users.create({ data: user1 });
});

afterEach(async () => {
  await prisma.users.delete({ where: { email: user1.email } }).catch(() => {});
  await prisma.users.delete({ where: { email: user2.email } }).catch(() => {});
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Check exists user", () => {
  it("should return true if user exists", async () => {
    const response = await userQueries.checkExistsUser(user1.email);
    expect(response).toBe(true);
  });

  it("should return false if user does not exist", async () => {
    const response = await userQueries.checkExistsUser("");
    expect(response).toBe(false);
  });
});

describe("Get user by email with password", () => {
  it("should return user with password if user exists", async () => {
    const response = await userQueries.getUserByEmailwithPassword(user1.email);
    expect(response).toEqual({
      userID: user1.userID,
      firstname: user1.firstname,
      lastname: user1.lastname,
      email: user1.email,
      hashed_password: user1.hashed_password,
    });
  });

  it("should return null if user does not exist", async () => {
    const response = await userQueries.getUserByEmailwithPassword("");
    expect(response).toBeNull();
  });
});

describe("Get user by email", () => {
  it("should return user if user exists", async () => {
    const response = await userQueries.getUserByEmail(user1.email);
    expect(response).toEqual({
      userID: user1.userID,
      firstname: user1.firstname,
      lastname: user1.lastname,
      email: user1.email,
    });
  });

  it("should return null if user does not exist", async () => {
    const response = await userQueries.getUserByEmail("");
    expect(response).toBeNull();
  });
});

describe("Get user by id", () => {
  it("should return user if user exists", async () => {
    const response = await userQueries.getUserById(user1.userID);
    expect(response).toEqual({
      userID: user1.userID,
      firstname: user1.firstname,
      lastname: user1.lastname,
      email: user1.email,
    });
  });

  it("should return null if user does not exist", async () => {
    const response = await userQueries.getUserById(0);
    expect(response).toBeNull();
  });
});

describe("Create user", () => {
  it("should create user and return userID if user does not exist", async () => {
    const response = await userQueries.createUser(
      user2.firstname,
      user2.lastname,
      user2.email,
      user2.hashed_password
    );
    expect(response).toEqual(expect.any(Number));
  });

  it("should return null if user does exist", async () => {
    const response = await userQueries.createUser(
      user1.firstname,
      user1.lastname,
      user1.email,
      user1.hashed_password
    );
    expect(response).toBeNull();
  });
});

describe("Update user", () => {
  it("should update user and return userID if user exists", async () => {
    const response = await userQueries.updateUser(user1.userID, user2);
    expect(response).toEqual(user1.userID);
  });

  it("should return null if user does not exist", async () => {
    const response = await userQueries.updateUser(0, user2);
    expect(response).toBeNull();
  });
});

describe("Update password", () => {
  it("should update password and return userID if user exists", async () => {
    const response = await userQueries.updatePassword(
      user1.userID,
      user2.hashed_password
    );
    expect(response).toEqual(user1.userID);
  });

  it("should return null if user does not exist", async () => {
    const response = await userQueries.updatePassword(0, user2.hashed_password);
    expect(response).toBeNull();
  });
});

describe("Delete user", () => {
  it("should delete user and return userID if user exists", async () => {
    const response = await userQueries.deleteUser(user1.userID);
    expect(response).toEqual(user1.userID);
  });

  it("should return null if user does not exist", async () => {
    const response = await userQueries.deleteUser(0);
    expect(response).toBeNull();
  });
});
