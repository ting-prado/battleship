/* eslint-disable no-plusplus */
const Gameboard = () => {
  const ships = [];
  const missedHits = [];
  const sunken = [];
  const hits = [];

  const placeShip = (ship) => {
    ships.push(ship);
    sunken.push('');
  };

  const getMissedHits = () => missedHits;

  const getHits = () => hits;

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
          hits.push(coord);
          checkSunken(ship);
        }
      });
    });

    if (!isShipHit) {
      hits.push(coord);
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

  const getAllPos = () => {
    const arr = [];
    ships.forEach((ship) => {
      ship.getPos().forEach((pos) => {
        arr.push(pos);
      });
    });
    return arr;
  };

  return {
    placeShip,
    receiveAttack,
    getMissedHits,
    areAllSunken,
    getHits,
    getAllPos,
  };
};

module.exports = Gameboard;
