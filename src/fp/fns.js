const identity = i => i;
const compose = (a, b) => input => b(a(input));
const pipe = (...fns) => fns.reduce(compose, identity);
const spread = (...fns) => value => fns.map(fn => fn(value));

module.exports = {identity, compose, pipe, spread};