import { expect } from "@playwright/test";
import { test } from '../test-options'

test.beforeEach(async ({page}) => {
    await page.goto(process.env.URL);
    await page.locator('#ajaxButton').click();
}) 

test('Auto waiting', async ({page}) => {
    // const text = await page.locator('.bg-success').textContent();
    // expect(text).toEqual("Data loaded with AJAX get request.")

    //Not all methods like textContent() are waiting for elements to be displayed some needs extra wait like allTextContent()
    const greenMessage = page.locator('.bg-success');
    // await greenMessage.waitFor({state: "attached"});
    // const text2 =await greenMessage.allTextContents();
    // expect(text2).toContain("Data loaded with AJAX get request.")

    await expect(greenMessage).toHaveText("Data loaded with AJAX get request.", {timeout: 20000});
})

test.skip('Alternative wait methods', async ({page}) => {
    const greenMessage = page.locator('.bg-success');

    //Wait for the locator of element is 
    await page.waitForSelector('.bg-success');

    //Wait for the perticular response from the application
    await page.waitForResponse("");     //Url of the response as a argument for the method

    //Wait for timeout
    await page.waitForTimeout();        //This method is giving hardcoded wait milliseconds to the page to wait

    //Wait for network
    await page.waitForLoadState();      //Wait until page reaches to the required load state i.e. load, documentLoaded or networkIdle
                                        //NetworkIdle: All the apis hitted must be completed and network will be in the state of idle

    await page.waitForURL();        //Wait until page navigated to the perticular url

    const successText = await greenMessage.allTextContents();
    expect(successText).toContain("Data loaded with AJAX get request.")
})