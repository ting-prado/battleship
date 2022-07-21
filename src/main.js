import { createContainer, createBlocks } from './dom';
import Ship from './factories/ship';
import Player from './factories/player';

window.addEventListener('load', () => {
  createContainer();
  createBlocks();
});

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

const gameLoop = (() => {
  const ai = Player('comp');
  const human = Player();
})();
