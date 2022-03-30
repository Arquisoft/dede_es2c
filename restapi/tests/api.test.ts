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


beforeAll(async () => {

  const metricsMiddleware: RequestHandler = promBundle({ includeMethod: true });
  app.use(metricsMiddleware);

  app.use(cors());
  app.use(bp.json());

  app.use(bp.urlencoded({ extended: false }));
  
  app.use(apiUser);
  app.use(apiProduct);
  app.use(apiOrders);
  app.listen(5000);

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
    // Cuidado con lo que se ponga aquí, que puede afectar a la BD
 
});


/******* USUARIOS *******/ 

describe("user ", () => {
  /**
   * Consigo un usuario
   */
  it("Puedo conseguir un usuario", async () => {
    const response: Response = await request(app).get(
      "/user/list/user@uniovi.es"
    );
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: "USer",
        surname: "USer",
        email: "user@uniovi.es",
      })
    );
  });

  /**
   * No puedo conseguir un usuario no existente
   */
  it("No puedo conseguir un usuario no existente", async () => {
    const response: Response = await request(app).get(
      "/user/list/something"
    );
    expect(response.statusCode).toBe(204);
  });

  /**
   * Puedo listar a todos los usuarios
   */
   it("Puedo listar a todos los usuarios", async () => {
    const response: Response = await request(app).get(
      "/user/list"
    );
    expect(response.statusCode).toBe(200);
  });
});


/******* PRODUCTOS *******/ 

describe("products ", () => {
  /**
   * Consigo un producto
   */
  it("Puedo conseguir un producto", async () => {
    const response: Response = await request(app).get(
      "/product/getByCode/codeExample"
    );
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        codigo: "codeExample",
        categoria: "categoryExample",
        precio: 10,
        stock: 3,
        descripcion: "descriptionExample",
        url: "urlExample",
      })
    );
  });

  /**
   * No puedo conseguir un producto no existente
   */
  it("No puedo conseguir un producto no existente", async () => {
    const response: Response = await request(app).get(
      "/product/getByCode/productDoesNotExists"
    );
    expect(response.statusCode).toBe(204);
  });

  /**
   * Puedo listar a todos los productos
   */
   it("Puedo listar a todos los productos", async () => {
    const response: Response = await request(app).get(
      "/product/list"
    );
    expect(response.statusCode).toBe(200);
    expect(response.type).toEqual("application/json");
  });
});