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




/******* PEDIDOS *******/ 

describe("orders ", () => {
    /**
     * Consigo un pedido
     */
    it("Puedo conseguir un pedido", async () => {
      const response: Response = await request(app).get(
        "/order/getByCode/orderTwoExample"
      );
      console.log(response)
      expect(response.statusCode).toBe(200);
    });
  
    /**
     * No puedo conseguir un pedido no existente
     */
    it("No puedo conseguir un pedido no existente", async () => {
      const response: Response = await request(app).get(
        "/order/getByCode/orderDoesNotExists"
      );
      expect(response.statusCode).toBe(204);
    });
  
  
    /**
     * Consigo un pedido pasando un email
     */
    it("Puedo conseguir un pedido pasando un email", async () => {
      const response: Response = await request(app).get(
        "/order/getByEmail/admin@uniovi.es"
      );
     expect(response.statusCode).toBe(200);
    });
    
    /**
      * No puedo conseguir un pedido no existente pasando el email
    */
    it("No puedo conseguir un pedido no existente", async () => {
      const response: Response = await request(app).get(
        "/order/getByEmail/emailNotExists"
      );
      expect(response.statusCode).toBe(204);
    });
  
    /**
     * Consigo todos los pedidos del usuario
    */
    it("Puedo conseguir todos los pedidos del usuario pasando un email", async () => {
      const response: Response = await request(app).get(
        "/order/getAllByEmail/admin@uniovi.es"
     );
      expect(response.statusCode).toBe(200);
    });
      
    
    /**
     * Puedo listar a todos los pedidos
     */
     it("Puedo listar a todos los pedidos", async () => {
      const response: Response = await request(app).get(
        "/order/list"
      );
      expect(response.statusCode).toBe(200);
      expect(response.type).toEqual("application/json");
    });
  
  });