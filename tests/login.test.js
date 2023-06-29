require("dotenv").config();
const app = require("../app");
const testRequest = require("supertest");
const mongoose = require("mongoose");
const { DB_HOST } = process.env;

describe("signup", () => {
  beforeAll(async () => {
    await mongoose
      .connect(DB_HOST)
      .then(() => console.log("DB Connected"))
      .catch((error) => {
        console.log(error.message);
      });
  });

  test("should return status code", async () => {
    const response = await testRequest(app).post("/users/login").send({
      email: "test@test.com",
      password: "123456",
    });
    expect(response.statusCode).toBe(200);
  });

  test("should return token is exist", async () => {
    const response = await testRequest(app).post("/users/login").send({
      email: "test@test.com",
      password: "123456",
    });
    expect(response._body.token).toBeTruthy();
  });

  test("email and subscription should be string", async () => {
    const response = await testRequest(app).post("/users/login").send({
      email: "test@test.com",
      password: "123456",
    });
    expect(typeof response._body.user.email).toBe("string");
    expect(typeof response._body.user.subscription).toBe("string");
  });

  test("should return error with wrong password", async () => {
    const response = await testRequest(app).post("/users/login").send({
      email: "test@test.com",
      password: "1234567",
    });
    expect(response.statusCode).toBe(401);
    expect(response._body.message).toBe("Email or password is wrong");
  });

  test("should return error with wrong email", async () => {
    const response = await testRequest(app).post("/users/login").send({
      email: "test1@test.com",
      password: "123456",
    });
    expect(response.statusCode).toBe(401);
    expect(response._body.message).toBe("Email or password is wrong");
  });

  afterAll(async () => {
    await mongoose
      .disconnect(DB_HOST)
      .then(() => console.log("DB Disonnected"))
      .catch((error) => {
        console.log(error.message);
      });
  });
});
