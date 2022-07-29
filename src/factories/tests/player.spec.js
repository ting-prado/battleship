/* eslint-disable no-undef */
const Player = require('../player');
const Ship = require('../ship');

const ai = Player('comp');
const ship1 = Ship(4, [51, 52, 53, 54]);
const ship2 = Ship(3, [35, 45, 55]);
const human = Player();
ai.gameboard.placeShip(ship1);
human.gameboard.placeShip(ship2);

describe('functions for computer player', () => {
  test('ai attacks with no previous hit', () => {
    expect(ai.attack(human)).toEqual(expect.any(Object));
  });

  test('ai attacks with previous hit', () => {
    expect(ai.attack(human, 45)).toEqual(expect.any(Object));
  });

  test('check if won', () => {
    expect(ai.getWinStatus(human)).toBeFalsy();
  });
});

describe('functions for human player', () => {
  test('ai attacks with no previous hit', () => {
    expect(human.attack(ai, 51)).toBeTruthy();
  });

  test('ai attacks with previous hit', () => {
    expect(human.attack(ai, 63)).toBeFalsy();
  });

  test('check if won when enemy ship is not sunk', () => {
    expect(human.getWinStatus(ai)).toBeFalsy();
  });

  test('check if won when enemy ship is sunk', () => {
    human.attack(ai, 52);
    human.attack(ai, 53);
    human.attack(ai, 54);
    expect(human.getWinStatus(ai)).toBeTruthy();
  });
});
