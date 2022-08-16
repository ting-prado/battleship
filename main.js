/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addBlockEvents": () => (/* binding */ addBlockEvents),
/* harmony export */   "addGridEffect": () => (/* binding */ addGridEffect),
/* harmony export */   "checkPos": () => (/* binding */ checkPos),
/* harmony export */   "createBlock": () => (/* binding */ createBlock),
/* harmony export */   "createContainer": () => (/* binding */ createContainer),
/* harmony export */   "cursor": () => (/* binding */ cursor),
/* harmony export */   "displayEndGame": () => (/* binding */ displayEndGame),
/* harmony export */   "getNewPos": () => (/* binding */ getNewPos),
/* harmony export */   "getOptions": () => (/* binding */ getOptions),
/* harmony export */   "removeBlockEvents": () => (/* binding */ removeBlockEvents)
/* harmony export */ });
/* eslint-disable default-case */

/* eslint-disable no-console */

/* eslint-disable no-plusplus */
var createContainer = function createContainer(player) {
  var alphLabel = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  var containersDiv = document.querySelector('.containers');
  var container = document.createElement('div');
  var gameboard = document.createElement('div');
  var topCont = document.createElement('div');
  var sideCont = document.createElement('div');
  container.classList.add('container');
  gameboard.classList.add('gameboard');
  topCont.classList.add('topCont');
  sideCont.classList.add('sideCont');

  if (player.type === 'comp') {
    container.setAttribute('style', 'animation: 1s appear; animation-fill-mode: forwards; visibility: hidden');
  }

  containersDiv.appendChild(container);
  container.appendChild(gameboard);
  container.appendChild(topCont);
  container.appendChild(sideCont);

  for (var i = 0; i < 100; i++) {
    var span = document.createElement('span');
    span.classList.add(player.type === 'human' ? 'grid' : 'aigrid');

    if (player.type === 'comp') {
      span.style.cursor = 'pointer';
    }

    gameboard.appendChild(span);
  }

  for (var _i = 0; _i < alphLabel.length; _i++) {
    var topSpan = document.createElement('span');
    topSpan.textContent = alphLabel[_i];
    topCont.appendChild(topSpan);
    var sideSpan = document.createElement('span');
    sideSpan.textContent = _i + 1;
    sideCont.appendChild(sideSpan);
  }
};

var createBlock = function createBlock(player, length) {
  var size = 40.91;
  var block = document.createElement('div');

  if (player.type === 'human') {
    block.classList.add('draggable');
    block.draggable = true;
  } else {
    block.classList.add('aiblock');
    block.style.visibility = 'hidden';
  }

  var random = Math.floor(Math.random() * 2);

  if (random === 1) {
    block.style.width = "".concat(size, "px");
    block.style.height = "".concat(size * length, "px");
  } else {
    block.style.width = "".concat(size * length, "px");
    block.style.height = "".concat(size, "px");
  }

  return block;
};

var getOptions = function getOptions(block) {
  var arr = [];

  if (block.orientation === 'portrait') {
    switch (block.length) {
      case 4:
        for (var i = 0; i < 70; i++) {
          arr.push(i);
        }

        break;

      case 3:
        for (var _i2 = 0; _i2 < 80; _i2++) {
          arr.push(_i2);
        }

        break;

      case 2:
        for (var _i3 = 0; _i3 < 90; _i3++) {
          arr.push(_i3);
        }

        break;

      case 1:
        for (var _i4 = 0; _i4 < 100; _i4++) {
          arr.push(_i4);
        }

        break;
    }
  } else {
    var limits;

    switch (block.length) {
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

    var _loop = function _loop(_i5) {
      var numStr = _i5.toString();

      var avail = true;
      limits.forEach(function (num) {
        if (_i5 === num || numStr[1] == num) {
          avail = false;
        }
      });

      if (avail) {
        arr.push(_i5);
      }
    };

    for (var _i5 = 0; _i5 < 100; _i5++) {
      _loop(_i5);
    }
  }

  return arr;
};

var getNewPos = function getNewPos(block, startingPt) {
  var newPos = []; // prettier-ignore

  for (var j = 0; j < block.length; j++) {
    newPos.push(startingPt + (block.orientation === 'portrait' ? j * 10 : j));
  }

  return newPos;
};

var checkPos = function checkPos(mode, player, pos, oldPos) {
  var avail = true;
  var arr = player.gameboard.getAllPos();

  if (mode === 'existing') {
    for (var i = 0; i < oldPos.length; i++) {
      arr.splice(arr.indexOf(oldPos[i]), 1);
    }
  }

  pos.forEach(function (item) {
    if (arr.includes(item)) {
      avail = false;
    }
  });
  return avail;
};

var addBlockEvents = function addBlockEvents(block, ship, player) {
  var options = getOptions(block);
  var grids = document.querySelectorAll('.grid'); // activate these functions during dragstart
  // get length of block that is being dragged
  // change drop targets according to block length and orientation

  var dragEnter = function dragEnter(e) {
    e.preventDefault();

    if (e.target.classList.contains('droppable')) {
      e.target.classList.add('drag-over');
    }
  }; // add drag&drop properties to all grids
  // get block previous position on dragstart
  // check if grid is included in options when dragging over/dropping
  // if yes, add drag-over class and allow drop
  // if no, do not display drag-over class
  // also check if the rest of the block occupies another block
  // if yes, return block to previous position
  // if a block is dropped on non-option grid,
  // return block to previous position


  var dragOver = function dragOver(e) {
    e.preventDefault();

    if (e.target.classList.contains('droppable')) {
      e.target.classList.add('drag-over');
    }
  };

  var dragLeave = function dragLeave(e) {
    e.target.classList.remove('drag-over');
  };

  var dragEnd = function dragEnd(e) {
    e.target.classList.remove('hide');
  };

  var drop = function drop(e) {
    e.target.classList.remove('drag-over');
    var dragged = document.querySelector('.dragged');

    if (e.target.classList.contains('grid')) {
      var newPos = getNewPos(block, Array.prototype.indexOf.call(grids, e.target));
      var avail = checkPos('existing', player, newPos, block.pos);

      if (avail && e.target.classList.contains('droppable')) {
        e.target.appendChild(dragged);
        ship.changePos(newPos);
        block.pos = newPos;
      } else {
        grids[block.pos[0]].appendChild(dragged);
      }
    }

    dragged.classList.remove('hide');
    dragged.classList.remove('dragged');
    grids.forEach(function (grid) {
      grid.classList.remove('droppable');
      grid.removeEventListener('dragenter', dragEnter);
      grid.removeEventListener('dragover', dragOver);
      grid.removeEventListener('dragleave', dragLeave);
      grid.removeEventListener('drop', drop);
    });
  };

  block.addEventListener('dragstart', function (e) {
    // add drag properties to grid on dragstart
    // follow percentage below for grids allowed to be placed on
    // remove drag properties on grids after dropping
    // add checker so blocks won't overlap
    e.target.classList.add('dragged');
    var j = 0;

    for (var i = 0; i < 100; i++) {
      if (i === options[j]) {
        grids[i].classList.add('droppable');
        j++;
      }
    }

    grids.forEach(function (grid) {
      grid.addEventListener('dragenter', dragEnter);
      grid.addEventListener('dragover', dragOver);
      grid.addEventListener('dragleave', dragLeave);
      grid.addEventListener('drop', drop);
    });
    setTimeout(function () {
      e.target.classList.add('hide');
    }, 0);
  });
  block.addEventListener('dragend', dragEnd);
};

var removeBlockEvents = function removeBlockEvents() {
  var grids = document.querySelectorAll('.grid, .aigrid');
  var blocks = document.querySelectorAll('.draggable');
  var btns = document.querySelectorAll('button');
  blocks.forEach(function (block) {
    var clone = block.cloneNode(true);
    clone.draggable = false;
    clone.style.cursor = 'auto';
    block.parentNode.replaceChild(clone, block);
  });
  btns.forEach(function (btn) {
    btn.classList.add('hide');
  });
  grids.forEach(function (grid) {
    grid.style.position = 'relative';
  });
};

var addGridEffect = function addGridEffect(index, hit, player) {
  var grids = document.querySelectorAll(player.type === 'human' ? '.aigrid' : '.grid');
  var cover = document.createElement('span');
  cover.textContent = hit ? '✕' : '●';
  cover.classList.add(hit ? 'hit' : 'miss');
  grids[index].appendChild(cover);
  grids[index].style.cursor = 'auto';
};

var displayEndGame = function displayEndGame(winner) {
  var body = document.querySelector('body');
  var div = document.createElement('div');
  var cover = document.createElement('div');
  var par = document.createElement('p');
  var restartBtn = document.createElement('button');
  div.setAttribute('id', 'gameoverDiv');
  cover.classList.add('cover');
  restartBtn.textContent = 'Restart?';
  restartBtn.classList.add('restart-btn');
  div.classList.add('finalDiv');
  restartBtn.classList.add('restartBtn');
  par.classList.add('resultMessage');

  if (winner.type === 'human') {
    par.textContent = 'Congrats, captain! We won the battle!';
  } else {
    par.textContent = "I'm sorry captain, we lost the battle. Let us abandon ship!";
  }

  body.appendChild(cover);
  cover.appendChild(div);
  div.appendChild(par);
  div.appendChild(restartBtn);
};

var cursor = function () {
  var doc = document.querySelector('html');

  var addWait = function addWait() {
    doc.style.pointerEvents = 'none';
    doc.style.cursor = 'wait';
  };

  var removeWait = function removeWait() {
    doc.style.pointerEvents = 'auto';
    doc.style.cursor = 'auto';
  };

  return {
    addWait: addWait,
    removeWait: removeWait
  };
}();



/***/ }),

/***/ "./src/factories/gameboard.js":
/*!************************************!*\
  !*** ./src/factories/gameboard.js ***!
  \************************************/
/***/ ((module) => {

/* eslint-disable no-plusplus */
var Gameboard = function Gameboard() {
  var ships = [];
  var allPos = [];
  var missedHits = [];
  var sunken = [];
  var hits = [];

  var placeShip = function placeShip(ship) {
    ships.push(ship);
    sunken.push('');
  };

  var getMissedHits = function getMissedHits() {
    return missedHits;
  };

  var getHits = function getHits() {
    return hits;
  };

  var checkSunken = function checkSunken(ship) {
    if (ship.isSunk()) {
      var index = ships.indexOf(ship);
      sunken[index] = 'x';
    }
  };

  var receiveAttack = function receiveAttack(coord) {
    var isShipHit = false;
    ships.forEach(function (ship) {
      ship.getPos().forEach(function (position) {
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
  }; // eslint-disable-next-line consistent-return


  var areAllSunken = function areAllSunken() {
    var count = 0;
    sunken.forEach(function (mark) {
      if (mark === 'x') {
        count++;
      }
    });
    return count === ships.length;
  };

  var updateAllPos = function updateAllPos() {
    allPos = [];
    ships.forEach(function (ship) {
      ship.getPos().forEach(function (pos) {
        allPos.push(pos);
      });
    });
  };

  var getAllPos = function getAllPos() {
    updateAllPos();
    return allPos;
  };

  var wipe = function wipe() {
    ships = [];
  };

  return {
    placeShip: placeShip,
    receiveAttack: receiveAttack,
    getMissedHits: getMissedHits,
    areAllSunken: areAllSunken,
    getHits: getHits,
    getAllPos: getAllPos,
    wipe: wipe
  };
};

module.exports = Gameboard;

/***/ }),

/***/ "./src/factories/player.js":
/*!*********************************!*\
  !*** ./src/factories/player.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable consistent-return */

/* eslint-disable no-plusplus */
var Gameboard = __webpack_require__(/*! ./gameboard */ "./src/factories/gameboard.js");

var Player = function Player() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'human';
  var gameboard = Gameboard();

  var getWinStatus = function getWinStatus(enemy) {
    return enemy.gameboard.areAllSunken();
  };

  var getPos = function getPos(enemy, pos) {
    // if prevPos is undefined, choose random pos
    // check if random pos is hit or not
    // if not hit, return pos
    // if hit, choose another one
    var chosenPos;

    var getRandomNum = function getRandomNum() {
      var min = Math.ceil(0); // inclusive

      var max = Math.floor(100); // exclusive

      return Math.floor(Math.random() * (max - min) + min);
    };

    var checkIfAvail = function checkIfAvail(tempPos) {
      return !enemy.gameboard.getHits().includes(tempPos);
    };

    var getRandomPos = function getRandomPos() {
      var avail;
      var newPos;

      while (!avail) {
        newPos = getRandomNum();
        avail = checkIfAvail(newPos);
      }

      return newPos;
    };

    if (pos === null) {
      chosenPos = getRandomPos();
    } else {
      // check random surrounding pos if hit until you find a pos available
      // if surrounding positions are hit, pick a random pos instead
      var avail, tempPos;

      var getNewPos = function getNewPos(i) {
        // eslint-disable-next-line default-case
        switch (i) {
          case 0:
            return pos + 1;

          case 1:
            return pos - 1;

          case 2:
            return pos + 10;

          case 3:
            return pos - 10;
        }
      }; // select randomly if one or zero
      // if zero, loop from ltr
      // if one, loop from rtl
      // every loop check if coord is available
      // return if available
      // loop 4 times
      // if resulting coord is 100, ignore it


      var randomizer = Math.floor(Math.random() * 2);

      if (randomizer === 0) {
        for (var i = 0; i < 4; i++) {
          tempPos = getNewPos(i);

          if (tempPos > 99 || tempPos < 0) {
            continue;
          }

          avail = checkIfAvail(tempPos);

          if (avail) {
            chosenPos = tempPos;
            break;
          }
        }

        if (!avail) {
          chosenPos = getRandomPos();
        }
      } else {
        for (var _i = 3; _i >= 0; _i--) {
          tempPos = getNewPos(_i);

          if (tempPos > 99 || tempPos < 0) {
            continue;
          }

          avail = checkIfAvail(tempPos);

          if (avail) {
            chosenPos = tempPos;
            break;
          }
        }

        if (!avail) {
          chosenPos = getRandomPos();
        }
      }
    }

    return chosenPos;
  };

  var attack = function attack(enemy) {
    var pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var attPos = type === 'comp' ? getPos(enemy, pos) : pos;
    var isHit = enemy.gameboard.receiveAttack(attPos);

    if (type === 'comp') {
      return {
        isHit: isHit,
        hitPos: attPos
      };
    }

    return isHit;
  };

  return {
    getWinStatus: getWinStatus,
    gameboard: gameboard,
    attack: attack,
    type: type
  };
};

module.exports = Player;

/***/ }),

/***/ "./src/factories/ship.js":
/*!*******************************!*\
  !*** ./src/factories/ship.js ***!
  \*******************************/
/***/ ((module) => {

/* eslint-disable no-plusplus */
var Ship = function Ship(length, pos) {
  var hitmarks = []; // eslint-disable-next-line no-unused-vars

  var fillHits = function () {
    for (var i = 0; i < length; i++) {
      hitmarks[i] = '';
    }
  }();

  var hit = function hit(hitPos) {
    var index = pos.indexOf(hitPos);
    hitmarks[index] = 'x';
  }; // eslint-disable-next-line consistent-return


  var isSunk = function isSunk() {
    var count = 0;
    hitmarks.forEach(function (mark) {
      if (mark === 'x') {
        count++;
      }
    });
    return count === length;
  };

  var changePos = function changePos(newPos) {
    pos = newPos;
  };

  var getLength = function getLength() {
    return length;
  };

  var getPos = function getPos() {
    return pos;
  };

  return {
    getLength: getLength,
    getPos: getPos,
    hit: hit,
    isSunk: isSunk,
    changePos: changePos
  };
};

module.exports = Ship;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/dom.js");
/* harmony import */ var _factories_ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./factories/ship */ "./src/factories/ship.js");
/* harmony import */ var _factories_ship__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_factories_ship__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _factories_player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./factories/player */ "./src/factories/player.js");
/* harmony import */ var _factories_player__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_factories_player__WEBPACK_IMPORTED_MODULE_2__);
/* eslint-disable no-plusplus */

/* eslint-disable no-unused-vars */


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

var gameFunc = function () {
  var generateShips = function generateShips(player) {
    var grids = document.querySelectorAll(player.type === 'human' ? '.grid' : '.aigrid');
    var randBtn = document.querySelector('button:first-of-type');

    var createPlayerShips = function createPlayerShips() {
      var length = 4;
      var count = 1;

      for (var i = 0; i < 4; i++) {
        for (var k = 0; k < count; k++) {
          var block = _dom__WEBPACK_IMPORTED_MODULE_0__.createBlock(player, length);
          block.length = length; // prettier-ignore

          block.orientation = block.style.width.match(/^.+?(?=px)/)[0] / 40.91 > 1 ? 'landscape' : 'portrait';
          var options = _dom__WEBPACK_IMPORTED_MODULE_0__.getOptions(block);
          var avail = false;

          while (!avail) {
            var randInd = Math.floor(Math.random() * options.length);
            var tempPos = _dom__WEBPACK_IMPORTED_MODULE_0__.getNewPos(block, options[randInd]);
            block.pos = tempPos;
            avail = _dom__WEBPACK_IMPORTED_MODULE_0__.checkPos('new', player, block.pos);
          }

          grids[block.pos[0]].appendChild(block);
          var ship = _factories_ship__WEBPACK_IMPORTED_MODULE_1___default()(block.length, block.pos);
          player.gameboard.placeShip(ship);
          _dom__WEBPACK_IMPORTED_MODULE_0__.addBlockEvents(block, ship, player);
        }

        length--;
        count++;
      }
    };

    if (player.type === 'human') {
      createPlayerShips();
      randBtn.addEventListener('click', function () {
        grids.forEach(function (grid) {
          grid.innerHTML = '';
        });
        player.gameboard.wipe();
        createPlayerShips();
      });
    } else {
      createPlayerShips();
    }
  };

  var init = function init() {
    var startBtn = document.querySelector('button:nth-of-type(2)');
    var human = _factories_player__WEBPACK_IMPORTED_MODULE_2___default()();
    var ai = _factories_player__WEBPACK_IMPORTED_MODULE_2___default()('comp');
    _dom__WEBPACK_IMPORTED_MODULE_0__.createContainer(human);
    generateShips(human);

    var startGame = function startGame() {
      _dom__WEBPACK_IMPORTED_MODULE_0__.createContainer(ai);
      generateShips(ai);
      _dom__WEBPACK_IMPORTED_MODULE_0__.removeBlockEvents();
      var aigameboard = document.querySelectorAll('.aigrid');

      var aiTurn = function aiTurn() {
        var aiAttackLoop = function aiAttackLoop(prevPos) {
          var attackStat = ai.attack(human, prevPos);

          if (!attackStat.isHit) {
            _dom__WEBPACK_IMPORTED_MODULE_0__.cursor.addWait();
            setTimeout(function () {
              _dom__WEBPACK_IMPORTED_MODULE_0__.cursor.removeWait();
              _dom__WEBPACK_IMPORTED_MODULE_0__.addGridEffect(attackStat.hitPos, false, ai);
            }, 500);
          } else {
            var isWon = ai.getWinStatus(human);
            _dom__WEBPACK_IMPORTED_MODULE_0__.cursor.addWait();
            setTimeout(function () {
              _dom__WEBPACK_IMPORTED_MODULE_0__.cursor.removeWait();
              _dom__WEBPACK_IMPORTED_MODULE_0__.addGridEffect(attackStat.hitPos, true, ai);

              if (isWon) {
                _dom__WEBPACK_IMPORTED_MODULE_0__.displayEndGame(ai);
                startBtn.removeEventListener('click', startGame);
                var restartBtn = document.querySelector('.restart-btn');
                restartBtn.addEventListener('click', restart);
              } else {
                aiAttackLoop(attackStat.hitPos);
              }
            }, 500);
          }
        };

        aiAttackLoop(null);
      };

      var playTurn = function playTurn(e) {
        var pos = Array.prototype.indexOf.call(aigameboard, e.target);
        var isHit = human.attack(ai, pos);
        _dom__WEBPACK_IMPORTED_MODULE_0__.addGridEffect(pos, isHit, human);

        if (isHit) {
          var isWon = human.getWinStatus(ai);

          if (isWon) {
            _dom__WEBPACK_IMPORTED_MODULE_0__.displayEndGame(human);
            startBtn.removeEventListener('click', startGame);
            var restartBtn = document.querySelector('.restart-btn');
            restartBtn.addEventListener('click', restart);
          }
        } else {
          aiTurn();
        }
      };

      aigameboard.forEach(function (aigrid) {
        aigrid.addEventListener('click', playTurn, {
          once: true
        });
      });
    };

    startBtn.addEventListener('click', startGame);
  };

  function restart() {
    var containers = document.querySelector('.containers');
    var btns = document.querySelectorAll('button');
    containers.innerHTML = '';
    btns.forEach(function (btn) {
      btn.classList.remove('hide');
    });
    document.querySelector('body').removeChild(document.querySelector('.cover'));
    init();
  }

  init();
}();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUNoQixTQUFYLEdBQXVCLEVBQXZCO0lBQ0F4RSxJQUFJLENBQUN6QyxPQUFMLENBQWEsVUFBQzhDLEdBQUQsRUFBUztNQUNwQkEsR0FBRyxDQUFDN0UsU0FBSixDQUFjMEQsTUFBZCxDQUFxQixNQUFyQjtJQUNELENBRkQ7SUFHQWpFLFFBQVEsQ0FDTEMsYUFESCxDQUNpQixNQURqQixFQUVHdUssV0FGSCxDQUVleEssUUFBUSxDQUFDQyxhQUFULENBQXVCLFFBQXZCLENBRmY7SUFHQXVKLElBQUk7RUFDTDs7RUFDREEsSUFBSTtBQUNMLENBcElnQixFQUFqQixDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbWFpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBkZWZhdWx0LWNhc2UgKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXBsdXNwbHVzICovXG5jb25zdCBjcmVhdGVDb250YWluZXIgPSAocGxheWVyKSA9PiB7XG4gIGNvbnN0IGFscGhMYWJlbCA9IFsnQScsICdCJywgJ0MnLCAnRCcsICdFJywgJ0YnLCAnRycsICdIJywgJ0knLCAnSiddO1xuXG4gIGNvbnN0IGNvbnRhaW5lcnNEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGFpbmVycycpO1xuICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29uc3QgZ2FtZWJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNvbnN0IHRvcENvbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29uc3Qgc2lkZUNvbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2NvbnRhaW5lcicpO1xuICBnYW1lYm9hcmQuY2xhc3NMaXN0LmFkZCgnZ2FtZWJvYXJkJyk7XG4gIHRvcENvbnQuY2xhc3NMaXN0LmFkZCgndG9wQ29udCcpO1xuICBzaWRlQ29udC5jbGFzc0xpc3QuYWRkKCdzaWRlQ29udCcpO1xuICBpZiAocGxheWVyLnR5cGUgPT09ICdjb21wJykge1xuICAgIGNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXG4gICAgICAnc3R5bGUnLFxuICAgICAgJ2FuaW1hdGlvbjogMXMgYXBwZWFyOyBhbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkczsgdmlzaWJpbGl0eTogaGlkZGVuJ1xuICAgICk7XG4gIH1cblxuICBjb250YWluZXJzRGl2LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChnYW1lYm9hcmQpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQodG9wQ29udCk7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChzaWRlQ29udCk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xuICAgIGNvbnN0IHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgc3Bhbi5jbGFzc0xpc3QuYWRkKHBsYXllci50eXBlID09PSAnaHVtYW4nID8gJ2dyaWQnIDogJ2FpZ3JpZCcpO1xuICAgIGlmIChwbGF5ZXIudHlwZSA9PT0gJ2NvbXAnKSB7XG4gICAgICBzcGFuLnN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcbiAgICB9XG4gICAgZ2FtZWJvYXJkLmFwcGVuZENoaWxkKHNwYW4pO1xuICB9XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbHBoTGFiZWwubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCB0b3BTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIHRvcFNwYW4udGV4dENvbnRlbnQgPSBhbHBoTGFiZWxbaV07XG4gICAgdG9wQ29udC5hcHBlbmRDaGlsZCh0b3BTcGFuKTtcblxuICAgIGNvbnN0IHNpZGVTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIHNpZGVTcGFuLnRleHRDb250ZW50ID0gaSArIDE7XG4gICAgc2lkZUNvbnQuYXBwZW5kQ2hpbGQoc2lkZVNwYW4pO1xuICB9XG59O1xuXG5jb25zdCBjcmVhdGVCbG9jayA9IChwbGF5ZXIsIGxlbmd0aCkgPT4ge1xuICBjb25zdCBzaXplID0gNDAuOTE7XG4gIGNvbnN0IGJsb2NrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGlmIChwbGF5ZXIudHlwZSA9PT0gJ2h1bWFuJykge1xuICAgIGJsb2NrLmNsYXNzTGlzdC5hZGQoJ2RyYWdnYWJsZScpO1xuICAgIGJsb2NrLmRyYWdnYWJsZSA9IHRydWU7XG4gIH0gZWxzZSB7XG4gICAgYmxvY2suY2xhc3NMaXN0LmFkZCgnYWlibG9jaycpO1xuICAgIGJsb2NrLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcbiAgfVxuICBjb25zdCByYW5kb20gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKTtcbiAgaWYgKHJhbmRvbSA9PT0gMSkge1xuICAgIGJsb2NrLnN0eWxlLndpZHRoID0gYCR7c2l6ZX1weGA7XG4gICAgYmxvY2suc3R5bGUuaGVpZ2h0ID0gYCR7c2l6ZSAqIGxlbmd0aH1weGA7XG4gIH0gZWxzZSB7XG4gICAgYmxvY2suc3R5bGUud2lkdGggPSBgJHtzaXplICogbGVuZ3RofXB4YDtcbiAgICBibG9jay5zdHlsZS5oZWlnaHQgPSBgJHtzaXplfXB4YDtcbiAgfVxuXG4gIHJldHVybiBibG9jaztcbn07XG5cbmNvbnN0IGdldE9wdGlvbnMgPSAoYmxvY2spID0+IHtcbiAgY29uc3QgYXJyID0gW107XG4gIGlmIChibG9jay5vcmllbnRhdGlvbiA9PT0gJ3BvcnRyYWl0Jykge1xuICAgIHN3aXRjaCAoYmxvY2subGVuZ3RoKSB7XG4gICAgICBjYXNlIDQ6XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNzA7IGkrKykge1xuICAgICAgICAgIGFyci5wdXNoKGkpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDgwOyBpKyspIHtcbiAgICAgICAgICBhcnIucHVzaChpKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA5MDsgaSsrKSB7XG4gICAgICAgICAgYXJyLnB1c2goaSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcbiAgICAgICAgICBhcnIucHVzaChpKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgbGV0IGxpbWl0cztcbiAgICBzd2l0Y2ggKGJsb2NrLmxlbmd0aCkge1xuICAgICAgY2FzZSA0OlxuICAgICAgICBsaW1pdHMgPSBbNywgOCwgOV07XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICBsaW1pdHMgPSBbOCwgOV07XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAyOlxuICAgICAgICBsaW1pdHMgPSBbOV07XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XG4gICAgICBjb25zdCBudW1TdHIgPSBpLnRvU3RyaW5nKCk7XG4gICAgICBsZXQgYXZhaWwgPSB0cnVlO1xuICAgICAgbGltaXRzLmZvckVhY2goKG51bSkgPT4ge1xuICAgICAgICBpZiAoaSA9PT0gbnVtIHx8IG51bVN0clsxXSA9PSBudW0pIHtcbiAgICAgICAgICBhdmFpbCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmIChhdmFpbCkge1xuICAgICAgICBhcnIucHVzaChpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGFycjtcbn07XG5cbmNvbnN0IGdldE5ld1BvcyA9IChibG9jaywgc3RhcnRpbmdQdCkgPT4ge1xuICBjb25zdCBuZXdQb3MgPSBbXTtcbiAgLy8gcHJldHRpZXItaWdub3JlXG4gIGZvciAobGV0IGogPSAwOyBqIDwgYmxvY2subGVuZ3RoOyBqKyspIHtcbiAgICBuZXdQb3MucHVzaChcbiAgICAgIHN0YXJ0aW5nUHQgKyAoYmxvY2sub3JpZW50YXRpb24gPT09ICdwb3J0cmFpdCcgPyBqICogMTAgOiBqKVxuICAgICk7XG4gIH1cbiAgcmV0dXJuIG5ld1Bvcztcbn07XG5cbmNvbnN0IGNoZWNrUG9zID0gKG1vZGUsIHBsYXllciwgcG9zLCBvbGRQb3MpID0+IHtcbiAgbGV0IGF2YWlsID0gdHJ1ZTtcbiAgY29uc3QgYXJyID0gcGxheWVyLmdhbWVib2FyZC5nZXRBbGxQb3MoKTtcbiAgaWYgKG1vZGUgPT09ICdleGlzdGluZycpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9sZFBvcy5sZW5ndGg7IGkrKykge1xuICAgICAgYXJyLnNwbGljZShhcnIuaW5kZXhPZihvbGRQb3NbaV0pLCAxKTtcbiAgICB9XG4gIH1cbiAgcG9zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICBpZiAoYXJyLmluY2x1ZGVzKGl0ZW0pKSB7XG4gICAgICBhdmFpbCA9IGZhbHNlO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBhdmFpbDtcbn07XG5cbmNvbnN0IGFkZEJsb2NrRXZlbnRzID0gKGJsb2NrLCBzaGlwLCBwbGF5ZXIpID0+IHtcbiAgY29uc3Qgb3B0aW9ucyA9IGdldE9wdGlvbnMoYmxvY2spO1xuICBjb25zdCBncmlkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ncmlkJyk7XG4gIC8vIGFjdGl2YXRlIHRoZXNlIGZ1bmN0aW9ucyBkdXJpbmcgZHJhZ3N0YXJ0XG4gIC8vIGdldCBsZW5ndGggb2YgYmxvY2sgdGhhdCBpcyBiZWluZyBkcmFnZ2VkXG4gIC8vIGNoYW5nZSBkcm9wIHRhcmdldHMgYWNjb3JkaW5nIHRvIGJsb2NrIGxlbmd0aCBhbmQgb3JpZW50YXRpb25cbiAgY29uc3QgZHJhZ0VudGVyID0gKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZHJvcHBhYmxlJykpIHtcbiAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2RyYWctb3ZlcicpO1xuICAgIH1cbiAgfTtcblxuICAvLyBhZGQgZHJhZyZkcm9wIHByb3BlcnRpZXMgdG8gYWxsIGdyaWRzXG4gIC8vIGdldCBibG9jayBwcmV2aW91cyBwb3NpdGlvbiBvbiBkcmFnc3RhcnRcbiAgLy8gY2hlY2sgaWYgZ3JpZCBpcyBpbmNsdWRlZCBpbiBvcHRpb25zIHdoZW4gZHJhZ2dpbmcgb3Zlci9kcm9wcGluZ1xuICAvLyBpZiB5ZXMsIGFkZCBkcmFnLW92ZXIgY2xhc3MgYW5kIGFsbG93IGRyb3BcbiAgLy8gaWYgbm8sIGRvIG5vdCBkaXNwbGF5IGRyYWctb3ZlciBjbGFzc1xuICAvLyBhbHNvIGNoZWNrIGlmIHRoZSByZXN0IG9mIHRoZSBibG9jayBvY2N1cGllcyBhbm90aGVyIGJsb2NrXG4gIC8vIGlmIHllcywgcmV0dXJuIGJsb2NrIHRvIHByZXZpb3VzIHBvc2l0aW9uXG4gIC8vIGlmIGEgYmxvY2sgaXMgZHJvcHBlZCBvbiBub24tb3B0aW9uIGdyaWQsXG4gIC8vIHJldHVybiBibG9jayB0byBwcmV2aW91cyBwb3NpdGlvblxuICBjb25zdCBkcmFnT3ZlciA9IChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2Ryb3BwYWJsZScpKSB7XG4gICAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKCdkcmFnLW92ZXInKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZHJhZ0xlYXZlID0gKGUpID0+IHtcbiAgICBlLnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnLW92ZXInKTtcbiAgfTtcblxuICBjb25zdCBkcmFnRW5kID0gKGUpID0+IHtcbiAgICBlLnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gIH07XG5cbiAgY29uc3QgZHJvcCA9IChlKSA9PiB7XG4gICAgZS50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZy1vdmVyJyk7XG4gICAgY29uc3QgZHJhZ2dlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kcmFnZ2VkJyk7XG4gICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZ3JpZCcpKSB7XG4gICAgICBjb25zdCBuZXdQb3MgPSBnZXROZXdQb3MoXG4gICAgICAgIGJsb2NrLFxuICAgICAgICBBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKGdyaWRzLCBlLnRhcmdldClcbiAgICAgICk7XG4gICAgICBjb25zdCBhdmFpbCA9IGNoZWNrUG9zKCdleGlzdGluZycsIHBsYXllciwgbmV3UG9zLCBibG9jay5wb3MpO1xuICAgICAgaWYgKGF2YWlsICYmIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZHJvcHBhYmxlJykpIHtcbiAgICAgICAgZS50YXJnZXQuYXBwZW5kQ2hpbGQoZHJhZ2dlZCk7XG4gICAgICAgIHNoaXAuY2hhbmdlUG9zKG5ld1Bvcyk7XG4gICAgICAgIGJsb2NrLnBvcyA9IG5ld1BvcztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGdyaWRzW2Jsb2NrLnBvc1swXV0uYXBwZW5kQ2hpbGQoZHJhZ2dlZCk7XG4gICAgICB9XG4gICAgfVxuICAgIGRyYWdnZWQuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgIGRyYWdnZWQuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZ2dlZCcpO1xuICAgIGdyaWRzLmZvckVhY2goKGdyaWQpID0+IHtcbiAgICAgIGdyaWQuY2xhc3NMaXN0LnJlbW92ZSgnZHJvcHBhYmxlJyk7XG4gICAgICBncmlkLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RyYWdlbnRlcicsIGRyYWdFbnRlcik7XG4gICAgICBncmlkLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgZHJhZ092ZXIpO1xuICAgICAgZ3JpZC5yZW1vdmVFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCBkcmFnTGVhdmUpO1xuICAgICAgZ3JpZC5yZW1vdmVFdmVudExpc3RlbmVyKCdkcm9wJywgZHJvcCk7XG4gICAgfSk7XG4gIH07XG5cbiAgYmxvY2suYWRkRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgKGUpID0+IHtcbiAgICAvLyBhZGQgZHJhZyBwcm9wZXJ0aWVzIHRvIGdyaWQgb24gZHJhZ3N0YXJ0XG4gICAgLy8gZm9sbG93IHBlcmNlbnRhZ2UgYmVsb3cgZm9yIGdyaWRzIGFsbG93ZWQgdG8gYmUgcGxhY2VkIG9uXG4gICAgLy8gcmVtb3ZlIGRyYWcgcHJvcGVydGllcyBvbiBncmlkcyBhZnRlciBkcm9wcGluZ1xuICAgIC8vIGFkZCBjaGVja2VyIHNvIGJsb2NrcyB3b24ndCBvdmVybGFwXG4gICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZCgnZHJhZ2dlZCcpO1xuICAgIGxldCBqID0gMDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XG4gICAgICBpZiAoaSA9PT0gb3B0aW9uc1tqXSkge1xuICAgICAgICBncmlkc1tpXS5jbGFzc0xpc3QuYWRkKCdkcm9wcGFibGUnKTtcbiAgICAgICAgaisrO1xuICAgICAgfVxuICAgIH1cbiAgICBncmlkcy5mb3JFYWNoKChncmlkKSA9PiB7XG4gICAgICBncmlkLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbnRlcicsIGRyYWdFbnRlcik7XG4gICAgICBncmlkLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgZHJhZ092ZXIpO1xuICAgICAgZ3JpZC5hZGRFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCBkcmFnTGVhdmUpO1xuICAgICAgZ3JpZC5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgZHJvcCk7XG4gICAgfSk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgfSwgMCk7XG4gIH0pO1xuXG4gIGJsb2NrLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbmQnLCBkcmFnRW5kKTtcbn07XG5cbmNvbnN0IHJlbW92ZUJsb2NrRXZlbnRzID0gKCkgPT4ge1xuICBjb25zdCBncmlkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ncmlkLCAuYWlncmlkJyk7XG4gIGNvbnN0IGJsb2NrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kcmFnZ2FibGUnKTtcbiAgY29uc3QgYnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2J1dHRvbicpO1xuICBibG9ja3MuZm9yRWFjaCgoYmxvY2spID0+IHtcbiAgICBjb25zdCBjbG9uZSA9IGJsb2NrLmNsb25lTm9kZSh0cnVlKTtcbiAgICBjbG9uZS5kcmFnZ2FibGUgPSBmYWxzZTtcbiAgICBjbG9uZS5zdHlsZS5jdXJzb3IgPSAnYXV0byc7XG4gICAgYmxvY2sucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQoY2xvbmUsIGJsb2NrKTtcbiAgfSk7XG4gIGJ0bnMuZm9yRWFjaCgoYnRuKSA9PiB7XG4gICAgYnRuLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgfSk7XG4gIGdyaWRzLmZvckVhY2goKGdyaWQpID0+IHtcbiAgICBncmlkLnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJztcbiAgfSk7XG59O1xuXG5jb25zdCBhZGRHcmlkRWZmZWN0ID0gKGluZGV4LCBoaXQsIHBsYXllcikgPT4ge1xuICBjb25zdCBncmlkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgcGxheWVyLnR5cGUgPT09ICdodW1hbicgPyAnLmFpZ3JpZCcgOiAnLmdyaWQnXG4gICk7XG4gIGNvbnN0IGNvdmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICBjb3Zlci50ZXh0Q29udGVudCA9IGhpdCA/ICfinJUnIDogJ+KXjyc7XG4gIGNvdmVyLmNsYXNzTGlzdC5hZGQoaGl0ID8gJ2hpdCcgOiAnbWlzcycpO1xuICBncmlkc1tpbmRleF0uYXBwZW5kQ2hpbGQoY292ZXIpO1xuICBncmlkc1tpbmRleF0uc3R5bGUuY3Vyc29yID0gJ2F1dG8nO1xufTtcblxuY29uc3QgZGlzcGxheUVuZEdhbWUgPSAod2lubmVyKSA9PiB7XG4gIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG4gIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb25zdCBjb3ZlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb25zdCBwYXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gIGNvbnN0IHJlc3RhcnRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgZGl2LnNldEF0dHJpYnV0ZSgnaWQnLCAnZ2FtZW92ZXJEaXYnKTtcbiAgY292ZXIuY2xhc3NMaXN0LmFkZCgnY292ZXInKTtcbiAgcmVzdGFydEJ0bi50ZXh0Q29udGVudCA9ICdSZXN0YXJ0Pyc7XG4gIHJlc3RhcnRCdG4uY2xhc3NMaXN0LmFkZCgncmVzdGFydC1idG4nKTtcbiAgZGl2LmNsYXNzTGlzdC5hZGQoJ2ZpbmFsRGl2Jyk7XG4gIHJlc3RhcnRCdG4uY2xhc3NMaXN0LmFkZCgncmVzdGFydEJ0bicpO1xuICBwYXIuY2xhc3NMaXN0LmFkZCgncmVzdWx0TWVzc2FnZScpO1xuXG4gIGlmICh3aW5uZXIudHlwZSA9PT0gJ2h1bWFuJykge1xuICAgIHBhci50ZXh0Q29udGVudCA9ICdDb25ncmF0cywgY2FwdGFpbiEgV2Ugd29uIHRoZSBiYXR0bGUhJztcbiAgfSBlbHNlIHtcbiAgICBwYXIudGV4dENvbnRlbnQgPVxuICAgICAgXCJJJ20gc29ycnkgY2FwdGFpbiwgd2UgbG9zdCB0aGUgYmF0dGxlLiBMZXQgdXMgYWJhbmRvbiBzaGlwIVwiO1xuICB9XG5cbiAgYm9keS5hcHBlbmRDaGlsZChjb3Zlcik7XG4gIGNvdmVyLmFwcGVuZENoaWxkKGRpdik7XG4gIGRpdi5hcHBlbmRDaGlsZChwYXIpO1xuICBkaXYuYXBwZW5kQ2hpbGQocmVzdGFydEJ0bik7XG59O1xuXG5jb25zdCBjdXJzb3IgPSAoKCkgPT4ge1xuICBjb25zdCBkb2MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdodG1sJyk7XG4gIGNvbnN0IGFkZFdhaXQgPSAoKSA9PiB7XG4gICAgZG9jLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XG4gICAgZG9jLnN0eWxlLmN1cnNvciA9ICd3YWl0JztcbiAgfTtcblxuICBjb25zdCByZW1vdmVXYWl0ID0gKCkgPT4ge1xuICAgIGRvYy5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ2F1dG8nO1xuICAgIGRvYy5zdHlsZS5jdXJzb3IgPSAnYXV0byc7XG4gIH07XG5cbiAgcmV0dXJuIHsgYWRkV2FpdCwgcmVtb3ZlV2FpdCB9O1xufSkoKTtcblxuZXhwb3J0IHtcbiAgY3Vyc29yLFxuICBhZGRHcmlkRWZmZWN0LFxuICBjcmVhdGVDb250YWluZXIsXG4gIGNyZWF0ZUJsb2NrLFxuICBhZGRCbG9ja0V2ZW50cyxcbiAgcmVtb3ZlQmxvY2tFdmVudHMsXG4gIGRpc3BsYXlFbmRHYW1lLFxuICBnZXROZXdQb3MsXG4gIGdldE9wdGlvbnMsXG4gIGNoZWNrUG9zLFxufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXBsdXNwbHVzICovXG5jb25zdCBHYW1lYm9hcmQgPSAoKSA9PiB7XG4gIGxldCBzaGlwcyA9IFtdO1xuICBsZXQgYWxsUG9zID0gW107XG4gIGNvbnN0IG1pc3NlZEhpdHMgPSBbXTtcbiAgY29uc3Qgc3Vua2VuID0gW107XG4gIGNvbnN0IGhpdHMgPSBbXTtcblxuICBjb25zdCBwbGFjZVNoaXAgPSAoc2hpcCkgPT4ge1xuICAgIHNoaXBzLnB1c2goc2hpcCk7XG4gICAgc3Vua2VuLnB1c2goJycpO1xuICB9O1xuXG4gIGNvbnN0IGdldE1pc3NlZEhpdHMgPSAoKSA9PiBtaXNzZWRIaXRzO1xuXG4gIGNvbnN0IGdldEhpdHMgPSAoKSA9PiBoaXRzO1xuXG4gIGNvbnN0IGNoZWNrU3Vua2VuID0gKHNoaXApID0+IHtcbiAgICBpZiAoc2hpcC5pc1N1bmsoKSkge1xuICAgICAgY29uc3QgaW5kZXggPSBzaGlwcy5pbmRleE9mKHNoaXApO1xuICAgICAgc3Vua2VuW2luZGV4XSA9ICd4JztcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IChjb29yZCkgPT4ge1xuICAgIGxldCBpc1NoaXBIaXQgPSBmYWxzZTtcbiAgICBzaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICBzaGlwLmdldFBvcygpLmZvckVhY2goKHBvc2l0aW9uKSA9PiB7XG4gICAgICAgIGlmIChwb3NpdGlvbiA9PT0gY29vcmQpIHtcbiAgICAgICAgICBpc1NoaXBIaXQgPSB0cnVlO1xuICAgICAgICAgIHNoaXAuaGl0KGNvb3JkKTtcbiAgICAgICAgICBoaXRzLnB1c2goY29vcmQpO1xuICAgICAgICAgIGNoZWNrU3Vua2VuKHNoaXApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGlmICghaXNTaGlwSGl0KSB7XG4gICAgICBoaXRzLnB1c2goY29vcmQpO1xuICAgICAgbWlzc2VkSGl0cy5wdXNoKGNvb3JkKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaXNTaGlwSGl0O1xuICB9O1xuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBjb25zdCBhcmVBbGxTdW5rZW4gPSAoKSA9PiB7XG4gICAgbGV0IGNvdW50ID0gMDtcbiAgICBzdW5rZW4uZm9yRWFjaCgobWFyaykgPT4ge1xuICAgICAgaWYgKG1hcmsgPT09ICd4Jykge1xuICAgICAgICBjb3VudCsrO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGNvdW50ID09PSBzaGlwcy5sZW5ndGg7XG4gIH07XG5cbiAgY29uc3QgdXBkYXRlQWxsUG9zID0gKCkgPT4ge1xuICAgIGFsbFBvcyA9IFtdO1xuICAgIHNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICAgIHNoaXAuZ2V0UG9zKCkuZm9yRWFjaCgocG9zKSA9PiB7XG4gICAgICAgIGFsbFBvcy5wdXNoKHBvcyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBnZXRBbGxQb3MgPSAoKSA9PiB7XG4gICAgdXBkYXRlQWxsUG9zKCk7XG4gICAgcmV0dXJuIGFsbFBvcztcbiAgfTtcblxuICBjb25zdCB3aXBlID0gKCkgPT4ge1xuICAgIHNoaXBzID0gW107XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBwbGFjZVNoaXAsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICBnZXRNaXNzZWRIaXRzLFxuICAgIGFyZUFsbFN1bmtlbixcbiAgICBnZXRIaXRzLFxuICAgIGdldEFsbFBvcyxcbiAgICB3aXBlLFxuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBHYW1lYm9hcmQ7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjb25zaXN0ZW50LXJldHVybiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tcGx1c3BsdXMgKi9cbmNvbnN0IEdhbWVib2FyZCA9IHJlcXVpcmUoJy4vZ2FtZWJvYXJkJyk7XG5cbmNvbnN0IFBsYXllciA9ICh0eXBlID0gJ2h1bWFuJykgPT4ge1xuICBjb25zdCBnYW1lYm9hcmQgPSBHYW1lYm9hcmQoKTtcbiAgY29uc3QgZ2V0V2luU3RhdHVzID0gKGVuZW15KSA9PiBlbmVteS5nYW1lYm9hcmQuYXJlQWxsU3Vua2VuKCk7XG5cbiAgY29uc3QgZ2V0UG9zID0gKGVuZW15LCBwb3MpID0+IHtcbiAgICAvLyBpZiBwcmV2UG9zIGlzIHVuZGVmaW5lZCwgY2hvb3NlIHJhbmRvbSBwb3NcbiAgICAvLyBjaGVjayBpZiByYW5kb20gcG9zIGlzIGhpdCBvciBub3RcbiAgICAvLyBpZiBub3QgaGl0LCByZXR1cm4gcG9zXG4gICAgLy8gaWYgaGl0LCBjaG9vc2UgYW5vdGhlciBvbmVcbiAgICBsZXQgY2hvc2VuUG9zO1xuXG4gICAgY29uc3QgZ2V0UmFuZG9tTnVtID0gKCkgPT4ge1xuICAgICAgY29uc3QgbWluID0gTWF0aC5jZWlsKDApOyAvLyBpbmNsdXNpdmVcbiAgICAgIGNvbnN0IG1heCA9IE1hdGguZmxvb3IoMTAwKTsgLy8gZXhjbHVzaXZlXG4gICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKyBtaW4pO1xuICAgIH07XG5cbiAgICBjb25zdCBjaGVja0lmQXZhaWwgPSAodGVtcFBvcykgPT5cbiAgICAgICFlbmVteS5nYW1lYm9hcmQuZ2V0SGl0cygpLmluY2x1ZGVzKHRlbXBQb3MpO1xuXG4gICAgY29uc3QgZ2V0UmFuZG9tUG9zID0gKCkgPT4ge1xuICAgICAgbGV0IGF2YWlsO1xuICAgICAgbGV0IG5ld1BvcztcblxuICAgICAgd2hpbGUgKCFhdmFpbCkge1xuICAgICAgICBuZXdQb3MgPSBnZXRSYW5kb21OdW0oKTtcbiAgICAgICAgYXZhaWwgPSBjaGVja0lmQXZhaWwobmV3UG9zKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5ld1BvcztcbiAgICB9O1xuXG4gICAgaWYgKHBvcyA9PT0gbnVsbCkge1xuICAgICAgY2hvc2VuUG9zID0gZ2V0UmFuZG9tUG9zKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGNoZWNrIHJhbmRvbSBzdXJyb3VuZGluZyBwb3MgaWYgaGl0IHVudGlsIHlvdSBmaW5kIGEgcG9zIGF2YWlsYWJsZVxuICAgICAgLy8gaWYgc3Vycm91bmRpbmcgcG9zaXRpb25zIGFyZSBoaXQsIHBpY2sgYSByYW5kb20gcG9zIGluc3RlYWRcbiAgICAgIGxldCBhdmFpbCwgdGVtcFBvcztcblxuICAgICAgY29uc3QgZ2V0TmV3UG9zID0gKGkpID0+IHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGRlZmF1bHQtY2FzZVxuICAgICAgICBzd2l0Y2ggKGkpIHtcbiAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICByZXR1cm4gcG9zICsgMTtcbiAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICByZXR1cm4gcG9zIC0gMTtcbiAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICByZXR1cm4gcG9zICsgMTA7XG4gICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgcmV0dXJuIHBvcyAtIDEwO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICAvLyBzZWxlY3QgcmFuZG9tbHkgaWYgb25lIG9yIHplcm9cbiAgICAgIC8vIGlmIHplcm8sIGxvb3AgZnJvbSBsdHJcbiAgICAgIC8vIGlmIG9uZSwgbG9vcCBmcm9tIHJ0bFxuICAgICAgLy8gZXZlcnkgbG9vcCBjaGVjayBpZiBjb29yZCBpcyBhdmFpbGFibGVcbiAgICAgIC8vIHJldHVybiBpZiBhdmFpbGFibGVcbiAgICAgIC8vIGxvb3AgNCB0aW1lc1xuICAgICAgLy8gaWYgcmVzdWx0aW5nIGNvb3JkIGlzIDEwMCwgaWdub3JlIGl0XG4gICAgICBjb25zdCByYW5kb21pemVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMik7XG4gICAgICBpZiAocmFuZG9taXplciA9PT0gMCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgICAgIHRlbXBQb3MgPSBnZXROZXdQb3MoaSk7XG4gICAgICAgICAgaWYgKHRlbXBQb3MgPiA5OSB8fCB0ZW1wUG9zIDwgMCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYXZhaWwgPSBjaGVja0lmQXZhaWwodGVtcFBvcyk7XG4gICAgICAgICAgaWYgKGF2YWlsKSB7XG4gICAgICAgICAgICBjaG9zZW5Qb3MgPSB0ZW1wUG9zO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghYXZhaWwpIHtcbiAgICAgICAgICBjaG9zZW5Qb3MgPSBnZXRSYW5kb21Qb3MoKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDM7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgdGVtcFBvcyA9IGdldE5ld1BvcyhpKTtcbiAgICAgICAgICBpZiAodGVtcFBvcyA+IDk5IHx8IHRlbXBQb3MgPCAwKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYXZhaWwgPSBjaGVja0lmQXZhaWwodGVtcFBvcyk7XG4gICAgICAgICAgaWYgKGF2YWlsKSB7XG4gICAgICAgICAgICBjaG9zZW5Qb3MgPSB0ZW1wUG9zO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghYXZhaWwpIHtcbiAgICAgICAgICBjaG9zZW5Qb3MgPSBnZXRSYW5kb21Qb3MoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY2hvc2VuUG9zO1xuICB9O1xuXG4gIGNvbnN0IGF0dGFjayA9IChlbmVteSwgcG9zID0gbnVsbCkgPT4ge1xuICAgIGNvbnN0IGF0dFBvcyA9IHR5cGUgPT09ICdjb21wJyA/IGdldFBvcyhlbmVteSwgcG9zKSA6IHBvcztcbiAgICBjb25zdCBpc0hpdCA9IGVuZW15LmdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKGF0dFBvcyk7XG4gICAgaWYgKHR5cGUgPT09ICdjb21wJykge1xuICAgICAgcmV0dXJuIHsgaXNIaXQsIGhpdFBvczogYXR0UG9zIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIGlzSGl0O1xuICB9O1xuXG4gIHJldHVybiB7IGdldFdpblN0YXR1cywgZ2FtZWJvYXJkLCBhdHRhY2ssIHR5cGUgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUGxheWVyO1xuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tcGx1c3BsdXMgKi9cbmNvbnN0IFNoaXAgPSAobGVuZ3RoLCBwb3MpID0+IHtcbiAgY29uc3QgaGl0bWFya3MgPSBbXTtcblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgY29uc3QgZmlsbEhpdHMgPSAoKCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGhpdG1hcmtzW2ldID0gJyc7XG4gICAgfVxuICB9KSgpO1xuXG4gIGNvbnN0IGhpdCA9IChoaXRQb3MpID0+IHtcbiAgICBjb25zdCBpbmRleCA9IHBvcy5pbmRleE9mKGhpdFBvcyk7XG4gICAgaGl0bWFya3NbaW5kZXhdID0gJ3gnO1xuICB9O1xuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBjb25zdCBpc1N1bmsgPSAoKSA9PiB7XG4gICAgbGV0IGNvdW50ID0gMDtcbiAgICBoaXRtYXJrcy5mb3JFYWNoKChtYXJrKSA9PiB7XG4gICAgICBpZiAobWFyayA9PT0gJ3gnKSB7XG4gICAgICAgIGNvdW50Kys7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gY291bnQgPT09IGxlbmd0aDtcbiAgfTtcblxuICBjb25zdCBjaGFuZ2VQb3MgPSAobmV3UG9zKSA9PiB7XG4gICAgcG9zID0gbmV3UG9zO1xuICB9O1xuXG4gIGNvbnN0IGdldExlbmd0aCA9ICgpID0+IGxlbmd0aDtcbiAgY29uc3QgZ2V0UG9zID0gKCkgPT4gcG9zO1xuXG4gIHJldHVybiB7XG4gICAgZ2V0TGVuZ3RoLFxuICAgIGdldFBvcyxcbiAgICBoaXQsXG4gICAgaXNTdW5rLFxuICAgIGNoYW5nZVBvcyxcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU2hpcDtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1wbHVzcGx1cyAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbmltcG9ydCAqIGFzIGRvbSBmcm9tICcuL2RvbSc7XG5pbXBvcnQgU2hpcCBmcm9tICcuL2ZhY3Rvcmllcy9zaGlwJztcbmltcG9ydCBQbGF5ZXIgZnJvbSAnLi9mYWN0b3JpZXMvcGxheWVyJztcblxuLy8gbWFpbiBnYW1lIGxvb3Bcbi8vIHN0YXJ0cyB3aXRoIGNyZWF0aW5nIHBsYXllcnMgJiBwb3B1bGF0ZSBlYWNoIGdhbWVib2FyZFxuLy8gY3JlYXRlIGh1bWFuIHBsYXllciAmIGdhbWVib2FyZCBmaXJzdFxuLy8gcGxhY2Ugc2hpcHMgb24gcGxheWVyIGdhbWVib2FyZFxuLy8gY3JlYXRlIGNvbXAgcGxheWVyICYgZ2FtZWJvYXJkXG4vLyBwbGFjZSBzaGlwcyBpbiByYW5kb20gcG9zaXRpb24gaW4gZW5lbXkgZ2FtZWJvYXJkXG4vLyBkaXNwbGF5IGJvdGggZ2FtZWJvYXJkc1xuLy8gZ2FtZSBsb29wIHNob3VsZCBzdGVwIHRocm91Z2ggdGhlIGdhbWUgdHVybiBieSB0dXJuXG4vLyB1c2luZyBvbmx5IGZ1bmN0aW9uIGluc2lkZSB0aGUgZ2FtZSBsb29wXG4vLyBjcmVhdGUgY29uZGl0aW9ucyBzbyB0aGF0IHRoZSBnYW1lIGVuZHMgb25jZVxuLy8gb25lIHBsYXllcidzIHNoaXBzIGhhdmUgYWxsIGJlZW4gc3Vua1xuY29uc3QgZ2FtZUZ1bmMgPSAoKCkgPT4ge1xuICBjb25zdCBnZW5lcmF0ZVNoaXBzID0gKHBsYXllcikgPT4ge1xuICAgIGNvbnN0IGdyaWRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAgIHBsYXllci50eXBlID09PSAnaHVtYW4nID8gJy5ncmlkJyA6ICcuYWlncmlkJ1xuICAgICk7XG4gICAgY29uc3QgcmFuZEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbjpmaXJzdC1vZi10eXBlJyk7XG5cbiAgICBjb25zdCBjcmVhdGVQbGF5ZXJTaGlwcyA9ICgpID0+IHtcbiAgICAgIGxldCBsZW5ndGggPSA0O1xuICAgICAgbGV0IGNvdW50ID0gMTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgY291bnQ7IGsrKykge1xuICAgICAgICAgIGNvbnN0IGJsb2NrID0gZG9tLmNyZWF0ZUJsb2NrKHBsYXllciwgbGVuZ3RoKTtcbiAgICAgICAgICBibG9jay5sZW5ndGggPSBsZW5ndGg7XG4gICAgICAgICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgICAgICAgYmxvY2sub3JpZW50YXRpb24gPSBibG9jay5zdHlsZS53aWR0aC5tYXRjaCgvXi4rPyg/PXB4KS8pWzBdIC8gNDAuOTEgPiAxXG4gICAgICAgICAgICA/ICdsYW5kc2NhcGUnXG4gICAgICAgICAgICA6ICdwb3J0cmFpdCc7XG4gICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IGRvbS5nZXRPcHRpb25zKGJsb2NrKTtcbiAgICAgICAgICBsZXQgYXZhaWwgPSBmYWxzZTtcblxuICAgICAgICAgIHdoaWxlICghYXZhaWwpIHtcbiAgICAgICAgICAgIGNvbnN0IHJhbmRJbmQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBvcHRpb25zLmxlbmd0aCk7XG4gICAgICAgICAgICBjb25zdCB0ZW1wUG9zID0gZG9tLmdldE5ld1BvcyhibG9jaywgb3B0aW9uc1tyYW5kSW5kXSk7XG4gICAgICAgICAgICBibG9jay5wb3MgPSB0ZW1wUG9zO1xuICAgICAgICAgICAgYXZhaWwgPSBkb20uY2hlY2tQb3MoJ25ldycsIHBsYXllciwgYmxvY2sucG9zKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZ3JpZHNbYmxvY2sucG9zWzBdXS5hcHBlbmRDaGlsZChibG9jayk7XG4gICAgICAgICAgY29uc3Qgc2hpcCA9IFNoaXAoYmxvY2subGVuZ3RoLCBibG9jay5wb3MpO1xuICAgICAgICAgIHBsYXllci5nYW1lYm9hcmQucGxhY2VTaGlwKHNoaXApO1xuICAgICAgICAgIGRvbS5hZGRCbG9ja0V2ZW50cyhibG9jaywgc2hpcCwgcGxheWVyKTtcbiAgICAgICAgfVxuICAgICAgICBsZW5ndGgtLTtcbiAgICAgICAgY291bnQrKztcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKHBsYXllci50eXBlID09PSAnaHVtYW4nKSB7XG4gICAgICBjcmVhdGVQbGF5ZXJTaGlwcygpO1xuXG4gICAgICByYW5kQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBncmlkcy5mb3JFYWNoKChncmlkKSA9PiB7XG4gICAgICAgICAgZ3JpZC5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgfSk7XG4gICAgICAgIHBsYXllci5nYW1lYm9hcmQud2lwZSgpO1xuICAgICAgICBjcmVhdGVQbGF5ZXJTaGlwcygpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNyZWF0ZVBsYXllclNoaXBzKCk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGluaXQgPSAoKSA9PiB7XG4gICAgY29uc3Qgc3RhcnRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b246bnRoLW9mLXR5cGUoMiknKTtcbiAgICBjb25zdCBodW1hbiA9IFBsYXllcigpO1xuICAgIGNvbnN0IGFpID0gUGxheWVyKCdjb21wJyk7XG4gICAgZG9tLmNyZWF0ZUNvbnRhaW5lcihodW1hbik7XG4gICAgZ2VuZXJhdGVTaGlwcyhodW1hbik7XG5cbiAgICBjb25zdCBzdGFydEdhbWUgPSAoKSA9PiB7XG4gICAgICBkb20uY3JlYXRlQ29udGFpbmVyKGFpKTtcbiAgICAgIGdlbmVyYXRlU2hpcHMoYWkpO1xuICAgICAgZG9tLnJlbW92ZUJsb2NrRXZlbnRzKCk7XG4gICAgICBjb25zdCBhaWdhbWVib2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5haWdyaWQnKTtcblxuICAgICAgY29uc3QgYWlUdXJuID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBhaUF0dGFja0xvb3AgPSAocHJldlBvcykgPT4ge1xuICAgICAgICAgIGNvbnN0IGF0dGFja1N0YXQgPSBhaS5hdHRhY2soaHVtYW4sIHByZXZQb3MpO1xuICAgICAgICAgIGlmICghYXR0YWNrU3RhdC5pc0hpdCkge1xuICAgICAgICAgICAgZG9tLmN1cnNvci5hZGRXYWl0KCk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgZG9tLmN1cnNvci5yZW1vdmVXYWl0KCk7XG4gICAgICAgICAgICAgIGRvbS5hZGRHcmlkRWZmZWN0KGF0dGFja1N0YXQuaGl0UG9zLCBmYWxzZSwgYWkpO1xuICAgICAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgaXNXb24gPSBhaS5nZXRXaW5TdGF0dXMoaHVtYW4pO1xuICAgICAgICAgICAgZG9tLmN1cnNvci5hZGRXYWl0KCk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgZG9tLmN1cnNvci5yZW1vdmVXYWl0KCk7XG4gICAgICAgICAgICAgIGRvbS5hZGRHcmlkRWZmZWN0KGF0dGFja1N0YXQuaGl0UG9zLCB0cnVlLCBhaSk7XG4gICAgICAgICAgICAgIGlmIChpc1dvbikge1xuICAgICAgICAgICAgICAgIGRvbS5kaXNwbGF5RW5kR2FtZShhaSk7XG4gICAgICAgICAgICAgICAgc3RhcnRCdG4ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzdGFydEdhbWUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3RhcnRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVzdGFydC1idG4nKTtcbiAgICAgICAgICAgICAgICByZXN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcmVzdGFydCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYWlBdHRhY2tMb29wKGF0dGFja1N0YXQuaGl0UG9zKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGFpQXR0YWNrTG9vcChudWxsKTtcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHBsYXlUdXJuID0gKGUpID0+IHtcbiAgICAgICAgY29uc3QgcG9zID0gQXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChhaWdhbWVib2FyZCwgZS50YXJnZXQpO1xuICAgICAgICBjb25zdCBpc0hpdCA9IGh1bWFuLmF0dGFjayhhaSwgcG9zKTtcbiAgICAgICAgZG9tLmFkZEdyaWRFZmZlY3QocG9zLCBpc0hpdCwgaHVtYW4pO1xuICAgICAgICBpZiAoaXNIaXQpIHtcbiAgICAgICAgICBjb25zdCBpc1dvbiA9IGh1bWFuLmdldFdpblN0YXR1cyhhaSk7XG4gICAgICAgICAgaWYgKGlzV29uKSB7XG4gICAgICAgICAgICBkb20uZGlzcGxheUVuZEdhbWUoaHVtYW4pO1xuICAgICAgICAgICAgc3RhcnRCdG4ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzdGFydEdhbWUpO1xuICAgICAgICAgICAgY29uc3QgcmVzdGFydEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXN0YXJ0LWJ0bicpO1xuICAgICAgICAgICAgcmVzdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJlc3RhcnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhaVR1cm4oKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgYWlnYW1lYm9hcmQuZm9yRWFjaCgoYWlncmlkKSA9PiB7XG4gICAgICAgIGFpZ3JpZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHBsYXlUdXJuLCB7IG9uY2U6IHRydWUgfSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgc3RhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzdGFydEdhbWUpO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHJlc3RhcnQoKSB7XG4gICAgY29uc3QgY29udGFpbmVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250YWluZXJzJyk7XG4gICAgY29uc3QgYnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2J1dHRvbicpO1xuICAgIGNvbnRhaW5lcnMuaW5uZXJIVE1MID0gJyc7XG4gICAgYnRucy5mb3JFYWNoKChidG4pID0+IHtcbiAgICAgIGJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgfSk7XG4gICAgZG9jdW1lbnRcbiAgICAgIC5xdWVyeVNlbGVjdG9yKCdib2R5JylcbiAgICAgIC5yZW1vdmVDaGlsZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY292ZXInKSk7XG4gICAgaW5pdCgpO1xuICB9XG4gIGluaXQoKTtcbn0pKCk7XG4iXSwibmFtZXMiOlsiY3JlYXRlQ29udGFpbmVyIiwicGxheWVyIiwiYWxwaExhYmVsIiwiY29udGFpbmVyc0RpdiIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImNvbnRhaW5lciIsImNyZWF0ZUVsZW1lbnQiLCJnYW1lYm9hcmQiLCJ0b3BDb250Iiwic2lkZUNvbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJ0eXBlIiwic2V0QXR0cmlidXRlIiwiYXBwZW5kQ2hpbGQiLCJpIiwic3BhbiIsInN0eWxlIiwiY3Vyc29yIiwibGVuZ3RoIiwidG9wU3BhbiIsInRleHRDb250ZW50Iiwic2lkZVNwYW4iLCJjcmVhdGVCbG9jayIsInNpemUiLCJibG9jayIsImRyYWdnYWJsZSIsInZpc2liaWxpdHkiLCJyYW5kb20iLCJNYXRoIiwiZmxvb3IiLCJ3aWR0aCIsImhlaWdodCIsImdldE9wdGlvbnMiLCJhcnIiLCJvcmllbnRhdGlvbiIsInB1c2giLCJsaW1pdHMiLCJudW1TdHIiLCJ0b1N0cmluZyIsImF2YWlsIiwiZm9yRWFjaCIsIm51bSIsImdldE5ld1BvcyIsInN0YXJ0aW5nUHQiLCJuZXdQb3MiLCJqIiwiY2hlY2tQb3MiLCJtb2RlIiwicG9zIiwib2xkUG9zIiwiZ2V0QWxsUG9zIiwic3BsaWNlIiwiaW5kZXhPZiIsIml0ZW0iLCJpbmNsdWRlcyIsImFkZEJsb2NrRXZlbnRzIiwic2hpcCIsIm9wdGlvbnMiLCJncmlkcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJkcmFnRW50ZXIiLCJlIiwicHJldmVudERlZmF1bHQiLCJ0YXJnZXQiLCJjb250YWlucyIsImRyYWdPdmVyIiwiZHJhZ0xlYXZlIiwicmVtb3ZlIiwiZHJhZ0VuZCIsImRyb3AiLCJkcmFnZ2VkIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJjYWxsIiwiY2hhbmdlUG9zIiwiZ3JpZCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJhZGRFdmVudExpc3RlbmVyIiwic2V0VGltZW91dCIsInJlbW92ZUJsb2NrRXZlbnRzIiwiYmxvY2tzIiwiYnRucyIsImNsb25lIiwiY2xvbmVOb2RlIiwicGFyZW50Tm9kZSIsInJlcGxhY2VDaGlsZCIsImJ0biIsInBvc2l0aW9uIiwiYWRkR3JpZEVmZmVjdCIsImluZGV4IiwiaGl0IiwiY292ZXIiLCJkaXNwbGF5RW5kR2FtZSIsIndpbm5lciIsImJvZHkiLCJkaXYiLCJwYXIiLCJyZXN0YXJ0QnRuIiwiZG9jIiwiYWRkV2FpdCIsInBvaW50ZXJFdmVudHMiLCJyZW1vdmVXYWl0IiwiR2FtZWJvYXJkIiwic2hpcHMiLCJhbGxQb3MiLCJtaXNzZWRIaXRzIiwic3Vua2VuIiwiaGl0cyIsInBsYWNlU2hpcCIsImdldE1pc3NlZEhpdHMiLCJnZXRIaXRzIiwiY2hlY2tTdW5rZW4iLCJpc1N1bmsiLCJyZWNlaXZlQXR0YWNrIiwiY29vcmQiLCJpc1NoaXBIaXQiLCJnZXRQb3MiLCJhcmVBbGxTdW5rZW4iLCJjb3VudCIsIm1hcmsiLCJ1cGRhdGVBbGxQb3MiLCJ3aXBlIiwibW9kdWxlIiwiZXhwb3J0cyIsInJlcXVpcmUiLCJQbGF5ZXIiLCJnZXRXaW5TdGF0dXMiLCJlbmVteSIsImNob3NlblBvcyIsImdldFJhbmRvbU51bSIsIm1pbiIsImNlaWwiLCJtYXgiLCJjaGVja0lmQXZhaWwiLCJ0ZW1wUG9zIiwiZ2V0UmFuZG9tUG9zIiwicmFuZG9taXplciIsImF0dGFjayIsImF0dFBvcyIsImlzSGl0IiwiaGl0UG9zIiwiU2hpcCIsImhpdG1hcmtzIiwiZmlsbEhpdHMiLCJnZXRMZW5ndGgiLCJkb20iLCJnYW1lRnVuYyIsImdlbmVyYXRlU2hpcHMiLCJyYW5kQnRuIiwiY3JlYXRlUGxheWVyU2hpcHMiLCJrIiwibWF0Y2giLCJyYW5kSW5kIiwiaW5uZXJIVE1MIiwiaW5pdCIsInN0YXJ0QnRuIiwiaHVtYW4iLCJhaSIsInN0YXJ0R2FtZSIsImFpZ2FtZWJvYXJkIiwiYWlUdXJuIiwiYWlBdHRhY2tMb29wIiwicHJldlBvcyIsImF0dGFja1N0YXQiLCJpc1dvbiIsInJlc3RhcnQiLCJwbGF5VHVybiIsImFpZ3JpZCIsIm9uY2UiLCJjb250YWluZXJzIiwicmVtb3ZlQ2hpbGQiXSwic291cmNlUm9vdCI6IiJ9