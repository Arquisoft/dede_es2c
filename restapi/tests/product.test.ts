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



/******* PRODUCTOS *******/ 

describe("products ", () => {

    /**
     * Consigo un producto buscando por código
     */
    it("Puedo conseguir un producto buscando por código", async () => {
      const response: Response = await request(app).get(
        "/product/getByCode/MO01"
      );
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          codigo: "MO01",
          categoria: "monitor",
          nombre: "Samsung LF27T352FHRXEN",
          precio: 139.99,
          stock: 20,
          descripcion: "Monitor Plano de 27'', Full HD (1080p, Panel IPS), Freesync, HDMI, Gaming, Negro",
          url: "https://i.postimg.cc/sgWvqkB6/MO01.jpg",
        })
      );
    });
  
    /**
     * No puedo conseguir un producto no existente buscando por código
     */
    it("No puedo conseguir un producto no existente buscando por código", async () => {
      const response: Response = await request(app).get(
        "/product/getByCode/productDoesNotExists"
      );
      expect(response.statusCode).toBe(412);
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
  
  
    /**
     * Busco un producto por una categoría 
     */
     it("Consigo un producto buscando por categoria", async () => {
      const response: Response = await request(app).get(
      "/product/getByCategoria/teclado"
      );
      expect(response.statusCode).toBe(200);
    });
  
    
    /**
     * Busco un producto por un precio que exista
     */
     it("Busco un producto por un precio que exista", async () => {
      const response: Response = await request(app).get(
      "/product/getByPrecio/15.99"
      );
      expect(response.statusCode).toBe(200);
    });  
  

  
    /**
     * Busco un producto por un precio inexistente
     */
    it("Busco un producto por un precio inexistente", async () => {
      const response: Response = await request(app).get(
      "/product/getByPrecio/0.00"
      );
      expect(response.statusCode).toBe(412);
    });  
  
  
    /**
     * Creo un producto
     */
    it("Puedo crear un producto correctamente", async () => {
      const response: Response = await request(app).post("/product/addPost").send({
        codigo: "codigoPrueba",
        categoria: "categoriaPrueba",
        nombre: "productoPrueba",
        precio: 10,
        stock: 10,
        descripcion: "producto de prueba",
        url: "url de prueba",
      });
      expect(response.statusCode).toBe(201);
      expect(response.body.prod.nombre).toBe("productoPrueba");
    });
  
  
    /**
      * Intento crear el mismo producto
      */
    it("No puedo crear un producto con el mismo código", async () => {
      const response: Response = await request(app).post("/product/addPost").send({
        codigo: "codigoPrueba",
        categoria: "categoriaPrueba",
        nombre: "productoPrueba",
        precio: 10,
        stock: 10,
        descripcion: "producto de prueba",
        url: "url de prueba",
      });
      expect(response.statusCode).toBe(409);
    });
  
    /**
     * Intento crear el producto sin que tenga todos los campos
     */
    it("Intento crear el producto sin que tenga todos los campos", async () => {
      const response: Response = await request(app).post("/product/addPost").send({
        precio: 10,
        stock: 10,
        descripcion: "productoIncompleto",
        url: "urlIncompleta",
      });
      expect(response.statusCode).toBe(412);
    });
  
    /**
      * Actualizo el producto que acabo de añadir
      */
    it("Actualizo el producto que acabo de añadir", async () => {
      const response: Response = await request(app).get(
      "/product/update/codigoPrueba/?nombre=nombreCambiado"
      );
      expect(response.statusCode).toBe(200);
    });
  
    /**
      * Borro el producto que acabo de añadir
      */
     it("Borro el producto que acabo de añadir", async () => {
      const response: Response = await request(app).get(
      "/product/delete/codigoPrueba"
      );
      expect(response.statusCode).toBe(200);
    });


    /**
      * Intento borrar un producto inexistente
      */
     it("Intento borrar un producto inexistente", async () => {
        const response: Response = await request(app).get(
        "/product/delete/fallo"
        );
        expect(response.statusCode).toBe(412);
      });
  
    /**
     * Creo el producto de ejemplo
     */
   it("Creo el producto de ejemplo", async () => {
    const response: Response = await request(app).get(
      "/product/generateExample"
      );
    expect(response.statusCode).toBe(201);
    });  
  
    /**
      * Borro el producto de ejemplo
      */
   it("Borro el producto de ejemplo", async () => {
    const response: Response = await request(app).get(
    "/product/delete/codeExample"
      );
    expect(response.statusCode).toBe(200);
    });  
  });