/* eslint-disable no-plusplus */
const Gameboard = () => {
  const ships = [];
  const missedHits = [];
  const sunken = [];

  // eslint-disable-next-line no-unused-vars
  const addSunkenArr = () => {
    sunken.push('');
  };

  const placeShip = (ship) => {
    ships.push(ship);
    addSunkenArr();
  };

  const getMissedHits = () => missedHits;

  // eslint-disable-next-line consistent-return
  const checkLost = () => {
    let count = 0;
    sunken.forEach((mark) => {
      if (mark === 'x') {
        count++;
      }
    });

    if (count === ships.length) return true;
  };

  const checkSunken = (ship) => {
    if (ship.isSunk()) {
      const index = ships.indexOf(ship);
      sunken[index] = 'x';
    }
  };

  const receiveAttack = (coord) => {
    let isShipHit = false;
    ships.forEach((ship) => {
      ship.getPos().forEach((pos) => {
        if (pos === coord) {
          isShipHit = true;
          ship.hit(coord);
          checkSunken(ship);
        }
      });
    });

    if (!isShipHit) {
      missedHits.push(coord);
    }

    return isShipHit;
  };

  const getSunken = () => sunken;

  return {
    placeShip,
    receiveAttack,
    getMissedHits,
    getSunken,
    checkLost,
  };
};

module.exports = Gameboard;
