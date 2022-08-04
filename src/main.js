/* eslint-disable default-case */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
import * as dom from './dom';
import Ship from './factories/ship';
import Player from './factories/player';

// main game loop
// starts with creating players & populate each gameboard
// create human player & gameboard first
// place ships on player gameboard
// create comp player & gameboard
// place ships in random position in enemy gameboard
// display both gameboards
// game loop should step through the game turn by turn
// using only function inside the game loop
// create conditions so that the game ends once
// one player's ships have all been sunk
const gameFunc = (() => {
  const checkAvailPos = (length, orientation) => {
    const arr = [];
    if (orientation === 'portrait') {
      switch (length) {
        case 4:
          for (let i = 0; i < 70; i++) {
            arr.push(i);
          }
          break;
        case 3:
          for (let i = 0; i < 80; i++) {
            arr.push(i);
          }
          break;
        case 2:
          for (let i = 0; i < 90; i++) {
            arr.push(i);
          }
          break;
        case 1:
          for (let i = 0; i < 100; i++) {
            arr.push(i);
          }
          break;
      }
    } else {
      let limits;
      switch (length) {
        case 4:
          limits = [7, 8, 9];
          break;
        case 3:
          limits = [8, 9];
          break;
        case 2:
          limits = [9];
          break;
      }
      for (let i = 0; i < 100; i++) {
        const numStr = i.toString();
        let avail = true;
        limits.forEach((num) => {
          if (i === num || numStr[1] == num) {
            avail = false;
          }
        });
        if (avail) {
          arr.push(i);
        }
      }
    }
    return arr;
  };

  const createPlayerShips = (player) => {
    const checkPos = (pos) => {
      let avail = true;
      pos.forEach((item) => {
        if (player.gameboard.getAllPos().includes(item)) {
          avail = false;
        }
      });
      return avail;
    };

    if (player.type === 'human') {
      const grids = document.querySelectorAll('.grid');
      let length = 4;
      let count = 1;
      for (let i = 0; i < 4; i++) {
        for (let k = 0; k < count; k++) {
          const block = dom.createBlock(length);
          // prettier-ignore
          const orientation = block.style.width.match(/^.+?(?=px)/)[0] / 40.91 > 1
            ? 'landscape'
            : 'portrait';
          const options = checkAvailPos(length, orientation);
          let pos,
            avail = false;

          while (!avail) {
            const tempPos = [];
            const randInd = Math.floor(Math.random() * options.length);
            for (let j = 0; j < length; j++) {
              tempPos.push(
                options[randInd] + (orientation === 'portrait' ? j * 10 : j)
              );
            }
            pos = tempPos;
            avail = checkPos(pos);
          }
          grids[pos[0]].appendChild(block);
          const ship = Ship(length, pos);
          player.gameboard.placeShip(ship);
        }
        length--;
        count++;
      }
    }
  };

  const init = (() => {
    dom.createContainer();
    const human = Player();
    const ai = Player('comp');
    createPlayerShips(human);

    const grids = document.querySelectorAll('.grid');
    const randBtn = document.querySelector('button:first-of-type');
    randBtn.addEventListener('click', () => {
      grids.forEach((grid) => {
        grid.innerHTML = '';
      });
      human.gameboard.wipe();
      createPlayerShips(human);
    });
  })();
})();
