const cheerio = require('cheerio');
const request = require('request-promise');
const fs = require('fs-extra');
const writeStream = fs.createWriteStream('.quotes.csv');

async function init(){
   const $ = await request({
       uri:'http://quotes.toscrape.com/',
       transform: body => cheerio.load(body)
   })

   writeStream.write('Quote|Author|Tags\n');
        const tags = [];
        $('.quote').each((i, el) => {
            const text = $(el).find('span.text').text().replace(/(^\“|\”$)/g, "");
            const author = $(el).find('span small.author').text();
            const tag = $(el).find('.tags a').html();
            tags.push(tag);
            writeStream.write(`${text}|${author}|${tags}\n`);
        })

   
}

init();