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
  const generateShips = (player) => {
    const grids = document.querySelectorAll('.grid');
    const randBtn = document.querySelector('button:first-of-type');

    const createPlayerShips = () => {
      let length = 4;
      let count = 1;
      for (let i = 0; i < 4; i++) {
        for (let k = 0; k < count; k++) {
          const block = dom.createBlock(length);
          block.length = length;
          // prettier-ignore
          block.orientation = block.style.width.match(/^.+?(?=px)/)[0] / 40.91 > 1
            ? 'landscape'
            : 'portrait';
          const options = dom.getOptions(block);
          let avail = false;

          while (!avail) {
            const randInd = Math.floor(Math.random() * options.length);
            const tempPos = dom.getNewPos(block, options[randInd]);
            block.pos = tempPos;
            avail = dom.checkPos('new', player, block.pos);
          }
          grids[block.pos[0]].appendChild(block);
          const ship = Ship(block.length, block.pos);
          player.gameboard.placeShip(ship);
          dom.addBlockEvents(block, ship, player);
        }
        length--;
        count++;
      }
    };

    if (player.type === 'human') {
      createPlayerShips();

      randBtn.addEventListener('click', () => {
        grids.forEach((grid) => {
          grid.innerHTML = '';
        });
        player.gameboard.wipe();
        createPlayerShips();
      });
    } else {
    }
  };

  const init = (() => {
    dom.createContainer();
    // separate class name for human and ai container
    const human = Player();
    const ai = Player('comp');
    generateShips(human);
    generateShips(ai);
  })();
})();
