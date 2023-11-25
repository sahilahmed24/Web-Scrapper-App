const express = require("express"); // Adding Express
const app = express(); // Initializing Express
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

app.get("/data", function (req, res) {
  puppeteer.launch().then(async function (browser) {
    try {
      const browswer = await puppeteer.launch();

      const page = await browswer.newPage();
      await page.goto("https://rategain.com/blog/");

      const BlogDetails = await page.$$eval(".blog-items article", (element) =>
        element.map((e) => ({
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

      console.log(BlogDetails);

      await browswer.close();

      const csvData = BlogDetails.map((BlogDetails) => {
        return `${BlogDetails.BlogTitle}, ${BlogDetails.BlogDate}, ${BlogDetails.BlogImgUrl}, ${BlogDetails.BlogLikeCount}`;
      }).join("\n");

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
  res.send(`<h1>this is default Route</h1>`);
});
