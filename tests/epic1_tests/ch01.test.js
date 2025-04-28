import { test, expect } from '@playwright/test';

test('TC1-1 test', async ({ page }) => {
    await page.goto('http://localhost:3000/api/auth/signin?error=SessionRequired&callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F');
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('tahto@gmail.com');
    await page.getByRole('textbox', { name: 'Email' }).press('Tab');
    await page.getByRole('textbox', { name: 'Password' }).fill('123456');
    await page.getByRole('button', { name: 'Sign in with Credentials' }).click();
    await page.getByRole('button', { name: 'Chat' }).click();
    await page.locator('div').filter({ hasText: /^Mustang 1994 mustang 19942025-04-30T00:00:00\.000Z$/ }).first().click();
});

test('TC1-2 test', async ({ page }) => {
    await page.goto('http://localhost:3000/api/auth/signin?error=SessionRequired&callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F');
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('tahto@gmail.com');
    await page.getByRole('textbox', { name: 'Email' }).press('Tab');
    await page.getByRole('textbox', { name: 'Password' }).fill('123456');
    await page.getByRole('button', { name: 'Sign in with Credentials' }).click();
    await page.getByRole('button', { name: 'Chat' }).click();
    await page.locator('div').filter({ hasText: /^Mustang 1994 mustang 19942025-04-30T00:00:00\.000Z$/ }).first().click();

    await page.getByRole('textbox', { name: 'Type a message' }).click();
    await page.getByRole('textbox', { name: 'Type a message' }).fill('Hi HI');
    await page.getByRole('button', { name: 'SEND' }).click();
    await expect(page.locator('body')).toContainText('Hi HI');
    await expect(page.locator('div').filter({ hasText: /^Hi HI$/ }).nth(1)).toBeVisible();
});