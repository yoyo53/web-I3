const { prismaMock } = require("../db.connection.mock");
const userQueries = require("../../../../database/queries/user.queries");

describe("Check exists user", () => {
  it("should return true if user exists", async () => {
    prismaMock.users.count.mockResolvedValue(1);
    const response = await userQueries.checkExistsUser("test@mail.com");
    expect(response).toBe(true);
  });

  it("should return false if user does not exist", async () => {
    prismaMock.users.count.mockResolvedValue(0);
    const response = await userQueries.checkExistsUser("test@mail.com");
    expect(response).toBe(false);
  });

  it("should return false if an error occurs", async () => {
    prismaMock.users.count.mockRejectedValue(new Error());
    const response = await userQueries.checkExistsUser("test@mail.com");
    expect(response).toBe(false);
  });
});

describe("Get user by email with password", () => {
  it("should return user with password if user exists", async () => {
    const user = {
      userID: 1,
      firstname: "John",
      lastname: "Doe",
      email: "test@mail.com",
      hashed_password: "password",
    };
    prismaMock.users.findUnique.mockResolvedValue(user);
    const response = await userQueries.getUserByEmailwithPassword(
      "test@mail.com"
    );
    expect(response).toEqual(user);
  });

  it("should return null if user does not exist", async () => {
    prismaMock.users.findUnique.mockResolvedValue(null);
    const response = await userQueries.getUserByEmailwithPassword(
      "test@mail.com"
    );
    expect(response).toBeNull();
  });

  it("should return null if an error occurs", async () => {
    prismaMock.users.findUnique.mockRejectedValue(new Error());
    const response = await userQueries.getUserByEmailwithPassword(
      "test@mail.com"
    );
    expect(response).toBeNull();
  });
});

describe("Get user by email", () => {
  it("should return user if user exists", async () => {
    const user = {
      userID: 1,
      firstname: "John",
      lastname: "Doe",
      email: "test@mail.com",
    };
    prismaMock.users.findUnique.mockResolvedValue(user);
    const response = await userQueries.getUserByEmail("test@mail.com");
    expect(response).toEqual(user);
  });

  it("should return null if user does not exist", async () => {
    prismaMock.users.findUnique.mockResolvedValue(null);
    const response = await userQueries.getUserByEmail("test@mail.com");
    expect(response).toBeNull();
  });

  it("should return null if an error occurs", async () => {
    prismaMock.users.findUnique.mockRejectedValue(new Error());
    const response = await userQueries.getUserByEmail("test@mail.com");
    expect(response).toBeNull();
  });
});

describe("Get user by id", () => {
  it("should return user if user exists", async () => {
    const user = {
      userID: 1,
      firstname: "John",
      lastname: "Doe",
      email: "test@mail.com",
    };
    prismaMock.users.findUnique.mockResolvedValue(user);
    const response = await userQueries.getUserById(1);
    expect(response).toEqual(user);
  });

  it("should return null if user does not exist", async () => {
    prismaMock.users.findUnique.mockResolvedValue(null);
    const response = await userQueries.getUserById(1);
    expect(response).toBeNull();
  });

  it("should return null if an error occurs", async () => {
    prismaMock.users.findUnique.mockRejectedValue(new Error());
    const response = await userQueries.getUserById(1);
    expect(response).toBeNull();
  });
});

describe("Create user", () => {
  it("should create user and return userID if user does not exist", async () => {
    const user = {
      userID: 1,
    };

    prismaMock.users.create.mockResolvedValue(user);
    const response = await userQueries.createUser(
      "John",
      "Doe",
      "test@mail.com",
      "password"
    );
    expect(response).toEqual(user.userID);
  });

  it("should return null if user does exist", async () => {
    prismaMock.users.create.mockResolvedValue(null);
    const response = await userQueries.createUser(
      "John",
      "Doe",
      "test@mail.com",
      "password"
    );
    expect(response).toBeNull();
  });

  it("should return null if an error occurs", async () => {
    prismaMock.users.create.mockRejectedValue(new Error());
    const response = await userQueries.createUser(
      "John",
      "Doe",
      "test@mail.com",
      "password"
    );
    expect(response).toBeNull();
  });
});

describe("Update user", () => {
  it("should update user and return userID if user exists", async () => {
    const user = {
      userID: 1,
    };

    prismaMock.users.update.mockResolvedValue(user);
    const response = await userQueries.updateUser(user.userID, {
      firstname: "John",
      lastname: "Doe",
      email: "test@mail.com",
      hashed_password: "password",
    });
    expect(response).toEqual(user.userID);
  });

  it("should return null if user does not exist", async () => {
    const user = {
      userID: 1,
    };

    prismaMock.users.update.mockResolvedValue(null);
    const response = await userQueries.updateUser(user.userID, {
      firstname: "John",
      lastname: "Doe",
      email: "test@mail.com",
      hashed_password: "password",
    });
    expect(response).toBeNull();
  });

  it("should return null if an error occurs", async () => {
    const user = {
      userID: 1,
    };

    prismaMock.users.update.mockRejectedValue(new Error());
    const response = await userQueries.updateUser(user.userID, {
      firstname: "John",
      lastname: "Doe",
      email: "test@mail.com",
      hashed_password: "password",
    });
    expect(response).toBeNull();
  });
});

describe("Update password", () => {
  it("should update password and return userID if user exists", async () => {
    const user = {
      userID: 1,
    };

    prismaMock.users.update.mockResolvedValue(user);
    const response = await userQueries.updatePassword(user.userID, "password");
    expect(response).toEqual(user.userID);
  });

  it("should return null if user does not exist", async () => {
    const user = {
      userID: 1,
    };

    prismaMock.users.update.mockResolvedValue(null);
    const response = await userQueries.updatePassword(user.userID, "password");
    expect(response).toBeNull();
  });

  it("should return null if an error occurs", async () => {
    const user = {
      userID: 1,
    };

    prismaMock.users.update.mockRejectedValue(new Error());
    const response = await userQueries.updatePassword(user.userID, "password");
    expect(response).toBeNull();
  });
});

describe("Delete user", () => {
  it("should delete user and return userID if user exists", async () => {
    const user = {
      userID: 1,
    };

    prismaMock.users.delete.mockResolvedValue(user);
    const response = await userQueries.deleteUser(user.userID);
    expect(response).toEqual(user.userID);
  });

  it("should return null if user does not exist", async () => {
    const user = {
      userID: 1,
    };

    prismaMock.users.delete.mockResolvedValue(null);
    const response = await userQueries.deleteUser(user.userID);
    expect(response).toBeNull();
  });

  it("should return null if an error occurs", async () => {
    const user = {
      userID: 1,
    };

    prismaMock.users.delete.mockRejectedValue(new Error());
    const response = await userQueries.deleteUser(user.userID);
    expect(response).toBeNull();
  });
});
