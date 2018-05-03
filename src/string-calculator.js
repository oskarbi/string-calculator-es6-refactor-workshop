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
  let escapedSeparator = "";
  for (const charInSeparator of separator.split('')) {
    if (".()[]{}$^-/?*".indexOf(charInSeparator) === -1)
      escapedSeparator += charInSeparator;
    else
      escapedSeparator += `\\${charInSeparator}`;
  }
  return escapedSeparator;
};

const substituteSeparators = (normalizedText, separators) => {
  for (let separator of separators) {
    const escapedSeparator = escapeSeparator(separator);
    normalizedText = normalizedText.replace(new RegExp(escapedSeparator, "g"), ',');
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

const getNumbers = normalizedPayload => {
  const numbers = [];
  for (const part of normalizedPayload.split(',')) {
    numbers.push(parseInt(part));
  }
  return numbers;
};

const checkNegatives = (numbers) => {
  const negativeNumbers = [];
  for (const number of numbers) {
    if (number < 0)
      negativeNumbers.push(number);
  }

  if (negativeNumbers.length > 0)
    throw new Error(`Negative numbers are not allowed: ${negativeNumbers}`);
};

const sumValues = (values) => {
  const sumator = (result, number) => {
    return number < 1000 ? result + number : result;
  };
  return values.reduce(sumator, 0);
};

module.exports = text => {
  const payload = removeHeader(text);
  const normalizedPayload = removeSeparators(text, payload);
  const numbers = getNumbers(normalizedPayload);
  checkNegatives(numbers);
  return sumValues(numbers);
};