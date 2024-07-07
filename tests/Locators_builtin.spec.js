/*
page.getByAltText() - to locate an element, usually image, by its text alternative.
page.getByPlaceholder() - to locate an input by placeholder.
page.getByRole() - to locate by explicit and implicit accessibility attributes.
page.getByText() - to locate by text content.

page.getByLabel() - to locate a form control by associated label's text.
page.getByTitle() - to locate an element by its title attribute.
page.getByTestId() - to locate an element based on its data-testid attribute (other attributes can be configured).
*/

import { test, expect } from "@playwright/test";

test('should verify the slide images on carousel', async ({page}) => {
    await page.goto('https://demoblaze.com/');
    const firstSlide = page.getByAltText('First slide');
    const secondSlide = page.getByAltText('Second slide');
    const thirdSlide = page.getByAltText('Third slide');
    await expect(firstSlide).toBeVisible();
    await expect(secondSlide).toBeVisible({timeout:6000}); // wait for second slide to visible 
    await expect(thirdSlide).toBeVisible({timeout:12000}); // wait for third slide to visible
    // await expect(firstSlide).toBeVisible();
    // await expect(secondSlide).toBeAttached(); // if we don't want to wait for slide to visible just validate that it is atleast attached to the html page
    // await expect(thirdSlide).toBeAttached();
    await page.close();
})

test.only('should login with admin credentials', async ({page}) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    const username = page.getByPlaceholder('username');
    const password = page.getByPlaceholder('password');
    const submit = page.getByRole('button', { name: 'Login', type: 'submit'});
    // const submit = page.locator('//button[contains(@class, "orangehrm-login-button")]'); // xpath selector
    await username.fill('Admin');
    await password.fill('admin123');
    await submit.click();
    await expect(page.locator("//h6[text()='Dashboard']")).toBeVisible({timeout: 10000});
    // await expect(page.getByText("Dashboard")).toBeVisible({timeout:10000});  // err: resolved into 2 elements
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible({timeout: 10000})
    await page.close();
})