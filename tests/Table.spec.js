import {test, expect} from "@playwright/test"

test('should validate pagination table', async ({page}) => { 
    await page.goto("https://testautomationpractice.blogspot.com/");

    const tableHead = page.locator('#productTable thead')
    const tableBody = page.locator('#productTable tbody')
    const columnHeaders = tableHead.locator('tr th');
    const tableRows = tableBody.locator('tr');
    const tableCells = tableRows.locator('td')

    const n_columns = await columnHeaders.count();
    const n_rows = await tableRows.count();
    const n_cells = await tableCells.count();

    expect(n_columns).toBe(4);
    expect(n_rows).toBe(5);
    expect(n_cells).toBe(20);

    const firstPageProducts = ['Product 1', 'Product 3', 'Product 4', 'Product 5'];
    const secondPageProducts = ['Product 7', 'Product 8', 'Product 9'];
    const thirdPageProducts = ['Product 11', 'Product 12'];
    const fourthPageProducts = ['Product 16', 'Product 17', 'Product 18', 'Product 19', 'Product 20'];
    const tablePages = [firstPageProducts, secondPageProducts, thirdPageProducts, fourthPageProducts]
    // checkProducts.forEach( product => selectProduct(page, tableRows, product))
    let i = 1;
    for(const tpage of tablePages){
        await page.getByRole("link", {name: i}).click();
        for(const product of tpage){
            await selectProduct(page, tableRows, product)
        }
        i++;
    }
    await page.getByRole("link", {name: 1}).click();

    await page.waitForTimeout(1500);
    await page.close();
 })

 const selectProduct = async (page, rows, product) => {
    await rows.filter({hasText: product}).getByRole("checkbox").click();
 }