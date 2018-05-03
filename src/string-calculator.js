module.exports = text => {

  const getSeparators = text => {
    if (text.indexOf("][") !== -1)
      return ["\n"].concat(text.substr(3, text.indexOf("\n") - 4).split("]["));
    if (text.startsWith("//["))
      return ["\n", text.substr(3, text.indexOf("]") - 3)];
    if (text.startsWith("//"))
      return ["\n", text[2]];
    return ["\n"];
  };

  function escapeSeparator(separator) {
    let escapedSeparator = "";
    for (let charInSeparator of separator.split('')) {
      if (".()[]{}$^-/?*".indexOf(charInSeparator) === -1)
        escapedSeparator += charInSeparator;
      else
        escapedSeparator += `\\${charInSeparator}`;
    }
    return escapedSeparator;
  }

  const separators = getSeparators(text);

  let normalizedText = text;
  if (text.startsWith("//["))
    normalizedText = text.substr(text.indexOf("\n") + 1);
  else if (text.startsWith("//"))
    normalizedText = text.substr(4);

  for (let separator of separators) {
    const escapedSeparator = escapeSeparator(separator);
    normalizedText = normalizedText.replace(new RegExp(escapedSeparator, "g"), ',');
  }

  const negativeNumbers = [];
  let result = 0;
  for (let part of normalizedText.split(',')) {
    const number = parseInt(part, 10);
    if (number < 0)
      negativeNumbers.push(number);
    if (number < 1000)
      result += number;
  }
  if (negativeNumbers.length > 0)
    throw new Error(`Negative numbers are not allowed: ${negativeNumbers}`);
  return result;
};