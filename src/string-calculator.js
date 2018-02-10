const extractSeparators = text => {
  if (text.indexOf("][") !== -1)
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
    .map(char => ".()[]{}$^-/?*".indexOf(char) === -1 ? char : `\\${char}`)
    .join('');

const normalizeText = (separators, normalizedText) => separators
    .map(escapeSeparator)
    .reduce((result, separator) => result.replace(new RegExp(separator, "g"), ','), normalizedText);

const checkNegatives = numbers => {
  const negativeNumbers = numbers.filter(number => number < 0);
  if (negativeNumbers.length > 0)
    throw new Error(`Negative numbers are not allowed: ${negativeNumbers}`);
};

const extractNumbers = normalizedText => normalizedText !== ''
    ? normalizedText.split(',').map(part => parseInt(part, 10))
    : [];

const discardInvalidNumbers = numbers => numbers.filter(number => number < 1000);

const sumNumbers = numbers => numbers.reduce((a, b) => a + b, 0);

module.exports = text => {
  const separators = extractSeparators(text);

  const rawText = extractText(text);

  const normalizedText = normalizeText(separators, rawText);

  const numbers = extractNumbers(normalizedText);

  checkNegatives(numbers);

  const validNumbers = discardInvalidNumbers(numbers);

  return sumNumbers(validNumbers);
};