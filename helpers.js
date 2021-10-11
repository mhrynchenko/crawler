export const getInternalLinks = (html, domain) => {
  const re = new RegExp(`<a\\s+(?:[^>]*?\\s+)?href=(["'])(http.{3,4}${domain}|/\)(.*?)\\1`, 'gm');
  return [...html.matchAll(re)];
};

export const findText = (html, str) => {
  const re = new RegExp(`>\\b(.*)${str}(.*?)</`, 'gm');
  return [...html.matchAll(re)];
}

export const regExpToURL = (website, regEgResult) => website + '/' + regEgResult[3];

export const formatSearchResult = (regExpResults, searchStr) => regExpResults[1] + searchStr + regExpResults[2];