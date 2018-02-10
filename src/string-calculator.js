const replaceAll = (search, replacement, text) => text.replace(new RegExp(search, "g"), replacement);
const contains = (token, text) => text.indexOf(token) > -1;

const toInt = text => parseInt(text, 10);
const lessThan = b => a => a < b;
const sum = (a, b) => a + b;

const extractSeparators = text => {
  if (contains("][", text))
    return ["\n"].concat(text.substr(3, text.indexOf("\n") - 4).split("]["));
  if (text.startsWith("//["))
    return ["\n", text.substr(3, text.indexOf("]") - 3)];
  if (text.startsWith("//"))
    return ["\n", text[2]];
  return ["\n"];
};

const extractText = text => {
  if (text.startsWith("//["))
    return text.substr(text.indexOf("\n") + 1);
  if (text.startsWith("//"))
    return text.substr(4);
  return text;
};

const escapeSeparator = separator => separator
    .split('')
    .map(char => !contains(char, ".()[]{}$^-/?*") ? char : `\\${char}`)
    .join('');

const normalizeText = ([separators, text]) => separators
    .map(escapeSeparator)
    .reduce((result, separator) => replaceAll(separator, ',', result), text);

const checkNegatives = numbers => {
  const negativeNumbers = numbers.filter(lessThan(0));
  if (negativeNumbers.length > 0)
    throw new Error(`Negative numbers are not allowed: ${negativeNumbers}`);
};

const identity = i => i;
const compose = (a, b) => input => b(a(input));
const pipe = (...fns) => fns.reduce(compose, identity);

const split = separator => text => text.split(separator);
const map = mapper => array => array.map(mapper);
const filter = predicate => array => array.filter(predicate);
const reduce = (composingFn, neutralValue) => array => array.reduce(composingFn, neutralValue);

const peek = fn => value => {
  fn(value);
  return value;
};

const spread = (...fns) => value => fns.map(fn => fn(value));

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