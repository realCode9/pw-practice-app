import { test } from "@playwright/test"
import { PageManager } from "../page-objects/pageManager"


test('First test for page object', async ({page}, testInfo) => {
        await page.goto('http://localhost:4200/')
        if(testInfo.project.name == 'mobile'){
            await page.locator('.sidebar-toggle').click();
        }
        const pageManage = new PageManager(page)
        await pageManage.navigateTo().navigateToForms()
        if(testInfo.project.name == 'mobile'){
            await page.locator('.sidebar-toggle').click();
        }
        await pageManage.toFormLayoutPage().submitName();
})
