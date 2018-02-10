const identity = i => i;
const compose = (a, b) => input => b(a(input));
const pipe = (...fns) => fns.reduce(compose, identity);
const spread = (...fns) => value => fns.map(fn => fn(value));

const when = (defaultValue, ...pairs) => subject => {
  for (let [predicate, mapper] of pairs)
    if (predicate(subject))
      return mapper(subject);
  return defaultValue;
};

module.exports = {identity, compose, pipe, spread, when};