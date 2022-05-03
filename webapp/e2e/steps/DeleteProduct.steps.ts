import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const apiEndPoint= process.env.REACT_APP_URI|| 'http://localhost:3000'


const feature = loadFeature('./features/DeleteProduct.feature');

let page: puppeteer.Page;
let page2: puppeteer.Page;
let browser: puppeteer.Browser;

defineFeature(feature, test => {
  
  beforeEach(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: true });
    
    page = await browser.newPage();

    await page
      .goto(apiEndPoint + "/login", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});

    page2 = await browser.newPage();

    await page2
      .goto(apiEndPoint + "/products", {
       waitUntil: "networkidle0",
      })
      .catch(() => {});  
  });

  test('The user deletes a product', ({given,when,then}) => {

    let email:string;
    let password:string;
    
    given('An existing user', () => {   
        email = "efrengv15@gmail.com"
        password = "efren"
    });

    when('I log in and want to delete the product I add', async () => {
        // Primero hacemos login
        await expect(page).toMatch('Iniciar Sesión')
        await expect(page).toFill('#email', email);
        await expect(page).toFill('#pass', password);
        await expect(page).toClick('button', { text: 'Iniciar Sesión' })
        await expect(page).toClick('button', { text: 'OK' })

        // Añadimos el producto
        //await expect(page2).toMatch('Categorías')
        await expect(page2).toClick('button', { text: 'Añadir al carrito' }) 
        await expect(page2).toClick('#basic-button') 
        await expect(page2).toMatch('Completar el pago')
    });

    then('I should be able to delete the product', async () => {
        // Lo eliminamos
        await expect(page2).toClick('#basic-button') 
        await expect(page2).toClick('#delete-button') 
    });
  })

  afterEach(async ()=>{
    browser.close()
  })

});