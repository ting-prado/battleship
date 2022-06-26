/* eslint-disable no-plusplus */
const Ship = (length) => {
  let pos;
  const hitmarks = [];

  const setPos = (posArr) => {
    pos = posArr;
  };

  const getLength = () => length;
  const getPos = () => pos;
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
    setPos,
    getPos,
    hit,
    getHits,
    isSunk,
  };
};

module.exports = Ship;
