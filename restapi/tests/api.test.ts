import request, { Response } from "supertest";
import express, { Application, RequestHandler } from "express";
import cors from "cors";
import bp from "body-parser";
import promBundle from "express-prom-bundle";
import apiUser from "../src/routes/UserRoutes";
import apiProduct from "../src/routes/ProductRoutes";
import apiOrders from "../src/routes/OrderRoutes";

const path = require("path");

const app: Application = express();

const mongoose = require("mongoose");

const server = app.listen(5000);


beforeAll(async () => {

  const metricsMiddleware: RequestHandler = promBundle({ includeMethod: true });
  app.use(metricsMiddleware);
  app.use(cors());
  app.use(bp.json());
  app.use(bp.urlencoded({ extended: false }));
  app.use(apiUser);
  app.use(apiProduct);
  app.use(apiOrders);

  app.use("/uploads", express.static(path.resolve("uploads")));
  app.set("view engine", "ejs");

  await mongoose.connect('mongodb+srv://admin:es2c@cluster0.tx3d4.mongodb.net/TestDataBase?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});



// CONEXIÓN A LA BD

afterAll(async () => {
    await mongoose.connection.close();
    await server.close();  
});


describe("user ", () => {
  /**
   * Test that we can get a user without error
   */
  it("Can get a user", async () => {
    const response: Response = await request(app).get(
      "/user/list/user@example.com"
    );
    expect(response.statusCode).toBe(200);
  });

  /**
   * Test that we can't get a non existing user
   */
  it("Can't get non existing user", async () => {
    const response: Response = await request(app).get(
      "/user/list/something"
    );
    expect(response.statusCode).toBe(204);
  });

});