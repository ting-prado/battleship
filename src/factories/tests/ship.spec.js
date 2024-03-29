/* eslint-disable no-undef */
const Ship = require('../ship');

const ship1 = Ship(4, [35, 36, 37, 38]);
const ship2 = Ship(3, [54, 64, 74]);

test('get first ship length', () => {
  expect(ship1.getLength()).toBe(4);
});

test('get second ship position', () => {
  expect(ship2.getPos()).toEqual([54, 64, 74]);
});

test('is first ship sunk when position is changed and hit once', () => {
  ship1.changePos([65, 66, 67, 68]);
  ship1.hit(65);
  expect(ship1.isSunk()).toBeFalsy();
});

test('is second ship sunk when all are hit', () => {
  ship2.hit(54);
  ship2.hit(64);
  ship2.hit(74);
  expect(ship2.isSunk()).toBeTruthy();
});

test('is first ship sunk when all are hit', () => {
  ship1.hit(66);
  ship1.hit(67);
  ship1.hit(68);
  expect(ship1.isSunk()).toBeTruthy();
});
