/* eslint-disable no-use-before-define */

const Nightmare = require('nightmare');
const cheerio = require('cheerio');
// Seller Feedback
//  "https://feedback.ebay.com/ws/eBayISAPI.dll?ViewFeedback2&ftab=AllFeedback&userid=jamestronix&iid=-1&de=off&interval=0&searchInterval=30&items=200&searchInterval=30";

// Product Reviews
// https://www.ebay.com/itm/Dyson-DC39-Origin-Canister-Vacuum-Yellow-New/272647620945?_trkparms=pageci%3Abbb70dd5-2b1e-11e9-b85f-74dbd180d4f1%7Cparentrq%3Ac9d8e3561680a9c560ea5644ffccb79c%7Ciid%3A1#rwid

const flags = ['the', 'fraud', 'corrupt', 'fraudulent', 'scam'];

const rating = async url => {
  // Take URL and scrape the page, parse HTML and compute safety score
  const result = [];
  const nightmare = new Nightmare({ show: false });
  const link = url;
  if (url.includes('ebay')) {
    // Scrape ebay page
    await nightmare
      .goto(link)
      .click('.reviews-header .sar-btn')
      .wait('.review-item-content')
      .evaluate(() => document.querySelector('body').innerHTML)
      .end()
      .then(async response => {
        const reviews = await getEbayProductReviews(response);
        const safetyRating = await scamAlgorithm(reviews, flags);
        console.log(safetyRating);
        result.push(safetyRating);
      })
      .catch(err => {
        'NOAH GOT AN ERROR';
      });
  } else if (url.includes('amazon')) {
    // Scrape amazon page
    await nightmare
      .goto(link)
      .click('a.a-link-emphasis')
      .wait('.review-text-content')
      .evaluate(() => document.querySelector('body').innerHTML)
      .end()
      .then(async response => {
        const reviews = await getAmazonProductReviews(response);
        const safetyRating = await scamAlgorithm(reviews, flags);
        result.push(safetyRating);
      })
      .catch(err => {
        'NOAH GOT AN ERROR';
      });
  } else {
    return;
  }
  return result;
};

const getEbayProductReviews = html => {
  // Parse html from ebay page
  const productData = [];
  const $ = cheerio.load(html);
  $('.review-item-content').each((i, elem) => {
    productData.push($(elem).text());
  });
  console.log(productData);
  return productData;
};

const getAmazonProductReviews = html => {
  // Parse html from amazon page
  const productData = [];
  const $ = cheerio.load(html);
  $('.review-text-content').each((i, elem) => {
    productData.push($(elem).text());
  });
  return productData;
};

const scamAlgorithm = (reviews, spamWords) => {
  // Compute algorithm based on spamWords
  let strikes = 0;
  let safetyRating = 100;
  for (let i = 0; i < spamWords.length; i += 1) {
    for (let j = 0; j < reviews.length; j += 1) {
      if (reviews[j].includes(spamWords[i])) {
        strikes += 1;
      }
    }
  }
  if (strikes > 0 && strikes <= 3) {
    safetyRating -= 25;
  }
  if (strikes > 3 && strikes < 10) {
    safetyRating -= 50;
  }
  if (strikes >= 10) {
    safetyRating -= 100;
  }
  return safetyRating;
};

module.exports.rating = rating;
