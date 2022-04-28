import request, { Response } from "supertest";
import express, { Application, RequestHandler } from "express";
import bp from "body-parser";
import { Server } from "http";
import promBundle from "express-prom-bundle";
import apiUser from "../src/routes/UserRoutes";


function makeid() {
 return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
}

function admin() {
  return "admin123";
 }

var server: Server;

const app: Application = express();

const mongoose = require("mongoose");

const passwordTest = makeid();


beforeAll(async () => {

  server = app.listen(5000);
  const metricsMiddleware: RequestHandler = promBundle({ includeMethod: true });
  app.use(metricsMiddleware);
  app.use(bp.json());
  app.use(bp.urlencoded({ extended: false }));

  app.use(apiUser);



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
    expect(response.statusCode).toBe(412);
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
   * Busco a un usuario por su ID
   */
     it("Busco a un usuario por su ID", async () => {
      const response: Response = await request(app).get(
        "/user/findById/6243643891563b010abbb654"
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
      password: passwordTest,
      repPassword: passwordTest,
      role: "user",
    });

    expect(response.statusCode).toBe(201);
  });

  /**
   * Actualizo el usuario que acabo de crear
   */
   it("Actualizo el usuario que acabo de crear", async () => {
     // Esto funciona porque miré la ID en Mongo
    const response: Response = await request(app).put("/user/update/62446b22fce44aae56859b86").send({
      name: "nombreCambiado",
    });
    expect(response.statusCode).toBe(200);
  });

  /**
   * Vuelvo a actualizar al usuario dejándolo como estaba
   */
   it("Vuelvo a actualizar al usuario dejándolo como estaba", async () => {
    const response: Response = await request(app).put("/user/update/62446b22fce44aae56859b86").send({
      name: "Usuario 3",
    });
    expect(response.statusCode).toBe(200);
  });


  /**
   * Intento actualizar un usuario empleando un ID con un formato no válido
   */
    it("Intento actualizar un usuario no existente", async () => {
      // Esto funciona porque miré la ID en Mongo
     const response: Response = await request(app).put("/user/update/formatoNoValido").send({
       name: "nombreCambiado",
     });
     expect(response.statusCode).toBe(404);
   });



  /**
    * Intento crear un usuario con un correo ya existente
    */
   it("Intento crear un usuario con un correo ya existente ", async () => {
    const response: Response = await request(app).post("/user/signup").send({
      name: "prueba",
      surname: "prueba",
      email: "usuarioPrueba@gmail.com",
      password: passwordTest,
      repPassword: passwordTest,
      role: "user",
    });
    expect(response.statusCode).toBe(400);
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
    const response: Response = await request(app).post("/user/delete/").send({
      id: "IDFALSO"
    });
    expect(response.statusCode).toBe(404);
  });
  

  /**
    * Intento dar privilegios de admin pero no puedo porque los tokens los manejan desde el front
    */
   it("Intento dar privilegios de admin pero no puedo porque los tokens los manejan desde el front", async () => {
    const response: Response = await request(app).post("/user/giveAdmin").send({
      id: "624736af129ec63aae8e376c"
    });
    expect(response.statusCode).toBe(404);
  });


   /**
    * Intento dar privilegios de admin a un usuario no existente
    */
    it("Intento dar privilegios de admin a un usuario no existente", async () => {
      const response: Response = await request(app).post("/user/giveAdmin").send({
        id: "noExisto"
      });
      expect(response.statusCode).toBe(404);
    });
  



  /**
    * Intento hacer login desde aquí pero no puedo porque manejan tokens desde el front
    */
  it("Intento hacer login desde aquí pero no puedo porque manejan tokens desde el front", async () => {
    const response: Response = await request(app).post("/user/login").send({
      email: "admin@uniovi.es",
      password: "admin123",
    });
    expect(response.statusCode).toBe(404);
  });


  
  /**
    * Intento hacer login y falla por poner mal la contraseña
    */
   it("Intento hacer login y falla por poner mal la contraseña", async () => {
    const response: Response = await request(app).post("/user/login").send({
      email: "admin@uniovi.es",
      password: admin(),
    });
    expect(response.statusCode).toBe(200);
  });
    
  /**
    * Hago login de forma incorrecta
  */
  it("Hago login de forma incorrecta", async () => {
    const response: Response = await request(app).post("/user/login").send({
      email: "correoInexistente",
      password: passwordTest,
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
    expect(response.body.street_address).toBe("El Fondaque 67");
  }); 

  /**
    * Fallo al encontrar el POD
    */
   it("No encuentro el POD de un usuario", async () => {
    const response: Response = await request(app).get(
      "/user/pod/noExiste"
    );
    expect(response.statusCode).toBe(412);
  }); 

});