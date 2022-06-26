/* eslint-disable one-var */
/* eslint-disable no-undef */
const Gameboard = require('../gameboard');
const Ship = require('../ship');

// eslint-disable-next-line one-var-declaration-per-line
let ship1, ship2;
beforeAll(() => {
  ship1 = Ship(4);
  ship2 = Ship(3);
  ship1.setPos(['(5, 1)', '(5, 2)', '(5, 3)', '(5, 4)']);
  ship2.setPos(['(4, 1)', '(4, 2)', '(4, 3)']);
  Gameboard.placeShip(ship1);
  Gameboard.placeShip(ship2);
});

test('attack hits a ship', () => {
  expect(Gameboard.receiveAttack('(4, 2)')).toBeTruthy();
});

test('attack does not hit a ship', () => {
  expect(Gameboard.receiveAttack('(6, 6)')).toBeFalsy();
});

test('view missed hits', () => {
  expect(Gameboard.getMissedHits()).toEqual(['(6, 6)']);
});

test('sink ship2', () => {
  Gameboard.receiveAttack('(4, 1)');
  Gameboard.receiveAttack('(4, 3)');
  expect(Gameboard.getSunken()).toEqual(['', 'x']);
});

test('sink ship1 and ship2', () => {
  Gameboard.receiveAttack('(5, 1)');
  Gameboard.receiveAttack('(5, 3)');
  Gameboard.receiveAttack('(5, 2)');
  Gameboard.receiveAttack('(5, 4)');
  expect(Gameboard.getSunken()).toEqual(['x', 'x']);
});

test('check if game is over', () => {
  expect(Gameboard.checkLost()).toBeTruthy();
});
