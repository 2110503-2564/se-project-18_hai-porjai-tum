import { test, expect } from '@playwright/test';

test('TC8-1 test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Sign-In' }).click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('porjai.punyo@gmail.com');
  await page.getByRole('textbox', { name: 'Email' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('12345678');
  await page.getByRole('button', { name: 'Sign in with Credentials' }).click();
  await page.locator('div').filter({ hasText: /^Manage$/ }).nth(1).click();
  await page.getByRole('link', { name: '👤 Manage Users' }).click();

  await page.getByRole('cell', { name: '1', exact: true }).getByRole('button').click();
  await page.getByRole('spinbutton').click();
  await page.getByRole('spinbutton').fill('900');
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.locator('tbody')).toContainText('Bronze');  
});
test('TC8-2 test', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByRole('link', { name: 'Sign-In' }).click();
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('porjai.punyo@gmail.com');
    await page.getByRole('textbox', { name: 'Email' }).press('Tab');
    await page.getByRole('textbox', { name: 'Password' }).fill('12345678');
    await page.getByRole('button', { name: 'Sign in with Credentials' }).click();
    await page.locator('div').filter({ hasText: /^Manage$/ }).nth(1).click();
    await page.getByRole('link', { name: '👤 Manage Users' }).click();

    await page.getByRole('row', { name: 'UserTah uTah@gmail.com Bronze user' }).getByRole('button').nth(1).click();
    await page.getByRole('spinbutton').click();
    await page.getByRole('spinbutton').press('ControlOrMeta+a');
    await page.getByRole('spinbutton').fill('1900');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.locator('tbody')).toContainText('Silver');
    
  });
  test('TC8-3 test', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByRole('link', { name: 'Sign-In' }).click();
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('porjai.punyo@gmail.com');
    await page.getByRole('textbox', { name: 'Email' }).press('Tab');
    await page.getByRole('textbox', { name: 'Password' }).fill('12345678');
    await page.getByRole('button', { name: 'Sign in with Credentials' }).click();
    await page.locator('div').filter({ hasText: /^Manage$/ }).nth(1).click();
    await page.getByRole('link', { name: '👤 Manage Users' }).click();
  
    await page.getByRole('row', { name: 'UserTah uTah@gmail.com Silver user' }).getByRole('button').nth(1).click();
  await page.getByRole('spinbutton').click();
  await page.getByRole('spinbutton').press('ControlOrMeta+a');
  await page.getByRole('spinbutton').fill('3900');
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.locator('tbody')).toContainText('Gold');
  });
test('TC8-4 test', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByRole('link', { name: 'Sign-In' }).click();
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('porjai.punyo@gmail.com');
    await page.getByRole('textbox', { name: 'Email' }).press('Tab');
    await page.getByRole('textbox', { name: 'Password' }).fill('12345678');
    await page.getByRole('button', { name: 'Sign in with Credentials' }).click();
    await page.locator('div').filter({ hasText: /^Manage$/ }).nth(1).click();
    await page.getByRole('link', { name: '👤 Manage Users' }).click();
    await page.getByRole('row', { name: 'UserTah uTah@gmail.com Gold user' }).getByRole('button').nth(1).click();
    await page.getByRole('spinbutton').click();
    await page.getByRole('spinbutton').press('ControlOrMeta+a');
    await page.getByRole('spinbutton').fill('6900');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.locator('tbody')).toContainText('Ruby');

});
test('TC8-5 test', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByRole('link', { name: 'Sign-In' }).click();
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('porjai.punyo@gmail.com');
    await page.getByRole('textbox', { name: 'Email' }).press('Tab');
    await page.getByRole('textbox', { name: 'Password' }).fill('12345678');
    await page.getByRole('button', { name: 'Sign in with Credentials' }).click();
    await page.locator('div').filter({ hasText: /^Manage$/ }).nth(1).click();
    await page.getByRole('link', { name: '👤 Manage Users' }).click();

    await page.getByRole('row', { name: 'UserTah uTah@gmail.com Ruby user' }).getByRole('button').nth(1).click();
    await page.getByRole('spinbutton').click();
    await page.getByRole('spinbutton').press('ControlOrMeta+A');
    await page.getByRole('spinbutton').fill('8900');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.locator('tbody')).toContainText('Diamond');
});