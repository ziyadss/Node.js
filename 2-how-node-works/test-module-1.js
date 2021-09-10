//  Class exported, can instead export an object
//  Class used as new ImportName().add(1,2)
//  Object used as ImportName.add(1,2)
//  Object export equivalent to multiple export.item = val;

module.exports = class {
  add = (a, b) => a + b;
  subtract = (a, b) => a - b;
  multiply = (a, b) => a * b;
  divide = (a, b) => a / b;
};
