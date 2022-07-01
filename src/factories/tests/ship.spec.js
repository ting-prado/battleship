/* eslint-disable no-undef */
const Ship = require('../ship');

const ship1 = Ship(4, ['(5, 1)', '(5, 2)', '(5, 3)', '(5, 4)']);
const ship2 = Ship(3, ['(3, 5)', '(4, 5)', '(5, 5)']);

test('get first ship length', () => {
  expect(ship1.getLength()).toBe(4);
});

test('get second ship position', () => {
  expect(ship2.getPos()).toEqual(['(3, 5)', '(4, 5)', '(5, 5)']);
});

test('is first ship sunk when hit once', () => {
  ship1.hit('(5, 1)');
  expect(ship1.isSunk()).toBeFalsy();
});

test('is second ship sunk when all are hit', () => {
  ship2.hit('(5, 5)');
  ship2.hit('(3, 5)');
  ship2.hit('(4, 5)');
  expect(ship2.isSunk()).toBeTruthy();
});

test('is first ship sunk when all are hit', () => {
  ship1.hit('(5, 2)');
  ship1.hit('(5, 3)');
  ship1.hit('(5, 4)');
  expect(ship1.isSunk()).toBeTruthy();
});
