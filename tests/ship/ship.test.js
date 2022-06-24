/* eslint-disable no-undef */
const Ship = require('./ship');

describe('ship with length 4', () => {
  let ship;
  beforeAll(() => {
    ship = Ship(4);
    ship.setPos(['(5, 1)', '(5, 2)', '(5, 3)', '(5, 4)']);
  });

  test('get length', () => {
    expect(ship.getLength()).toBe(4);
  });

  test('hit ship at loc 1', () => {
    ship.hit('(5, 1)');
    expect(ship.getHits()).toEqual(['x', '', '', '']);
  });

  test('hit ship again at loc 4', () => {
    ship.hit('(5, 4)');
    expect(ship.getHits()).toEqual(['x', '', '', 'x']);
  });

  test('is ship sunk when not all are hit', () => {
    expect(ship.isSunk()).toBeFalsy();
  });

  test('is ship sunk when all are hit', () => {
    ship.hit('(5, 2)');
    ship.hit('(5, 3)');
    expect(ship.isSunk()).toBeTruthy();
  });
});

describe('ship with length 3', () => {
  let ship;
  beforeAll(() => {
    ship = Ship(3);
    ship.setPos(['(5, 1)', '(5, 2)', '(5, 3)']);
  });

  test('get length', () => {
    expect(ship.getLength()).toBe(3);
  });

  test('hit ship at loc 2', () => {
    ship.hit('(5, 2)');
    expect(ship.getHits()).toEqual(['', 'x', '']);
  });

  test('hit ship again at loc 1', () => {
    ship.hit('(5, 1)');
    expect(ship.getHits()).toEqual(['x', 'x', '']);
  });

  test('is ship sunk when not all are hit', () => {
    expect(ship.isSunk()).toBeFalsy();
  });

  test('is ship sunk when all are hit', () => {
    ship.hit('(5, 3)');
    expect(ship.isSunk()).toBeTruthy();
  });
});

describe('ship with length 2', () => {
  let ship;
  beforeAll(() => {
    ship = Ship(2);
    ship.setPos(['(5, 1)', '(5, 2)']);
  });

  test('get length', () => {
    expect(ship.getLength()).toBe(2);
  });

  test('hit ship at loc 2', () => {
    ship.hit('(5, 2)');
    expect(ship.getHits()).toEqual(['', 'x']);
  });

  test('is ship sunk when not all are hit', () => {
    expect(ship.isSunk()).toBeFalsy();
  });

  test('is ship sunk when all are hit', () => {
    ship.hit('(5, 1)');
    expect(ship.isSunk()).toBeTruthy();
  });
});

describe('ship with length 1', () => {
  let ship;
  beforeAll(() => {
    ship = Ship(1);
    ship.setPos(['(5, 1)']);
  });

  test('get length', () => {
    expect(ship.getLength()).toBe(1);
  });

  test('get hitmark', () => {
    expect(ship.getHits()).toStrictEqual(['']);
  });

  test('is ship sunk when not hit', () => {
    expect(ship.isSunk()).toBeFalsy();
  });

  test('is ship sunk when all are hit', () => {
    ship.hit('(5, 1)');
    expect(ship.isSunk()).toBeTruthy();
  });
});
