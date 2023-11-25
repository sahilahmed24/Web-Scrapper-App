const express = require("express");
const app = express();
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

app.use(
  cors({
    origin: "*", // for frontEnd connection
    credentials: true,
  })
);

app.get("/data", function (req, res) {
  puppeteer.launch().then(async function (browser) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );

    try {
      const page = await browser.newPage();
      await page.goto("https://rategain.com/blog/");

      // Get the total number of pages
      // const totalPages = await page.$eval(".pagination a ", (element) =>
      //   parseInt(element.textContent.trim())
      // );

      const totalPages = 20;

      const BlogDetails = [];

      for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
        if (currentPage !== 1) {
          // Navigate to the next page
          await page.goto(`https://rategain.com/blog/page/${currentPage}`);
        }

        const pageBlogDetails = await page.$$eval(
          ".blog-items article",
          (elements) =>
            elements.map((e) => ({
              BlogTitle: e.querySelector(".content h6 a").innerText,
              BlogDate: e.querySelector(".content .blog-detail .bd-item span")
                .innerText,
              BlogImgUrl: e
                .querySelector(".img a[data-bg]")
                .getAttribute("data-bg"),
              BlogLikeCount: e.querySelector(".content .zilla-likes span")
                .innerText,
            }))
        );

        BlogDetails.push(...pageBlogDetails);
      }

      console.log(BlogDetails);

      await browser.close();

      const csvData = BlogDetails.map(
        (blog) =>
          `${blog.BlogTitle}, ${blog.BlogDate}, ${blog.BlogImgUrl}, ${blog.BlogLikeCount}`
      ).join("\n");

      const csvFilePath = path.join(__dirname, "BlogDetails.csv");
      fs.writeFileSync(csvFilePath, csvData);

      return res.status(200).json({
        filePath: csvFilePath,
        data: BlogDetails,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: console.log(error),
      });
    }
  });
});

app.listen(7000, () => {
  console.log("server is running on port 7000");
});

app.get("/", (req, res) => {
  res.send(`<h1>this is the default Route</h1>`);
});
