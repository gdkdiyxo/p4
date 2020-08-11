const request = require('request');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const { html } = require('cheerio');

// const url = "https://www.imdb.com/find?ref_=nv_sr_sm&q=";

// function searchmovies(searchTerm) {
//     request(`${url}${searchTerm}`, (error, response, html) => {
//         if (!error && response.statusCode == 200) {
//             const a = cheerio.load(html);
//             console.log(a.html());
//         }
//     })
// }

// searchmovies('star wars')

// request('https://www.maukerja.my/en/', (error, response, html) => {
//     if (!error && response.statusCode == 200) {
//         const $ = cheerio.load(html);
//         const $content = $("p.title.has-text-black.has-text-weight-bold.is-6.text-truncate > a");
//         console.log($content.html());
//     }
// });

const fetch = require('node-fetch');

// const url = "https://www.imdb.com/find?ref_=nv_sr_sm&q=";

// function searchMovies(searchTerm) {
//     return fetch(`${url}${searchTerm}`)
//         .then(response => response.text());
// }

// searchMovies('star wars')
//     .then(body => {
//         const $ = cheerio.load(body);
//         $('.findResult').each(function (i, element) {
//             const $element = $(element);
//             const $image = $element.find("td a img");
//             console.log($image.attr('src'));
//         });
//     });


// const url = "https://www.maukerja.my/en/?cat=462-it";

// function searchMovies() {
//     return fetch(`${url}`)
//         .then(response => response.text());
// }

// searchMovies()
//     .then(body => {
//         const $ = cheerio.load(body);
//         $('.has-text-dark').each(function (i, element) {
//             const $element = $(element);
//             console.log($element.text());
//         });
//     });


(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.maukerja.my/en/?cat=462-it', {
        waitUntil: "networkidle2",
    });

    // Get the "viewport" of the page, as reported by the page.
    const body = await page.evaluate(() => {
        return document.querySelector('.has-text-dark').innerHTML;
    });
    console.log(body);


    await browser.close();
})();