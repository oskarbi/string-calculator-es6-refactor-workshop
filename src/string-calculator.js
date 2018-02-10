const {toInt, lessThan, sum} = require('./fp/numbers');
const {contains, replaceAll, split, escapeRegex} = require('./fp/strings');
const {pipe, spread} = require('./fp/fns');
const {map, filter, reduce, peek} = require('./fp/arrays');

const START_OF_HEADER_CHAR = "//";
const END_OF_HEADER_CHAR = "\n";
const SEPARATOR_SEPARATOR = "][";

const extractRawSeparators = text => text.substr(3, text.indexOf(END_OF_HEADER_CHAR) - 4);

const extractSeparators = text => {
  if (contains(SEPARATOR_SEPARATOR, text))
    return ["\n"].concat(extractRawSeparators(text).split(SEPARATOR_SEPARATOR));
  if (text.startsWith(START_OF_HEADER_CHAR))
    return ["\n", extractRawSeparators(text)];
  return ["\n"];
};

const extractText = text => text.startsWith(START_OF_HEADER_CHAR)
    ? text.substr(text.indexOf(END_OF_HEADER_CHAR) + 1)
    : text;

const normalizeText = ([separators, text]) => separators
    .map(escapeRegex)
    .reduce((result, separator) => replaceAll(separator, ',', result), text);

const checkNegatives = numbers => {
  const negativeNumbers = numbers.filter(lessThan(0));
  if (negativeNumbers.length > 0)
    throw new Error(`Negative numbers are not allowed: ${negativeNumbers}`);
};

module.exports = pipe(
    spread(
        extractSeparators,
        extractText
    ),
    normalizeText,
    split(','),
    map(toInt),
    peek(checkNegatives),
    filter(lessThan(1000)),
    reduce(sum, 0)
);