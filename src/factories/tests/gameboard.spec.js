/* eslint-disable one-var */
/* eslint-disable no-undef */
const Gameboard = require('../gameboard');
const Ship = require('../ship');

// eslint-disable-next-line one-var-declaration-per-line
const gameboard = Gameboard();
const ship1 = Ship(2, ['(1, 2)', '(1, 3)']);
const ship2 = Ship(3, ['(4, 5)', '(5, 5)', '(6, 5)']);
gameboard.placeShip(ship1);
gameboard.placeShip(ship2);

test('attack hits a ship', () => {
  expect(gameboard.receiveAttack('(1, 2)')).toBeTruthy();
});

test('attack hits another ship', () => {
  expect(gameboard.receiveAttack('(5, 5)')).toBeTruthy();
});

test('attack does not hit a ship', () => {
  expect(gameboard.receiveAttack('(6, 6)')).toBeFalsy();
});

test('view missed hits', () => {
  expect(gameboard.getMissedHits()).toEqual(['(6, 6)']);
});

test('sink ship2 and check if all ships are sunk', () => {
  gameboard.receiveAttack('(4, 5)');
  gameboard.receiveAttack('(6, 5)');
  expect(gameboard.areAllSunken()).toBeFalsy();
});

test('sink ship1 and check if all ships are sunk', () => {
  gameboard.receiveAttack('(1, 3)');
  expect(gameboard.areAllSunken()).toBeTruthy();
});
