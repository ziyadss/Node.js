const { readFile } = require('fs');
const { pbkdf2 } = require('crypto');

console.time('event-loop');
console.timeLog('event-loop', 'First line');

setTimeout(() => console.timeLog('event-loop', 'Timer 1 finished'), 0);
setImmediate(() => console.timeLog('event-loop', 'Immediate 1 finished'));

readFile('test-file.txt', () => {
  console.timeLog('event-loop', 'File read finished');
  console.log('------------------------------------------');
  setTimeout(() => console.timeLog('event-loop', 'Timer 2 finished'), 0);
  setTimeout(() => console.timeLog('event-loop', 'Timer 3 finished'), 3000);
  setImmediate(() => console.timeLog('event-loop', 'Immediate 2 finished'));

  process.nextTick(() => console.timeLog('event-loop', 'Next tick finished'));

  pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log('------------------------------------------');
    console.timeLog('event-loop', 'Hash finished');
  });
  pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log('------------------------------------------');
    console.timeLog('event-loop', 'Hash finished');
  });
  pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log('------------------------------------------');
    console.timeLog('event-loop', 'Hash finished');
  });
});

console.timeLog('event-loop', 'Last line');
