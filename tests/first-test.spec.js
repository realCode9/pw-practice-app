import { expect, test } from "@playwright/test";

// test.beforeAll(async ({ page }) => {
//     await page.goto('http://localhost:4200/');
//     await page.getByText('Forms').click();
//     await page.getByText('Form Layouts').click();
// })

test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
})

test("FIrst test", async ({page}) => {
    await page.getByText('Form Layouts').click();

})

test("First test to navigate to datepicker", async ({page}) => {
    await page.getByText('Datepicker').click();
}) 

test.describe("First suite", () => {
    test.beforeEach(async ({page}) => {
        await page.getByText('Modal & Overlays').click();
    })

    test("FIrst test in describe", async ({page}) => {
        await page.getByText('Dialog').click();

    })

    test("First test to navigate to datepicker in describe", async ({page}) => {
        await page.getByText('Tooltip').click();
    })
})
test("Locator syntax ", async ({ page }) => {
    //By id
    await page.locator('#inputEmail1').click();
    //By class
    //await page.locator('.input-full-width').click(); //This can match multiple elements on tha webpage as this class is common for all them
    //By text
    //await page.locator('Using the Grid').click();   //This is not working with text
    //By text full
    await page.locator(':text-is("Sign in")').first().click();
    //By Partial text
    await page.locator(':text("Sign")').first().click();
    //By attribute value pair
    await page.locator('[type="email"]').first().click()    //This can also match more than one element on page thats why added first()
    //By combine values
    await page.locator('[type="submit"][nbbutton]').first().click();
    //By full class value
    await page.locator('[class="appearance-filled size-medium shape-rectangle status-danger nb-transition"]')
    //By xpath : which is not RECOMMENDED in playwright
    await page.locator('//*[@id="inputFirstName"]').fill("Vijay");
})

test('Facing Locators', async ({page}) => {
    //Get by Role
    await page.getByRole('button', {name: "Sign in"}).first().click();

    //Get by label
    await page.getByLabel('Email').first().click();
    await page.getByLabel('Email').first().fill('example@gmail.com')

    //Get by placeholder
    await page.getByPlaceholder('Password').first().fill('example!123')

    //Get by text
    await expect(page.getByText('Using the Grid')).toBeVisible();

    //Get by alt text
    //await page.getByAltText('playwright').click();    //Not executed as there was no alt text element 

    //Get by title
    await page.getByTitle('IoT Dashboard').click();

    //Get by test id: data-testid 
    //await page.getByTestId('status').click();  //Test Id used is custom test Id defined in defineConfig in playwright.config.ts
})

test('Locating child elements', async ({page}) => {
    //by writing parents seperately and then using any of the locator byLabel/byText/byLabel/byPlaceholder
    await page.locator('nb-card nb-radio :text-is("Option 1")').click();
    //Chaining the locators
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click();
    //Chaining locators with another locator type at the last chain block
    await page.locator('nb-card').locator('form').locator('[status="success"]').click();

    //By using order of the element
    await page.locator('nb-card').getByRole('button', {name: "Sign in"}).first().click();
    await page.locator('nb-card').getByRole('button', {name: "Sign in"}).last().click();

    //By using the index of the element
    await page.locator('nb-card').nth(3).getByRole('button').click();
})

test("With the help of parent element", async ({page}) => {
    //Combination of parent, hasText keyword, User facing locator
    await page.locator('nb-card', {hasText: "Using the grid"}).getByRole('textbox', {name: "Email"}).click();
    //Combination of parent, has keyword, and unique element under the parent and exact element with user facing locator
    await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', {name: "Email"}).click();
    
    //By using filter: Use of filter is - we can chain multiple filters until we get unique element as a output result
    //Using filter method and hasText keyword to identify unique text and then element with user facing locator
    await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('button', {name: "Submit"}).click();
    //Using filter method and has keyword to identify unique element under parent and then element with user facing locator
    await page.locator('nb-card').filter({has: page.locator('[status="danger"]')}).getByRole('textbox', {name: "Password"}).fill("Password");

    // Chaining multiple filters and then the unique element
    await page.locator('nb-card').filter({hasText: "Block form"}).filter({has: page.locator('.status-basic')})
        .getByPlaceholder('First Name').fill("This is first Name");
    await page.locator('nb-card').filter({hasText: "Block form"}).filter({has: page.locator('.status-basic')})
        .getByPlaceholder('Last Name').fill("This is last name");
    await page.locator('nb-card').filter({hasText: "Block form"}).filter({has: page.locator('.status-basic')})
        .getByRole('button', {name: "Submit"}).click();
})
test('Reusing locators by writing only one time', async ({page}) => {
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
    const emailField = basicForm.getByRole('textbox', {name: "Email"})
    const passwordField = basicForm.getByRole('textbox', {name: "Password"})

    await emailField.fill("example@test.com");
    await passwordField.fill("Password@123");

    await basicForm.locator(':text-is("Check me out")').click();
    await basicForm.getByRole('button').click();

    await expect(emailField).toHaveValue("example@test.com");
})
test("Extracting values from webpage ", async ({page}) => {
    const text = await page.locator('nb-card').filter({hasText: "Using the Grid"}).locator(':text-is("Using the Grid")').textContent();
    expect(text).toEqual("Using the Grid");

    const mulElements = await page.locator('nb-card').filter({hasText: "Using the Grid"}).locator('nb-radio').allTextContents();
    expect(mulElements).toContain("Option 2");
    
    const attrValue = await page.locator('nb-card').filter({has: page.locator('#inputFirstName')}).locator('#inputFirstName').getAttribute('placeholder');
    expect(attrValue).toEqual("First Name");

    // Get value entered to the input field by the user externally and it is not a part of web elements
    const inpField = page.locator('nb-card').filter({has: page.locator('#inputFirstName')}).locator('#inputEmail')
    await inpField.fill("example@ybl.com");
    const inputFieldValue =await inpField.inputValue();
    console.log(inputFieldValue)
    expect(inputFieldValue).toEqual("example@ybl.com");
})
test("Assertions in playwright", async ({page}) => {
    const x = 5
    expect(x).toEqual(5);   //Generic assertions

    const basicFormButton = page.locator('nb-card').filter({hasText: "Basic form"}).locator('button');
    expect(await basicFormButton.textContent()).toEqual("Submit");

    const disabledRadio = page.locator('nb-card').filter({hasText: "Using the Grid"});
    await expect(disabledRadio.locator(':text-is("Disabled Option")')).toBeDisabled();

    await expect(basicFormButton).toHaveText("Submit");
})