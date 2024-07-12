import { test, expect } from "@playwright/test";

test('should validate register form', async ({page}) => {
    await page.goto('https://demo.nopcommerce.com/register?returnUrl=%2F');

    const headerLogoImg = page.getByAltText("nopCommerce demo store");
    const maleRadioBtn = page.getByLabel("Male", {exact: true});
    const femaleRadioBtn = page.getByLabel("Female");
    const firstNameInput = page.locator('#FirstName'); // css selector
    const lastNameInput = page.getByLabel('Last name');
    const DateOfBirthDaySelect = page.locator('select[name="DateOfBirthDay"]'); // css selector
    const DateOfBirthMonthSelect = page.locator('select[name="DateOfBirthMonth"]'); // css selector
    const DateOfBirthYearSelect = page.locator('select[name="DateOfBirthYear"]'); // css selector
    const emailInput = page.getByLabel('Email');

    await expect(page).toHaveURL('https://demo.nopcommerce.com/register?returnUrl=%2F');
    await expect(page).toHaveTitle('nopCommerce demo store. Register');
    
    await expect(headerLogoImg).toBeVisible();
    await expect(headerLogoImg).toHaveAttribute('src', 'https://demo.nopcommerce.com/Themes/DefaultClean/Content/images/logo.png');

    await maleRadioBtn.click();
    await expect(maleRadioBtn).toBeChecked();
    expect(await maleRadioBtn.isChecked()).toBeTruthy();  // prefered 
    // await expect(femaleRadioBtn).not.toBeChecked();

    await firstNameInput.fill('Tushar');
    await lastNameInput.fill('Patne');
    await expect(firstNameInput).toHaveValue('Tushar');
    await expect(lastNameInput).toHaveValue(/Patne/);
    await expect(lastNameInput).toBeFocused();

    await expect(DateOfBirthDaySelect.locator('option')).toHaveCount(32);
    await expect(DateOfBirthMonthSelect.locator('option')).toHaveCount(13);
    await expect(DateOfBirthYearSelect.locator('option')).toHaveCount(112);

    await expect(emailInput).toBeEditable();
    await page.waitForTimeout(3000); // similar to implicit wait in selenium, it should be avoided in production and should be only used to debugging
})