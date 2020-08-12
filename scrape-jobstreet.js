const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const con = require('./connection');

const b = (async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://www.jobstreet.com.my/en/job-search/computer-information-technology-jobs/?job-type=internship', { waitUntil: 'load' });
    // await page.waitForSelector('.result_text a');
    await page.setViewport({
        width: 1500,
        height: 1500
    });


    // Get the "viewport" of the page, as reported by the page.
    const data = await page.evaluate(() => {

        var names = document.querySelectorAll('article a div');
        var companies = document.querySelectorAll('#contentContainer > div.FYwKg._3VCZm > div > div > div.FYwKg.XEnxm_1 > div > div > div:nth-child(3) > div > div > div > div > div > article > div > div > div.FYwKg.d7v3r._3aoZS_1 > div:nth-child(1) > div > div.FYwKg._20Cd9._32Ekc._3Ve9Z > div > div.FYwKg._11hx2_1 > div.FYwKg.d7v3r._2uGS9_1 > div:nth-child(2) > span > span > div > a');
        var locations = document.querySelectorAll('#contentContainer > div.FYwKg._3VCZm > div > div > div.FYwKg.XEnxm_1 > div > div > div:nth-child(3) > div > div > div > div > div > article > div > div > div.FYwKg.d7v3r._3aoZS_1 > div:nth-child(2) > div > div > div > div:nth-child(1) > span > span > div:nth-child(1) > a');
        var links = document.querySelectorAll('#contentContainer > div.FYwKg._3VCZm > div > div > div.FYwKg.XEnxm_1 > div > div > div:nth-child(3) > div > div > div > div > div > article > div > div > div.FYwKg.d7v3r._3aoZS_1 > div:nth-child(1) > div > div.FYwKg._20Cd9._32Ekc._3Ve9Z > div > div.FYwKg._11hx2_1 > div.FYwKg.d7v3r._2uGS9_1 > div:nth-child(1) > div > h1 >a');

        var name = Array.from(names, name => name.innerText)
        var company = Array.from(companies, company => company.innerText)
        var link = Array.from(links, link => link.href)
        var location = Array.from(locations, location => location.innerText)
        return { name, company, link, location }
    });

    console.log(data.name);
    console.log(data.company);
    console.log(data.link);
    console.log(data.location);



    // for (i = 0; i < a.length; i++) {
    //     var sql = "INSERT INTO job (name, company) VALUES ('" + a[i] + "'," + "'" + b[i] + "')";
    //     con.query(sql, function (err, result) {
    //         if (err) throw err;
    //         console.log("All jobs record inserted");
    //     });
    // }




    await browser.close();
})();
