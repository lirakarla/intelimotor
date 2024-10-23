import puppeteer, { Browser, Page } from "puppeteer";
import { waitFor } from "../utils/helpers";
import { config } from "../config/config";

let browser: Browser;
let page: Page;

export async function initPuppeteer(): Promise<Page> {
  browser = await puppeteer.launch({ headless: config.puppeteer.headless });
  page = await browser.newPage();
  return page;
}

export async function closePuppeteer(): Promise<void> {
  await browser.close();
}

export async function uploadImage(id: string, imageURL: string) {
  await page.focus(id);
  const uploadHandle: any = await page.$(id);
  if (uploadHandle) {
    await uploadHandle.uploadFile(imageURL);
  }
  await waitFor(5000);
}

export async function handleDropdownSelection(query: string, element: string) {
  await waitFor(3000);
  await page.focus(element);
  await page.keyboard.press("Enter");
  await page.type('[type="text"]', query);
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
}
