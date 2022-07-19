/* eslint-disable no-undef */
const Player = require('../player');
const Ship = require('../ship');

const ai = Player('comp');
const ship1 = Ship(4, ['(5, 1)', '(5, 2)', '(5, 3)', '(5, 4)']);
const ship2 = Ship(3, ['(3, 5)', '(4, 5)', '(5, 5)']);
const human = Player();
ai.gameboard.placeShip(ship1);
human.gameboard.placeShip(ship2);

describe('functions for computer player', () => {
  test('ai attacks with no previous hit', () => {
    expect(ai.attack(human)).toEqual(expect.any(Object));
  });

  test('ai attacks with previous hit', () => {
    expect(ai.attack(human, '(4, 5)')).toEqual(expect.any(Object));
  });

  test('check if won', () => {
    expect(ai.getWinStatus(human)).toBeFalsy();
  });
});

describe('functions for human player', () => {
  test('ai attacks with no previous hit', () => {
    expect(human.attack(ai, '(5, 1)')).toBeTruthy();
  });

  test('ai attacks with previous hit', () => {
    expect(human.attack(ai, '(6, 3)')).toBeFalsy();
  });

  test('check if won when enemy ship is not sunk', () => {
    expect(human.getWinStatus(ai)).toBeFalsy();
  });

  test('check if won when enemy ship is sunk', () => {
    human.attack(ai, '(5, 2)');
    human.attack(ai, '(5, 3)');
    human.attack(ai, '(5, 4)');
    expect(human.getWinStatus(ai)).toBeTruthy();
  });
});
