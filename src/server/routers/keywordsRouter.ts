import * as trpc from "@trpc/server";
import createRouter from "~/utils/createTRPCRouter";
import { twitterUsernameSchema } from "~/utils/schemas/username";

import * as cheerio from "cheerio";
import * as puppeteer from "puppeteer";
const chrome = require("chrome-aws-lambda");

const exePath =
  process.platform === "win32"
    ? "C:Program Files (x86)GoogleChromeApplicationchrome.exe"
    : process.platform === "linux"
    ? "/usr/bin/google-chrome"
    : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const getOptions = async () => {
  let options;
  if (process.env.NODE_ENV === "production") {
    options = {
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: chrome.headless,
    };
  } else {
    options = {
      args: [],
      executablePath: exePath,
      headless: true,
    };
  }
  return options;
};

export const keywordsRouter = createRouter().mutation("create", {
  input: twitterUsernameSchema,
  resolve: async ({ input, ctx }) => {
    const followerSelector = `a[href='/${input.username}/followers']`;

    const options = await getOptions();
    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();

    await page.setRequestInterception(true);

    await page.setUserAgent(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36"
    );

    page.on("request", (request) => {
      if (request.resourceType() === "document") {
        request.continue();
      } else {
        request.abort();
      }
    });

    await page
      .goto(`https://mobile.twitter.com/${input.username}`, {
        timeout: 0,
        waitUntil: "networkidle2",
      })
      .then(async (response) => {});

    const html = await page.evaluate(() => {
      return document.querySelector("body")!.innerHTML;
    });
    const $ = cheerio.load(html);

    const followerCountString = $(followerSelector)
      .text()
      .match(/[0-9]/gi)
      ?.join("");

    await browser.close();

    return {
      status: 201,
      message: "Account Created",
      result: {
        followerCount: Number(followerCountString),
      },
    };
  },
});
