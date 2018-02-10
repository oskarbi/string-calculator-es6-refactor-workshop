const contains = token => text => text.indexOf(token) > -1;
const startsWith = prefix => text => text.startsWith(prefix);
const replaceAll = (search, replacement, text) => text.replace(new RegExp(search, "g"), replacement);
const split = separator => text => text.split(separator);
const escapeRegex = regex => regex
    .split('')
    .map(char => !contains(char, ".()[]{}$^-/?*") ? char : `\\${char}`)
    .join('');

module.exports = {contains, startsWith, replaceAll, split, escapeRegex};