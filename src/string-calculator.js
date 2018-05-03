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

const parseNumbers = normalizedPayload => {
  return normalizedPayload.split(',').map(number => parseInt(number));
};

const checkNegatives = (numbers) => {
  const isNegative = number => (number < 0);
  const negativeNumbers = numbers.filter(isNegative);
  if (negativeNumbers.length > 0)
    throw new Error(`Negative numbers are not allowed: ${negativeNumbers}`);
};

const sumValues = (values) => {
  const isLessThan1000 = (number) => (number < 1000);
  const sum = (result, number) => result + number;
  return values.filter(isLessThan1000).reduce(sum, 0);
};

module.exports = text => {
  const payload = removeHeader(text);
  const normalizedPayload = removeSeparators(text, payload);
  const numbers = parseNumbers(normalizedPayload);
  checkNegatives(numbers);
  return sumValues(numbers);
};