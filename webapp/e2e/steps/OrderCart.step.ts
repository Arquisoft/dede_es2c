import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/OrderCart.feature');

let page: puppeteer.Page;
let page2: puppeteer.Page;
let page3: puppeteer.Page;
let browser: puppeteer.Browser;

defineFeature(feature, test => {
  
  beforeEach(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: true });
    
    page = await browser.newPage();

    await page
      .goto("http://localhost:3000/login", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});

    page2 = await browser.newPage();

    await page2
      .goto("http://localhost:3000/products", {
       waitUntil: "networkidle0",
      })
      .catch(() => {});

    page3 = await browser.newPage();

    await page3
      .goto("http://localhost:3000/pago", {
      waitUntil: "networkidle0",
      })
      .catch(() => {});    
  });

  test('The user makes an incorrect order', ({given,when,then}) => {

    let email:string;
    let password:string;
    
    given('An existing user', () => {   
        email = "efrengv15@gmail.com"
        password = "efren"
    });

    when('I choose a product and dont fill the order form', async () => {
        // Primero hacemos login
        await expect(page).toMatch('Iniciar Sesión')
        await expect(page).toFill('#email', email);
        await expect(page).toFill('#pass', password);
        await expect(page).toClick('button', { text: 'Iniciar Sesión' })
        await expect(page).toClick('button', { text: 'OK' })

        // Añadimos el producto
        await expect(page2).toMatch('Categorías')
        await expect(page2).toClick('button', { text: 'Añadir al carrito' }) 
        await expect(page2).toClick('button', { text: 'Añadir al carrito' }) 
        await expect(page2).toClick('#basic-button') 
        // (El href me lo salto, accedo directamente a la URL)

        // "Completamos" el pago
        await expect(page3).toMatch('Completar el pago')
        await expect(page3).toClick('button', { text: 'Completar el pago' }) 
    });

    then('An error should appear', async () => {
        await expect(page3).toMatch('El titular no puede ser vacío')
    });
  })

  afterEach(async ()=>{
    browser.close()
  })

});