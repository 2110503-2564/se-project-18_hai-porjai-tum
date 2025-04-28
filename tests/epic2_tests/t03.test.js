import { test, expect } from '@playwright/test';

test('TC7-1 test', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByRole('link', { name: 'Sign-In' }).click();
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('bronze@gmail.com');
    await page.getByRole('textbox', { name: 'Email' }).press('Tab');
    await page.getByRole('textbox', { name: 'Password' }).fill('123456');
    await page.getByRole('button', { name: 'Sign in with Credentials' }).click();
    await page.getByRole('link', { name: 'User Profile BronzeUser 900' }).click();

    await expect(page.getByText('Bronze Tier')).toBeVisible();
    await expect(page.locator('body')).toContainText('$900');
});

test('TC7-2 test', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByRole('link', { name: 'Sign-In' }).click();
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('silver@gmail.com');
    await page.getByRole('textbox', { name: 'Email' }).press('Tab');
    await page.getByRole('textbox', { name: 'Password' }).fill('123456');
    await page.getByRole('button', { name: 'Sign in with Credentials' }).click();
    await page.getByRole('link', { name: 'User Profile SilverUser 1,900' }).click();

    await expect(page.getByText('Silver Tier')).toBeVisible();
    await expect(page.locator('body')).toContainText('$1,900');
});

test('TC7-3 test', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByRole('link', { name: 'Sign-In' }).click();
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('gold@gmail.com');
    await page.getByRole('textbox', { name: 'Email' }).press('Tab');
    await page.getByRole('textbox', { name: 'Password' }).fill('123456');
    await page.getByRole('button', { name: 'Sign in with Credentials' }).click();
    await page.getByRole('link', { name: 'User Profile GoldUser 3,900' }).click();

    await expect(page.getByText('Gold Tier')).toBeVisible();
    await expect(page.locator('body')).toContainText('$3,900');
});


test('TC7-4 test', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByRole('link', { name: 'Sign-In' }).click();
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('ruby@gmail.com');
    await page.getByRole('textbox', { name: 'Email' }).press('Tab');
    await page.getByRole('textbox', { name: 'Password' }).fill('123456');
    await page.getByRole('button', { name: 'Sign in with Credentials' }).click();
    await page.getByRole('link', { name: 'User Profile RubyUser 6,900' }).click();

    await expect(page.getByText('Ruby Tier')).toBeVisible();
    await expect(page.locator('body')).toContainText('$6,900');
});


test('TC7-5 test', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByRole('link', { name: 'Sign-In' }).click();
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('diamond@gmail.com');
    await page.getByRole('textbox', { name: 'Email' }).press('Tab');
    await page.getByRole('textbox', { name: 'Password' }).fill('123456');
    await page.getByRole('button', { name: 'Sign in with Credentials' }).click();
    await page.getByRole('link', { name: 'User Profile DiamondUser 8,' }).click();


    await expect(page.getByText('Diamond Tier')).toBeVisible();
    await expect(page.locator('body')).toContainText('$8,900');
});