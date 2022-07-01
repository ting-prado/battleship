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

  const getSunken = () => sunken;

  return {
    placeShip,
    receiveAttack,
    getMissedHits,
    getSunken,
  };
};

module.exports = Gameboard;
