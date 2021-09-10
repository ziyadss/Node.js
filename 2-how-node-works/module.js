// console.log(arguments);
// console.log(require('module').wrapper);

//  module.exports
const ClassOne = require('./test-module-1');
const calc1 = new ClassOne();
console.log(calc1.multiply(3, 4));

//  exports
const { multiply } = require('./test-module-2');
console.log(multiply(3, 4));

//  caching
//      module runs once, function runs thrice
require('./test-module-3')();
require('./test-module-3')();
require('./test-module-3')();
