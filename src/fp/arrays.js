const map = mapper => array => array.map(mapper);
const filter = predicate => array => array.filter(predicate);
const reduce = (composingFn, neutralValue) => array => array.reduce(composingFn, neutralValue);
const peek = fn => value => {
  fn(value);
  return value;
};

module.exports = {map, filter, reduce, peek};