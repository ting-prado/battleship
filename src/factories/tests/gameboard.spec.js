/* eslint-disable one-var */
/* eslint-disable no-undef */
const Gameboard = require('../gameboard');
const Ship = require('../ship');

// eslint-disable-next-line one-var-declaration-per-line
const gameboard = Gameboard();
const ship1 = Ship(2, [12, 13]);
const ship2 = Ship(3, [45, 55, 65]);
gameboard.placeShip(ship1);
gameboard.placeShip(ship2);

test('get all positions of ships', () => {
  expect(gameboard.getAllPos()).toEqual([12, 13, 45, 55, 65]);
});

test('get all positions of ships when a ship position is changed', () => {
  ship1.changePos([14, 15]);
  expect(gameboard.getAllPos()).toEqual([14, 15, 45, 55, 65]);
});

test('attack hits a ship', () => {
  expect(gameboard.receiveAttack(14)).toBeTruthy();
});

test('attack hits another ship', () => {
  expect(gameboard.receiveAttack(55)).toBeTruthy();
});

test('attack does not hit a ship', () => {
  expect(gameboard.receiveAttack(66)).toBeFalsy();
});

test('get all hits', () => {
  expect(gameboard.getHits()).toEqual([14, 55, 66]);
});

test('view missed hits', () => {
  expect(gameboard.getMissedHits()).toEqual([66]);
});

test('sink ship2 and check if all ships are sunk', () => {
  gameboard.receiveAttack(45);
  gameboard.receiveAttack(65);
  expect(gameboard.areAllSunken()).toBeFalsy();
});

test('sink ship1 and check if all ships are sunk', () => {
  gameboard.receiveAttack(15);
  expect(gameboard.areAllSunken()).toBeTruthy();
});
