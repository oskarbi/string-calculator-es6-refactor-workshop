const {toInt, lessThan, sum} = require('./fp/numbers');
const {contains, startsWith, replaceAll, split, escapeRegex} = require('./fp/strings');
const {pipe, spread, when} = require('./fp/fns');
const {map, filter, reduce, peek} = require('./fp/arrays');

const START_OF_HEADER_CHAR = "//";
const END_OF_HEADER_CHAR = "\n";
const SEPARATOR_SEPARATOR = "][";

const extractRawSeparators = text => text.substr(3, text.indexOf(END_OF_HEADER_CHAR) - 4);

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
        when(["\n"],
            [contains(SEPARATOR_SEPARATOR), text => ["\n"].concat(extractRawSeparators(text).split(SEPARATOR_SEPARATOR))],
            [startsWith(START_OF_HEADER_CHAR), text => ["\n", extractRawSeparators(text)]]
        ),
        when(text,
            [startsWith(START_OF_HEADER_CHAR), text => text.substr(text.indexOf(END_OF_HEADER_CHAR) + 1)]
        )
    ),
    normalizeText,
    split(','),
    map(toInt),
    peek(checkNegatives),
    filter(lessThan(1000)),
    reduce(sum, 0)
);