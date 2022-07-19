/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
const Gameboard = require('./gameboard');

const Player = (type = 'human') => {
  const gameboard = Gameboard();
  const getWinStatus = (enemy) => enemy.gameboard.areAllSunken();

  const getCoord = (coord) => {
    // if prevCoord is undefined, choose random coord
    // check if random coord is hit or not
    // if not hit, return coord
    // if hit, choose another one
    let chosenCoord;

    const getRandomNum = () => {
      const min = Math.ceil(1); // inclusive
      const max = Math.floor(11); // exclusive
      return Math.floor(Math.random() * (max - min) + min);
    };

    const checkIfAvail = (tempCoord) =>
      !gameboard.getHits().includes(tempCoord);

    const getRandomCoord = () => {
      let avail;
      let newCoord;

      while (!avail) {
        newCoord = `(${getRandomNum()}, ${getRandomNum()})`;
        avail = checkIfAvail(newCoord);
      }

      return newCoord;
    };

    if (coord === null) {
      chosenCoord = getRandomCoord();
    } else {
      // get both row and col numbers
      // if 10, only decrease either row or col by 1 and check if hit
      // if not, either add or subtract 1 from row or col
      // check random surrounding coord if hit until you find a coord available
      // if surrounding coords are hit, pick a random coord instead
      const selection = [coord[1], coord[4]];
      let avail, tempCoord;

      const getFormat = (i) => {
        // eslint-disable-next-line default-case
        switch (i) {
          case 0:
            return `(${selection[0]}, ${Number(selection[1]) + 1})`;
          case 1:
            return `(${selection[0]}, ${Number(selection[1]) - 1})`;
          case 2:
            return `(${Number(selection[0]) + 1}, ${selection[1]})`;
          case 3:
            return `(${Number(selection[0]) - 1}, ${selection[1]})`;
        }
      };

      // select randomly if one or zero
      // if zero, loop from ltr
      // if one, loop from rtl
      // every loop check if coord is available
      // return if available
      // loop 4 times
      // if resulting coord is 11, ignore it
      const randomizer = Math.floor(Math.random() * 2);
      if (randomizer === 0) {
        for (let i = 0; i < 4; i++) {
          tempCoord = getFormat(i);
          if (tempCoord[1] === 11 || tempCoord[4] === 11) {
            continue;
          }

          avail = checkIfAvail(tempCoord);
          if (avail) {
            chosenCoord = tempCoord;
            break;
          }
        }
        if (!avail) {
          chosenCoord = getRandomCoord();
        }
      } else {
        for (let i = 3; i >= 0; i--) {
          tempCoord = getFormat(i);
          avail = checkIfAvail(tempCoord);
          if (avail) {
            chosenCoord = tempCoord;
            break;
          }
        }
        if (!avail) {
          chosenCoord = getRandomCoord();
        }
      }
    }
    return chosenCoord;
  };

  const attack = (enemy, coord = null) => {
    const attCoord = type === 'comp' ? getCoord(coord) : coord;
    const isHit = enemy.gameboard.receiveAttack(attCoord);
    if (type === 'comp') {
      return { isHit, hitCoord: attCoord };
    }

    return isHit;
  };

  return { getWinStatus, gameboard, attack };
};

module.exports = Player;
