import {test, expect} from "@playwright/test"

/*
 Dialogs are dismissed automatically, unless there is a page.on('dialog') listener. 
 When listener is present, it must either dialog.accept() or dialog.dismiss() the dialog - 
 otherwise the page will freeze waiting for the dialog, and actions like click will never finish.
*/

test('should validate simple alert dialog', async ({page}) => { 
    await page.goto('https://testautomationpractice.blogspot.com/');
    // const alertBtn = page.locator('//button[text()="Alert"]'); // xpath
    const alertBtn = page.getByRole("button", {name: "Alert"});
    page.on('dialog', async (dialog) => {
        console.log(`dialog type => ${dialog.type()}`)
        expect(dialog.message()).toBe('I am an alert box!');
        dialog.accept();
    })
    await alertBtn.click();
    await page.close();
 })

 test('should validate confirm dialog', async ({page}) => { 
    await page.goto('https://testautomationpractice.blogspot.com/');
    // const confirmBtn = page.locator('//button[text()="Confirm Box"]'); // xpath
    const confirmBtn = page.getByRole("button", {name: "Confirm Box"});
    page.on('dialog', async (dialog) => {
        console.log(`dialog type => ${dialog.type()}`)
        expect(dialog.message()).toBe('Press a button!');
        dialog.accept();
    })
    await confirmBtn.click();
    expect(await page.locator('#demo').textContent()).toBe('You pressed OK!');
    await page.close();
  })

  test('should valdiate prompt dialog', async ({page}) => { 
    await page.goto('https://testautomationpractice.blogspot.com/');
    // const promptBtn = page.locator('//button[text()="Prompt"]'); // xpath
    const promptBtn = page.getByRole("button", {name: "Prompt"});
    const promptInput = 'Tushar';
    page.on('dialog', async (dialog) => {
        console.log(`dialog type => ${dialog.type()}`);
        expect(dialog.message()).toBe('Please enter your name:');
        expect(dialog.defaultValue()).toBe('Harry Potter');
        dialog.accept(promptInput);
    })
    await promptBtn.click();
    expect(await page.locator('#demo').textContent()).toBe(`Hello ${promptInput}! How are you today?`);
    await page.close();
   })