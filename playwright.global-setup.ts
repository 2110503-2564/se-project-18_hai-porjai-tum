// playwright.global-setup.ts
import { chromium } from '@playwright/test';

async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/'); // Prefetch homepage
  await page.goto('http://localhost:3000/signin'); // Prefetch signin page
  await page.goto('http://localhost:3000/home'); 
  await page.goto('http://localhost:3000/car');
  await browser.close();
}

export default globalSetup;