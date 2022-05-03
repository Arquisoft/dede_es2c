import request, { Response } from "supertest";
import express, { Application, RequestHandler } from "express";
import bp from "body-parser";
import { Server } from "http";
import promBundle from "express-prom-bundle";
import apiCarts from "../src/routes/CartRoutes";

var server: Server;

const app: Application = express();

const mongoose = require("mongoose");


beforeAll(async () => {

  server = app.listen(5000);

  const metricsMiddleware: RequestHandler = promBundle({ includeMethod: true });
  app.use(metricsMiddleware);
  app.use(bp.json());
  app.use(bp.urlencoded({ extended: false }));

  app.use(apiCarts);

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





/******* CARRITO *******/ 

describe("carts ", () => {


    // Si hago esto me va a fallar porque no hay un método para "deshacer" el carro
  

     /** 
     it("Creo un nuevo carro vacío", async () => {
      const response: Response = await request(app).post("/cart/add").send({
         client_id:"62436970ce933f737bdebb2a",
      });
      
      expect(response.statusCode).toBe(201);
    });
    **/


    
    /**
     * Intento crear un carro de un usuario existente
     */
    it("Intento crear un carro de un usuario existente", async () => {
        const response: Response = await request(app).post("/cart/add").send({
           client_id:"624364bdb14f7ce93ddae736",
        });
        
        expect(response.statusCode).toBe(400);
    });

    /**
     * Intento crear un carro de un usuario no existente
     */
     it("Intento crear un carro de un usuario no existente", async () => {
        const response: Response = await request(app).post("/cart/add").send({
           client_id:"624364bdb14f7ce93ddae733",
        });
        
        expect(response.statusCode).toBe(404);
    });

    /**
     * Intento crear un carro sin pasar información
     */
      it("Intento crear un carro sin pasar información", async () => {
       const response: Response = await request(app).post("/cart/add").send({
      });
        
      expect(response.statusCode).toBe(404);
    });
  


    /**
     * Añado un producto al carro
     */
     it("Añado un producto al carro ", async () => {
      const response: Response = await request(app).put("/cart/addProduct").send({
        client_id:"624364bdb14f7ce93ddae736",
        product:
            {
              codigo: "MO01",
              categoria: "monitor",
              nombre: "Samsung LF27T352FHRXEN",
              precio: 139.99,
              descripcion: "Monitor Plano de 27'', Full HD (1080p, Panel IPS), Freesync, HDMI, Gaming, Negro",
              stock:2,
              url: "https://i.postimg.cc/sgWvqkB6/MO01.jpg"
            }
      });
      expect(response.statusCode).toBe(200);
    });


    /**
     * Añado el mismo producto al carro
     */
     it("Añado el mismo producto al carro ", async () => {
      const response: Response = await request(app).put("/cart/addProduct").send({
        client_id:"624364bdb14f7ce93ddae736",
        product:
            {
              codigo: "MO01",
              categoria: "monitor",
              nombre: "Samsung LF27T352FHRXEN",
              precio: 139.99,
              descripcion: "Monitor Plano de 27'', Full HD (1080p, Panel IPS), Freesync, HDMI, Gaming, Negro",
              stock:2,
              url: "https://i.postimg.cc/sgWvqkB6/MO01.jpg"
            }
      });
      expect(response.statusCode).toBe(200);
    });


    /**
     * Intento añadir un producto pasando mal el usuario
     */
     it("Intento añadir un producto pasando mal el usuario ", async () => {
        const response: Response = await request(app).put("/cart/addProduct").send({
          client_id:"fallo",
          product:
            {
                codigo: "MO01",
                categoria: "monitor",
                nombre: "Samsung LF27T352FHRXEN",
                precio: 139.99,
                descripcion: "Monitor Plano de 27'', Full HD (1080p, Panel IPS), Freesync, HDMI, Gaming, Negro",
                stock:2,
                url: "https://i.postimg.cc/sgWvqkB6/MO01.jpg"
            }
        });
        expect(response.statusCode).toBe(400);
      });

    /**
     * Añado otro producto distinto más al carro
     */
     it("Añado otro producto distinto más al carro ", async () => {
        const response: Response = await request(app).put("/cart/addProduct").send({
          client_id:"624364bdb14f7ce93ddae736",
          product:
            {
            codigo: "SO01",
            categoria: "sonido",
            nombre: "Hama Sonic LS-206 6W",
            precio: 9.87,
            descripcion: "Negro, Plata Altavoz - Altavoces (2.0 Canales, 6 W, 50-20000 Hz, 4 Ω, Negro, Plata) ",
            stock: 1,
            url: "https://i.postimg.cc/SNJX72mp/AL01.jpg"
            }
        });
        expect(response.statusCode).toBe(200);
      });


    /**
     * Borro el producto del carro
     */
     it("Borro el producto del carro", async () => {
        const response: Response = await request(app).put("/cart/deleteProduct").send({
            client_id:"624364bdb14f7ce93ddae736",
            product:
                {
                  codigo: "MO01",
                  categoria: "monitor",
                  nombre: "Samsung LF27T352FHRXEN",
                  precio: 139.99,
                  descripcion: "Monitor Plano de 27'', Full HD (1080p, Panel IPS), Freesync, HDMI, Gaming, Negro",
                  stock:2,
                  url: "https://i.postimg.cc/sgWvqkB6/MO01.jpg"
                },
          });
          expect(response.statusCode).toBe(200);
    });  


    /**
     * Borro otra vez el producto repetido del carro
     */
     it("Borro otra vez el producto repetido del carro", async () => {
      const response: Response = await request(app).put("/cart/deleteProduct").send({
          client_id:"624364bdb14f7ce93ddae736",
          product:
              {
                codigo: "MO01",
                categoria: "monitor",
                nombre: "Samsung LF27T352FHRXEN",
                precio: 139.99,
                descripcion: "Monitor Plano de 27'', Full HD (1080p, Panel IPS), Freesync, HDMI, Gaming, Negro",
                stock:2,
                url: "https://i.postimg.cc/sgWvqkB6/MO01.jpg"
              },
        });
        expect(response.statusCode).toBe(200);
  });  


    /**
     * Intento borrar pasando mal el usuario
     */
    it("Borro el producto del carro", async () => {
        const response: Response = await request(app).put("/cart/deleteProduct").send({
            client_id:"fallo",
            product:
                {
                  codigo: "MO01",
                  categoria: "monitor",
                  nombre: "Samsung LF27T352FHRXEN",
                  precio: 139.99,
                  descripcion: "Monitor Plano de 27'', Full HD (1080p, Panel IPS), Freesync, HDMI, Gaming, Negro",
                  stock:2,
                  url: "https://i.postimg.cc/sgWvqkB6/MO01.jpg"
                },
           });
          expect(response.statusCode).toBe(400);
    }); 


    /**
     * Borro el otro producto del carro
     */
         it("Borro el otro producto del carro", async () => {
            const response: Response = await request(app).put("/cart/deleteProduct").send({
                client_id:"624364bdb14f7ce93ddae736",
                product:
                    {
                    codigo: "SO01",
                    categoria: "sonido",
                    nombre: "Hama Sonic LS-206 6W",
                    precio: 9.87,
                    descripcion: "Negro, Plata Altavoz - Altavoces (2.0 Canales, 6 W, 50-20000 Hz, 4 Ω, Negro, Plata) ",
                    stock: 1,
                    url: "https://i.postimg.cc/SNJX72mp/AL01.jpg"
                    }
              });
              expect(response.statusCode).toBe(200);
    });
    
    
    /**
     * Intento borrar un producto vacio
     */
     it("Intento borrar un carro vacío", async () => {
      const response: Response = await request(app).put("/cart/deleteProduct").send({
          client_id:"624364bdb14f7ce93ddae736",
          product:
              {
              }
        });
        expect(response.statusCode).toBe(200);
}); 


    /**
     * Busco el carro de un cliente
     */
    it("Puedo conseguir un pedido", async () => {
      const response: Response = await request(app).get(
        "/cart/find/624364bdb14f7ce93ddae736"
      );
      expect(response.statusCode).toBe(200);
    });

    /**
     * No encuentro el carro de un cliente no existente
     */
    it("No encuentro el carro de un cliente no existente", async () => {
        const response: Response = await request(app).get(
         "/cart/find/624364bdb14f7ce93ddae733"
        );
        expect(response.statusCode).toBe(404);
    });


  });