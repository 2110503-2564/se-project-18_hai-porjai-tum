import { test, expect } from '@playwright/test';

test('TC4-1 test', async ({ page }) => {
  await page.goto('http://localhost:3000/api/auth/signin?error=SessionRequired&callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('porjai.punyo@gmail.com');
  await page.getByRole('textbox', { name: 'Email' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('12345678');
  await page.getByRole('button', { name: 'Sign in with Credentials' }).click();
  await page.getByRole('button', { name: 'Chat' }).click();

  await page.locator('div').filter({ hasText: /^BMW X52025-03-30T00:00:00\.000Z$/ }).first().click();
  await expect(page.locator('div').filter({ hasText: /^some how why it has to chat\?$/ }).nth(1)).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^poppp$/ }).nth(1)).toBeVisible();
});

test('TC4-2 test', async ({ page }) => {
    await page.goto('http://localhost:3000/api/auth/signin?error=SessionRequired&callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F');
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('porjai.punyo@gmail.com');
    await page.getByRole('textbox', { name: 'Email' }).press('Tab');
    await page.getByRole('textbox', { name: 'Password' }).fill('12345678');
    await page.getByRole('button', { name: 'Sign in with Credentials' }).click();
    await page.getByRole('button', { name: 'Chat' }).click();
  
    await expect(page.locator('div').filter({ hasText: /^jauguar2 Eurofighter22025-03-31T00:00:00\.000Z$/ }).first()).toBeVisible();
    await expect(page.locator('div').filter({ hasText: /^BMW X52025-03-30T00:00:00\.000Z$/ }).first()).toBeVisible();
    await expect(page.locator('div').filter({ hasText: /^jauguar2 Eurofighter22025-04-11T00:00:00\.000Z$/ }).first()).toBeVisible();
    await expect(page.locator('div').filter({ hasText: /^CleanIII 2016 Volvo Clean32025-04-30T00:00:00\.000Z$/ }).first()).toBeVisible();
    await expect(page.locator('div').filter({ hasText: /^CleanIII 2016 Volvo Clean32025-04-12T00:00:00\.000Z$/ }).first()).toBeVisible();
    await expect(page.locator('div').filter({ hasText: /^rgrg rgrg2025-04-23T00:00:00\.000Z$/ }).first()).toBeVisible();
    await expect(page.locator('div').filter({ hasText: /^Mustang 1994 mustang 19942025-04-29T17:00:00\.000Z$/ }).first()).toBeVisible();
    await expect(page.locator('div').filter({ hasText: /^911 porsche9112025-04-29T17:00:00\.000Z$/ }).first()).toBeVisible();

  });