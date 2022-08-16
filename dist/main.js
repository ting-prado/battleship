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

  var init = function () {
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
                alert('You lost the game, sucker!');
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
            alert('You won the game!');
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
  }();
}();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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UixLQUFLLENBQUM5QixZQUFOLENBQW1CK0IsRUFBbkIsQ0FBZDs7VUFDQSxJQUFJTyxLQUFKLEVBQVc7WUFDVEMsS0FBSyxDQUFDLG1CQUFELENBQUw7VUFDRDtRQUNGLENBTEQsTUFLTztVQUNMTCxNQUFNO1FBQ1A7TUFDRixDQVpEOztNQWNBRCxXQUFXLENBQUNqSCxPQUFaLENBQW9CLFVBQUN5SCxNQUFELEVBQVk7UUFDOUJBLE1BQU0sQ0FBQ3BGLGdCQUFQLENBQXdCLE9BQXhCLEVBQWlDbUYsUUFBakMsRUFBMkM7VUFBRUUsSUFBSSxFQUFFO1FBQVIsQ0FBM0M7TUFDRCxDQUZEO0lBR0QsQ0FqREQ7O0lBbURBYixRQUFRLENBQUN4RSxnQkFBVCxDQUEwQixPQUExQixFQUFtQzJFLFNBQW5DO0VBQ0QsQ0EzRFksRUFBYjtBQTRERCxDQWhIZ0IsRUFBakIsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgZGVmYXVsdC1jYXNlICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wbHVzcGx1cyAqL1xuY29uc3QgY3JlYXRlQ29udGFpbmVyID0gKHBsYXllcikgPT4ge1xuICBjb25zdCBhbHBoTGFiZWwgPSBbJ0EnLCAnQicsICdDJywgJ0QnLCAnRScsICdGJywgJ0cnLCAnSCcsICdJJywgJ0onXTtcblxuICBjb25zdCBjb250YWluZXJzRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRhaW5lcnMnKTtcbiAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNvbnN0IGdhbWVib2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb25zdCB0b3BDb250ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNvbnN0IHNpZGVDb250ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdjb250YWluZXInKTtcbiAgZ2FtZWJvYXJkLmNsYXNzTGlzdC5hZGQoJ2dhbWVib2FyZCcpO1xuICB0b3BDb250LmNsYXNzTGlzdC5hZGQoJ3RvcENvbnQnKTtcbiAgc2lkZUNvbnQuY2xhc3NMaXN0LmFkZCgnc2lkZUNvbnQnKTtcbiAgaWYgKHBsYXllci50eXBlID09PSAnY29tcCcpIHtcbiAgICBjb250YWluZXIuc2V0QXR0cmlidXRlKFxuICAgICAgJ3N0eWxlJyxcbiAgICAgICdhbmltYXRpb246IDFzIGFwcGVhcjsgYW5pbWF0aW9uLWZpbGwtbW9kZTogZm9yd2FyZHM7IHZpc2liaWxpdHk6IGhpZGRlbidcbiAgICApO1xuICB9XG5cbiAgY29udGFpbmVyc0Rpdi5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZ2FtZWJvYXJkKTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRvcENvbnQpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc2lkZUNvbnQpO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcbiAgICBjb25zdCBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIHNwYW4uY2xhc3NMaXN0LmFkZChwbGF5ZXIudHlwZSA9PT0gJ2h1bWFuJyA/ICdncmlkJyA6ICdhaWdyaWQnKTtcbiAgICBpZiAocGxheWVyLnR5cGUgPT09ICdjb21wJykge1xuICAgICAgc3Bhbi5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG4gICAgfVxuICAgIGdhbWVib2FyZC5hcHBlbmRDaGlsZChzcGFuKTtcbiAgfVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYWxwaExhYmVsLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgdG9wU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICB0b3BTcGFuLnRleHRDb250ZW50ID0gYWxwaExhYmVsW2ldO1xuICAgIHRvcENvbnQuYXBwZW5kQ2hpbGQodG9wU3Bhbik7XG5cbiAgICBjb25zdCBzaWRlU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBzaWRlU3Bhbi50ZXh0Q29udGVudCA9IGkgKyAxO1xuICAgIHNpZGVDb250LmFwcGVuZENoaWxkKHNpZGVTcGFuKTtcbiAgfVxufTtcblxuY29uc3QgY3JlYXRlQmxvY2sgPSAocGxheWVyLCBsZW5ndGgpID0+IHtcbiAgY29uc3Qgc2l6ZSA9IDQwLjkxO1xuICBjb25zdCBibG9jayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBpZiAocGxheWVyLnR5cGUgPT09ICdodW1hbicpIHtcbiAgICBibG9jay5jbGFzc0xpc3QuYWRkKCdkcmFnZ2FibGUnKTtcbiAgICBibG9jay5kcmFnZ2FibGUgPSB0cnVlO1xuICB9IGVsc2Uge1xuICAgIGJsb2NrLmNsYXNzTGlzdC5hZGQoJ2FpYmxvY2snKTtcbiAgICBibG9jay5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XG4gIH1cbiAgY29uc3QgcmFuZG9tID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMik7XG4gIGlmIChyYW5kb20gPT09IDEpIHtcbiAgICBibG9jay5zdHlsZS53aWR0aCA9IGAke3NpemV9cHhgO1xuICAgIGJsb2NrLnN0eWxlLmhlaWdodCA9IGAke3NpemUgKiBsZW5ndGh9cHhgO1xuICB9IGVsc2Uge1xuICAgIGJsb2NrLnN0eWxlLndpZHRoID0gYCR7c2l6ZSAqIGxlbmd0aH1weGA7XG4gICAgYmxvY2suc3R5bGUuaGVpZ2h0ID0gYCR7c2l6ZX1weGA7XG4gIH1cblxuICByZXR1cm4gYmxvY2s7XG59O1xuXG5jb25zdCBnZXRPcHRpb25zID0gKGJsb2NrKSA9PiB7XG4gIGNvbnN0IGFyciA9IFtdO1xuICBpZiAoYmxvY2sub3JpZW50YXRpb24gPT09ICdwb3J0cmFpdCcpIHtcbiAgICBzd2l0Y2ggKGJsb2NrLmxlbmd0aCkge1xuICAgICAgY2FzZSA0OlxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDcwOyBpKyspIHtcbiAgICAgICAgICBhcnIucHVzaChpKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA4MDsgaSsrKSB7XG4gICAgICAgICAgYXJyLnB1c2goaSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgOTA7IGkrKykge1xuICAgICAgICAgIGFyci5wdXNoKGkpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAxOlxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XG4gICAgICAgICAgYXJyLnB1c2goaSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGxldCBsaW1pdHM7XG4gICAgc3dpdGNoIChibG9jay5sZW5ndGgpIHtcbiAgICAgIGNhc2UgNDpcbiAgICAgICAgbGltaXRzID0gWzcsIDgsIDldO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgbGltaXRzID0gWzgsIDldO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgbGltaXRzID0gWzldO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xuICAgICAgY29uc3QgbnVtU3RyID0gaS50b1N0cmluZygpO1xuICAgICAgbGV0IGF2YWlsID0gdHJ1ZTtcbiAgICAgIGxpbWl0cy5mb3JFYWNoKChudW0pID0+IHtcbiAgICAgICAgaWYgKGkgPT09IG51bSB8fCBudW1TdHJbMV0gPT0gbnVtKSB7XG4gICAgICAgICAgYXZhaWwgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBpZiAoYXZhaWwpIHtcbiAgICAgICAgYXJyLnB1c2goaSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBhcnI7XG59O1xuXG5jb25zdCBnZXROZXdQb3MgPSAoYmxvY2ssIHN0YXJ0aW5nUHQpID0+IHtcbiAgY29uc3QgbmV3UG9zID0gW107XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBmb3IgKGxldCBqID0gMDsgaiA8IGJsb2NrLmxlbmd0aDsgaisrKSB7XG4gICAgbmV3UG9zLnB1c2goXG4gICAgICBzdGFydGluZ1B0ICsgKGJsb2NrLm9yaWVudGF0aW9uID09PSAncG9ydHJhaXQnID8gaiAqIDEwIDogailcbiAgICApO1xuICB9XG4gIHJldHVybiBuZXdQb3M7XG59O1xuXG5jb25zdCBjaGVja1BvcyA9IChtb2RlLCBwbGF5ZXIsIHBvcywgb2xkUG9zKSA9PiB7XG4gIGxldCBhdmFpbCA9IHRydWU7XG4gIGNvbnN0IGFyciA9IHBsYXllci5nYW1lYm9hcmQuZ2V0QWxsUG9zKCk7XG4gIGlmIChtb2RlID09PSAnZXhpc3RpbmcnKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvbGRQb3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFyci5zcGxpY2UoYXJyLmluZGV4T2Yob2xkUG9zW2ldKSwgMSk7XG4gICAgfVxuICB9XG4gIHBvcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgaWYgKGFyci5pbmNsdWRlcyhpdGVtKSkge1xuICAgICAgYXZhaWwgPSBmYWxzZTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gYXZhaWw7XG59O1xuXG5jb25zdCBhZGRCbG9ja0V2ZW50cyA9IChibG9jaywgc2hpcCwgcGxheWVyKSA9PiB7XG4gIGNvbnN0IG9wdGlvbnMgPSBnZXRPcHRpb25zKGJsb2NrKTtcbiAgY29uc3QgZ3JpZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ3JpZCcpO1xuICAvLyBhY3RpdmF0ZSB0aGVzZSBmdW5jdGlvbnMgZHVyaW5nIGRyYWdzdGFydFxuICAvLyBnZXQgbGVuZ3RoIG9mIGJsb2NrIHRoYXQgaXMgYmVpbmcgZHJhZ2dlZFxuICAvLyBjaGFuZ2UgZHJvcCB0YXJnZXRzIGFjY29yZGluZyB0byBibG9jayBsZW5ndGggYW5kIG9yaWVudGF0aW9uXG4gIGNvbnN0IGRyYWdFbnRlciA9IChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2Ryb3BwYWJsZScpKSB7XG4gICAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKCdkcmFnLW92ZXInKTtcbiAgICB9XG4gIH07XG5cbiAgLy8gYWRkIGRyYWcmZHJvcCBwcm9wZXJ0aWVzIHRvIGFsbCBncmlkc1xuICAvLyBnZXQgYmxvY2sgcHJldmlvdXMgcG9zaXRpb24gb24gZHJhZ3N0YXJ0XG4gIC8vIGNoZWNrIGlmIGdyaWQgaXMgaW5jbHVkZWQgaW4gb3B0aW9ucyB3aGVuIGRyYWdnaW5nIG92ZXIvZHJvcHBpbmdcbiAgLy8gaWYgeWVzLCBhZGQgZHJhZy1vdmVyIGNsYXNzIGFuZCBhbGxvdyBkcm9wXG4gIC8vIGlmIG5vLCBkbyBub3QgZGlzcGxheSBkcmFnLW92ZXIgY2xhc3NcbiAgLy8gYWxzbyBjaGVjayBpZiB0aGUgcmVzdCBvZiB0aGUgYmxvY2sgb2NjdXBpZXMgYW5vdGhlciBibG9ja1xuICAvLyBpZiB5ZXMsIHJldHVybiBibG9jayB0byBwcmV2aW91cyBwb3NpdGlvblxuICAvLyBpZiBhIGJsb2NrIGlzIGRyb3BwZWQgb24gbm9uLW9wdGlvbiBncmlkLFxuICAvLyByZXR1cm4gYmxvY2sgdG8gcHJldmlvdXMgcG9zaXRpb25cbiAgY29uc3QgZHJhZ092ZXIgPSAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkcm9wcGFibGUnKSkge1xuICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZCgnZHJhZy1vdmVyJyk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGRyYWdMZWF2ZSA9IChlKSA9PiB7XG4gICAgZS50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZy1vdmVyJyk7XG4gIH07XG5cbiAgY29uc3QgZHJhZ0VuZCA9IChlKSA9PiB7XG4gICAgZS50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICB9O1xuXG4gIGNvbnN0IGRyb3AgPSAoZSkgPT4ge1xuICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2RyYWctb3ZlcicpO1xuICAgIGNvbnN0IGRyYWdnZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZHJhZ2dlZCcpO1xuICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2dyaWQnKSkge1xuICAgICAgY29uc3QgbmV3UG9zID0gZ2V0TmV3UG9zKFxuICAgICAgICBibG9jayxcbiAgICAgICAgQXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChncmlkcywgZS50YXJnZXQpXG4gICAgICApO1xuICAgICAgY29uc3QgYXZhaWwgPSBjaGVja1BvcygnZXhpc3RpbmcnLCBwbGF5ZXIsIG5ld1BvcywgYmxvY2sucG9zKTtcbiAgICAgIGlmIChhdmFpbCAmJiBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2Ryb3BwYWJsZScpKSB7XG4gICAgICAgIGUudGFyZ2V0LmFwcGVuZENoaWxkKGRyYWdnZWQpO1xuICAgICAgICBzaGlwLmNoYW5nZVBvcyhuZXdQb3MpO1xuICAgICAgICBibG9jay5wb3MgPSBuZXdQb3M7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBncmlkc1tibG9jay5wb3NbMF1dLmFwcGVuZENoaWxkKGRyYWdnZWQpO1xuICAgICAgfVxuICAgIH1cbiAgICBkcmFnZ2VkLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICBkcmFnZ2VkLmNsYXNzTGlzdC5yZW1vdmUoJ2RyYWdnZWQnKTtcbiAgICBncmlkcy5mb3JFYWNoKChncmlkKSA9PiB7XG4gICAgICBncmlkLmNsYXNzTGlzdC5yZW1vdmUoJ2Ryb3BwYWJsZScpO1xuICAgICAgZ3JpZC5yZW1vdmVFdmVudExpc3RlbmVyKCdkcmFnZW50ZXInLCBkcmFnRW50ZXIpO1xuICAgICAgZ3JpZC5yZW1vdmVFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIGRyYWdPdmVyKTtcbiAgICAgIGdyaWQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgZHJhZ0xlYXZlKTtcbiAgICAgIGdyaWQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJvcCcsIGRyb3ApO1xuICAgIH0pO1xuICB9O1xuXG4gIGJsb2NrLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIChlKSA9PiB7XG4gICAgLy8gYWRkIGRyYWcgcHJvcGVydGllcyB0byBncmlkIG9uIGRyYWdzdGFydFxuICAgIC8vIGZvbGxvdyBwZXJjZW50YWdlIGJlbG93IGZvciBncmlkcyBhbGxvd2VkIHRvIGJlIHBsYWNlZCBvblxuICAgIC8vIHJlbW92ZSBkcmFnIHByb3BlcnRpZXMgb24gZ3JpZHMgYWZ0ZXIgZHJvcHBpbmdcbiAgICAvLyBhZGQgY2hlY2tlciBzbyBibG9ja3Mgd29uJ3Qgb3ZlcmxhcFxuICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2RyYWdnZWQnKTtcbiAgICBsZXQgaiA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xuICAgICAgaWYgKGkgPT09IG9wdGlvbnNbal0pIHtcbiAgICAgICAgZ3JpZHNbaV0uY2xhc3NMaXN0LmFkZCgnZHJvcHBhYmxlJyk7XG4gICAgICAgIGorKztcbiAgICAgIH1cbiAgICB9XG4gICAgZ3JpZHMuZm9yRWFjaCgoZ3JpZCkgPT4ge1xuICAgICAgZ3JpZC5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW50ZXInLCBkcmFnRW50ZXIpO1xuICAgICAgZ3JpZC5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIGRyYWdPdmVyKTtcbiAgICAgIGdyaWQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgZHJhZ0xlYXZlKTtcbiAgICAgIGdyaWQuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIGRyb3ApO1xuICAgIH0pO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgIH0sIDApO1xuICB9KTtcblxuICBibG9jay5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW5kJywgZHJhZ0VuZCk7XG59O1xuXG5jb25zdCByZW1vdmVCbG9ja0V2ZW50cyA9ICgpID0+IHtcbiAgY29uc3QgZ3JpZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ3JpZCwgLmFpZ3JpZCcpO1xuICBjb25zdCBibG9ja3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZHJhZ2dhYmxlJyk7XG4gIGNvbnN0IGJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdidXR0b24nKTtcbiAgYmxvY2tzLmZvckVhY2goKGJsb2NrKSA9PiB7XG4gICAgY29uc3QgY2xvbmUgPSBibG9jay5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgY2xvbmUuZHJhZ2dhYmxlID0gZmFsc2U7XG4gICAgY2xvbmUuc3R5bGUuY3Vyc29yID0gJ2F1dG8nO1xuICAgIGJsb2NrLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKGNsb25lLCBibG9jayk7XG4gIH0pO1xuICBidG5zLmZvckVhY2goKGJ0bikgPT4ge1xuICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gIH0pO1xuICBncmlkcy5mb3JFYWNoKChncmlkKSA9PiB7XG4gICAgZ3JpZC5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XG4gIH0pO1xufTtcblxuY29uc3QgYWRkR3JpZEVmZmVjdCA9IChpbmRleCwgaGl0LCBwbGF5ZXIpID0+IHtcbiAgY29uc3QgZ3JpZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgIHBsYXllci50eXBlID09PSAnaHVtYW4nID8gJy5haWdyaWQnIDogJy5ncmlkJ1xuICApO1xuICBjb25zdCBjb3ZlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgY292ZXIudGV4dENvbnRlbnQgPSBoaXQgPyAn4pyVJyA6ICfil48nO1xuICBjb3Zlci5jbGFzc0xpc3QuYWRkKGhpdCA/ICdoaXQnIDogJ21pc3MnKTtcbiAgZ3JpZHNbaW5kZXhdLmFwcGVuZENoaWxkKGNvdmVyKTtcbiAgZ3JpZHNbaW5kZXhdLnN0eWxlLmN1cnNvciA9ICdhdXRvJztcbn07XG5cbmNvbnN0IGN1cnNvciA9ICgoKSA9PiB7XG4gIGNvbnN0IGRvYyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2h0bWwnKTtcbiAgY29uc3QgYWRkV2FpdCA9ICgpID0+IHtcbiAgICBkb2Muc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJztcbiAgICBkb2Muc3R5bGUuY3Vyc29yID0gJ3dhaXQnO1xuICB9O1xuXG4gIGNvbnN0IHJlbW92ZVdhaXQgPSAoKSA9PiB7XG4gICAgZG9jLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnYXV0byc7XG4gICAgZG9jLnN0eWxlLmN1cnNvciA9ICdhdXRvJztcbiAgfTtcblxuICByZXR1cm4geyBhZGRXYWl0LCByZW1vdmVXYWl0IH07XG59KSgpO1xuXG5leHBvcnQge1xuICBjdXJzb3IsXG4gIGFkZEdyaWRFZmZlY3QsXG4gIGNyZWF0ZUNvbnRhaW5lcixcbiAgY3JlYXRlQmxvY2ssXG4gIGFkZEJsb2NrRXZlbnRzLFxuICByZW1vdmVCbG9ja0V2ZW50cyxcbiAgZ2V0TmV3UG9zLFxuICBnZXRPcHRpb25zLFxuICBjaGVja1Bvcyxcbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1wbHVzcGx1cyAqL1xuY29uc3QgR2FtZWJvYXJkID0gKCkgPT4ge1xuICBsZXQgc2hpcHMgPSBbXTtcbiAgbGV0IGFsbFBvcyA9IFtdO1xuICBjb25zdCBtaXNzZWRIaXRzID0gW107XG4gIGNvbnN0IHN1bmtlbiA9IFtdO1xuICBjb25zdCBoaXRzID0gW107XG5cbiAgY29uc3QgcGxhY2VTaGlwID0gKHNoaXApID0+IHtcbiAgICBzaGlwcy5wdXNoKHNoaXApO1xuICAgIHN1bmtlbi5wdXNoKCcnKTtcbiAgfTtcblxuICBjb25zdCBnZXRNaXNzZWRIaXRzID0gKCkgPT4gbWlzc2VkSGl0cztcblxuICBjb25zdCBnZXRIaXRzID0gKCkgPT4gaGl0cztcblxuICBjb25zdCBjaGVja1N1bmtlbiA9IChzaGlwKSA9PiB7XG4gICAgaWYgKHNoaXAuaXNTdW5rKCkpIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gc2hpcHMuaW5kZXhPZihzaGlwKTtcbiAgICAgIHN1bmtlbltpbmRleF0gPSAneCc7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoY29vcmQpID0+IHtcbiAgICBsZXQgaXNTaGlwSGl0ID0gZmFsc2U7XG4gICAgc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgc2hpcC5nZXRQb3MoKS5mb3JFYWNoKChwb3NpdGlvbikgPT4ge1xuICAgICAgICBpZiAocG9zaXRpb24gPT09IGNvb3JkKSB7XG4gICAgICAgICAgaXNTaGlwSGl0ID0gdHJ1ZTtcbiAgICAgICAgICBzaGlwLmhpdChjb29yZCk7XG4gICAgICAgICAgaGl0cy5wdXNoKGNvb3JkKTtcbiAgICAgICAgICBjaGVja1N1bmtlbihzaGlwKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpZiAoIWlzU2hpcEhpdCkge1xuICAgICAgaGl0cy5wdXNoKGNvb3JkKTtcbiAgICAgIG1pc3NlZEhpdHMucHVzaChjb29yZCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGlzU2hpcEhpdDtcbiAgfTtcblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbiAgY29uc3QgYXJlQWxsU3Vua2VuID0gKCkgPT4ge1xuICAgIGxldCBjb3VudCA9IDA7XG4gICAgc3Vua2VuLmZvckVhY2goKG1hcmspID0+IHtcbiAgICAgIGlmIChtYXJrID09PSAneCcpIHtcbiAgICAgICAgY291bnQrKztcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBjb3VudCA9PT0gc2hpcHMubGVuZ3RoO1xuICB9O1xuXG4gIGNvbnN0IHVwZGF0ZUFsbFBvcyA9ICgpID0+IHtcbiAgICBhbGxQb3MgPSBbXTtcbiAgICBzaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICBzaGlwLmdldFBvcygpLmZvckVhY2goKHBvcykgPT4ge1xuICAgICAgICBhbGxQb3MucHVzaChwb3MpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgZ2V0QWxsUG9zID0gKCkgPT4ge1xuICAgIHVwZGF0ZUFsbFBvcygpO1xuICAgIHJldHVybiBhbGxQb3M7XG4gIH07XG5cbiAgY29uc3Qgd2lwZSA9ICgpID0+IHtcbiAgICBzaGlwcyA9IFtdO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgcGxhY2VTaGlwLFxuICAgIHJlY2VpdmVBdHRhY2ssXG4gICAgZ2V0TWlzc2VkSGl0cyxcbiAgICBhcmVBbGxTdW5rZW4sXG4gICAgZ2V0SGl0cyxcbiAgICBnZXRBbGxQb3MsXG4gICAgd2lwZSxcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gR2FtZWJvYXJkO1xuIiwiLyogZXNsaW50LWRpc2FibGUgY29uc2lzdGVudC1yZXR1cm4gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXBsdXNwbHVzICovXG5jb25zdCBHYW1lYm9hcmQgPSByZXF1aXJlKCcuL2dhbWVib2FyZCcpO1xuXG5jb25zdCBQbGF5ZXIgPSAodHlwZSA9ICdodW1hbicpID0+IHtcbiAgY29uc3QgZ2FtZWJvYXJkID0gR2FtZWJvYXJkKCk7XG4gIGNvbnN0IGdldFdpblN0YXR1cyA9IChlbmVteSkgPT4gZW5lbXkuZ2FtZWJvYXJkLmFyZUFsbFN1bmtlbigpO1xuXG4gIGNvbnN0IGdldFBvcyA9IChlbmVteSwgcG9zKSA9PiB7XG4gICAgLy8gaWYgcHJldlBvcyBpcyB1bmRlZmluZWQsIGNob29zZSByYW5kb20gcG9zXG4gICAgLy8gY2hlY2sgaWYgcmFuZG9tIHBvcyBpcyBoaXQgb3Igbm90XG4gICAgLy8gaWYgbm90IGhpdCwgcmV0dXJuIHBvc1xuICAgIC8vIGlmIGhpdCwgY2hvb3NlIGFub3RoZXIgb25lXG4gICAgbGV0IGNob3NlblBvcztcblxuICAgIGNvbnN0IGdldFJhbmRvbU51bSA9ICgpID0+IHtcbiAgICAgIGNvbnN0IG1pbiA9IE1hdGguY2VpbCgwKTsgLy8gaW5jbHVzaXZlXG4gICAgICBjb25zdCBtYXggPSBNYXRoLmZsb29yKDEwMCk7IC8vIGV4Y2x1c2l2ZVxuICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluKTtcbiAgICB9O1xuXG4gICAgY29uc3QgY2hlY2tJZkF2YWlsID0gKHRlbXBQb3MpID0+XG4gICAgICAhZW5lbXkuZ2FtZWJvYXJkLmdldEhpdHMoKS5pbmNsdWRlcyh0ZW1wUG9zKTtcblxuICAgIGNvbnN0IGdldFJhbmRvbVBvcyA9ICgpID0+IHtcbiAgICAgIGxldCBhdmFpbDtcbiAgICAgIGxldCBuZXdQb3M7XG5cbiAgICAgIHdoaWxlICghYXZhaWwpIHtcbiAgICAgICAgbmV3UG9zID0gZ2V0UmFuZG9tTnVtKCk7XG4gICAgICAgIGF2YWlsID0gY2hlY2tJZkF2YWlsKG5ld1Bvcyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXdQb3M7XG4gICAgfTtcblxuICAgIGlmIChwb3MgPT09IG51bGwpIHtcbiAgICAgIGNob3NlblBvcyA9IGdldFJhbmRvbVBvcygpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBjaGVjayByYW5kb20gc3Vycm91bmRpbmcgcG9zIGlmIGhpdCB1bnRpbCB5b3UgZmluZCBhIHBvcyBhdmFpbGFibGVcbiAgICAgIC8vIGlmIHN1cnJvdW5kaW5nIHBvc2l0aW9ucyBhcmUgaGl0LCBwaWNrIGEgcmFuZG9tIHBvcyBpbnN0ZWFkXG4gICAgICBsZXQgYXZhaWwsIHRlbXBQb3M7XG5cbiAgICAgIGNvbnN0IGdldE5ld1BvcyA9IChpKSA9PiB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBkZWZhdWx0LWNhc2VcbiAgICAgICAgc3dpdGNoIChpKSB7XG4gICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgcmV0dXJuIHBvcyArIDE7XG4gICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgcmV0dXJuIHBvcyAtIDE7XG4gICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgcmV0dXJuIHBvcyArIDEwO1xuICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgIHJldHVybiBwb3MgLSAxMDtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgLy8gc2VsZWN0IHJhbmRvbWx5IGlmIG9uZSBvciB6ZXJvXG4gICAgICAvLyBpZiB6ZXJvLCBsb29wIGZyb20gbHRyXG4gICAgICAvLyBpZiBvbmUsIGxvb3AgZnJvbSBydGxcbiAgICAgIC8vIGV2ZXJ5IGxvb3AgY2hlY2sgaWYgY29vcmQgaXMgYXZhaWxhYmxlXG4gICAgICAvLyByZXR1cm4gaWYgYXZhaWxhYmxlXG4gICAgICAvLyBsb29wIDQgdGltZXNcbiAgICAgIC8vIGlmIHJlc3VsdGluZyBjb29yZCBpcyAxMDAsIGlnbm9yZSBpdFxuICAgICAgY29uc3QgcmFuZG9taXplciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpO1xuICAgICAgaWYgKHJhbmRvbWl6ZXIgPT09IDApIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgICAgICB0ZW1wUG9zID0gZ2V0TmV3UG9zKGkpO1xuICAgICAgICAgIGlmICh0ZW1wUG9zID4gOTkgfHwgdGVtcFBvcyA8IDApIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGF2YWlsID0gY2hlY2tJZkF2YWlsKHRlbXBQb3MpO1xuICAgICAgICAgIGlmIChhdmFpbCkge1xuICAgICAgICAgICAgY2hvc2VuUG9zID0gdGVtcFBvcztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIWF2YWlsKSB7XG4gICAgICAgICAgY2hvc2VuUG9zID0gZ2V0UmFuZG9tUG9zKCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAzOyBpID49IDA7IGktLSkge1xuICAgICAgICAgIHRlbXBQb3MgPSBnZXROZXdQb3MoaSk7XG4gICAgICAgICAgaWYgKHRlbXBQb3MgPiA5OSB8fCB0ZW1wUG9zIDwgMCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGF2YWlsID0gY2hlY2tJZkF2YWlsKHRlbXBQb3MpO1xuICAgICAgICAgIGlmIChhdmFpbCkge1xuICAgICAgICAgICAgY2hvc2VuUG9zID0gdGVtcFBvcztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIWF2YWlsKSB7XG4gICAgICAgICAgY2hvc2VuUG9zID0gZ2V0UmFuZG9tUG9zKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNob3NlblBvcztcbiAgfTtcblxuICBjb25zdCBhdHRhY2sgPSAoZW5lbXksIHBvcyA9IG51bGwpID0+IHtcbiAgICBjb25zdCBhdHRQb3MgPSB0eXBlID09PSAnY29tcCcgPyBnZXRQb3MoZW5lbXksIHBvcykgOiBwb3M7XG4gICAgY29uc3QgaXNIaXQgPSBlbmVteS5nYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhhdHRQb3MpO1xuICAgIGlmICh0eXBlID09PSAnY29tcCcpIHtcbiAgICAgIHJldHVybiB7IGlzSGl0LCBoaXRQb3M6IGF0dFBvcyB9O1xuICAgIH1cblxuICAgIHJldHVybiBpc0hpdDtcbiAgfTtcblxuICByZXR1cm4geyBnZXRXaW5TdGF0dXMsIGdhbWVib2FyZCwgYXR0YWNrLCB0eXBlIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBsYXllcjtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXBsdXNwbHVzICovXG5jb25zdCBTaGlwID0gKGxlbmd0aCwgcG9zKSA9PiB7XG4gIGNvbnN0IGhpdG1hcmtzID0gW107XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gIGNvbnN0IGZpbGxIaXRzID0gKCgpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBoaXRtYXJrc1tpXSA9ICcnO1xuICAgIH1cbiAgfSkoKTtcblxuICBjb25zdCBoaXQgPSAoaGl0UG9zKSA9PiB7XG4gICAgY29uc3QgaW5kZXggPSBwb3MuaW5kZXhPZihoaXRQb3MpO1xuICAgIGhpdG1hcmtzW2luZGV4XSA9ICd4JztcbiAgfTtcblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbiAgY29uc3QgaXNTdW5rID0gKCkgPT4ge1xuICAgIGxldCBjb3VudCA9IDA7XG4gICAgaGl0bWFya3MuZm9yRWFjaCgobWFyaykgPT4ge1xuICAgICAgaWYgKG1hcmsgPT09ICd4Jykge1xuICAgICAgICBjb3VudCsrO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGNvdW50ID09PSBsZW5ndGg7XG4gIH07XG5cbiAgY29uc3QgY2hhbmdlUG9zID0gKG5ld1BvcykgPT4ge1xuICAgIHBvcyA9IG5ld1BvcztcbiAgfTtcblxuICBjb25zdCBnZXRMZW5ndGggPSAoKSA9PiBsZW5ndGg7XG4gIGNvbnN0IGdldFBvcyA9ICgpID0+IHBvcztcblxuICByZXR1cm4ge1xuICAgIGdldExlbmd0aCxcbiAgICBnZXRQb3MsXG4gICAgaGl0LFxuICAgIGlzU3VuayxcbiAgICBjaGFuZ2VQb3MsXG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNoaXA7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyogZXNsaW50LWRpc2FibGUgbm8tcGx1c3BsdXMgKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG5pbXBvcnQgKiBhcyBkb20gZnJvbSAnLi9kb20nO1xuaW1wb3J0IFNoaXAgZnJvbSAnLi9mYWN0b3JpZXMvc2hpcCc7XG5pbXBvcnQgUGxheWVyIGZyb20gJy4vZmFjdG9yaWVzL3BsYXllcic7XG5cbi8vIG1haW4gZ2FtZSBsb29wXG4vLyBzdGFydHMgd2l0aCBjcmVhdGluZyBwbGF5ZXJzICYgcG9wdWxhdGUgZWFjaCBnYW1lYm9hcmRcbi8vIGNyZWF0ZSBodW1hbiBwbGF5ZXIgJiBnYW1lYm9hcmQgZmlyc3Rcbi8vIHBsYWNlIHNoaXBzIG9uIHBsYXllciBnYW1lYm9hcmRcbi8vIGNyZWF0ZSBjb21wIHBsYXllciAmIGdhbWVib2FyZFxuLy8gcGxhY2Ugc2hpcHMgaW4gcmFuZG9tIHBvc2l0aW9uIGluIGVuZW15IGdhbWVib2FyZFxuLy8gZGlzcGxheSBib3RoIGdhbWVib2FyZHNcbi8vIGdhbWUgbG9vcCBzaG91bGQgc3RlcCB0aHJvdWdoIHRoZSBnYW1lIHR1cm4gYnkgdHVyblxuLy8gdXNpbmcgb25seSBmdW5jdGlvbiBpbnNpZGUgdGhlIGdhbWUgbG9vcFxuLy8gY3JlYXRlIGNvbmRpdGlvbnMgc28gdGhhdCB0aGUgZ2FtZSBlbmRzIG9uY2Vcbi8vIG9uZSBwbGF5ZXIncyBzaGlwcyBoYXZlIGFsbCBiZWVuIHN1bmtcbmNvbnN0IGdhbWVGdW5jID0gKCgpID0+IHtcbiAgY29uc3QgZ2VuZXJhdGVTaGlwcyA9IChwbGF5ZXIpID0+IHtcbiAgICBjb25zdCBncmlkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICBwbGF5ZXIudHlwZSA9PT0gJ2h1bWFuJyA/ICcuZ3JpZCcgOiAnLmFpZ3JpZCdcbiAgICApO1xuICAgIGNvbnN0IHJhbmRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b246Zmlyc3Qtb2YtdHlwZScpO1xuXG4gICAgY29uc3QgY3JlYXRlUGxheWVyU2hpcHMgPSAoKSA9PiB7XG4gICAgICBsZXQgbGVuZ3RoID0gNDtcbiAgICAgIGxldCBjb3VudCA9IDE7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IGNvdW50OyBrKyspIHtcbiAgICAgICAgICBjb25zdCBibG9jayA9IGRvbS5jcmVhdGVCbG9jayhwbGF5ZXIsIGxlbmd0aCk7XG4gICAgICAgICAgYmxvY2subGVuZ3RoID0gbGVuZ3RoO1xuICAgICAgICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgICAgICAgIGJsb2NrLm9yaWVudGF0aW9uID0gYmxvY2suc3R5bGUud2lkdGgubWF0Y2goL14uKz8oPz1weCkvKVswXSAvIDQwLjkxID4gMVxuICAgICAgICAgICAgPyAnbGFuZHNjYXBlJ1xuICAgICAgICAgICAgOiAncG9ydHJhaXQnO1xuICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSBkb20uZ2V0T3B0aW9ucyhibG9jayk7XG4gICAgICAgICAgbGV0IGF2YWlsID0gZmFsc2U7XG5cbiAgICAgICAgICB3aGlsZSAoIWF2YWlsKSB7XG4gICAgICAgICAgICBjb25zdCByYW5kSW5kID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogb3B0aW9ucy5sZW5ndGgpO1xuICAgICAgICAgICAgY29uc3QgdGVtcFBvcyA9IGRvbS5nZXROZXdQb3MoYmxvY2ssIG9wdGlvbnNbcmFuZEluZF0pO1xuICAgICAgICAgICAgYmxvY2sucG9zID0gdGVtcFBvcztcbiAgICAgICAgICAgIGF2YWlsID0gZG9tLmNoZWNrUG9zKCduZXcnLCBwbGF5ZXIsIGJsb2NrLnBvcyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGdyaWRzW2Jsb2NrLnBvc1swXV0uYXBwZW5kQ2hpbGQoYmxvY2spO1xuICAgICAgICAgIGNvbnN0IHNoaXAgPSBTaGlwKGJsb2NrLmxlbmd0aCwgYmxvY2sucG9zKTtcbiAgICAgICAgICBwbGF5ZXIuZ2FtZWJvYXJkLnBsYWNlU2hpcChzaGlwKTtcbiAgICAgICAgICBkb20uYWRkQmxvY2tFdmVudHMoYmxvY2ssIHNoaXAsIHBsYXllcik7XG4gICAgICAgIH1cbiAgICAgICAgbGVuZ3RoLS07XG4gICAgICAgIGNvdW50Kys7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmIChwbGF5ZXIudHlwZSA9PT0gJ2h1bWFuJykge1xuICAgICAgY3JlYXRlUGxheWVyU2hpcHMoKTtcblxuICAgICAgcmFuZEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgZ3JpZHMuZm9yRWFjaCgoZ3JpZCkgPT4ge1xuICAgICAgICAgIGdyaWQuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIH0pO1xuICAgICAgICBwbGF5ZXIuZ2FtZWJvYXJkLndpcGUoKTtcbiAgICAgICAgY3JlYXRlUGxheWVyU2hpcHMoKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjcmVhdGVQbGF5ZXJTaGlwcygpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBpbml0ID0gKCgpID0+IHtcbiAgICBjb25zdCBzdGFydEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbjpudGgtb2YtdHlwZSgyKScpO1xuICAgIGNvbnN0IGh1bWFuID0gUGxheWVyKCk7XG4gICAgY29uc3QgYWkgPSBQbGF5ZXIoJ2NvbXAnKTtcbiAgICBkb20uY3JlYXRlQ29udGFpbmVyKGh1bWFuKTtcbiAgICBnZW5lcmF0ZVNoaXBzKGh1bWFuKTtcblxuICAgIGNvbnN0IHN0YXJ0R2FtZSA9ICgpID0+IHtcbiAgICAgIGRvbS5jcmVhdGVDb250YWluZXIoYWkpO1xuICAgICAgZ2VuZXJhdGVTaGlwcyhhaSk7XG4gICAgICBkb20ucmVtb3ZlQmxvY2tFdmVudHMoKTtcbiAgICAgIGNvbnN0IGFpZ2FtZWJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFpZ3JpZCcpO1xuXG4gICAgICBjb25zdCBhaVR1cm4gPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGFpQXR0YWNrTG9vcCA9IChwcmV2UG9zKSA9PiB7XG4gICAgICAgICAgY29uc3QgYXR0YWNrU3RhdCA9IGFpLmF0dGFjayhodW1hbiwgcHJldlBvcyk7XG4gICAgICAgICAgaWYgKCFhdHRhY2tTdGF0LmlzSGl0KSB7XG4gICAgICAgICAgICBkb20uY3Vyc29yLmFkZFdhaXQoKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICBkb20uY3Vyc29yLnJlbW92ZVdhaXQoKTtcbiAgICAgICAgICAgICAgZG9tLmFkZEdyaWRFZmZlY3QoYXR0YWNrU3RhdC5oaXRQb3MsIGZhbHNlLCBhaSk7XG4gICAgICAgICAgICB9LCA1MDApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBpc1dvbiA9IGFpLmdldFdpblN0YXR1cyhodW1hbik7XG4gICAgICAgICAgICBkb20uY3Vyc29yLmFkZFdhaXQoKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICBkb20uY3Vyc29yLnJlbW92ZVdhaXQoKTtcbiAgICAgICAgICAgICAgZG9tLmFkZEdyaWRFZmZlY3QoYXR0YWNrU3RhdC5oaXRQb3MsIHRydWUsIGFpKTtcbiAgICAgICAgICAgICAgaWYgKGlzV29uKSB7XG4gICAgICAgICAgICAgICAgYWxlcnQoJ1lvdSBsb3N0IHRoZSBnYW1lLCBzdWNrZXIhJyk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYWlBdHRhY2tMb29wKGF0dGFja1N0YXQuaGl0UG9zKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGFpQXR0YWNrTG9vcChudWxsKTtcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHBsYXlUdXJuID0gKGUpID0+IHtcbiAgICAgICAgY29uc3QgcG9zID0gQXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChhaWdhbWVib2FyZCwgZS50YXJnZXQpO1xuICAgICAgICBjb25zdCBpc0hpdCA9IGh1bWFuLmF0dGFjayhhaSwgcG9zKTtcbiAgICAgICAgZG9tLmFkZEdyaWRFZmZlY3QocG9zLCBpc0hpdCwgaHVtYW4pO1xuICAgICAgICBpZiAoaXNIaXQpIHtcbiAgICAgICAgICBjb25zdCBpc1dvbiA9IGh1bWFuLmdldFdpblN0YXR1cyhhaSk7XG4gICAgICAgICAgaWYgKGlzV29uKSB7XG4gICAgICAgICAgICBhbGVydCgnWW91IHdvbiB0aGUgZ2FtZSEnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYWlUdXJuKCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGFpZ2FtZWJvYXJkLmZvckVhY2goKGFpZ3JpZCkgPT4ge1xuICAgICAgICBhaWdyaWQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwbGF5VHVybiwgeyBvbmNlOiB0cnVlIH0pO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3RhcnRHYW1lKTtcbiAgfSkoKTtcbn0pKCk7XG4iXSwibmFtZXMiOlsiY3JlYXRlQ29udGFpbmVyIiwicGxheWVyIiwiYWxwaExhYmVsIiwiY29udGFpbmVyc0RpdiIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImNvbnRhaW5lciIsImNyZWF0ZUVsZW1lbnQiLCJnYW1lYm9hcmQiLCJ0b3BDb250Iiwic2lkZUNvbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJ0eXBlIiwic2V0QXR0cmlidXRlIiwiYXBwZW5kQ2hpbGQiLCJpIiwic3BhbiIsInN0eWxlIiwiY3Vyc29yIiwibGVuZ3RoIiwidG9wU3BhbiIsInRleHRDb250ZW50Iiwic2lkZVNwYW4iLCJjcmVhdGVCbG9jayIsInNpemUiLCJibG9jayIsImRyYWdnYWJsZSIsInZpc2liaWxpdHkiLCJyYW5kb20iLCJNYXRoIiwiZmxvb3IiLCJ3aWR0aCIsImhlaWdodCIsImdldE9wdGlvbnMiLCJhcnIiLCJvcmllbnRhdGlvbiIsInB1c2giLCJsaW1pdHMiLCJudW1TdHIiLCJ0b1N0cmluZyIsImF2YWlsIiwiZm9yRWFjaCIsIm51bSIsImdldE5ld1BvcyIsInN0YXJ0aW5nUHQiLCJuZXdQb3MiLCJqIiwiY2hlY2tQb3MiLCJtb2RlIiwicG9zIiwib2xkUG9zIiwiZ2V0QWxsUG9zIiwic3BsaWNlIiwiaW5kZXhPZiIsIml0ZW0iLCJpbmNsdWRlcyIsImFkZEJsb2NrRXZlbnRzIiwic2hpcCIsIm9wdGlvbnMiLCJncmlkcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJkcmFnRW50ZXIiLCJlIiwicHJldmVudERlZmF1bHQiLCJ0YXJnZXQiLCJjb250YWlucyIsImRyYWdPdmVyIiwiZHJhZ0xlYXZlIiwicmVtb3ZlIiwiZHJhZ0VuZCIsImRyb3AiLCJkcmFnZ2VkIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJjYWxsIiwiY2hhbmdlUG9zIiwiZ3JpZCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJhZGRFdmVudExpc3RlbmVyIiwic2V0VGltZW91dCIsInJlbW92ZUJsb2NrRXZlbnRzIiwiYmxvY2tzIiwiYnRucyIsImNsb25lIiwiY2xvbmVOb2RlIiwicGFyZW50Tm9kZSIsInJlcGxhY2VDaGlsZCIsImJ0biIsInBvc2l0aW9uIiwiYWRkR3JpZEVmZmVjdCIsImluZGV4IiwiaGl0IiwiY292ZXIiLCJkb2MiLCJhZGRXYWl0IiwicG9pbnRlckV2ZW50cyIsInJlbW92ZVdhaXQiLCJHYW1lYm9hcmQiLCJzaGlwcyIsImFsbFBvcyIsIm1pc3NlZEhpdHMiLCJzdW5rZW4iLCJoaXRzIiwicGxhY2VTaGlwIiwiZ2V0TWlzc2VkSGl0cyIsImdldEhpdHMiLCJjaGVja1N1bmtlbiIsImlzU3VuayIsInJlY2VpdmVBdHRhY2siLCJjb29yZCIsImlzU2hpcEhpdCIsImdldFBvcyIsImFyZUFsbFN1bmtlbiIsImNvdW50IiwibWFyayIsInVwZGF0ZUFsbFBvcyIsIndpcGUiLCJtb2R1bGUiLCJleHBvcnRzIiwicmVxdWlyZSIsIlBsYXllciIsImdldFdpblN0YXR1cyIsImVuZW15IiwiY2hvc2VuUG9zIiwiZ2V0UmFuZG9tTnVtIiwibWluIiwiY2VpbCIsIm1heCIsImNoZWNrSWZBdmFpbCIsInRlbXBQb3MiLCJnZXRSYW5kb21Qb3MiLCJyYW5kb21pemVyIiwiYXR0YWNrIiwiYXR0UG9zIiwiaXNIaXQiLCJoaXRQb3MiLCJTaGlwIiwiaGl0bWFya3MiLCJmaWxsSGl0cyIsImdldExlbmd0aCIsImRvbSIsImdhbWVGdW5jIiwiZ2VuZXJhdGVTaGlwcyIsInJhbmRCdG4iLCJjcmVhdGVQbGF5ZXJTaGlwcyIsImsiLCJtYXRjaCIsInJhbmRJbmQiLCJpbm5lckhUTUwiLCJpbml0Iiwic3RhcnRCdG4iLCJodW1hbiIsImFpIiwic3RhcnRHYW1lIiwiYWlnYW1lYm9hcmQiLCJhaVR1cm4iLCJhaUF0dGFja0xvb3AiLCJwcmV2UG9zIiwiYXR0YWNrU3RhdCIsImlzV29uIiwiYWxlcnQiLCJwbGF5VHVybiIsImFpZ3JpZCIsIm9uY2UiXSwic291cmNlUm9vdCI6IiJ9