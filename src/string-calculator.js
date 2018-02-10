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

const escapeSeparator = separator => {
  let escapedSeparator = "";
  for (let charInSeparator of separator.split('')) {
    if (".()[]{}$^-/?*".indexOf(charInSeparator) === -1)
      escapedSeparator += charInSeparator;
    else
      escapedSeparator += `\\${charInSeparator}`;
  }
  return escapedSeparator;
};

const normalizeText = (separators, normalizedText) => {
  for (let separator of separators) {
    const escapedSeparator = escapeSeparator(separator);
    normalizedText = normalizedText.replace(new RegExp(escapedSeparator, "g"), ',');
  }
  return normalizedText;
};

const checkNegatives = numbers => {
  const negativeNumbers = [];
  for (let part of numbers) {
    const number = parseInt(part, 10);
    if (number < 0)
      negativeNumbers.push(number);
  }
  if (negativeNumbers.length > 0)
    throw new Error(`Negative numbers are not allowed: ${negativeNumbers}`);
};

const sumNumbers = numbers => {
  let result = 0;
  for (let part of numbers) {
    const number = parseInt(part, 10);
    if (number < 1000)
      result += number;
  }
  return result;
};

module.exports = text => {
  let separators = extractSeparators(text);

  const rawText = extractText(text);

  const normalizedText = normalizeText(separators, rawText);

  let numbers = normalizedText.split(',');

  checkNegatives(numbers);

  return sumNumbers(numbers);
};