import { readFileSync } from 'fs';
import { createServer } from 'http';
import { resolve } from 'path';
import slugify from 'slugify';
import { URL } from 'url';
import replaceTemplate from './modules/replaceTemplate.js';
//	in Node.js, '.js' needed for ES Modules, not for CommonJS

//	resolve() is not needed for CommonJS, but I'm using ES Modules for module 1
//	Will use CommonJS for module 2 for practice, specially as it has sections
//		on 'require' and 'module.exports'
const __dirname = resolve();
const hostName = 'localhost';
const port = 8080;

const dataString = readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataJSON = JSON.parse(dataString);

dataJSON.forEach(
  (el) => (el.slugName = slugify(el.productName, { lower: true }))
);

const overviewTemplate = readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const cardTemplate = readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const productTemplate = readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);

const baseURL = `http://${hostName}:${port}`;
createServer((req, res) => {
  let url;
  try {
    url = new URL(req.url, baseURL);
  } catch (error) {
    res.statusCode = 400;
    res.end('<h1>Bad Request</h1>');
    return;
  }

  const pathArray = url.pathname.split('/');

  switch (pathArray[1]) {
    case 'api':
      res.setHeader('Content-Type', 'application/json');
      res.end(dataJSON);
      break;

    // Overview page
    case '':
    case 'overview':
      const cardsHTML = dataJSON
        .map((el) => replaceTemplate(cardTemplate, el))
        .join('');

      const overviewHTML = overviewTemplate
        .toString()
        .replace('{%PRODUCT_CARDS%}', cardsHTML);

      res.setHeader('Content-Type', 'text/html');
      res.end(overviewHTML);
      break;

    // Product page
    case 'product':
      const product = dataJSON.find((el) => el.slugName === pathArray[2]);

      const productHTML = replaceTemplate(productTemplate, product);
      res.setHeader('Content-Type', 'text/html');
      res.end(productHTML);
      break;

    // Not found page
    default:
      res.writeHead(404, {
        'Content-Type': 'text/html',
        "Ziyad's-Header": 'Ziyad',
      });
      res.end('<h1>Page not found.</h1>');
      break;
  }
}).listen(port, hostName, () => console.log(`Listening on ${baseURL}...`));
//	listen takes an optional second argument - the host name (eg. 127.0.0.1)
