/* eslint-disable no-plusplus */
const Ship = (length, pos) => {
  const hitmarks = [];

  // eslint-disable-next-line no-unused-vars
  const fillHits = (() => {
    for (let i = 0; i < length; i++) {
      hitmarks[i] = '';
    }
  })();

  const hit = (hitPos) => {
    const index = pos.indexOf(hitPos);
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

  const changePos = (newPos) => {
    pos = newPos;
  };

  const getLength = () => length;
  const getPos = () => pos;

  return {
    getLength,
    getPos,
    hit,
    isSunk,
    changePos,
  };
};

module.exports = Ship;
