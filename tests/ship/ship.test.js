/* eslint-disable no-undef */
const Ship = require('./ship');

test('sample', () => {
  const sample = Ship(4);
  expect(sample.getLength(4)).toEqual(4);
});
