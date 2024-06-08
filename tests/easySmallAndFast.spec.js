import { expect, test } from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'

test('First test for page object', async ({page}) => {
    await page.goto('/');
    const pm = new PageManager(page)
    await pm.toFormLayoutPage().navigateToDatepicker()
    await pm.toFormLayoutPage().navigateToSmartTable()
    await pm.toFormLayoutPage().navigateToToastr();
    await pm.toFormLayoutPage().navigateToTooltip();
    await expect(page).toHaveScreenshot();
})