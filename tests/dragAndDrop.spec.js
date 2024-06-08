import {expect} from "@playwright/test";
import { test } from '../test-options';

test("Handling drag and drop inside iframe", async ({page, GlobalsQAURL}) => {
    await page.goto(GlobalsQAURL);

    const frame = page.frameLocator('[rel-title="Photo Manager"] iframe');
    await frame.locator('li', {hasText: "High Tatras 2"}).dragTo(frame.locator('#trash'))

    await frame.locator('li', {hasText: "High Tatras 3"}).hover();
    await page.mouse.down();
    await frame.locator('#trash').hover();
    await page.mouse.up();

    await expect(frame.locator('#trash li h5')).toHaveText(["High Tatras 2", "High Tatras 3"])
})