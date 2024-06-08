import { expect } from '@playwright/test';
import { HelperBase } from './helperBase';

export class DatepickerPage extends HelperBase{

    // /**
    //  *@param {import('@playwright/test').Page} page
    //  */

    constructor(page) {
        super(page)
    }

    async selectDateFromCommonDatePicker(noOfDaysFromToday) {
        
        await this.page.locator('nb-card', {hasText: "Common Datepicker"}).getByPlaceholder('Form Picker').click();
        const assertDate = await this.selectDateFromTheCalander(noOfDaysFromToday);
        await expect(this.page.getByPlaceholder('Form Picker')).toHaveValue(assertDate);
    }
    /**
     * 
     * @param {*} startDateFromToday - Select start date from the calander
     * @param {*} endDateFromToday - Select end date from the calander
     */
    async selectDateRangeFromDatepickerWithRange(startDateFromToday, endDateFromToday) {
        await this.page.locator('nb-card', {hasText: "Datepicker With Range"}).getByPlaceholder('Range Picker').click();
        const startDateToassert = await this.selectDateFromTheCalander(startDateFromToday);
        const endDateToAssert = await this.selectDateFromTheCalander(endDateFromToday);
        const dateRangeToAssert = `${startDateToassert} - ${endDateToAssert}`;
        await expect(this.page.getByPlaceholder('Range Picker')).toHaveValue(dateRangeToAssert)
    }
    async selectDateFromTheCalander(noOfDaysFromToday) {
        const date = new Date();
        const dateToSet = date.getDate() + noOfDaysFromToday
        date.setDate(dateToSet);
        const dateValueToSelect = date.getDate().toString();
        const yearValueToSelect = date.getFullYear();
        const monthValueToSelect = date.toLocaleString('En-US', {month: 'short'});
        const monthValueToBeSelected = date.toLocaleString('En-US', {month: 'long'});

        var calanderMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent();
        //console.log(calanderMonthAndYear)       //Full month name May 2024
        const inputMonthAndYear = `${monthValueToBeSelected} ${yearValueToSelect}`;
        //console.log(inputMonthAndYear)          //Short month value 
        const dateMonthAndYearToAssert = `${monthValueToSelect} ${dateValueToSelect}, ${yearValueToSelect}`

        while(!calanderMonthAndYear.includes(inputMonthAndYear)){
            await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click();
            calanderMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent();
        }
        await this.page.locator('.day-cell.ng-star-inserted').getByText(dateValueToSelect, {exact: true}).click();
        return dateMonthAndYearToAssert;
    }
}