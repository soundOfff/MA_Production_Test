import request from "supertest";
import app from "../src/app";

describe("GET /get", () => {
  test("should respond with a 200 status code", async () => {
    const response = await request(app).get("/get").send();
    expect(response.statusCode).toBe(200);
  });
});


describe("POST /post", ()=>{

  test("Should respond with a number", async()=>{

    const number = 6
    const number2 = 12
    const response = await request(app).post("/post").send({
      number: number,
      number2: number2
    })
    console.log(number + number2)
    expect(response.body.sum).toEqual((number + number2));

  })

})