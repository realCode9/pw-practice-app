import { test } from '../test-options';
import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker'

test.describe("Page objects", () => {

    test('First test for page object', async ({pageManager}) => {

        await pageManager.toFormLayoutPage().navigateToDatepicker()
        await pageManager.toFormLayoutPage().navigateToSmartTable()
        await pageManager.toFormLayoutPage().navigateToToastr();
        await pageManager.toFormLayoutPage().navigateToTooltip();
    })

    test('On the form layout page', async ({pageManager}) => {
        
        await pageManager.toFormLayoutPage().submitName();
    })

    test("Implementing methods with parameter", async ({page, pageManager}) => {

        //Using faker library for random data creation
        const personFullName = faker.person.fullName();
        const personEmail = `${personFullName.replace(" ", "")}${faker.number.int(100)}@${faker.company.name().replace(" ", "")}.com`
        
        const usingTheGridForm = page.locator('nb-card', {hasText: "Using the Grid"})
        await pageManager.toMethodWithParameter().submitUsingGridFormWithCredentialsAsAInput(personEmail, "password@123", "Option 2");
        await expect(usingTheGridForm.getByRole('textbox', {name: "Email"})).toHaveValue(personEmail)

        await page.waitForTimeout(200)
        await pageManager.toMethodWithParameter().submitInlineFormWithCredentialsByCheckingCheckbox(personFullName, personEmail, false);

        await pageManager.toFormLayoutPage().navigateToDatepicker();
        await pageManager.toDatePickerPage().selectDateFromCommonDatePicker(5)
        await pageManager.toDatePickerPage().selectDateRangeFromDatepickerWithRange(5, 7)
    })
})