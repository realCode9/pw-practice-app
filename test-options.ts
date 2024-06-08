import { test as base } from '@playwright/test'
import { PageManager } from '../pw-practice-app/page-objects/pageManager'

export type TestOptions = {
    GlobalsQAURL: String,
    AutoWaitURL: String,
    navigateToForms: String,
    pageManager: PageManager
}

export const test = base.extend<TestOptions>({
    GlobalsQAURL: ['', {option: true}],
    AutoWaitURL: ['', {option: true}],

    //creation of fixtures
    navigateToForms: async ({page}, use) => {
        await page.goto('/')
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click();
        await use('')
    },

    //creating fixture for the PageManager
    pageManager: async ({page, navigateToForms}, use) => {
        const pm = new PageManager(page)
        await use(pm)
    }
})
