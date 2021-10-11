import Crawler from "./crawler.js";
import { findText, formatSearchResult } from './helpers.js';

const WEBSITE = "https://www.apple.com";
const SEARCH_STR = "iPhone 13";
const DEPTH = 2;

const tasks = {
  'findBySearchTerm': function (name, url, html) {
    const { store } = this;
    if (!store[name]) {
      store[name] = new Map();
    }
    const results = findText(html, SEARCH_STR);
    if (results.length > 0) {
      // We take only the first entry
      store[name].set(url, formatSearchResult(results[0], SEARCH_STR));
    }
  }
};

const crawler = new Crawler(DEPTH, tasks);

console.time('Processing time');
crawler.run(WEBSITE, function () {
  const { store } = this;
  console.timeEnd('Processing time');
  console.log(`Crawled ${store.processed} pages. Found ${store.findBySearchTerm.size} pages with the term '${SEARCH_STR}'.`);
  console.group('Results:');
  store.findBySearchTerm.forEach((str, page) => {
    console.log(`${page} => ${str}`);
  });
  console.groupEnd('Results:');
});