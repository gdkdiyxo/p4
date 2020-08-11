const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const con = require('./connection');

const b = (async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://www.maukerja.my/?cat=462-it&jtype=1-Full-Time', { waitUntil: 'load' });
    // await page.waitForSelector('.result_text a');
    await page.setViewport({
        width: 1200,
        height: 800
    });
    await autoScroll(page);

    // Get the "viewport" of the page, as reported by the page.
    const a = await page.evaluate(() => {

        var dimensions = document.querySelectorAll('.media-content .title a');
        return Array.from(dimensions, dimension => dimension.innerText)
    });

    const b = await page.evaluate(() => {

        var dimensions = document.querySelectorAll('.media-content .subtitle a');
        return Array.from(dimensions, dimension => dimension.innerText)
    });
    console.log(a);



    for (i = 0; i < a.length; i++) {
        var sql = "INSERT INTO job (name, company) VALUES ('" + a[i] + "'," + "'" + b[i] + "')";
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("All jobs record inserted");
        });
    }




    await browser.close();
})();


async function autoScroll(page) {
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if (totalHeight >= scrollHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}

module.exports = b;