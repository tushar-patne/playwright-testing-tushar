import {test, expect} from "@playwright/test";

test('should validate dropdown', async ({page}) => { 
    await page.goto("https://testautomationpractice.blogspot.com/");
    const countryDropdown = page.locator('#country');
    await countryDropdown.scrollIntoViewIfNeeded();
    await countryDropdown.selectOption('india'); // select by value or label - here label doesn't mean label tag but it is the visible text in option tag
    // await countryDropdown.selectOption({label: 'India'}); // select by label - here label doesn't mean label tag but it is the visible text in option tag
    // await countryDropdown.selectOption({value: 'india'}); // select by value
    await countryDropdown.selectOption({index: 5}); // select by index - index starts with 0
    
    // Assertions

    // 1) check number of options in dropdown - Approach 1
    const countryOptions_1 = page.locator('#country option'); // returns locator object
    await expect(countryOptions_1).toHaveCount(10);

    // 2) check number of options in dropdown - Approach 2
    const countryOptions_2 = await page.$$('#country option'); // returns array of elements
    expect(countryOptions_2.length).toBe(10);

    // 3) check presence of specific option in dropdown - Approach 1
    const countryDropdown_content = await page.locator('#country').textContent(); // returns labels/text of all options of selector in string format
    expect(countryDropdown_content.includes('India')).toBeTruthy();

    // 4) check presence of specific option in dropdown - Approach 2
    const countryOptions_3 = await page.$$('#country option'); // looping over all the elements 
    let isPresent = false;
    for(const option of countryOptions_3){
        const option_label = await option.textContent();
        if(option_label == "Japan"){
            isPresent = true;
            break;
        }
    } 
    expect(isPresent).toBeTruthy();

    // 5) check expected option is selected - Approach 1 - verify using value buildin assertions - prefered
    await countryDropdown.selectOption('germany');
    expect(countryDropdown).toHaveValue('germany');

    // 6) check expected option is selected - Approach 2 - verify using value
    await countryDropdown.selectOption('france');
    const selectedOption = await countryDropdown.inputValue();
    expect(selectedOption).toBe('france');

    // 7) check expected option is selected - Approach 3 - verify using text/label
    await countryDropdown.selectOption('Brazil');
    const selectedOption2 = page.locator('#country option:checked');
    expect(await selectedOption2.textContent()).toBe('Brazil');

})