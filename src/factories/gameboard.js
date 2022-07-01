/* eslint-disable no-plusplus */
const Gameboard = () => {
  const ships = [];
  const missedHits = [];
  const sunken = [];

  const placeShip = (ship) => {
    ships.push(ship);
    sunken.push('');
  };

  const getMissedHits = () => missedHits;

  const checkSunken = (ship) => {
    if (ship.isSunk()) {
      const index = ships.indexOf(ship);
      sunken[index] = 'x';
    }
  };

  const receiveAttack = (coord) => {
    let isShipHit = false;
    ships.forEach((ship) => {
      ship.getPos().forEach((position) => {
        if (position === coord) {
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

  // eslint-disable-next-line consistent-return
  const areAllSunken = () => {
    let count = 0;
    sunken.forEach((mark) => {
      if (mark === 'x') {
        count++;
      }
    });

    return count === ships.length;
  };

  return {
    placeShip,
    receiveAttack,
    getMissedHits,
    areAllSunken,
  };
};

module.exports = Gameboard;
