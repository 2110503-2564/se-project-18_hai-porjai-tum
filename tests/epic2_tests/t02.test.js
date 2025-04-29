import { test, expect } from '@playwright/test';

test('TC6-1 test', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByRole('link', { name: 'Sign-In' }).click();
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('bronze@gmail.com');
    await page.getByRole('textbox', { name: 'Email' }).press('Tab');
    await page.getByRole('textbox', { name: 'Password' }).fill('123456');
    await page.getByRole('textbox', { name: 'Password' }).press('Enter');
    // await page.getByRole('button', { name: 'Sign in with Credentials' }).click();
    // await page.getByRole('link', { name: 'User Profile BronzeUser 900 THB' }).click();
    await page.getByAltText('User Profile').click();
    await page.getByRole('button', { name: 'View Privileges' }).click();

    await expect(page.getByText('Bronze Tier PrivilegesBasic')).toBeVisible();
    await expect(page.getByText('Basic Support')).toBeVisible();
    await expect(page.getByText('Access to Standard Deals')).toBeVisible();
});

test('TC6-2 test', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByRole('link', { name: 'Sign-In' }).click();
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('silver@gmail.com');
    await page.getByRole('textbox', { name: 'Email' }).press('Tab');
    await page.getByRole('textbox', { name: 'Password' }).fill('123456');
    await page.getByRole('button', { name: 'Sign in with Credentials' }).click();
    // await page.getByRole('link', { name: 'User Profile SilverUser 1,900' }).click();
    await page.getByAltText('User Profile').click();
    await page.getByRole('button', { name: 'View Privileges' }).click();

    await expect(page.getByRole('heading', { name: 'Silver Tier Privileges' })).toBeVisible();
    await expect(page.getByText('Priority Support')).toBeVisible();
    await expect(page.getByText('Early Access Deals')).toBeVisible();

    // await expect(page.getByText('Silver Tier')).toBeVisible();
    await expect(page.locator('body')).toContainText('$1,900');
});

test('TC6-3 test', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByRole('link', { name: 'Sign-In' }).click();
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('gold@gmail.com');
    await page.getByRole('textbox', { name: 'Email' }).press('Tab');
    await page.getByRole('textbox', { name: 'Password' }).fill('123456');
    await page.getByRole('button', { name: 'Sign in with Credentials' }).click();
    // await page.getByRole('link', { name: 'User Profile GoldUser 3,900' }).click();
    await page.getByAltText('User Profile').click();
    await page.getByRole('button', { name: 'View Privileges' }).click();
    await expect(page.getByRole('heading', { name: 'Gold Tier Privileges' })).toBeVisible();
    await expect(page.getByText('/7 Support')).toBeVisible();
    await expect(page.getByText('Gold-only Discounts')).toBeVisible();
    await expect(page.getByText('Free Shipping')).toBeVisible();
    await page.getByRole('button', { name: 'Close' }).click();
});


test('TC6-4 test', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByRole('link', { name: 'Sign-In' }).click();
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('ruby@gmail.com');
    await page.getByRole('textbox', { name: 'Email' }).press('Tab');
    await page.getByRole('textbox', { name: 'Password' }).fill('123456');
    await page.getByRole('button', { name: 'Sign in with Credentials' }).click();
    // await page.getByRole('link', { name: 'User Profile RubyUser 6,900' }).click();
    await page.getByAltText('User Profile').click();
    await page.getByRole('button', { name: 'View Privileges' }).click();
    await expect(page.getByRole('heading', { name: 'Ruby Tier Privileges' })).toBeVisible();
    await expect(page.getByText('Concierge Service')).toBeVisible();
    await expect(page.getByText('Exclusive Offers')).toBeVisible();
    await expect(page.getByText('Faster Shipping')).toBeVisible();
    await page.getByRole('button', { name: 'Close' }).click();
});


test('TC6-5 test', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByRole('link', { name: 'Sign-In' }).click();
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('diamond@gmail.com');
    await page.getByRole('textbox', { name: 'Email' }).press('Tab');
    await page.getByRole('textbox', { name: 'Password' }).fill('123456');
    await page.getByRole('button', { name: 'Sign in with Credentials' }).click();
    // await page.getByRole('link', { name: 'User Profile DiamondUser 8,' }).click();
    await page.getByAltText('User Profile').click();
    await page.getByRole('button', { name: 'View Privileges' }).click();
    await expect(page.getByRole('heading', { name: 'Diamond Tier Privileges' })).toBeVisible();
    await expect(page.getByText('VIP Support')).toBeVisible();
    await expect(page.getByText('Diamond-only Sales')).toBeVisible();
    await expect(page.getByText('Invites to Events')).toBeVisible();
    await page.getByRole('button', { name: 'Close' }).click();
});