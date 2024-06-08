import {test, expect} from "@playwright/test";

test.beforeEach(async ({page}) => {
    await page.goto('/')
})

test.describe('Page layout and page componenets', () => {
//Folloeing one line code will override the retries given in the configure
    test.describe.configure({retries: 1})
    test.beforeEach(async ({page}) => {
        await page.getByText('Forms').click();
        await page.getByText('Form Layouts').click();
    })

    test('UI componenets - input fields', async ({page}) => {    
        const usingBlockEmailInputField = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textBox', {name: "Email"});
        await usingBlockEmailInputField.fill('example@test.com');
        await usingBlockEmailInputField.clear();
        await usingBlockEmailInputField.pressSequentially('anotherMail@test.com');

        //Generic assertion
        const ipBoxValue = await usingBlockEmailInputField.inputValue()
        expect(ipBoxValue).toEqual('anotherMail@test.com');

        //Locator assertion
        await expect(usingBlockEmailInputField).toHaveValue('anotherMail@test.com');   
    })
    test('Radio buttons action', async ({page}) => {
        const usingBlock = page.locator('nb-card', {hasText: "Using the Grid"})

        //One way : getByLabel
        // await usingBlock.getByLabel('Option 1').check({force: true});

        // another way: getByRole
        await usingBlock.getByRole('radio', {name: 'Option 1'}).check({force: true});
        const isSelected = await usingBlock.getByRole('radio', {name: 'Option 1'}).isChecked();
        //generic assertion
        expect(isSelected).toBeTruthy();
        //locator assertion
        await expect(usingBlock.getByRole('radio', {name: 'Option 1'})).toBeChecked();

        await usingBlock.getByRole('radio', {name: "Option 2"}).check({force: true});
        const isSelectedOptionAfter2Selected = await usingBlock.getByRole('radio', {name: 'Option 1'}).isChecked()
        expect(isSelectedOptionAfter2Selected).toBeFalsy();
        //expect(await usingBlock.getByRole('radio', {name: "Option 2"}).isChecked()).toBeTruthy();
        await expect(usingBlock.getByRole('radio', {name: "Option 2"})).toBeChecked()

    })
})
test.describe('Page checkboxes', () => {
    test.beforeEach(async ({page}) => {
        await page.getByText('Modal & Overlays').click();
        await page.getByText('Toastr').click();
    })

    test('Validating checkboxes on Toastr page', async ({page}) => {
        //We can check the unchecked checkbox by clicking on it also uncheck the already checked checkbox but 

        // await page.getByRole('checkbox', {name: "Hide on click"}).click({force: true});4

        //It is always good practice to use check and uncheck methods to check and uncheck as click method does not look for the checkbox is checked or unchecked by default
        //Where as check method check the checkbox only when it is unchecked and uncheck the checkbox when it is checked
        await page.getByRole('checkbox', {name: "Hide on click"}).uncheck({force: true});
        // await page.getByRole('checkbox', {name :"Prevent arising of duplicate toast"}).check({force: true});

        // expect(await page.getByRole('checkbox', {name :"Prevent arising of duplicate toast"}).isChecked()).toBeTruthy();
        expect(await page.getByRole('checkbox', {name :"Hide on click"}).isChecked()).toBeFalsy();
        
        //To check all the checkboxes and validated they are checked
        const boxes = page.getByRole('checkbox');
        for(const box of await boxes.all()) {
            await box.check({force: true})
            expect(await box.isChecked()).toBeTruthy();
        }

        //To uncheck all the checkboxes and validated they are unchecked
        for(const box of await boxes.all()) {
            await box.uncheck({force: true});
            expect(await box.isChecked()).toBeFalsy()
        }
    })
    test('Dropdown option select', async ({page}) => {
        await page.locator('ngx-header nb-select').click();

        const dropdownList = page.locator('nb-option-list nb-option');
        await expect(dropdownList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"]);
        await dropdownList.filter({hasText: "Dark"}).click();

        const header = page.locator('nb-layout-header');
        await expect(header).toHaveCSS('background-color', 'rgb(34, 43, 69)')

        await page.locator('ngx-header nb-select').click();
        await dropdownList.filter({hasText: "Cosmic"}).click();
        await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')

        await page.locator('ngx-header nb-select').click();

        const colors = {
            "Light" : "rgb(255, 255, 255)",
            "Dark" : "rgb(34, 43, 69)",
            "Cosmic" : "rgb(50, 50, 89)",
            "Corporate" : "rgb(255, 255, 255)",
        }
        for(const color in colors) {
            await dropdownList.filter({hasText: color}).click();
            await expect(header).toHaveCSS('background-color', colors[color]);
            if(color != "Corporate"){
                await page.locator('ngx-header nb-select').click();
            }
        }

    })
    test('Tooltip validation', async ({page}) => {
        await page.getByText('Tooltip').click();

        const tooltipCard = page.locator('nb-card').filter({hasText: "Colored Tooltips"});
        await tooltipCard.hover()
        const tooltipText = await page.locator('nb-tooltip').textContent();
        expect(tooltipText).toEqual("This is a tooltip");
        await expect(page.locator('nb-tooltip')).toHaveCSS('background-color', 'rgb(51, 102, 255)');

    })
})
test('Handle dialog box', async ({page}) => {
    await page.getByText('Tables & Data').click();
    await page.getByText('Smart Table').click();

    await page.locator('table tr').filter({hasText: "mdo@gmail.com"}).locator('.nb-trash').click();

    page.on('dialog', dialog => {
        dialog.accept();
        /*
        Also we can use following methods for the dialog
        dialog.message()
        dialog.dismiss()
        dialog.defaultValue()
        */
    })

    await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com');
})
test('Working on web table', async ({page}) => {
    await page.getByText('Tables & Data').click();
    await page.getByText('Smart Table').click();

    const johnSnowRow = page.locator('table tr').filter({hasText: "fat@yandex.ru"});
    await johnSnowRow.locator('.nb-edit').click();
    await page.locator('input-editor').getByPlaceholder('age').clear();
    await page.locator('input-editor').getByPlaceholder('age').fill('35');
    await page.locator('.nb-checkmark').click();

    expect(await johnSnowRow.locator('td').last().textContent()).toEqual("35");

    //Perform on second page of pagination
    await page.locator('.ng2-smart-pagination-nav').filter({hasText: "2"}).click();
    const firstRowOnSecondPage = page.getByRole('row', {name: "11"}).filter({has: page.locator('td').nth(1).getByText('11')});
    await firstRowOnSecondPage.locator('.nb-edit').click();

    await page.locator('input-editor').getByPlaceholder('E-mail').clear()
    await page.locator('input-editor').getByPlaceholder('E-mail').fill("example@test.com");
    await page.locator('.nb-checkmark').click();
    expect(await firstRowOnSecondPage.locator('td').nth(5).textContent()).toEqual("example@test.com");
})
test('Search on Webtable and validating results', async ({page}) => {
    await page.getByText('Tables & Data').click();
    await page.getByText('Smart Table').click();

    const ages = ["20", "30", "40", "500"];

    for(let age of ages) {
        const searchRow = page.locator('thead').filter({has: page.locator('.ng2-smart-filters')});
        await searchRow.locator('th').filter({has: page.locator('input-filter')}).getByPlaceholder('Age').clear();
        await searchRow.locator('th').filter({has: page.locator('input-filter')}).getByPlaceholder('Age').fill(age);
        await page.waitForTimeout(1000)

        const tableAgeData = page.locator('tbody tr');
        for(let eachRowAge of await tableAgeData.all()) {
           const cellAgeValue = await eachRowAge.locator('td').last().textContent();
            
           if(age !== "500"){
            expect(cellAgeValue).toEqual(age);
           }else{
            expect(await page.locator('tbody tr').textContent()).toEqual(" No data found ")
           }
        }   
    }
})
test('Date picker', async ({page}) => {
    await page.getByText('Forms').click();
    await page.getByText('Datepicker').click();

    const dateField = page.getByPlaceholder('Form Picker');
    await dateField.click();

    /*
    This date is selected manually without using date object of JS
    await page.locator('[class="day-cell ng-star-inserted"]').getByText('1', {exact: true}).click();
    await expect(dateField).toHaveValue('May 1, 2024')
    */

    //Using Date() object of JS
    const date = new Date();
    date.setDate(date.getDate() + 70);
    const dateToSelect = date.getDate().toString();
    // await page.locator('[class="day-cell ng-star-inserted"]').getByText(dateToSelect, {exact: true}).click();

    //Assert by hardcoded values
    // await expect(dateField).toHaveValue('May 26, 2024')

    //Assert by using Date() object
    const monthValue = date.toLocaleString('En-US', {month: 'short'});
    const monthValueLong = date.toLocaleString('En-US', {month: 'long'});
    const yearValue = date.getFullYear();

    const dateToAssert = `${monthValue} ${dateToSelect}, ${yearValue}`;
    // await expect(dateField).toHaveValue(dateToAssert);

    const monthAndYearToSelect = `${monthValueLong} ${yearValue}`;
    let calenderMonthAndYear = await page.locator('nb-calendar-view-mode').textContent();

    while(!calenderMonthAndYear.includes(monthAndYearToSelect)){ 
        await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click();
        calenderMonthAndYear = await page.locator('nb-calendar-view-mode').textContent();
    }

    await page.locator('[class="day-cell ng-star-inserted"]').getByText(dateToSelect, {exact: true}).click();
    await expect(dateField).toHaveValue(dateToAssert)

})
test("Working on sliders on the UI", async ({page}) => {
    //To slide element on the webpage we have two ways
        //1- Updating attribute by using evaluateAttribute method
    // const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')
    // await tempBox.evaluate( node => {
    //     node.setAttribute('cx', '150.2781');
    //     node.setAttribute('cy', '9.4038');
    // })
    // await tempBox.click();
    // const tempValue = await page.locator('[class="value temperature h1"]').textContent();
    // expect(tempValue).toContain("21")
        //2- By using boundingBox method to mouse movement
    const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger');
    const box = await tempBox.boundingBox();
    const x = box.x + box.width/2;
    const y = box.y + box.height/2;
    console.log(box.width)
    console.log(box.width/2)
    console.log(box.height)
    console.log(box.height/2)
    console.log(x)
    console.log(y)
    await page.mouse.move(x,y)
    await page.mouse.down();
    await page.mouse.move(x+200, y);
    await page.mouse.move(x+100, y+100);
    await page.mouse.up()

    const tempValue = await page.locator('[class="value temperature h1"]').textContent();
    expect(tempValue).toContain("30")
})