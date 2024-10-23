import dotenv from "dotenv";
dotenv.config();

export const config = {
  puppeteer: {
    headless: process.env.PUPPETEER_HEADLESS === "true",
  },
  credentials: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
  },
};
