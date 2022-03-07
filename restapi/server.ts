import express, { Application, RequestHandler } from "express";
import cors from 'cors';
import bp from 'body-parser';
import promBundle from 'express-prom-bundle';
import api from "./api"; 
import userRoutes from "../restapi/src/routes/UserRoutes";
import orderRoutes from "./src/routes/OrderRoutes";
import productRoutes from "../restapi/src/routes/ProductsRoutes";
import {User} from "../restapi/src/model/User";



const app: Application = express();
const port: number = 5000;

const options: cors.CorsOptions = {
  origin: ['http://localhost:3000']
};

const metricsMiddleware:RequestHandler = promBundle({includeMethod: true});
app.use(metricsMiddleware);

app.use(cors(options));
app.use(bp.json());

app.use("/api", api)

app.use(userRoutes);
app.use(productRoutes);
api.use(orderRoutes);

app.listen(port, ():void => {
    console.log('Restapi listening on '+ port);
}).on("error",(error:Error)=>{
    console.error('Error occured: ' + error.message);
});

var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:es2c@cluster0.tx3d4.mongodb.net/TestDataBase?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() =>{
    console.log('DB CONNECTED');
  }
);

