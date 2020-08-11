const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const con = require('./connection');

const b = (async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://www.jobstreet.com.my/en/job-search/computer-information-technology-jobs/?job-type=internship', { waitUntil: 'load' });
    // await page.waitForSelector('.result_text a');
    await page.setViewport({
        width: 1200,
        height: 800
    });


    // Get the "viewport" of the page, as reported by the page.
    const data = await page.evaluate(() => {

        var names = document.querySelectorAll('.job-list-title h4');
        var companies = document.querySelectorAll('.job-list-title p');
        var locations = document.querySelectorAll('.job-list-title p');
        var links = document.querySelectorAll('.job-list-title h4 a');

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
