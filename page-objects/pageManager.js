import { Page } from "@playwright/test";
import { NavigationMenu } from "../page-objects/navigationMenu"
import { FormLayoutPage  } from "../page-objects/formLayout"
import { ParameterizedMethod } from "../page-objects/parameterizedMethods"
import { DatepickerPage } from "../page-objects/datepickerPage"

export class PageManager{

    /**
     * 
     * @param {Page} page
     * @param {NavigationMenu} navigateToMethod 
     * @param {FormLayoutPage} navigateToFormLayout
     * @param {ParameterizedMethod} methodWithParameter
     * @param {DatepickerPage} navigateToDatepicker
     */

   constructor(page) {
    this.page = page
    this.navigateToMethod = new NavigationMenu(this.page)
    this.navigateToFormLayout = new FormLayoutPage(this.page)
    this.methodWithParameter = new ParameterizedMethod(this.page)
    this.navigateToDatepicker = new DatepickerPage(this.page)
   } 

   navigateTo() {
    return this.navigateToMethod
   }
   toFormLayoutPage() {
    return this.navigateToFormLayout
   }
   toMethodWithParameter() {
    return this.methodWithParameter
   }
   toDatePickerPage() {
    return this.navigateToDatepicker
   }
}
