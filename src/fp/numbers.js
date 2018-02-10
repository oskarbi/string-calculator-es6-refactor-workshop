const toInt = text => parseInt(text, 10);
const lessThan = b => a => a < b;
const sum = (a, b) => a + b;

module.exports = {toInt, lessThan, sum};