/* eslint-disable no-plusplus */
const Ship = (length) => {
  const pos = ['[5, 1]', '[5, 2]', '[5, 3]', '[5, 4]'];
  const hitmarks = [];

  const getLength = () => length;
  // eslint-disable-next-line no-unused-vars
  const fillHits = (() => {
    for (let i = 0; i < getLength(); i++) {
      hitmarks[i] = '';
    }
  })();

  const hit = (coord) => {
    const index = pos.indexOf(coord);
    hitmarks[index] = 'x';
  };

  const getHits = () => hitmarks;

  // eslint-disable-next-line consistent-return
  const isSunk = () => {
    let count = 0;
    hitmarks.forEach((mark) => {
      if (mark === 'x') {
        count++;
      }
    });

    if (count === getLength()) return true;
  };

  return {
    getLength,
    hit,
    getHits,
    isSunk,
  };
};

module.exports = Ship;
