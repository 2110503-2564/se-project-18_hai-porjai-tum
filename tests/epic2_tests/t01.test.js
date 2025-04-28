import { test, expect } from '@playwright/test';

test('TC5-1 test', async ({ page }) => {
    await page.goto('http://localhost:3000/api/auth/signin?csrf=true');
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('bronze@gmail.com');
    await page.getByRole('textbox', { name: 'Email' }).press('Tab');
    await page.getByRole('textbox', { name: 'Password' }).fill('123456');
    await page.getByRole('button', { name: 'Sign in with Credentials' }).click();
    await page.getByRole('button', { name: 'Ready' }).click();
    await page.getByRole('button', { name: 'Car Catalog' }).click();
    await expect(page.getByRole('link', { name: 'Mustang 1994 Mustang 1994' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'CleanIII 2016 Locked CleanIII' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Bmw z(2012) Locked Bmw z(2012' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Koninsegg Locked Koninsegg' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'jauguar2 Locked jauguar2' })).toBeVisible();
});

test('TC5-2 test', async ({ page }) => {
    await page.goto('http://localhost:3000/api/auth/signin?csrf=true');
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('silver@gmail.com');
    await page.getByRole('textbox', { name: 'Email' }).press('Tab');
    await page.getByRole('textbox', { name: 'Password' }).fill('123456');
    await page.getByRole('button', { name: 'Sign in with Credentials' }).click();
    await page.getByRole('button', { name: 'Ready' }).click();
    await page.getByRole('button', { name: 'Car Catalog' }).click();
    await expect(page.getByRole('link', { name: 'Lexus(2002) Lexus(2002)' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'CleanIII 2016 CleanIII 2016' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Bmw z(2012) Locked Bmw z(2012' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Koninsegg Locked Koninsegg' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'jauguar2 Locked jauguar2' })).toBeVisible();
});

test('TC5-3 test', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByRole('link', { name: 'Sign-In' }).click();
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('gold@gmail.com');
    await page.getByRole('textbox', { name: 'Email' }).press('Tab');
    await page.getByRole('textbox', { name: 'Password' }).fill('123456');
    await page.getByRole('button', { name: 'Sign in with Credentials' }).click();
    await page.getByRole('button', { name: 'Ready' }).click();
    await page.getByRole('button', { name: 'Car Catalog' }).click();
    await expect(page.getByRole('link', { name: 'Lexus(2002) Lexus(2002)' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'CleanIII 2016 CleanIII 2016' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Bmw z(2012) Bmw z(2012) Gold' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Koninsegg Locked Koninsegg' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'jauguar2 Locked jauguar2' })).toBeVisible();
});

test('TC-5-4 test', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByRole('link', { name: 'Sign-In' }).click();
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('rU');
    await page.getByRole('textbox', { name: 'Email' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Email' }).fill('ruby@gmail.com');
    await page.getByRole('textbox', { name: 'Email' }).press('Tab');
    await page.getByRole('textbox', { name: 'Password' }).fill('123456');
    await page.getByRole('button', { name: 'Sign in with Credentials' }).click();
    await page.getByRole('button', { name: 'Ready' }).click();
    await page.getByRole('button', { name: 'Car Catalog' }).click();
    await expect(page.getByRole('link', { name: 'Lexus(2002) Lexus(2002)' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'CleanIII 2016 CleanIII 2016' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Bmw z(2012) Bmw z(2012) Gold' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Koninsegg Koninsegg Ruby' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'jauguar2 Locked jauguar2' })).toBeVisible();
});

test('TC5-5 test', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByRole('link', { name: 'Sign-In' }).click();
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('diamond@gmail.com');
    await page.getByRole('textbox', { name: 'Email' }).press('Tab');
    await page.getByRole('textbox', { name: 'Password' }).fill('123456');
    await page.getByRole('button', { name: 'Sign in with Credentials' }).click();
    await page.getByRole('button', { name: 'Ready' }).click();
    await page.getByRole('button', { name: 'Car Catalog' }).click();
    await expect(page.getByRole('link', { name: 'Lexus(2002) Lexus(2002)' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'CleanIII 2016 CleanIII 2016' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Bmw z(2012) Bmw z(2012) Gold' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Koninsegg Koninsegg Ruby' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'jauguar2 jauguar2 Diamond' })).toBeVisible();
});