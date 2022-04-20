import request, { Response } from "supertest";
import express, { Application, RequestHandler } from "express";
import cors from "cors";
import bp from "body-parser";
import { Server } from "http";
import promBundle from "express-prom-bundle";
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
     * Creo un nuevo pedido 
     */
     it("Puedo crear un nuevo pedido correctamente", async () => {
      const response: Response = await request(app).post("/order/addOrder").send({
        codigo: "orderPrueba",
        correo:  "correoPrueba",
        direccion: "dirPrueba",
        fecha: new Date(),
        precioTotal: 149.86,
        products: [
          {
            codigo: "MO01",
            categoria: "monitor",
            nombre: "Samsung LF27T352FHRXEN",
            precio: 139.99,
            descripcion: "Monitor Plano de 27'', Full HD (1080p, Panel IPS), Freesync, HDMI, Gaming, Negro",
            stock:2,
            url: "https://i.postimg.cc/sgWvqkB6/MO01.jpg"
          },

          {
            codigo: "SO01",
            categoria: "sonido",
            nombre: "Hama Sonic LS-206 6W",
            precio: 9.87,
            descripcion: "Negro, Plata Altavoz - Altavoces (2.0 Canales, 6 W, 50-20000 Hz, 4 Ω, Negro, Plata) ",
            stock: 1,
            url: "https://i.postimg.cc/SNJX72mp/AL01.jpg"
          }
        ]
      });
      expect(response.statusCode).toBe(200);
    });

    /**
     * No puedo crear un pedido al que le falten campos 
     */
     it("No puedo crear un pedido al que le falten campos ", async () => {
      const response: Response = await request(app).post("/order/addOrder").send({
        codigo: "orderNegativa",
        correo:  "correoNegativo",
        products: [
          {
            codigo: "MO01",
            categoria: "monitor",
            nombre: "Samsung LF27T352FHRXEN",
            precio: 139.99,
            descripcion: "Monitor Plano de 27'', Full HD (1080p, Panel IPS), Freesync, HDMI, Gaming, Negro",
            stock:2,
            url: "https://i.postimg.cc/sgWvqkB6/MO01.jpg"
          }
        ]
      });
      expect(response.statusCode).toBe(412);
    });


    /**
     * Borro el pedido que acabo de crear
     */
     it("Borro el pedido que acabo de crear", async () => {
      const response: Response = await request(app).get(
      "/order/delete/orderPrueba"
        );
      expect(response.statusCode).toBe(200);
    });  



    /**
     * Consigo un pedido
     */
    it("Puedo conseguir un pedido", async () => {
      const response: Response = await request(app).get(
        "/order/getByCode/orderTwoExample"
      );
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


    /**
     * Creo la orden de ejemplo
     */
     it("Creo la orden de ejemplo", async () => {
      const response: Response = await request(app).get(
        "/order/generateExample"
        );
      expect(response.statusCode).toBe(200);
    });  
  
    /**
      * Borro la orden de ejemplo
      */
     it("Borro la orden de ejemplo", async () => {
      const response: Response = await request(app).get(
      "/order/delete/orderXExample"
        );
      expect(response.statusCode).toBe(200);
    });  
    
  

  });