/* eslint-disable no-undef */
const Ship = require('../ship');

const ship1 = Ship(4, ['(5, 1)', '(5, 2)', '(5, 3)', '(5, 4)']);
const ship2 = Ship(3, ['(3, 5)', '(4, 5)', '(5, 5)']);

test('get first ship info', () => {
  expect(ship1.getInfo()).toEqual({
    length: 4,
    pos: ['(5, 1)', '(5, 2)', '(5, 3)', '(5, 4)'],
    sunken: false,
  });
});

test('get second ship info', () => {
  expect(ship2.getInfo()).toEqual({
    length: 3,
    pos: ['(3, 5)', '(4, 5)', '(5, 5)'],
    sunken: false,
  });
});

test('check if first ship is sunk when hit once', () => {
  ship1.hit('(5, 1)');
  expect(ship1.getInfo()).toEqual({
    length: 4,
    pos: ['(5, 1)', '(5, 2)', '(5, 3)', '(5, 4)'],
    sunken: false,
  });
});

test('check if second ship is sunk when hit once', () => {
  ship2.hit('(4, 5)');
  expect(ship2.getInfo()).toEqual({
    length: 3,
    pos: ['(3, 5)', '(4, 5)', '(5, 5)'],
    sunken: false,
  });
});

test('check if first ship is sunk when all are hit', () => {
  ship1.hit('(5, 2)');
  ship1.hit('(5, 3)');
  ship1.hit('(5, 4)');
  expect(ship1.getInfo()).toEqual({
    length: 4,
    pos: ['(5, 1)', '(5, 2)', '(5, 3)', '(5, 4)'],
    sunken: true,
  });
});

test('check if first ship is sunk when all are hit', () => {
  ship2.hit('(3, 5)');
  ship2.hit('(5, 5)');
  expect(ship2.getInfo()).toEqual({
    length: 3,
    pos: ['(3, 5)', '(4, 5)', '(5, 5)'],
    sunken: true,
  });
});
