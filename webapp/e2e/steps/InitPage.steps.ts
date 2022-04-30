import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/InitPage.feature');

let page: puppeteer.Page;
let browser: puppeteer.Browser;

defineFeature(feature, test => {
  
  beforeEach(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: true });
  });

  test('The user can see the last units of a product', ({given,when,then}) => {
    
    given('Nothing', () => {
    });

    when('I go to the init page', async () => {
        page = await browser.newPage();

        await page
          .goto("http://localhost:3000", {
            waitUntil: "networkidle0",
          })
          .catch(() => {});
    });

    then('I can see the last units of a product', async () => {
      await expect(page).toMatch('Últimas Unidades')
    });
  })

  afterEach(async ()=>{
    browser.close()
  })

});