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

const normalize = text => {
  const payload = removeHeader(text);
  return removeSeparators(text, payload);
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

const lessThan = threshold => number => (number < threshold);
const toInt = number => parseInt(number);
const separateParts = normalizedPayload => normalizedPayload.split(',');
const parseNumbers = numbers => numbers.map(toInt);
const sum = (result, number) => result + number;

const checkNegatives = (numbers) => {
  const negativeNumbers = numbers.filter(lessThan(0));
  if (negativeNumbers.length > 0)
    throw new Error(`Negative numbers are not allowed: ${negativeNumbers}`);
};

const tap = fn => arg => {
  fn(arg);
  return arg;
};
const compose = (fnA, fnB) => text => fnB(fnA(text));
const identity = i => i;
const pipe = (...fns) => fns.reduce(compose, identity);

const filter = predicate => array => array.filter(predicate);
const reduce = (composingFn, neutralValue) => array => array.reduce(composingFn, neutralValue);

module.exports = text => {
  const fn = pipe(
    normalize,
    separateParts,
    parseNumbers,
    tap(checkNegatives),
    filter(lessThan(1000)),
    reduce(sum, 0)
  );

  return fn(text);
};