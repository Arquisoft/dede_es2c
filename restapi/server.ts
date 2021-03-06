import express, { Application, RequestHandler } from "express";
import cors from 'cors';
import bp from 'body-parser';
import promBundle from 'express-prom-bundle';
import api from "./api"; 
import userRoutes from "./src/routes/UserRoutes";
require('dotenv').config();
import productRoutes from "./src/routes/ProductRoutes";
import orderRoutes from "./src/routes/OrderRoutes";
import reviewRoutes from "./src/routes/ReviewRoutes";
import cartRoutes from "./src/routes/CartRoutes";



const app: Application = express();
const port: number = 5000;


const options: cors.CorsOptions = {
  origin: ['http://localhost:3000']
};

const metricsMiddleware:RequestHandler = promBundle({includeMethod: true});
app.use(metricsMiddleware);

app.use(cors());
app.use(bp.json());

app.use("/api", api)

app.use(userRoutes);
app.use(productRoutes);
app.use(orderRoutes);
app.use(reviewRoutes);
app.use(cartRoutes);

app.listen(port, ():void => {
    console.log('Restapi listening on '+ port);
}).on("error",(error:Error)=>{
    console.error('Error occured: ' + error.message);
});

var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://' + process.env.DATABASE_USER + ':' + process.env.DATABASE_PASSWORD + 
                '@cluster0.tx3d4.mongodb.net/' + process.env.DATABASE_NAME + '?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() =>{
    console.log('DB CONNECTED');
  }
);

