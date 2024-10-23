import { Request, Response } from "express";
import { base64_encode, waitFor } from "../utils/helpers";
import {
  initPuppeteer,
  closePuppeteer,
  uploadImage,
  handleDropdownSelection,
} from "../services/puppeteerService";
import { config } from "../config/config";

let page: any;

export const publishAd: any = async (req: Request, res: Response) => {
  const price = req.body.price;
  const description = req.body.description;

  try {
    await login();
    await adForm(price, description);
    return res.send({
      message: base64_encode("./src/images/addPublished/screenshot_plans.png"),
    });
  } catch (error) {
    return res.status(500).send({ error: "Failed publishing ad" });
  }
};

async function login() {
  page = await initPuppeteer();
  await page.goto("https://www.seminuevos.com/login?loginFrom=wizard");

  await page.type("#email_login", config.credentials.username);
  await page.type("#password_login", config.credentials.password);
  await page.keyboard.press("Enter");

  await page.waitForNavigation({ waitUntil: "networkidle0" });
}

async function adForm(price: string, description: string) {
  firstPage(price);
  lastPage(description);
  //TODO: select free plan (right now is not added because doesn't exist)
}

async function firstPage(price: string) {
  await handleDropdownSelection("autos", '[data-activates="dropdown_types"]');
  await handleDropdownSelection("Acura", '[data-activates="dropdown_brands"]');
  await handleDropdownSelection("ILX", '[data-activates="dropdown_models"]');
  await handleDropdownSelection("Sed", '[data-activates="dropdown_subtypes"]');
  await handleDropdownSelection("2018", '[data-activates="dropdown_years"]');
  await handleDropdownSelection(
    "Nuevo Le",
    '[data-activates="dropdown_provinces"]'
  );
  await handleDropdownSelection(
    "Monterrey",
    '[data-activates="dropdown_cities"]'
  );
  await page.type("#input_recorrido", "20000");
  await page.type("#input_precio", price);
  await handleDropdownSelection(
    "Negoc",
    '[data-activates="dropdown_negotiable"]'
  );
  await page.click('[class="next-button"]');
}

async function lastPage(description: string) {
  await page.waitForSelector("#input_text_area_review");
  await page.type("#input_text_area_review", description);
  await uploadImage("#Uploader", "./src/images/acura/acura.jpg");
  await handleScreenshot();
}

async function handleScreenshot(): Promise<void> {
  await page.click('[class="next-button"]');
  await page.waitForNavigation({ waitUntil: "networkidle0" });
  page.waitForFunction(() => window.location.href.endsWith("/plans"));

  await page?.screenshot({
    path: "./src/images/addPublished/screenshot_plans.png",
  });

  await closePuppeteer();
}
