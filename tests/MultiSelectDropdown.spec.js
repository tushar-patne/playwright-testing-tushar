import {test, expect} from "@playwright/test";

test('should validate multiselect dropdown', async ({page}) => {

    await page.goto('https://testautomationpractice.blogspot.com/');

    const selectColors = page.locator('#colors');
    const colorOptions = page.locator('#colors option')
    
    await selectColors.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    await expect(selectColors).toHaveAttribute('multiple');
    await expect(colorOptions).toHaveCount(5);

    const colorsArr = ['red', 'green', 'yellow'];
    await selectColors.selectOption(colorsArr);
    const selectedColors = await selectColors.evaluate((node) => {
        return Array.from(node.selectedOptions).map(n => n.value)
    })
    expect(selectedColors).toStrictEqual(colorsArr);

})