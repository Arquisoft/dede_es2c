import request, {Response} from 'supertest';
import express, { Application } from 'express';
import * as ProductController from '../src/controllers/ProductController';
import { Product } from "../src/model/Product";

const initialProducts = require('./mockdata/products.json')
const mongoose = require('mongoose')
const supertest = require('supertest')
const router = express.Router();

const app = express()
const api = supertest(app)
const cors = require('cors')
const pjson = require('../package.json')


const paths = {
    products: '/api/products',
}


app.use(cors())
app.use( express.json() )
app.use( paths.products, require('../src/routes/ProductsOrderRoutes') )

app.listen("5000", () => 
console.log(`App listening at http://localhost:5000`))






beforeAll( async () => {

    // Nos conectamos a la BD

    mongoose.connect('mongodb+srv://admin:es2c@cluster0.tx3d4.mongodb.net/TestDataBase?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() =>{
    console.log('DB CONNECTED');
  }
);

})

beforeEach( async () => {

    // Borramos y metemos los productos tras cada prueba

    await Product.deleteMany({})

    for (const product of initialProducts){
        const productObject = new Product(product)
        await productObject.save()
    }
})

afterAll(() => {

    // Fin de la conexión
    mongoose.connection.close()
    app.listen().close()
})

describe('Product testing', () => {

    test('Get all products', async () => {
        await api
            .get("/product/list")
            .expect(200)
            .expect('Content-Type',/application\/json/)
    })
    
    test('Test Two', async () => {

    })

})