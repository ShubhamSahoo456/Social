const request = require("supertest");
const User = require("../model/userSchema");
const app = require("../index.js");

beforeEach(async () => {
  await User.deleteOne({ email: "test@gmail.com" });
});

test("should register the user", async () => {
  await request(app)
    .post("/api/v1/register")
    .send({
      fullName: "Test",
      userName: "test2340",
      email: "test@gmail.com",
      password: "qwerty1234",
    })
    .expect(200);
});

test("should login the user", async () => {
  await request(app)
    .post("/api/v1/login")
    .send({
      email: "amit07@gmail.com",
      password: "qwerty1234",
    })
    .expect(200);
});
