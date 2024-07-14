import {test, expect} from "@playwright/test"

/*
Note: You'll also encounter hidden autosuggest options.
You won't be able to inspect them because as soon as you click right mouse btn these elements disapear.
And you can't find them in html dom too.
So how do you create a locator/selector for them?

Just follow these steps
1. go to chrome dev tools
2. go to event listeners
3. expand blur
4. remove everything inside blur
 */

test('should validate auto suggest dropdowns', async ({page}) => { 
    await page.goto("https://www.redbus.in");

    await page.locator('#src').fill('mumba');
    await page.waitForSelector("#autoSuggestContainer li:first-child div text");
    expect(await page.locator("#autoSuggestContainer li:first-child div text").textContent()).toBe('Mumbai');

    const allsuggestions = await page.$$('#autoSuggestContainer li div text:first-child');
    for(const s of allsuggestions){
        console.log(await s.textContent());
        if(await s.textContent() == "Andheri East") await s.click();
    }
    expect(await page.locator('.sc-gzVnrw text:first-child').textContent()).toBe('Andheri East');

 })