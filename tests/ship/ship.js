/* eslint-disable no-plusplus */
const Ship = (length) => {
  const pos = ['[5, 1]', '[5, 2]', '[5, 3]', '[5, 4]'];
  const hitmarks = [];

  const getLength = () => length;

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

    if (count === getLength()) return true;
  };

  return { getLength, hit, isSunk };
};

module.exports = Ship;
