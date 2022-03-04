const request = require("supertest");
const app = require("../index.js");

test("should register the user", async () => {
  await request(app)
    .post("/api/v1/register")
    .send({
      fullName: "low kush",
      userName: "low2340",
      email: "lowkush08@gmail.com",
      password: "qwerty1234",
    })
    .expect(200);
});

test("should login the user", async () => {
  await request(app)
    .post("/api/v1/login")
    .send({
      email: "lowkush07@gmail.com",
      password: "qwerty1234",
    })
    .expect(200);
});
