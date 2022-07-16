/* eslint-disable no-plusplus */
const Gameboard = require('./gameboard');

const Player = () => {
  const gameboard = Gameboard();
  const getWinStatus = () => gameboard.areAllSunken();

  const getCoord = (prevCoord) => {
    // if prevCoord is undefined, choose random coord
    // check if random coord is hit or not
    // if not hit, return coord
    // if hit, choose another one
    let randCoord;

    const getRandomNum = () => {
      const min = Math.ceil(1);
      const max = Math.floor(11);
      return Math.floor(Math.random() * (max - min) + min);
    };

    const checkIfAvail = (coord) => !gameboard.getHits().includes(coord);

    const getRandomCoord = () => {
      let avail;
      let newCoord;

      while (!avail) {
        newCoord = `(${getRandomNum()}, ${getRandomNum()})`;
        avail = checkIfAvail(newCoord);
      }

      return newCoord;
    };

    if (prevCoord === null) {
      randCoord = getRandomCoord();
    }

    return randCoord;
  };

  const attack = (enemy, coord, prevCoord = undefined) => {
    const attCoord = prevCoord !== undefined ? getCoord(prevCoord) : coord;
    enemy.gameboard.receiveAttack(attCoord);
    return attCoord;
  };

  return { getWinStatus, gameboard, attack };
};

module.exports = Player;
