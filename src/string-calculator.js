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

const normalizeText = (separators, normalizedText) => separators
    .map(escapeSeparator)
    .reduce((result, separator) => replaceAll(separator, ',', result), normalizedText);

const checkNegatives = numbers => {
  const negativeNumbers = numbers.filter(lessThan(0));
  if (negativeNumbers.length > 0)
    throw new Error(`Negative numbers are not allowed: ${negativeNumbers}`);
};

const extractNumbers = normalizedText => normalizedText !== ''
    ? normalizedText.split(',').map(toInt)
    : [];

const discardInvalidNumbers = numbers => numbers.filter(lessThan(1000));

const sumNumbers = numbers => numbers.reduce(sum, 0);

module.exports = text => {
  const separators = extractSeparators(text);

  const rawText = extractText(text);

  const normalizedText = normalizeText(separators, rawText);

  const numbers = extractNumbers(normalizedText);

  checkNegatives(numbers);

  const validNumbers = discardInvalidNumbers(numbers);

  return sumNumbers(validNumbers);
};