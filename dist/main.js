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
/* harmony export */   "addEffect": () => (/* binding */ addEffect),
/* harmony export */   "checkPos": () => (/* binding */ checkPos),
/* harmony export */   "createBlock": () => (/* binding */ createBlock),
/* harmony export */   "createContainer": () => (/* binding */ createContainer),
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

var addEffect = function addEffect(index, hit, player) {
  var grids = document.querySelectorAll(player.type === 'human' ? '.aigrid' : '.grid');
  var cover = document.createElement('span');
  cover.textContent = hit ? '✕' : '●';
  cover.classList.add(hit ? 'hit' : 'miss');
  grids[index].appendChild(cover);
  grids[index].style.cursor = 'auto';
};



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

  var getPos = function getPos(pos) {
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
      return !gameboard.getHits().includes(tempPos);
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

          if (tempPos === 100) {
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
    var attPos = type === 'comp' ? getPos(pos) : pos;
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

      var playerTurn = function playerTurn(e) {
        var pos = Array.prototype.indexOf.call(aigameboard, e.target);
        var isHit = human.attack(ai, pos);
        _dom__WEBPACK_IMPORTED_MODULE_0__.addEffect(pos, isHit, human);
        e.target.removeEventListener('click', playerTurn);
      };

      aigameboard.forEach(function (grid) {
        grid.addEventListener('click', playerTurn);
      });
    };

    startBtn.addEventListener('click', startGame);
  }();
}();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFELENBQWI7O0lBRUEsSUFBTUUsU0FBUyxHQUFHLFNBQVpBLFNBQVksR0FBTTtNQUN0QmIsaURBQUEsQ0FBb0JZLEVBQXBCO01BQ0FWLGFBQWEsQ0FBQ1UsRUFBRCxDQUFiO01BQ0FaLG1EQUFBO01BQ0EsSUFBTWMsV0FBVyxHQUFHbkosUUFBUSxDQUFDeUQsZ0JBQVQsQ0FBMEIsU0FBMUIsQ0FBcEI7O01BQ0EsSUFBTTJGLFVBQVUsR0FBRyxTQUFiQSxVQUFhLENBQUN6RixDQUFELEVBQU87UUFDeEIsSUFBTWIsR0FBRyxHQUFHdUIsS0FBSyxDQUFDQyxTQUFOLENBQWdCcEIsT0FBaEIsQ0FBd0JxQixJQUF4QixDQUE2QjRFLFdBQTdCLEVBQTBDeEYsQ0FBQyxDQUFDRSxNQUE1QyxDQUFaO1FBQ0EsSUFBTWtFLEtBQUssR0FBR2lCLEtBQUssQ0FBQ25CLE1BQU4sQ0FBYW9CLEVBQWIsRUFBaUJuRyxHQUFqQixDQUFkO1FBQ0F1RiwyQ0FBQSxDQUFjdkYsR0FBZCxFQUFtQmlGLEtBQW5CLEVBQTBCaUIsS0FBMUI7UUFDQXJGLENBQUMsQ0FBQ0UsTUFBRixDQUFTYSxtQkFBVCxDQUE2QixPQUE3QixFQUFzQzBFLFVBQXRDO01BQ0QsQ0FMRDs7TUFNQUQsV0FBVyxDQUFDN0csT0FBWixDQUFvQixVQUFDbUMsSUFBRCxFQUFVO1FBQzVCQSxJQUFJLENBQUNFLGdCQUFMLENBQXNCLE9BQXRCLEVBQStCeUUsVUFBL0I7TUFDRCxDQUZEO0lBR0QsQ0FkRDs7SUFnQkFMLFFBQVEsQ0FBQ3BFLGdCQUFULENBQTBCLE9BQTFCLEVBQW1DdUUsU0FBbkM7RUFDRCxDQXhCWSxFQUFiO0FBeUJELENBN0VnQixFQUFqQixDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbWFpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBkZWZhdWx0LWNhc2UgKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXBsdXNwbHVzICovXG5jb25zdCBjcmVhdGVDb250YWluZXIgPSAocGxheWVyKSA9PiB7XG4gIGNvbnN0IGFscGhMYWJlbCA9IFsnQScsICdCJywgJ0MnLCAnRCcsICdFJywgJ0YnLCAnRycsICdIJywgJ0knLCAnSiddO1xuXG4gIGNvbnN0IGNvbnRhaW5lcnNEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGFpbmVycycpO1xuICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29uc3QgZ2FtZWJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNvbnN0IHRvcENvbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29uc3Qgc2lkZUNvbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2NvbnRhaW5lcicpO1xuICBnYW1lYm9hcmQuY2xhc3NMaXN0LmFkZCgnZ2FtZWJvYXJkJyk7XG4gIHRvcENvbnQuY2xhc3NMaXN0LmFkZCgndG9wQ29udCcpO1xuICBzaWRlQ29udC5jbGFzc0xpc3QuYWRkKCdzaWRlQ29udCcpO1xuICBpZiAocGxheWVyLnR5cGUgPT09ICdjb21wJykge1xuICAgIGNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXG4gICAgICAnc3R5bGUnLFxuICAgICAgJ2FuaW1hdGlvbjogMXMgYXBwZWFyOyBhbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkczsgdmlzaWJpbGl0eTogaGlkZGVuJ1xuICAgICk7XG4gIH1cblxuICBjb250YWluZXJzRGl2LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChnYW1lYm9hcmQpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQodG9wQ29udCk7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChzaWRlQ29udCk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xuICAgIGNvbnN0IHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgc3Bhbi5jbGFzc0xpc3QuYWRkKHBsYXllci50eXBlID09PSAnaHVtYW4nID8gJ2dyaWQnIDogJ2FpZ3JpZCcpO1xuICAgIGlmIChwbGF5ZXIudHlwZSA9PT0gJ2NvbXAnKSB7XG4gICAgICBzcGFuLnN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcbiAgICB9XG4gICAgZ2FtZWJvYXJkLmFwcGVuZENoaWxkKHNwYW4pO1xuICB9XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbHBoTGFiZWwubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCB0b3BTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIHRvcFNwYW4udGV4dENvbnRlbnQgPSBhbHBoTGFiZWxbaV07XG4gICAgdG9wQ29udC5hcHBlbmRDaGlsZCh0b3BTcGFuKTtcblxuICAgIGNvbnN0IHNpZGVTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIHNpZGVTcGFuLnRleHRDb250ZW50ID0gaSArIDE7XG4gICAgc2lkZUNvbnQuYXBwZW5kQ2hpbGQoc2lkZVNwYW4pO1xuICB9XG59O1xuXG5jb25zdCBjcmVhdGVCbG9jayA9IChwbGF5ZXIsIGxlbmd0aCkgPT4ge1xuICBjb25zdCBzaXplID0gNDAuOTE7XG4gIGNvbnN0IGJsb2NrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGlmIChwbGF5ZXIudHlwZSA9PT0gJ2h1bWFuJykge1xuICAgIGJsb2NrLmNsYXNzTGlzdC5hZGQoJ2RyYWdnYWJsZScpO1xuICAgIGJsb2NrLmRyYWdnYWJsZSA9IHRydWU7XG4gIH0gZWxzZSB7XG4gICAgYmxvY2suY2xhc3NMaXN0LmFkZCgnYWlibG9jaycpO1xuICAgIGJsb2NrLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcbiAgfVxuICBjb25zdCByYW5kb20gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKTtcbiAgaWYgKHJhbmRvbSA9PT0gMSkge1xuICAgIGJsb2NrLnN0eWxlLndpZHRoID0gYCR7c2l6ZX1weGA7XG4gICAgYmxvY2suc3R5bGUuaGVpZ2h0ID0gYCR7c2l6ZSAqIGxlbmd0aH1weGA7XG4gIH0gZWxzZSB7XG4gICAgYmxvY2suc3R5bGUud2lkdGggPSBgJHtzaXplICogbGVuZ3RofXB4YDtcbiAgICBibG9jay5zdHlsZS5oZWlnaHQgPSBgJHtzaXplfXB4YDtcbiAgfVxuXG4gIHJldHVybiBibG9jaztcbn07XG5cbmNvbnN0IGdldE9wdGlvbnMgPSAoYmxvY2spID0+IHtcbiAgY29uc3QgYXJyID0gW107XG4gIGlmIChibG9jay5vcmllbnRhdGlvbiA9PT0gJ3BvcnRyYWl0Jykge1xuICAgIHN3aXRjaCAoYmxvY2subGVuZ3RoKSB7XG4gICAgICBjYXNlIDQ6XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNzA7IGkrKykge1xuICAgICAgICAgIGFyci5wdXNoKGkpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDgwOyBpKyspIHtcbiAgICAgICAgICBhcnIucHVzaChpKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA5MDsgaSsrKSB7XG4gICAgICAgICAgYXJyLnB1c2goaSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcbiAgICAgICAgICBhcnIucHVzaChpKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgbGV0IGxpbWl0cztcbiAgICBzd2l0Y2ggKGJsb2NrLmxlbmd0aCkge1xuICAgICAgY2FzZSA0OlxuICAgICAgICBsaW1pdHMgPSBbNywgOCwgOV07XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICBsaW1pdHMgPSBbOCwgOV07XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAyOlxuICAgICAgICBsaW1pdHMgPSBbOV07XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XG4gICAgICBjb25zdCBudW1TdHIgPSBpLnRvU3RyaW5nKCk7XG4gICAgICBsZXQgYXZhaWwgPSB0cnVlO1xuICAgICAgbGltaXRzLmZvckVhY2goKG51bSkgPT4ge1xuICAgICAgICBpZiAoaSA9PT0gbnVtIHx8IG51bVN0clsxXSA9PSBudW0pIHtcbiAgICAgICAgICBhdmFpbCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmIChhdmFpbCkge1xuICAgICAgICBhcnIucHVzaChpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGFycjtcbn07XG5cbmNvbnN0IGdldE5ld1BvcyA9IChibG9jaywgc3RhcnRpbmdQdCkgPT4ge1xuICBjb25zdCBuZXdQb3MgPSBbXTtcbiAgLy8gcHJldHRpZXItaWdub3JlXG4gIGZvciAobGV0IGogPSAwOyBqIDwgYmxvY2subGVuZ3RoOyBqKyspIHtcbiAgICBuZXdQb3MucHVzaChcbiAgICAgIHN0YXJ0aW5nUHQgKyAoYmxvY2sub3JpZW50YXRpb24gPT09ICdwb3J0cmFpdCcgPyBqICogMTAgOiBqKVxuICAgICk7XG4gIH1cbiAgcmV0dXJuIG5ld1Bvcztcbn07XG5cbmNvbnN0IGNoZWNrUG9zID0gKG1vZGUsIHBsYXllciwgcG9zLCBvbGRQb3MpID0+IHtcbiAgbGV0IGF2YWlsID0gdHJ1ZTtcbiAgY29uc3QgYXJyID0gcGxheWVyLmdhbWVib2FyZC5nZXRBbGxQb3MoKTtcbiAgaWYgKG1vZGUgPT09ICdleGlzdGluZycpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9sZFBvcy5sZW5ndGg7IGkrKykge1xuICAgICAgYXJyLnNwbGljZShhcnIuaW5kZXhPZihvbGRQb3NbaV0pLCAxKTtcbiAgICB9XG4gIH1cbiAgcG9zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICBpZiAoYXJyLmluY2x1ZGVzKGl0ZW0pKSB7XG4gICAgICBhdmFpbCA9IGZhbHNlO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBhdmFpbDtcbn07XG5cbmNvbnN0IGFkZEJsb2NrRXZlbnRzID0gKGJsb2NrLCBzaGlwLCBwbGF5ZXIpID0+IHtcbiAgY29uc3Qgb3B0aW9ucyA9IGdldE9wdGlvbnMoYmxvY2spO1xuICBjb25zdCBncmlkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ncmlkJyk7XG4gIC8vIGFjdGl2YXRlIHRoZXNlIGZ1bmN0aW9ucyBkdXJpbmcgZHJhZ3N0YXJ0XG4gIC8vIGdldCBsZW5ndGggb2YgYmxvY2sgdGhhdCBpcyBiZWluZyBkcmFnZ2VkXG4gIC8vIGNoYW5nZSBkcm9wIHRhcmdldHMgYWNjb3JkaW5nIHRvIGJsb2NrIGxlbmd0aCBhbmQgb3JpZW50YXRpb25cbiAgY29uc3QgZHJhZ0VudGVyID0gKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZHJvcHBhYmxlJykpIHtcbiAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2RyYWctb3ZlcicpO1xuICAgIH1cbiAgfTtcblxuICAvLyBhZGQgZHJhZyZkcm9wIHByb3BlcnRpZXMgdG8gYWxsIGdyaWRzXG4gIC8vIGdldCBibG9jayBwcmV2aW91cyBwb3NpdGlvbiBvbiBkcmFnc3RhcnRcbiAgLy8gY2hlY2sgaWYgZ3JpZCBpcyBpbmNsdWRlZCBpbiBvcHRpb25zIHdoZW4gZHJhZ2dpbmcgb3Zlci9kcm9wcGluZ1xuICAvLyBpZiB5ZXMsIGFkZCBkcmFnLW92ZXIgY2xhc3MgYW5kIGFsbG93IGRyb3BcbiAgLy8gaWYgbm8sIGRvIG5vdCBkaXNwbGF5IGRyYWctb3ZlciBjbGFzc1xuICAvLyBhbHNvIGNoZWNrIGlmIHRoZSByZXN0IG9mIHRoZSBibG9jayBvY2N1cGllcyBhbm90aGVyIGJsb2NrXG4gIC8vIGlmIHllcywgcmV0dXJuIGJsb2NrIHRvIHByZXZpb3VzIHBvc2l0aW9uXG4gIC8vIGlmIGEgYmxvY2sgaXMgZHJvcHBlZCBvbiBub24tb3B0aW9uIGdyaWQsXG4gIC8vIHJldHVybiBibG9jayB0byBwcmV2aW91cyBwb3NpdGlvblxuICBjb25zdCBkcmFnT3ZlciA9IChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2Ryb3BwYWJsZScpKSB7XG4gICAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKCdkcmFnLW92ZXInKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZHJhZ0xlYXZlID0gKGUpID0+IHtcbiAgICBlLnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnLW92ZXInKTtcbiAgfTtcblxuICBjb25zdCBkcmFnRW5kID0gKGUpID0+IHtcbiAgICBlLnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gIH07XG5cbiAgY29uc3QgZHJvcCA9IChlKSA9PiB7XG4gICAgZS50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZy1vdmVyJyk7XG4gICAgY29uc3QgZHJhZ2dlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kcmFnZ2VkJyk7XG4gICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZ3JpZCcpKSB7XG4gICAgICBjb25zdCBuZXdQb3MgPSBnZXROZXdQb3MoXG4gICAgICAgIGJsb2NrLFxuICAgICAgICBBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKGdyaWRzLCBlLnRhcmdldClcbiAgICAgICk7XG4gICAgICBjb25zdCBhdmFpbCA9IGNoZWNrUG9zKCdleGlzdGluZycsIHBsYXllciwgbmV3UG9zLCBibG9jay5wb3MpO1xuICAgICAgaWYgKGF2YWlsICYmIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZHJvcHBhYmxlJykpIHtcbiAgICAgICAgZS50YXJnZXQuYXBwZW5kQ2hpbGQoZHJhZ2dlZCk7XG4gICAgICAgIHNoaXAuY2hhbmdlUG9zKG5ld1Bvcyk7XG4gICAgICAgIGJsb2NrLnBvcyA9IG5ld1BvcztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGdyaWRzW2Jsb2NrLnBvc1swXV0uYXBwZW5kQ2hpbGQoZHJhZ2dlZCk7XG4gICAgICB9XG4gICAgfVxuICAgIGRyYWdnZWQuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgIGRyYWdnZWQuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZ2dlZCcpO1xuICAgIGdyaWRzLmZvckVhY2goKGdyaWQpID0+IHtcbiAgICAgIGdyaWQuY2xhc3NMaXN0LnJlbW92ZSgnZHJvcHBhYmxlJyk7XG4gICAgICBncmlkLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RyYWdlbnRlcicsIGRyYWdFbnRlcik7XG4gICAgICBncmlkLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgZHJhZ092ZXIpO1xuICAgICAgZ3JpZC5yZW1vdmVFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCBkcmFnTGVhdmUpO1xuICAgICAgZ3JpZC5yZW1vdmVFdmVudExpc3RlbmVyKCdkcm9wJywgZHJvcCk7XG4gICAgfSk7XG4gIH07XG5cbiAgYmxvY2suYWRkRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgKGUpID0+IHtcbiAgICAvLyBhZGQgZHJhZyBwcm9wZXJ0aWVzIHRvIGdyaWQgb24gZHJhZ3N0YXJ0XG4gICAgLy8gZm9sbG93IHBlcmNlbnRhZ2UgYmVsb3cgZm9yIGdyaWRzIGFsbG93ZWQgdG8gYmUgcGxhY2VkIG9uXG4gICAgLy8gcmVtb3ZlIGRyYWcgcHJvcGVydGllcyBvbiBncmlkcyBhZnRlciBkcm9wcGluZ1xuICAgIC8vIGFkZCBjaGVja2VyIHNvIGJsb2NrcyB3b24ndCBvdmVybGFwXG4gICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZCgnZHJhZ2dlZCcpO1xuICAgIGxldCBqID0gMDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XG4gICAgICBpZiAoaSA9PT0gb3B0aW9uc1tqXSkge1xuICAgICAgICBncmlkc1tpXS5jbGFzc0xpc3QuYWRkKCdkcm9wcGFibGUnKTtcbiAgICAgICAgaisrO1xuICAgICAgfVxuICAgIH1cbiAgICBncmlkcy5mb3JFYWNoKChncmlkKSA9PiB7XG4gICAgICBncmlkLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbnRlcicsIGRyYWdFbnRlcik7XG4gICAgICBncmlkLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgZHJhZ092ZXIpO1xuICAgICAgZ3JpZC5hZGRFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCBkcmFnTGVhdmUpO1xuICAgICAgZ3JpZC5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgZHJvcCk7XG4gICAgfSk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgfSwgMCk7XG4gIH0pO1xuXG4gIGJsb2NrLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbmQnLCBkcmFnRW5kKTtcbn07XG5cbmNvbnN0IHJlbW92ZUJsb2NrRXZlbnRzID0gKCkgPT4ge1xuICBjb25zdCBncmlkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ncmlkLCAuYWlncmlkJyk7XG4gIGNvbnN0IGJsb2NrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kcmFnZ2FibGUnKTtcbiAgY29uc3QgYnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2J1dHRvbicpO1xuICBibG9ja3MuZm9yRWFjaCgoYmxvY2spID0+IHtcbiAgICBjb25zdCBjbG9uZSA9IGJsb2NrLmNsb25lTm9kZSh0cnVlKTtcbiAgICBjbG9uZS5kcmFnZ2FibGUgPSBmYWxzZTtcbiAgICBjbG9uZS5zdHlsZS5jdXJzb3IgPSAnYXV0byc7XG4gICAgYmxvY2sucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQoY2xvbmUsIGJsb2NrKTtcbiAgfSk7XG4gIGJ0bnMuZm9yRWFjaCgoYnRuKSA9PiB7XG4gICAgYnRuLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgfSk7XG4gIGdyaWRzLmZvckVhY2goKGdyaWQpID0+IHtcbiAgICBncmlkLnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJztcbiAgfSk7XG59O1xuXG5jb25zdCBhZGRFZmZlY3QgPSAoaW5kZXgsIGhpdCwgcGxheWVyKSA9PiB7XG4gIGNvbnN0IGdyaWRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICBwbGF5ZXIudHlwZSA9PT0gJ2h1bWFuJyA/ICcuYWlncmlkJyA6ICcuZ3JpZCdcbiAgKTtcbiAgY29uc3QgY292ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gIGNvdmVyLnRleHRDb250ZW50ID0gaGl0ID8gJ+KclScgOiAn4pePJztcbiAgY292ZXIuY2xhc3NMaXN0LmFkZChoaXQgPyAnaGl0JyA6ICdtaXNzJyk7XG4gIGdyaWRzW2luZGV4XS5hcHBlbmRDaGlsZChjb3Zlcik7XG4gIGdyaWRzW2luZGV4XS5zdHlsZS5jdXJzb3IgPSAnYXV0byc7XG59O1xuXG5leHBvcnQge1xuICBhZGRFZmZlY3QsXG4gIGNyZWF0ZUNvbnRhaW5lcixcbiAgY3JlYXRlQmxvY2ssXG4gIGFkZEJsb2NrRXZlbnRzLFxuICByZW1vdmVCbG9ja0V2ZW50cyxcbiAgZ2V0TmV3UG9zLFxuICBnZXRPcHRpb25zLFxuICBjaGVja1Bvcyxcbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1wbHVzcGx1cyAqL1xuY29uc3QgR2FtZWJvYXJkID0gKCkgPT4ge1xuICBsZXQgc2hpcHMgPSBbXTtcbiAgbGV0IGFsbFBvcyA9IFtdO1xuICBjb25zdCBtaXNzZWRIaXRzID0gW107XG4gIGNvbnN0IHN1bmtlbiA9IFtdO1xuICBjb25zdCBoaXRzID0gW107XG5cbiAgY29uc3QgcGxhY2VTaGlwID0gKHNoaXApID0+IHtcbiAgICBzaGlwcy5wdXNoKHNoaXApO1xuICAgIHN1bmtlbi5wdXNoKCcnKTtcbiAgfTtcblxuICBjb25zdCBnZXRNaXNzZWRIaXRzID0gKCkgPT4gbWlzc2VkSGl0cztcblxuICBjb25zdCBnZXRIaXRzID0gKCkgPT4gaGl0cztcblxuICBjb25zdCBjaGVja1N1bmtlbiA9IChzaGlwKSA9PiB7XG4gICAgaWYgKHNoaXAuaXNTdW5rKCkpIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gc2hpcHMuaW5kZXhPZihzaGlwKTtcbiAgICAgIHN1bmtlbltpbmRleF0gPSAneCc7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoY29vcmQpID0+IHtcbiAgICBsZXQgaXNTaGlwSGl0ID0gZmFsc2U7XG4gICAgc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgc2hpcC5nZXRQb3MoKS5mb3JFYWNoKChwb3NpdGlvbikgPT4ge1xuICAgICAgICBpZiAocG9zaXRpb24gPT09IGNvb3JkKSB7XG4gICAgICAgICAgaXNTaGlwSGl0ID0gdHJ1ZTtcbiAgICAgICAgICBzaGlwLmhpdChjb29yZCk7XG4gICAgICAgICAgaGl0cy5wdXNoKGNvb3JkKTtcbiAgICAgICAgICBjaGVja1N1bmtlbihzaGlwKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpZiAoIWlzU2hpcEhpdCkge1xuICAgICAgaGl0cy5wdXNoKGNvb3JkKTtcbiAgICAgIG1pc3NlZEhpdHMucHVzaChjb29yZCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGlzU2hpcEhpdDtcbiAgfTtcblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbiAgY29uc3QgYXJlQWxsU3Vua2VuID0gKCkgPT4ge1xuICAgIGxldCBjb3VudCA9IDA7XG4gICAgc3Vua2VuLmZvckVhY2goKG1hcmspID0+IHtcbiAgICAgIGlmIChtYXJrID09PSAneCcpIHtcbiAgICAgICAgY291bnQrKztcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBjb3VudCA9PT0gc2hpcHMubGVuZ3RoO1xuICB9O1xuXG4gIGNvbnN0IHVwZGF0ZUFsbFBvcyA9ICgpID0+IHtcbiAgICBhbGxQb3MgPSBbXTtcbiAgICBzaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICBzaGlwLmdldFBvcygpLmZvckVhY2goKHBvcykgPT4ge1xuICAgICAgICBhbGxQb3MucHVzaChwb3MpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgZ2V0QWxsUG9zID0gKCkgPT4ge1xuICAgIHVwZGF0ZUFsbFBvcygpO1xuICAgIHJldHVybiBhbGxQb3M7XG4gIH07XG5cbiAgY29uc3Qgd2lwZSA9ICgpID0+IHtcbiAgICBzaGlwcyA9IFtdO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgcGxhY2VTaGlwLFxuICAgIHJlY2VpdmVBdHRhY2ssXG4gICAgZ2V0TWlzc2VkSGl0cyxcbiAgICBhcmVBbGxTdW5rZW4sXG4gICAgZ2V0SGl0cyxcbiAgICBnZXRBbGxQb3MsXG4gICAgd2lwZSxcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gR2FtZWJvYXJkO1xuIiwiLyogZXNsaW50LWRpc2FibGUgY29uc2lzdGVudC1yZXR1cm4gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXBsdXNwbHVzICovXG5jb25zdCBHYW1lYm9hcmQgPSByZXF1aXJlKCcuL2dhbWVib2FyZCcpO1xuXG5jb25zdCBQbGF5ZXIgPSAodHlwZSA9ICdodW1hbicpID0+IHtcbiAgY29uc3QgZ2FtZWJvYXJkID0gR2FtZWJvYXJkKCk7XG4gIGNvbnN0IGdldFdpblN0YXR1cyA9IChlbmVteSkgPT4gZW5lbXkuZ2FtZWJvYXJkLmFyZUFsbFN1bmtlbigpO1xuXG4gIGNvbnN0IGdldFBvcyA9IChwb3MpID0+IHtcbiAgICAvLyBpZiBwcmV2UG9zIGlzIHVuZGVmaW5lZCwgY2hvb3NlIHJhbmRvbSBwb3NcbiAgICAvLyBjaGVjayBpZiByYW5kb20gcG9zIGlzIGhpdCBvciBub3RcbiAgICAvLyBpZiBub3QgaGl0LCByZXR1cm4gcG9zXG4gICAgLy8gaWYgaGl0LCBjaG9vc2UgYW5vdGhlciBvbmVcbiAgICBsZXQgY2hvc2VuUG9zO1xuXG4gICAgY29uc3QgZ2V0UmFuZG9tTnVtID0gKCkgPT4ge1xuICAgICAgY29uc3QgbWluID0gTWF0aC5jZWlsKDApOyAvLyBpbmNsdXNpdmVcbiAgICAgIGNvbnN0IG1heCA9IE1hdGguZmxvb3IoMTAwKTsgLy8gZXhjbHVzaXZlXG4gICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKyBtaW4pO1xuICAgIH07XG5cbiAgICBjb25zdCBjaGVja0lmQXZhaWwgPSAodGVtcFBvcykgPT4gIWdhbWVib2FyZC5nZXRIaXRzKCkuaW5jbHVkZXModGVtcFBvcyk7XG5cbiAgICBjb25zdCBnZXRSYW5kb21Qb3MgPSAoKSA9PiB7XG4gICAgICBsZXQgYXZhaWw7XG4gICAgICBsZXQgbmV3UG9zO1xuXG4gICAgICB3aGlsZSAoIWF2YWlsKSB7XG4gICAgICAgIG5ld1BvcyA9IGdldFJhbmRvbU51bSgpO1xuICAgICAgICBhdmFpbCA9IGNoZWNrSWZBdmFpbChuZXdQb3MpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3UG9zO1xuICAgIH07XG5cbiAgICBpZiAocG9zID09PSBudWxsKSB7XG4gICAgICBjaG9zZW5Qb3MgPSBnZXRSYW5kb21Qb3MoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gY2hlY2sgcmFuZG9tIHN1cnJvdW5kaW5nIHBvcyBpZiBoaXQgdW50aWwgeW91IGZpbmQgYSBwb3MgYXZhaWxhYmxlXG4gICAgICAvLyBpZiBzdXJyb3VuZGluZyBwb3NpdGlvbnMgYXJlIGhpdCwgcGljayBhIHJhbmRvbSBwb3MgaW5zdGVhZFxuICAgICAgbGV0IGF2YWlsLCB0ZW1wUG9zO1xuXG4gICAgICBjb25zdCBnZXROZXdQb3MgPSAoaSkgPT4ge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZGVmYXVsdC1jYXNlXG4gICAgICAgIHN3aXRjaCAoaSkge1xuICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIHJldHVybiBwb3MgKyAxO1xuICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIHJldHVybiBwb3MgLSAxO1xuICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIHJldHVybiBwb3MgKyAxMDtcbiAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICByZXR1cm4gcG9zIC0gMTA7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIC8vIHNlbGVjdCByYW5kb21seSBpZiBvbmUgb3IgemVyb1xuICAgICAgLy8gaWYgemVybywgbG9vcCBmcm9tIGx0clxuICAgICAgLy8gaWYgb25lLCBsb29wIGZyb20gcnRsXG4gICAgICAvLyBldmVyeSBsb29wIGNoZWNrIGlmIGNvb3JkIGlzIGF2YWlsYWJsZVxuICAgICAgLy8gcmV0dXJuIGlmIGF2YWlsYWJsZVxuICAgICAgLy8gbG9vcCA0IHRpbWVzXG4gICAgICAvLyBpZiByZXN1bHRpbmcgY29vcmQgaXMgMTAwLCBpZ25vcmUgaXRcbiAgICAgIGNvbnN0IHJhbmRvbWl6ZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKTtcbiAgICAgIGlmIChyYW5kb21pemVyID09PSAwKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICAgICAgdGVtcFBvcyA9IGdldE5ld1BvcyhpKTtcbiAgICAgICAgICBpZiAodGVtcFBvcyA9PT0gMTAwKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBhdmFpbCA9IGNoZWNrSWZBdmFpbCh0ZW1wUG9zKTtcbiAgICAgICAgICBpZiAoYXZhaWwpIHtcbiAgICAgICAgICAgIGNob3NlblBvcyA9IHRlbXBQb3M7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFhdmFpbCkge1xuICAgICAgICAgIGNob3NlblBvcyA9IGdldFJhbmRvbVBvcygpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKGxldCBpID0gMzsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICB0ZW1wUG9zID0gZ2V0TmV3UG9zKGkpO1xuICAgICAgICAgIGF2YWlsID0gY2hlY2tJZkF2YWlsKHRlbXBQb3MpO1xuICAgICAgICAgIGlmIChhdmFpbCkge1xuICAgICAgICAgICAgY2hvc2VuUG9zID0gdGVtcFBvcztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIWF2YWlsKSB7XG4gICAgICAgICAgY2hvc2VuUG9zID0gZ2V0UmFuZG9tUG9zKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNob3NlblBvcztcbiAgfTtcblxuICBjb25zdCBhdHRhY2sgPSAoZW5lbXksIHBvcyA9IG51bGwpID0+IHtcbiAgICBjb25zdCBhdHRQb3MgPSB0eXBlID09PSAnY29tcCcgPyBnZXRQb3MocG9zKSA6IHBvcztcbiAgICBjb25zdCBpc0hpdCA9IGVuZW15LmdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKGF0dFBvcyk7XG4gICAgaWYgKHR5cGUgPT09ICdjb21wJykge1xuICAgICAgcmV0dXJuIHsgaXNIaXQsIGhpdFBvczogYXR0UG9zIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIGlzSGl0O1xuICB9O1xuXG4gIHJldHVybiB7IGdldFdpblN0YXR1cywgZ2FtZWJvYXJkLCBhdHRhY2ssIHR5cGUgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUGxheWVyO1xuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tcGx1c3BsdXMgKi9cbmNvbnN0IFNoaXAgPSAobGVuZ3RoLCBwb3MpID0+IHtcbiAgY29uc3QgaGl0bWFya3MgPSBbXTtcblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgY29uc3QgZmlsbEhpdHMgPSAoKCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGhpdG1hcmtzW2ldID0gJyc7XG4gICAgfVxuICB9KSgpO1xuXG4gIGNvbnN0IGhpdCA9IChoaXRQb3MpID0+IHtcbiAgICBjb25zdCBpbmRleCA9IHBvcy5pbmRleE9mKGhpdFBvcyk7XG4gICAgaGl0bWFya3NbaW5kZXhdID0gJ3gnO1xuICB9O1xuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBjb25zdCBpc1N1bmsgPSAoKSA9PiB7XG4gICAgbGV0IGNvdW50ID0gMDtcbiAgICBoaXRtYXJrcy5mb3JFYWNoKChtYXJrKSA9PiB7XG4gICAgICBpZiAobWFyayA9PT0gJ3gnKSB7XG4gICAgICAgIGNvdW50Kys7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gY291bnQgPT09IGxlbmd0aDtcbiAgfTtcblxuICBjb25zdCBjaGFuZ2VQb3MgPSAobmV3UG9zKSA9PiB7XG4gICAgcG9zID0gbmV3UG9zO1xuICB9O1xuXG4gIGNvbnN0IGdldExlbmd0aCA9ICgpID0+IGxlbmd0aDtcbiAgY29uc3QgZ2V0UG9zID0gKCkgPT4gcG9zO1xuXG4gIHJldHVybiB7XG4gICAgZ2V0TGVuZ3RoLFxuICAgIGdldFBvcyxcbiAgICBoaXQsXG4gICAgaXNTdW5rLFxuICAgIGNoYW5nZVBvcyxcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU2hpcDtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1wbHVzcGx1cyAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbmltcG9ydCAqIGFzIGRvbSBmcm9tICcuL2RvbSc7XG5pbXBvcnQgU2hpcCBmcm9tICcuL2ZhY3Rvcmllcy9zaGlwJztcbmltcG9ydCBQbGF5ZXIgZnJvbSAnLi9mYWN0b3JpZXMvcGxheWVyJztcblxuLy8gbWFpbiBnYW1lIGxvb3Bcbi8vIHN0YXJ0cyB3aXRoIGNyZWF0aW5nIHBsYXllcnMgJiBwb3B1bGF0ZSBlYWNoIGdhbWVib2FyZFxuLy8gY3JlYXRlIGh1bWFuIHBsYXllciAmIGdhbWVib2FyZCBmaXJzdFxuLy8gcGxhY2Ugc2hpcHMgb24gcGxheWVyIGdhbWVib2FyZFxuLy8gY3JlYXRlIGNvbXAgcGxheWVyICYgZ2FtZWJvYXJkXG4vLyBwbGFjZSBzaGlwcyBpbiByYW5kb20gcG9zaXRpb24gaW4gZW5lbXkgZ2FtZWJvYXJkXG4vLyBkaXNwbGF5IGJvdGggZ2FtZWJvYXJkc1xuLy8gZ2FtZSBsb29wIHNob3VsZCBzdGVwIHRocm91Z2ggdGhlIGdhbWUgdHVybiBieSB0dXJuXG4vLyB1c2luZyBvbmx5IGZ1bmN0aW9uIGluc2lkZSB0aGUgZ2FtZSBsb29wXG4vLyBjcmVhdGUgY29uZGl0aW9ucyBzbyB0aGF0IHRoZSBnYW1lIGVuZHMgb25jZVxuLy8gb25lIHBsYXllcidzIHNoaXBzIGhhdmUgYWxsIGJlZW4gc3Vua1xuY29uc3QgZ2FtZUZ1bmMgPSAoKCkgPT4ge1xuICBjb25zdCBnZW5lcmF0ZVNoaXBzID0gKHBsYXllcikgPT4ge1xuICAgIGNvbnN0IGdyaWRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAgIHBsYXllci50eXBlID09PSAnaHVtYW4nID8gJy5ncmlkJyA6ICcuYWlncmlkJ1xuICAgICk7XG4gICAgY29uc3QgcmFuZEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbjpmaXJzdC1vZi10eXBlJyk7XG5cbiAgICBjb25zdCBjcmVhdGVQbGF5ZXJTaGlwcyA9ICgpID0+IHtcbiAgICAgIGxldCBsZW5ndGggPSA0O1xuICAgICAgbGV0IGNvdW50ID0gMTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgY291bnQ7IGsrKykge1xuICAgICAgICAgIGNvbnN0IGJsb2NrID0gZG9tLmNyZWF0ZUJsb2NrKHBsYXllciwgbGVuZ3RoKTtcbiAgICAgICAgICBibG9jay5sZW5ndGggPSBsZW5ndGg7XG4gICAgICAgICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgICAgICAgYmxvY2sub3JpZW50YXRpb24gPSBibG9jay5zdHlsZS53aWR0aC5tYXRjaCgvXi4rPyg/PXB4KS8pWzBdIC8gNDAuOTEgPiAxXG4gICAgICAgICAgICA/ICdsYW5kc2NhcGUnXG4gICAgICAgICAgICA6ICdwb3J0cmFpdCc7XG4gICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IGRvbS5nZXRPcHRpb25zKGJsb2NrKTtcbiAgICAgICAgICBsZXQgYXZhaWwgPSBmYWxzZTtcblxuICAgICAgICAgIHdoaWxlICghYXZhaWwpIHtcbiAgICAgICAgICAgIGNvbnN0IHJhbmRJbmQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBvcHRpb25zLmxlbmd0aCk7XG4gICAgICAgICAgICBjb25zdCB0ZW1wUG9zID0gZG9tLmdldE5ld1BvcyhibG9jaywgb3B0aW9uc1tyYW5kSW5kXSk7XG4gICAgICAgICAgICBibG9jay5wb3MgPSB0ZW1wUG9zO1xuICAgICAgICAgICAgYXZhaWwgPSBkb20uY2hlY2tQb3MoJ25ldycsIHBsYXllciwgYmxvY2sucG9zKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZ3JpZHNbYmxvY2sucG9zWzBdXS5hcHBlbmRDaGlsZChibG9jayk7XG4gICAgICAgICAgY29uc3Qgc2hpcCA9IFNoaXAoYmxvY2subGVuZ3RoLCBibG9jay5wb3MpO1xuICAgICAgICAgIHBsYXllci5nYW1lYm9hcmQucGxhY2VTaGlwKHNoaXApO1xuICAgICAgICAgIGRvbS5hZGRCbG9ja0V2ZW50cyhibG9jaywgc2hpcCwgcGxheWVyKTtcbiAgICAgICAgfVxuICAgICAgICBsZW5ndGgtLTtcbiAgICAgICAgY291bnQrKztcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKHBsYXllci50eXBlID09PSAnaHVtYW4nKSB7XG4gICAgICBjcmVhdGVQbGF5ZXJTaGlwcygpO1xuXG4gICAgICByYW5kQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBncmlkcy5mb3JFYWNoKChncmlkKSA9PiB7XG4gICAgICAgICAgZ3JpZC5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgfSk7XG4gICAgICAgIHBsYXllci5nYW1lYm9hcmQud2lwZSgpO1xuICAgICAgICBjcmVhdGVQbGF5ZXJTaGlwcygpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNyZWF0ZVBsYXllclNoaXBzKCk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGluaXQgPSAoKCkgPT4ge1xuICAgIGNvbnN0IHN0YXJ0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uOm50aC1vZi10eXBlKDIpJyk7XG4gICAgY29uc3QgaHVtYW4gPSBQbGF5ZXIoKTtcbiAgICBjb25zdCBhaSA9IFBsYXllcignY29tcCcpO1xuICAgIGRvbS5jcmVhdGVDb250YWluZXIoaHVtYW4pO1xuICAgIGdlbmVyYXRlU2hpcHMoaHVtYW4pO1xuXG4gICAgY29uc3Qgc3RhcnRHYW1lID0gKCkgPT4ge1xuICAgICAgZG9tLmNyZWF0ZUNvbnRhaW5lcihhaSk7XG4gICAgICBnZW5lcmF0ZVNoaXBzKGFpKTtcbiAgICAgIGRvbS5yZW1vdmVCbG9ja0V2ZW50cygpO1xuICAgICAgY29uc3QgYWlnYW1lYm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYWlncmlkJyk7XG4gICAgICBjb25zdCBwbGF5ZXJUdXJuID0gKGUpID0+IHtcbiAgICAgICAgY29uc3QgcG9zID0gQXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChhaWdhbWVib2FyZCwgZS50YXJnZXQpO1xuICAgICAgICBjb25zdCBpc0hpdCA9IGh1bWFuLmF0dGFjayhhaSwgcG9zKTtcbiAgICAgICAgZG9tLmFkZEVmZmVjdChwb3MsIGlzSGl0LCBodW1hbik7XG4gICAgICAgIGUudGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcGxheWVyVHVybik7XG4gICAgICB9O1xuICAgICAgYWlnYW1lYm9hcmQuZm9yRWFjaCgoZ3JpZCkgPT4ge1xuICAgICAgICBncmlkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcGxheWVyVHVybik7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgc3RhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzdGFydEdhbWUpO1xuICB9KSgpO1xufSkoKTtcbiJdLCJuYW1lcyI6WyJjcmVhdGVDb250YWluZXIiLCJwbGF5ZXIiLCJhbHBoTGFiZWwiLCJjb250YWluZXJzRGl2IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY29udGFpbmVyIiwiY3JlYXRlRWxlbWVudCIsImdhbWVib2FyZCIsInRvcENvbnQiLCJzaWRlQ29udCIsImNsYXNzTGlzdCIsImFkZCIsInR5cGUiLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsImkiLCJzcGFuIiwic3R5bGUiLCJjdXJzb3IiLCJsZW5ndGgiLCJ0b3BTcGFuIiwidGV4dENvbnRlbnQiLCJzaWRlU3BhbiIsImNyZWF0ZUJsb2NrIiwic2l6ZSIsImJsb2NrIiwiZHJhZ2dhYmxlIiwidmlzaWJpbGl0eSIsInJhbmRvbSIsIk1hdGgiLCJmbG9vciIsIndpZHRoIiwiaGVpZ2h0IiwiZ2V0T3B0aW9ucyIsImFyciIsIm9yaWVudGF0aW9uIiwicHVzaCIsImxpbWl0cyIsIm51bVN0ciIsInRvU3RyaW5nIiwiYXZhaWwiLCJmb3JFYWNoIiwibnVtIiwiZ2V0TmV3UG9zIiwic3RhcnRpbmdQdCIsIm5ld1BvcyIsImoiLCJjaGVja1BvcyIsIm1vZGUiLCJwb3MiLCJvbGRQb3MiLCJnZXRBbGxQb3MiLCJzcGxpY2UiLCJpbmRleE9mIiwiaXRlbSIsImluY2x1ZGVzIiwiYWRkQmxvY2tFdmVudHMiLCJzaGlwIiwib3B0aW9ucyIsImdyaWRzIiwicXVlcnlTZWxlY3RvckFsbCIsImRyYWdFbnRlciIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInRhcmdldCIsImNvbnRhaW5zIiwiZHJhZ092ZXIiLCJkcmFnTGVhdmUiLCJyZW1vdmUiLCJkcmFnRW5kIiwiZHJvcCIsImRyYWdnZWQiLCJBcnJheSIsInByb3RvdHlwZSIsImNhbGwiLCJjaGFuZ2VQb3MiLCJncmlkIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImFkZEV2ZW50TGlzdGVuZXIiLCJzZXRUaW1lb3V0IiwicmVtb3ZlQmxvY2tFdmVudHMiLCJibG9ja3MiLCJidG5zIiwiY2xvbmUiLCJjbG9uZU5vZGUiLCJwYXJlbnROb2RlIiwicmVwbGFjZUNoaWxkIiwiYnRuIiwicG9zaXRpb24iLCJhZGRFZmZlY3QiLCJpbmRleCIsImhpdCIsImNvdmVyIiwiR2FtZWJvYXJkIiwic2hpcHMiLCJhbGxQb3MiLCJtaXNzZWRIaXRzIiwic3Vua2VuIiwiaGl0cyIsInBsYWNlU2hpcCIsImdldE1pc3NlZEhpdHMiLCJnZXRIaXRzIiwiY2hlY2tTdW5rZW4iLCJpc1N1bmsiLCJyZWNlaXZlQXR0YWNrIiwiY29vcmQiLCJpc1NoaXBIaXQiLCJnZXRQb3MiLCJhcmVBbGxTdW5rZW4iLCJjb3VudCIsIm1hcmsiLCJ1cGRhdGVBbGxQb3MiLCJ3aXBlIiwibW9kdWxlIiwiZXhwb3J0cyIsInJlcXVpcmUiLCJQbGF5ZXIiLCJnZXRXaW5TdGF0dXMiLCJlbmVteSIsImNob3NlblBvcyIsImdldFJhbmRvbU51bSIsIm1pbiIsImNlaWwiLCJtYXgiLCJjaGVja0lmQXZhaWwiLCJ0ZW1wUG9zIiwiZ2V0UmFuZG9tUG9zIiwicmFuZG9taXplciIsImF0dGFjayIsImF0dFBvcyIsImlzSGl0IiwiaGl0UG9zIiwiU2hpcCIsImhpdG1hcmtzIiwiZmlsbEhpdHMiLCJnZXRMZW5ndGgiLCJkb20iLCJnYW1lRnVuYyIsImdlbmVyYXRlU2hpcHMiLCJyYW5kQnRuIiwiY3JlYXRlUGxheWVyU2hpcHMiLCJrIiwibWF0Y2giLCJyYW5kSW5kIiwiaW5uZXJIVE1MIiwiaW5pdCIsInN0YXJ0QnRuIiwiaHVtYW4iLCJhaSIsInN0YXJ0R2FtZSIsImFpZ2FtZWJvYXJkIiwicGxheWVyVHVybiJdLCJzb3VyY2VSb290IjoiIn0=