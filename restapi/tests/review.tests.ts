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


describe("reviews", () => {


    /**
     * Puedo crear una review
     */
    it("Puedo crear una review ", async () => {
        const response: Response = await request(app).post("/review/addReview").send({
            score: 7,
            comment: "Pretty nice but a little bit expensive",
            authorEmail: "email@prueba.es",
            productCode: "RA01",
          });
        expect(response.statusCode).toBe(200);
      });
  
    /**
     * Obtengo la review que acabo de añadir
     */
    it("Obtengo la review que acabo de añadir", async () => {
      const response: Response = await request(app).get(
        "/reviews/getByEmailAndCode/email@prueba.es/RA01"
      );
      expect(response.statusCode).toBe(200);
      expect(response.type).toEqual("application/json");
    });

     
    
    /**
     * Consigo todas las reviews de un producto
     */
    it("Consigo todas las reviews de un producto", async () => {
      const response: Response = await request(app).get(
        "/reviews/getByCode/RA011"
      );
      expect(response.statusCode).toBe(200);
      expect(response.type).toEqual("application/json");
    });

    /**
     * Busco las reviews de un producto asociado a un usuario que NO existe
     */
    it("Busco las reviews de un producto asociado a un usuario que NO existe", async () => {
      const response: Response = await request(app).get(
        "/reviews/getByEmailAndCode/fallo/fallo"
      );
      expect(response.statusCode).toBe(412);
    });
    
    /**
     * No puedo crear una review a la que le falte información
     */
    it("No puedo crear una review a la que le falte información", async () => {
      const response: Response = await request(app).post("/review/addReview").send({
            score: 7,
            comment: "Pretty nice but a little bit expensive",
            authorEmail: "email@prueba.es",
        });
        expect(response.statusCode).toBe(412);
        expect(response.body.message).toBe("Can't register that review, is not valid");
    });


    /**
     * Borro la review que he creado antes
     */
    it("Borro la review que he creado antes", async () => {
      const response: Response = await request(app).get(
        "/reviews/deleteByEmailAndCode/email@prueba.es/RA01"
      );
      expect(response.statusCode).toBe(200);
    });


    /**
     * Intento borrar una review no existente
     */
    it("Intento borrar una review no existente", async () => {
      const response: Response = await request(app).get(
        "/reviews/deleteByEmailAndCode/fallo/fallo"
      );
      expect(response.statusCode).toBe(412);
    });    
});
  
  