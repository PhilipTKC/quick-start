import algoliasearch from 'algoliasearch';

if (!process.env.APP_ID || !process.env.SECRET_KEY || !process.env.INDEX) {
    throw new Error('Algolia credentials not found. Please set APP_ID, SECRET_KEY and INDEX environment variables.');
}

const client = algoliasearch(process.env.APP_ID, process.env.SECRET_KEY)
const index = client.initIndex(process.env.INDEX);

export { index };