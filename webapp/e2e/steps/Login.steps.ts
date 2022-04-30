import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/Login.feature');

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
  });

  test('The user is registered in the website', ({given,when,then}) => {
    
    let email:string;
    let password:string;

    given('An existing user', () => {
      email = "efrengv15@gmail.com"
      password = "efren"
    });

    when('I fill the data in the form', async () => {
      await expect(page).toMatch('Iniciar Sesión')
      
      await expect(page).toFill('#email', email);
      await expect(page).toFill('#pass', password);

      await expect(page).toClick('button', { text: 'Iniciar Sesión' })
    });

    then('I should see the correct page', async () => {
      await expect(page).toMatch('Sesión iniciada')
    });
  })


  test('Incorrect login from a non existing user', ({given,when,then}) => {
    
    let email:string;
    let password:string;

    given('A non existing user', () => {
      email = "error@gmail.com"
      password = "error"
    });

    when('I fill the data in the form', async () => {
      await expect(page).toMatch('Iniciar Sesión')
      
      await expect(page).toFill('#email', email);
      await expect(page).toFill('#pass', password);

      await expect(page).toClick('button', { text: 'Iniciar Sesión' })
    });

    then('I should see an error in the page', async () => {
      await expect(page).toMatch('El usuario o contraseña son incorrectos, vuelva a introducirlos')
    });
  })
});