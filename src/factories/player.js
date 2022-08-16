/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
const Gameboard = require('./gameboard');

const Player = (type = 'human') => {
  const gameboard = Gameboard();
  const getWinStatus = (enemy) => enemy.gameboard.areAllSunken();

  const getPos = (enemy, pos) => {
    // if prevPos is undefined, choose random pos
    // check if random pos is hit or not
    // if not hit, return pos
    // if hit, choose another one
    let chosenPos;

    const getRandomNum = () => {
      const min = Math.ceil(0); // inclusive
      const max = Math.floor(100); // exclusive
      return Math.floor(Math.random() * (max - min) + min);
    };

    const checkIfAvail = (tempPos) =>
      !enemy.gameboard.getHits().includes(tempPos);

    const getRandomPos = () => {
      let avail;
      let newPos;

      while (!avail) {
        newPos = getRandomNum();
        avail = checkIfAvail(newPos);
      }

      return newPos;
    };

    if (pos === null) {
      chosenPos = getRandomPos();
    } else {
      // check random surrounding pos if hit until you find a pos available
      // if surrounding positions are hit, pick a random pos instead
      let avail, tempPos;

      const getNewPos = (i) => {
        // eslint-disable-next-line default-case
        switch (i) {
          case 0:
            return pos + 1;
          case 1:
            return pos - 1;
          case 2:
            return pos + 10;
          case 3:
            return pos - 10;
        }
      };

      // select randomly if one or zero
      // if zero, loop from ltr
      // if one, loop from rtl
      // every loop check if coord is available
      // return if available
      // loop 4 times
      // if resulting coord is 100, ignore it
      const randomizer = Math.floor(Math.random() * 2);
      if (randomizer === 0) {
        for (let i = 0; i < 4; i++) {
          tempPos = getNewPos(i);
          if (tempPos > 99 || tempPos < 0) {
            continue;
          }

          avail = checkIfAvail(tempPos);
          if (avail) {
            chosenPos = tempPos;
            break;
          }
        }
        if (!avail) {
          chosenPos = getRandomPos();
        }
      } else {
        for (let i = 3; i >= 0; i--) {
          tempPos = getNewPos(i);
          avail = checkIfAvail(tempPos);
          if (avail) {
            chosenPos = tempPos;
            break;
          }
        }
        if (!avail) {
          chosenPos = getRandomPos();
        }
      }
    }
    return chosenPos;
  };

  const attack = (enemy, pos = null) => {
    const attPos = type === 'comp' ? getPos(enemy, pos) : pos;
    const isHit = enemy.gameboard.receiveAttack(attPos);
    if (type === 'comp') {
      return { isHit, hitPos: attPos };
    }

    return isHit;
  };

  return { getWinStatus, gameboard, attack, type };
};

module.exports = Player;
