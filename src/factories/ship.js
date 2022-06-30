/* eslint-disable no-plusplus */
const Ship = (length, pos) => {
  const hitmarks = [];

  // eslint-disable-next-line no-unused-vars
  const fillHits = (() => {
    for (let i = 0; i < length; i++) {
      hitmarks[i] = '';
    }
  })();

  const hit = (coord) => {
    const index = pos.indexOf(coord);
    hitmarks[index] = 'x';
  };

  // eslint-disable-next-line consistent-return
  const isSunk = () => {
    let count = 0;
    hitmarks.forEach((mark) => {
      if (mark === 'x') {
        count++;
      }
    });

    return count === length;
  };

  const getInfo = () => {
    const info = { length, pos, sunken: isSunk() };
    return info;
  };

  return {
    getInfo,
    hit,
    isSunk,
  };
};

module.exports = Ship;
