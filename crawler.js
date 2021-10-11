import got from 'got';
import async from 'async';

import { getInternalLinks, regExpToURL } from './helpers.js';

export default class Crawler {
  constructor(depth, tasks) {
    this.store = {
      website: null,
      visited: new Set(),
      processed: 0
    };
    this.queue = async.queue(async ({ lvl, url }) => {
      if (lvl > depth) return;

      const { body } = await got(url, {
        timeout: {
          lookup: 100,
          connect: 50,
          secureConnect: 50,
          socket: 500,
          send: 1000,
          response: 500
        }
      });

      // Run custom tasks
      for (let name in tasks) {
        tasks[name].call(this, name, url, body);
      }

      // Build site tree
      getInternalLinks(body).forEach(l => {
        const processLink = regExpToURL(this.website, l);
        if (!this.store.visited.has(processLink)) {
          this.store.visited.add(processLink);
          this.queue.push({
            lvl: lvl + 1,
            url: processLink
          });
        }
      });
      this.store.processed++;
    }, 1000 /* 1000 parallel tasks */);
  }

  run(website, cb) {
    this.website = website;
    this.queue.push({ lvl: 0, url: website });
    this.queue.drain(cb.bind(this));
  }
};