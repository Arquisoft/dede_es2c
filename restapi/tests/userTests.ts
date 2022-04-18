import request, { Response } from "supertest";
import express, { Application, RequestHandler } from "express";
import cors from "cors";
import bp from "body-parser";
import { Server } from "http";
import promBundle from "express-prom-bundle";
import apiUser from "../src/routes/UserRoutes";
import apiProduct from "../src/routes/ProductRoutes";
import apiOrders from "../src/routes/OrderRoutes";

var server: Server;

const app: Application = express();

const mongoose = require("mongoose");


beforeAll(async () => {

  server = app.listen(5000);

  app.use(cors());
  const metricsMiddleware: RequestHandler = promBundle({ includeMethod: true });
  app.use(metricsMiddleware);
  app.use(bp.json());
  app.use(bp.urlencoded({ extended: false }));

  app.use(apiUser);
  app.use(apiProduct);
  app.use(apiOrders);

  await mongoose.connect('mongodb+srv://admin:es2c@cluster0.tx3d4.mongodb.net/TestDataBase?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

// CONEXIÓN A LA BD

afterAll(async () => {
    server.close();
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
      "/user/list/user3@uniovi.es"
    );
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: "Usuario 3",
        surname: "Usuario3",
        email: "user3@uniovi.es",
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


  /**
    * Creo un usuario de forma correcta
    */
  it("Creo un usuario de forma correcta", async () => {
    const response: Response = await request(app).post("/user/signup").send({
      name: "prueba",
      surname: "prueba",
      email: "usuarioPrueba@gmail.com",
      password: "prueba",
      repPassword: "prueba",
      role: "user",
    });
    expect(response.statusCode).toBe(201);
  });

  /**
   * Borro el usuario que acabo de crear por el email
   */
   it("Borro el usuario que acabo de crear por el email", async () => {
    const response: Response = await request(app).get(
      "/user/deleteByEmail/usuarioPrueba@gmail.com"
      );
    expect(response.statusCode).toBe(200);
  });

   /**
   * Intento borrar un usuario con un ID que no existe
   */
  it("Intento borrar un usuario con un ID que no existe", async () => {
    const response: Response = await request(app).post("/user/delete").send({
      id: "IDFALSO"
    });
    expect(response.statusCode).toBe(404);
  });
  
  // LOGIN

  /**
    * Hago login de forma correcta
    */
   it("Hago login de forma correcta", async () => {
    const response: Response = await request(app).post("/user/login").send({
      email: "user@uniovi.es",
      password: "user123",
    });
    expect(response.statusCode).toBe(200);
  });


  /**
    * Encuentro el POD de un usuario de forma correcta
    */
   it("Encuentro el POD de un usuario de forma correcta", async () => {
    const response: Response = await request(app).get(
      "/user/pod/uo278290"
    );

    expect(response.statusCode).toBe(200);
  }); 

  /**
    * Fallo al encontrar el POD
    */
   it("No encuentro el POD de un usuario", async () => {
    const response: Response = await request(app).get(
      "/user/pod/noExiste"
    );
    expect(response.statusCode).toBe(404);
  }); 

  /**
   * Intento actualizar un usuario no existente
   */
  it("Intento actualizar un usuario no existente", async () => {
  const response: Response = await request(app).post("/user/delete").send({
    id: "IDFALSO"
  });
  expect(response.statusCode).toBe(404);
  });
});