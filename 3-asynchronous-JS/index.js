//  Note: if a library doesn't support promises, we can use
//      promisify, or make them ourselves. (https://www.npmjs.com/package/promisify)
//
// const ReadFilePromise = (file) =>
//   new Promise((resolve, reject) =>
//     require('fs').readFile(file, (err, data) =>
//       err ? reject(err) : resolve(data)
//     )
//   );

const { readFile, writeFile } = require('fs/promises');
const axios = require('axios');

const URL = 'https://dog.ceo/api/breed/{%BREED%}/images/random';

readFile('dog.txt')
  .then((breed) => {
    const requestURL = URL.replace('{%BREED%}', breed);
    return Promise.all([
      axios.get(requestURL),
      axios.get(requestURL),
      axios.get(requestURL),
    ]);
  })
  .then((responses) =>
    writeFile(
      'dog-imgs.txt',
      responses.map((response) => response.data.message).join('\n')
    )
  )
  .then(() => console.log('File saved'))
  .catch((err) => {
    console.log('Error: ', err.message);
    if (err.response) console.log('Response: ', err.response.data);
  });

// (async () => {
//   try {
//     const breed = await readFile('dog.txt');
//     const requestURL = URL.replace('{%BREED%}', breed);
//     const responses = await Promise.all([
//       axios.get(requestURL),
//       axios.get(requestURL),
//       axios.get(requestURL),
//     ]);

//     await writeFile(
//       'dog-imgs.txt',
//       responses.map((response) => response.data.message).join('\n')
//     );
//     console.log('File saved');
//   } catch (err) {
//     console.log('Error: ', err.message);
//     if (err.response) console.log('Response: ', err.response.data);
//   }
// })();
