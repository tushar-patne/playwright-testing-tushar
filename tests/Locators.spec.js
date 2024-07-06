// const { test, expect } = require('@playwright/test')
import { test, expect } from '@playwright/test';

test('Locators', async ({page}) => { 
    await page.goto('https://demoblaze.com/');
    await page.locator('id=login2').click();
    await page.locator('#loginusername').fill('admin'); // css locator
    await page.locator('#loginpassword').fill('admin'); // css locator
    await page.locator("//button[text()='Log in']").click(); // xpath locator
    const logoutBtn = page.locator('#logout2'); // css locator
    const nameofuser = page.locator('#nameofuser'); // css locator
    await expect(logoutBtn).toBeVisible();
    await expect(nameofuser).toBeVisible();
 })

test('should verify 9 products on homepage', async ({page}) => {
    await page.goto('https://demoblaze.com/');
    const products = await page.$$('#tbodyid h4 a'); // css locator
    for(const product of products){
        const productName = await product.textContent();
        console.log(productName);
    }
})