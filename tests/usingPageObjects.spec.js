import { test, expect } from "@playwright/test"
import { PageManager } from "../page-objects/pageManager"
import { faker } from '@faker-js/faker'

test.describe("Page objects", () => {
    test.beforeEach(async ({page}) => {
        await page.goto('/')
    })

    test('First test for page object', {tag: '@smoke'}, async ({page}) => {
        const pageManage = new PageManager(page)
        await pageManage.navigateTo().navigateToForms()

        await pageManage.toFormLayoutPage().navigateToDatepicker()
        await pageManage.toFormLayoutPage().navigateToSmartTable()
        await pageManage.toFormLayoutPage().navigateToToastr();
        await pageManage.toFormLayoutPage().navigateToTooltip();
    })

    test('On the form layout page', {tag: "@regression"}, async ({page}) => {
        const pageManage = new PageManager(page)
        await pageManage.navigateTo().navigateToForms();
        
        await pageManage.toFormLayoutPage().submitName();
    })

    test.skip("Implementing methods with parameter", async ({page}) => {
        const pageManage = new PageManager(page)
        await pageManage.navigateTo().navigateToForms();

        //Using faker library for random data creation
        const personFullName = faker.person.fullName();
        console.log("Full Name is " + personFullName)
        const personEmail = `${personFullName.replace(" ", "")}${faker.number.int(100)}@${faker.company.name().replace(" ", "")}.com`
        console.log("Email is " + personEmail)
        
        const usingTheGridForm = page.locator('nb-card', {hasText: "Using the Grid"})
        await pageManage.toMethodWithParameter().submitUsingGridFormWithCredentialsAsAInput(personEmail, "password@123", "Option 2");
        await expect(usingTheGridForm.getByRole('textbox', {name: "Email"})).toHaveValue(personEmail)

        await page.waitForTimeout(200)
        await pageManage.toMethodWithParameter().submitInlineFormWithCredentialsByCheckingCheckbox(personFullName, personEmail, false);

        await pageManage.toFormLayoutPage().navigateToDatepicker();
        await pageManage.toDatePickerPage().selectDateFromCommonDatePicker(5)
        await pageManage.toDatePickerPage().selectDateRangeFromDatepickerWithRange(5, 7)
    })
})