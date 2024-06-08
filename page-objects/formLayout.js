import { HelperBase } from "./helperBase"


export class FormLayoutPage extends HelperBase {

    // /**
    //  *@param {import('@playwright/test').Page} page
    //  */

    constructor(page) {
        super(page)
        this.datepicker = this.page.getByText('Datepicker')
        this.smartTable = this.page.getByText('Smart Table')
        this.toastr = this.page.getByText('Toastr')
        this.tooltip = this.page.getByText('Tooltip')
    }
    async navigateToDatepicker() {
        // await page.getByText('Forms').click();
        await this.selectMenuItem('Forms');
        await this.datepicker.click();
    }
    async navigateToSmartTable() {
        await this.selectMenuItem('Tables & Data');
        await this.smartTable.click();
    }
    async navigateToToastr() {
        await this.selectMenuItem('Modal & Overlays');
        await this.toastr.click();
    }
    async navigateToTooltip() {
        await this.selectMenuItem('Modal & Overlays');
        await this.page.getByText('Tooltip').click();
    }
    async submitName() {
        await this.page.locator('nb-card').filter({ hasText: "Inline Form" }).getByPlaceholder('Jane Doe').fill("John Doe");
        await this.page.locator('nb-card').filter({ hasText: "Inline Form" }).getByPlaceholder('Email').fill("John Doe");
        await this.page.locator('nb-card').filter({ hasText: "Inline Form" }).getByRole('button').click();
    }

    async selectMenuItem(menuItemSelector) {
        const menuItem = this.page.getByTitle(menuItemSelector);
        const isMainMenuSelected = await menuItem.getAttribute('aria-expanded')
        if(isMainMenuSelected == "false") {
            await menuItem.click();
        }
    }
    /*
    We can put locators in the page object in two different ways:
        1. Just declare and initialize locators in the constructor of the class and use it in the respective methods
        2. Just keep it simple and write the locator in the method wherever we need that
    You can follow any approach whichever is suits for your project needs
    */
}