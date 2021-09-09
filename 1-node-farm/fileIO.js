//  Note: 'utf-8' not needed for write
//      only used for console.log

//  Blocking, synchronous
// import { readFileSync, writeFileSync } from 'fs';
// const textIn = readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);
// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
// writeFileSync('./txt/output.txt', textOut);
// console.log('File written.');

//  Non-blocking, asynchronous
// import { readFile, writeFile } from 'fs';
// readFile('./txt/start.txt', (_err, filename) =>
//   readFile(`./txt/${filename}.txt`, (err, text) => {
//     if (err) console.log('Error:\n', err);
//     readFile('./txt/append.txt', (_err, appendix) =>
//       writeFile('./txt/final.txt', `${text} ${appendix}`, (_err) =>
//         console.log('Written.')
//       )
//     );
//   })
// );
// console.log('Reading...');

//  async await syntax
// import { readFile, writeFile } from 'fs/promises';
// try {
//   const appendixPromise = readFile('./txt/append.txt');
//   const filename = await readFile('./txt/start.txt');
//   const [text, appendix] = await Promise.all([
//     readFile(`./txt/${filename}.txt`),
//     appendixPromise,
//   ]);
//   writeFile('./txt/final.txt', `${text}\n${appendix}`);
// } catch (err) {
//   console.log('Error:\n', err);
// }

//  then catch syntax
import { readFile, writeFile } from 'fs/promises';
const appendixPromise = readFile('./txt/append.txt');
readFile('./txt/start.txt')
  .then((filename) => {
    return Promise.all([readFile(`./txt/${filename}.txt`), appendixPromise]);
  })
  .then(([text, appendix]) =>
    writeFile('./txt/final.txt', `${text}\n${appendix}`)
  )
  .catch((err) => console.log('Error:\n', err));
