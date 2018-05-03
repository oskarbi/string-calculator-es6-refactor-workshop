module.exports = text => {

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

  const checkNegativeNumbers = (normalizedText) => {
    const negativeNumbers = [];
    for (const part of normalizedText.split(',')) {
      const number = parseInt(part, 10);
      if (number < 0)
        negativeNumbers.push(number);
    }

    if (negativeNumbers.length > 0)
      throw new Error(`Negative numbers are not allowed: ${negativeNumbers}`);
  };

  const sumValues = (normalizedText) => {
    let result = 0;
    for (const part of normalizedText.split(',')) {
      const number = parseInt(part, 10);
      if (number < 1000)
        result += number;
    }

    return result;
  };

  const payload = removeHeader(text);
  const normalizedText = removeSeparators(text, payload);

  checkNegativeNumbers(normalizedText);

  return sumValues(normalizedText);
};