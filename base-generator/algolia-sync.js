/* eslint-disable @typescript-eslint/no-var-requires */
const algoliasearch = require('algoliasearch');
const client = algoliasearch(process.env.APP_ID, process.env.SECRET_KEY)
const index = client.initIndex(process.env.INDEX);

module.exports = index;