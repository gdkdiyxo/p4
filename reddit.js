const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://www.reddit.com/');

    // Get the "viewport" of the page, as reported by the page.
    const a = await page.evaluate(() => {

        var dimensions = document.querySelectorAll('.result_text');
        return Array.from(dimensions, dimension => dimension.textContent)
    });
    console.log(a.length);



    await browser.close();
})();