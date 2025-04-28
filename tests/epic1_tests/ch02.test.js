import { test, expect } from '@playwright/test';

test('TC2-1 test', async ({ page }) => {
    await page.goto('http://localhost:3000/api/auth/signin?error=SessionRequired&callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F');
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('tahto@gmail.com');
    await page.getByRole('textbox', { name: 'Email' }).press('Tab');
    await page.getByRole('textbox', { name: 'Password' }).fill('123456');
    await page.getByRole('button', { name: 'Sign in with Credentials' }).click();
    await page.getByRole('button', { name: 'Chat' }).click();
    await page.locator('div').filter({ hasText: /^Mustang 1994 mustang 19942025-04-30T00:00:00\.000Z$/ }).first().click();
    await expect(page.locator('div').filter({ hasText: /^Hey are you there\?$/ }).nth(1)).toBeVisible();
    await page.locator('div').filter({ hasText: /^I'd like to book this car$/ }).nth(1).click();
    await page.locator('div').filter({ hasText: /^Is it available\?$/ }).nth(1).click();
    await page.locator('div').filter({ hasText: /^Hi HI$/ }).nth(1).click();
});

test('TC2-2 test', async ({ page }) => {
    await page.goto('http://localhost:3000/api/auth/signin?error=SessionRequired&callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F');
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('tahto@gmail.com');
    await page.getByRole('textbox', { name: 'Email' }).press('Tab');
    await page.getByRole('textbox', { name: 'Password' }).fill('123456');
    await page.getByRole('button', { name: 'Sign in with Credentials' }).click();
    await page.getByRole('button', { name: 'Chat' }).click();

    await page.goto('http://localhost:3000/chat/680cb2d0a05c07393972a293');
    await expect(page.locator('div').filter({ hasText: /^Mustang 1994 mustang 19942025-04-30T00:00:00\.000Z$/ }).first()).toBeVisible();
    await expect(page.locator('div').filter({ hasText: /^Lexus\(2002\) Toyota lexus2025-04-29T00:00:00\.000Z$/ }).first()).toBeVisible();
    await expect(page.locator('div').filter({ hasText: /^rgrg rgrg2025-04-30T00:00:00\.000Z$/ }).first()).toBeVisible();
});