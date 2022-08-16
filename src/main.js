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
    const grids = document.querySelectorAll(
      player.type === 'human' ? '.grid' : '.aigrid'
    );
    const randBtn = document.querySelector('button:first-of-type');

    const createPlayerShips = () => {
      let length = 4;
      let count = 1;
      for (let i = 0; i < 4; i++) {
        for (let k = 0; k < count; k++) {
          const block = dom.createBlock(player, length);
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
      createPlayerShips();
    }
  };

  const init = () => {
    const startBtn = document.querySelector('button:nth-of-type(2)');
    const human = Player();
    const ai = Player('comp');
    dom.createContainer(human);
    generateShips(human);

    const startGame = () => {
      dom.createContainer(ai);
      generateShips(ai);
      dom.removeBlockEvents();
      const aigameboard = document.querySelectorAll('.aigrid');

      const aiTurn = () => {
        const aiAttackLoop = (prevPos) => {
          const attackStat = ai.attack(human, prevPos);
          if (!attackStat.isHit) {
            dom.cursor.addWait();
            setTimeout(() => {
              dom.cursor.removeWait();
              dom.addGridEffect(attackStat.hitPos, false, ai);
            }, 500);
          } else {
            const isWon = ai.getWinStatus(human);
            dom.cursor.addWait();
            setTimeout(() => {
              dom.cursor.removeWait();
              dom.addGridEffect(attackStat.hitPos, true, ai);
              if (isWon) {
                dom.displayEndGame(ai);
                startBtn.removeEventListener('click', startGame);
                const restartBtn = document.querySelector('.restart-btn');
                restartBtn.addEventListener('click', restart);
              } else {
                aiAttackLoop(attackStat.hitPos);
              }
            }, 500);
          }
        };
        aiAttackLoop(null);
      };

      const playTurn = (e) => {
        const pos = Array.prototype.indexOf.call(aigameboard, e.target);
        const isHit = human.attack(ai, pos);
        dom.addGridEffect(pos, isHit, human);
        if (isHit) {
          const isWon = human.getWinStatus(ai);
          if (isWon) {
            dom.displayEndGame(human);
            startBtn.removeEventListener('click', startGame);
            const restartBtn = document.querySelector('.restart-btn');
            restartBtn.addEventListener('click', restart);
          }
        } else {
          aiTurn();
        }
      };

      aigameboard.forEach((aigrid) => {
        aigrid.addEventListener('click', playTurn, { once: true });
      });
    };

    startBtn.addEventListener('click', startGame);
  };

  function restart() {
    const containers = document.querySelector('.containers');
    const btns = document.querySelectorAll('button');
    containers.innerHTML = '';
    btns.forEach((btn) => {
      btn.classList.remove('hide');
    });
    document
      .querySelector('body')
      .removeChild(document.querySelector('.cover'));
    init();
  }
  init();
})();
