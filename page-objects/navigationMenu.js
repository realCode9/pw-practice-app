import { Page } from '@playwright/test'
import { HelperBase } from './helperBase';


export class NavigationMenu extends HelperBase {

    //Commented this as this is implemented the HelperBase class and it is parent class for this current class and inheritance used here
    // /**
    //  * 
    //  * @param {Page} page 
    //  */

    constructor(page) {
        super(page)
    }

    async navigateToForms() {
        await this.page.getByText('Forms').click();
        await this.page.getByText('Form Layouts').click();
    }
}