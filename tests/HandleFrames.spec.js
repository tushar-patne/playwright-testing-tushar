import {test, expect} from "@playwright/test"

test('should validate first frame', async ({page}) => { 
    await page.goto('https://ui.vision/demo/webtest/frames/');
    const allFrames = page.frames();
    console.log("total frames on page: " + allFrames.length);

    const frame1 = page.frame({url: 'https://ui.vision/demo/webtest/frames/frame_1.html'});
    const input1 = frame1.locator('input[name="mytext1"]');
    await input1.fill('Tushar patne');
    expect(input1).toHaveValue('Tushar patne');
    await page.waitForTimeout(1500);

    await page.close();
 })

 test('should validate nested frame', async ({page}) => { 
    await page.goto('https://ui.vision/demo/webtest/frames/');
    const allFrames = page.frames();
    const frame_3 = page.frame({url: 'https://ui.vision/demo/webtest/frames/frame_3.html'});
    const frame_3_childFrames = frame_3.childFrames();
    const googleDoc_iFrame = frame_3_childFrames[0];

    await googleDoc_iFrame.locator('//*[@id="i8"]').check();
    await googleDoc_iFrame.locator('//*[@id="i19"]').check();
    await googleDoc_iFrame.locator('//*[@id="i25"]').check(); 
    
    await page.waitForTimeout(1500);
    await page.close();
  })