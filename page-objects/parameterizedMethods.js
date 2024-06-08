import { HelperBase } from './helperBase';

export class ParameterizedMethod extends HelperBase{
    
    
    // /**
    //  *@param {import('@playwright/test').Page} page
    //  */
    constructor(page) {
        super(page)
    }

    /**
     * 
     * @param {*} username - Username of the user
     * @param {*} password - Password of the user in format xyz@234
     * @param {*} option - Provide text of which option of radio button to select
     */

    async submitUsingGridFormWithCredentialsAsAInput(username, password, option) {
        const usingTheGridForm = this.page.locator('nb-card', {hasText: "Using the Grid"})
        await usingTheGridForm.getByRole('textbox', {name: "Email"}).fill(username);
        await usingTheGridForm.getByRole('textbox', {name: "Password"}).fill(password);
        await usingTheGridForm.getByRole('radio', {name: option}).check({force: true})
        await usingTheGridForm.getByRole('button').click();
    }
    /**
     * 
     * @param {*} name - This is name of the user 
     * @param {*} email - This is email 
     * @param {*} rememberMe - This is boolean value that Do checkbox needs to check?
     */
    async submitInlineFormWithCredentialsByCheckingCheckbox(name, email, rememberMe) {
        const inlineForm = this.page.locator('nb-card', {hasText: "inline form"})
        await inlineForm.getByPlaceholder('Jane Doe').fill(name);
        await inlineForm.getByPlaceholder('Email').fill(email);
        if(rememberMe)
            inlineForm.getByRole('checkbox').check({force: true});
        await inlineForm.getByRole('button').click();

    }

}
