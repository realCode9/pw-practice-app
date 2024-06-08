import { Page } from '@playwright/test';
export class HelperBase{
    /**
     * @param {Page} page 
     * 
     */    
    constructor(page) {
        this.page = page
    }

    async waitForElement(waitInSeconds) {
        await this.page.waitForTimeout(waitInSeconds * 1000)
    }
}