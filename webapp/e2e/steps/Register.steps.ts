import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";
import { StringifyOptions } from 'querystring';

const apiEndPoint= process.env.REACT_APP_URI|| 'http://localhost:3000'

const feature = loadFeature('./features/Register.feature');

let page: puppeteer.Page;
let browser: puppeteer.Browser;

defineFeature(feature, test => {
  
  beforeEach(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: true });
    page = await browser.newPage();

    await page
      .goto(apiEndPoint + "/signup", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});
  });

  test('The user is already registered on the website', ({given,when,then}) => {
    
    let name:string;
    let surname:string;
    let email:string;
    let password:string;

    given('Data from an existing user', () => {
      name = "efren"
      surname = "garcia"
      email = "efrengv15@gmail.com"
      password = "error"
    });

    when('I fill the data in the form', async () => {
      await expect(page).toMatch('Crear cuenta')
      
      await expect(page).toFill('#name', name);
      await expect(page).toFill('#surname', surname);
      await expect(page).toFill('#email', email);
      await expect(page).toFill('#pass', password);
      await expect(page).toFill('#repPass', password);

      await expect(page).toClick('button', { text: 'Crear cuenta' })
    });

    then('I should see the error', async () => {
      await expect(page).toMatch('El e-mail ya existe')
    });
  })


  test('I dont fill all the data in the form', ({given,when,then}) => {


    given('Nothing', () => {
    });

    when('I dont fill the data in the form', async () => {
      await expect(page).toMatch('Crear cuenta')
      await expect(page).toClick('button', { text: 'Crear cuenta' })
    });

    then('I should see the error', async () => {
      await expect(page).toMatch('La casilla no puede estar vacia')
    });
  })

  afterEach(async ()=>{
    browser.close()
  });


  afterEach(async ()=>{
    browser.close()
  });

});