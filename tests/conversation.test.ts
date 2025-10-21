import { connect, set } from "mongoose";
import request from "supertest";
import server from "../src/server";

let db: any ;

beforeAll(async () => {
  set("strictQuery", true);
  db = await connect(process.env.DATABASE_URL!);
});

describe("User Auth", () => {
  test("", async () => {
    const response = await request(server)
    .post("/api/v1/auth/signup")
    .send({
        name: "",
        email: "",
        password: "",
      });

    console.log(response.body)
    expect(response.status).toBe(400);
  });

  test("", () => {

  });
});

afterAll(async () => {
  await db.disconnect();
});
