import { test, expect } from '@playwright/test';

test('TC3-1 test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Sign-In' }).click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('porjai.punyo@gmail.com');
  await page.getByRole('textbox', { name: 'Email' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('12345678');
  await page.getByRole('button', { name: 'Sign in with Credentials' }).click();
  await page.getByRole('button', { name: 'Chat' }).click();
  await page.locator('div').filter({ hasText: /^jauguar2 Eurofighter22025-03-31T00:00:00\.000Z$/ }).first().click();
});

test('TC3-2 test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Sign-In' }).click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('porjai.punyo@gmail.com');
  await page.getByRole('textbox', { name: 'Email' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('12345678');
  await page.getByRole('button', { name: 'Sign in with Credentials' }).click();
  await page.getByRole('button', { name: 'Chat' }).click();

  await page.locator('div').filter({ hasText: /^jauguar2 Eurofighter22025-03-31T00:00:00\.000Z$/ }).first().click();
  await page.getByRole('textbox', { name: 'Type a message' }).click();
  await page.getByRole('textbox', { name: 'Type a message' }).fill('หวัดดีคับ 🤚🏻🤚🏻🤚🏻');
  await page.getByRole('button', { name: 'SEND' }).click();
  await expect(page.locator('div').filter({ hasText: /^หวัดดีคับ 🤚🏻🤚🏻🤚🏻$/ }).nth(1)).toBeVisible();

});