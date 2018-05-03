const removeHeader = text => {
  if (text.indexOf("][") !== -1)
    return ["\n"].concat(text.substr(3, text.indexOf("\n") - 4).split("]["));
  if (text.startsWith("//["))
    return ["\n", text.substr(3, text.indexOf("]") - 3)];
  if (text.startsWith("//"))
    return ["\n", text[2]];
  return ["\n"];
};

const escapeSeparator = separator => {
  const escapeCharacter = charInSeparator => {
    if (".()[]{}$^-/?*".indexOf(charInSeparator) === -1)
      return charInSeparator;
    else
      return `\\${charInSeparator}`;
  };

  return separator.split('').map(escapeCharacter).join('');
};

const substituteSeparators = (normalizedText, separators) => {
  const escapedSeparators = separators.map(escapeSeparator);
  for (const separator of escapedSeparators) {
    normalizedText = normalizedText.replace(new RegExp(separator, "g"), ',');
  }
  return normalizedText;
};

const removeSeparators = (text, separators) => {
  let normalizedText = text;
  if (text.startsWith("//["))
    normalizedText = text.substr(text.indexOf("\n") + 1);
  else if (text.startsWith("//"))
    normalizedText = text.substr(4);

  return substituteSeparators(normalizedText, separators);
};

const lessThanZero = number => (number < 0);
const lessThanThousand = (number) => (number < 1000);

const toInt = number => parseInt(number);
const parseNumbers = normalizedPayload => normalizedPayload.split(',').map(toInt);
const sum = (result, number) => result + number;

const checkNegatives = (numbers) => {
  const negativeNumbers = numbers.filter(lessThanZero);
  if (negativeNumbers.length > 0)
    throw new Error(`Negative numbers are not allowed: ${negativeNumbers}`);
};

module.exports = text => {
  const payload = removeHeader(text);
  const normalizedPayload = removeSeparators(text, payload);
  const numbers = parseNumbers(normalizedPayload);
  checkNegatives(numbers);
  return numbers
    .filter(lessThanThousand)
    .reduce(sum, 0);
};