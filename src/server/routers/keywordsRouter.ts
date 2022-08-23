import createRouter from "~/utils/createTRPCRouter";
import {keywordSearchSchema} from "~/utils/schemas/username";

import * as cheerio from "cheerio";
import * as puppeteer from "puppeteer";
import {IIndeedDataResult} from "~/components/Dashboard";
import {z} from "zod";

const chrome = require("chrome-aws-lambda");

const exePath =
    process.platform === "win32"
        ? "C:Program Files (x86)GoogleChromeApplicationchrome.exe"
        : process.platform === "linux"
            ? "/usr/bin/google-chrome-stable"
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
    input: keywordSearchSchema,
    resolve: async ({input, ctx}) => {
        const titleSelector = ".jcs-JobTitle span";
        const ratingNumberSelector = ".ratingNumber span";
        const locationSelector = ".companyLocation";
        const companyNameSelector = ".companyName";
        const jobLinkSelector = "a[data-jk]";

        const options = await getOptions();
        const browser = await puppeteer.launch(options);
        const page = await browser.newPage();

        await page.setRequestInterception(true);

        await page.setUserAgent(
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 12_5_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36"
        );

        page.on("request", (request) => {
            if (request.resourceType() === "document") {
                request.continue();
            } else {
                request.abort();
            }
        });

        await page
            .goto(
                `https://www.indeed.com/jobs?q=${input.username}&l=United States&start=0`,
                {
                    timeout: 0,
                }
            )
            .then(async (response) => {
            });

        const html = await page.evaluate(() => {
            return document.querySelector("body")!.innerHTML;
        });
        const $ = cheerio.load(html);

        let result: IIndeedDataResult[] = [];
        for (let i = 0; i < $(titleSelector).length; i++) {
            result.push({
                title: "",
                ratingNumber: "",
                location: "",
                companyName: "",
                jobLink: "",
            });
        }

        $(titleSelector).each((i, elem) => {
            result[i].title = $(elem).text();
        });
        $(ratingNumberSelector).each((i, elem) => {
            result[i].ratingNumber = $(elem).text();
        });
        $(locationSelector).each((i, elem) => {
            result[i].location = $(elem).text();
        });
        $(companyNameSelector).each((i, elem) => {
            result[i].companyName = $(elem).text();
        });
        $(jobLinkSelector).each((i, elem) => {
            let href = $(elem).attr("href");
            if (href?.charAt(0) === "/") href = `https://www.indeed.com` + href;
            result[i].jobLink = href ?? "";
        });

        await browser.close();

        if (input.shouldSave) {
            await ctx.prisma.savedSearch.create({
                data: {
                    user: {
                        connect: {
                            id: input.userId,
                        }
                    },
                    query: input.username,
                    result: JSON.stringify(result, null, 2),
                }
            });
        }

        return {
            status: 201,
            message: "Data successfully retrieved",
            result: result,
        };
    },
})
    .query("get", {
        input: z.object({
            userId: z.string(),
        }),
        resolve: async ({input, ctx}) => {

            const user = await ctx.prisma.user.findFirst({
                where: {
                    email: input.userId,
                }
            })

            if (user) {
            const savedSearches = await ctx.prisma.savedSearch.findMany({
                where: {
                    user: {
                        id: user.id,
                    },
                },
            });

            return {
                status: 200,
                message: "Data successfully retrieved",
                result: savedSearches,
            };
            }

            return {
                status: 404,
                message: "User not found",
                result: [],
            }

        }
    })
