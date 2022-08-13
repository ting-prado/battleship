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
  containersDiv.appendChild(container);
  container.appendChild(gameboard);
  container.appendChild(topCont);
  container.appendChild(sideCont);

  for (var i = 0; i < 100; i++) {
    var span = document.createElement('span');
    span.classList.add(player.type === 'human' ? 'grid' : 'aigrid');
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
  // add specific class on non-droppable grids
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

  var drop = function drop(e) {
    e.target.classList.remove('drag-over');
    var dragged = document.querySelector('.dragged');
    var newPos;

    if (e.target.classList.contains('grid')) {
      newPos = getNewPos(block, Array.prototype.indexOf.call(grids, e.target));
      var avail = checkPos('existing', player, newPos, block.pos);

      if (avail && e.target.classList.contains('droppable')) {
        e.target.appendChild(dragged);
        ship.changePos(newPos);
        block.pos = newPos;
      } else {
        grids[block.pos[0]].appendChild(dragged);
      }
    } else {
      grids[block.pos[0]].appendChild(dragged);
    }

    dragged.classList.remove('hide');
    dragged.classList.remove('dragged');
    grids.forEach(function (grid) {
      grid.classList.remove('droppable');
      grid.classList.remove('non-droppable');
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
      } else {
        grids[i].classList.add('non-droppable');
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
};

var removeBlockEvents = function removeBlockEvents() {
  var blocks = document.querySelectorAll('.draggable');
  blocks.forEach(function (block) {
    var clone = block.cloneNode(true);
    clone.draggable = false;
    clone.style.cursor = 'auto';
    block.parentNode.replaceChild(clone, block);
  });
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
        e.target.classList.add(isHit ? 'hit' : 'miss');
        e.target.removeEventListener('click', playerTurn);
        e.target.style.cursor = 'auto';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LGlEQUFBLENBQW9CWSxFQUFwQjtNQUNBVixhQUFhLENBQUNVLEVBQUQsQ0FBYjtNQUNBWixtREFBQTtNQUNBLElBQU1jLFdBQVcsR0FBRzdJLFFBQVEsQ0FBQ3VELGdCQUFULENBQTBCLFNBQTFCLENBQXBCOztNQUNBLElBQU11RixVQUFVLEdBQUcsU0FBYkEsVUFBYSxDQUFDckYsQ0FBRCxFQUFPO1FBQ3hCLElBQU1iLEdBQUcsR0FBR3NCLEtBQUssQ0FBQ0MsU0FBTixDQUFnQm5CLE9BQWhCLENBQXdCb0IsSUFBeEIsQ0FBNkJ5RSxXQUE3QixFQUEwQ3BGLENBQUMsQ0FBQ0UsTUFBNUMsQ0FBWjtRQUNBLElBQU04RCxLQUFLLEdBQUdpQixLQUFLLENBQUNuQixNQUFOLENBQWFvQixFQUFiLEVBQWlCL0YsR0FBakIsQ0FBZDtRQUNBYSxDQUFDLENBQUNFLE1BQUYsQ0FBU3BELFNBQVQsQ0FBbUJDLEdBQW5CLENBQXVCaUgsS0FBSyxHQUFHLEtBQUgsR0FBVyxNQUF2QztRQUNBaEUsQ0FBQyxDQUFDRSxNQUFGLENBQVNZLG1CQUFULENBQTZCLE9BQTdCLEVBQXNDdUUsVUFBdEM7UUFDQXJGLENBQUMsQ0FBQ0UsTUFBRixDQUFTdEMsS0FBVCxDQUFleUQsTUFBZixHQUF3QixNQUF4QjtNQUNELENBTkQ7O01BT0ErRCxXQUFXLENBQUN6RyxPQUFaLENBQW9CLFVBQUNrQyxJQUFELEVBQVU7UUFDNUJBLElBQUksQ0FBQ0UsZ0JBQUwsQ0FBc0IsT0FBdEIsRUFBK0JzRSxVQUEvQjtNQUNELENBRkQ7SUFHRCxDQWZEOztJQWlCQUwsUUFBUSxDQUFDakUsZ0JBQVQsQ0FBMEIsT0FBMUIsRUFBbUNvRSxTQUFuQztFQUNELENBekJZLEVBQWI7QUEwQkQsQ0E5RWdCLEVBQWpCLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIGRlZmF1bHQtY2FzZSAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tcGx1c3BsdXMgKi9cbmNvbnN0IGNyZWF0ZUNvbnRhaW5lciA9IChwbGF5ZXIpID0+IHtcbiAgY29uc3QgYWxwaExhYmVsID0gWydBJywgJ0InLCAnQycsICdEJywgJ0UnLCAnRicsICdHJywgJ0gnLCAnSScsICdKJ107XG5cbiAgY29uc3QgY29udGFpbmVyc0RpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250YWluZXJzJyk7XG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb25zdCBnYW1lYm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29uc3QgdG9wQ29udCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb25zdCBzaWRlQ29udCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgnY29udGFpbmVyJyk7XG4gIGdhbWVib2FyZC5jbGFzc0xpc3QuYWRkKCdnYW1lYm9hcmQnKTtcbiAgdG9wQ29udC5jbGFzc0xpc3QuYWRkKCd0b3BDb250Jyk7XG4gIHNpZGVDb250LmNsYXNzTGlzdC5hZGQoJ3NpZGVDb250Jyk7XG5cbiAgY29udGFpbmVyc0Rpdi5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZ2FtZWJvYXJkKTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRvcENvbnQpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc2lkZUNvbnQpO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcbiAgICBjb25zdCBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIHNwYW4uY2xhc3NMaXN0LmFkZChwbGF5ZXIudHlwZSA9PT0gJ2h1bWFuJyA/ICdncmlkJyA6ICdhaWdyaWQnKTtcbiAgICBnYW1lYm9hcmQuYXBwZW5kQ2hpbGQoc3Bhbik7XG4gIH1cblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGFscGhMYWJlbC5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IHRvcFNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgdG9wU3Bhbi50ZXh0Q29udGVudCA9IGFscGhMYWJlbFtpXTtcbiAgICB0b3BDb250LmFwcGVuZENoaWxkKHRvcFNwYW4pO1xuXG4gICAgY29uc3Qgc2lkZVNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgc2lkZVNwYW4udGV4dENvbnRlbnQgPSBpICsgMTtcbiAgICBzaWRlQ29udC5hcHBlbmRDaGlsZChzaWRlU3Bhbik7XG4gIH1cbn07XG5cbmNvbnN0IGNyZWF0ZUJsb2NrID0gKHBsYXllciwgbGVuZ3RoKSA9PiB7XG4gIGNvbnN0IHNpemUgPSA0MC45MTtcbiAgY29uc3QgYmxvY2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgaWYgKHBsYXllci50eXBlID09PSAnaHVtYW4nKSB7XG4gICAgYmxvY2suY2xhc3NMaXN0LmFkZCgnZHJhZ2dhYmxlJyk7XG4gICAgYmxvY2suZHJhZ2dhYmxlID0gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICBibG9jay5jbGFzc0xpc3QuYWRkKCdhaWJsb2NrJyk7XG4gICAgYmxvY2suc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuICB9XG4gIGNvbnN0IHJhbmRvbSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpO1xuICBpZiAocmFuZG9tID09PSAxKSB7XG4gICAgYmxvY2suc3R5bGUud2lkdGggPSBgJHtzaXplfXB4YDtcbiAgICBibG9jay5zdHlsZS5oZWlnaHQgPSBgJHtzaXplICogbGVuZ3RofXB4YDtcbiAgfSBlbHNlIHtcbiAgICBibG9jay5zdHlsZS53aWR0aCA9IGAke3NpemUgKiBsZW5ndGh9cHhgO1xuICAgIGJsb2NrLnN0eWxlLmhlaWdodCA9IGAke3NpemV9cHhgO1xuICB9XG5cbiAgcmV0dXJuIGJsb2NrO1xufTtcblxuY29uc3QgZ2V0T3B0aW9ucyA9IChibG9jaykgPT4ge1xuICBjb25zdCBhcnIgPSBbXTtcbiAgaWYgKGJsb2NrLm9yaWVudGF0aW9uID09PSAncG9ydHJhaXQnKSB7XG4gICAgc3dpdGNoIChibG9jay5sZW5ndGgpIHtcbiAgICAgIGNhc2UgNDpcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA3MDsgaSsrKSB7XG4gICAgICAgICAgYXJyLnB1c2goaSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgODA7IGkrKykge1xuICAgICAgICAgIGFyci5wdXNoKGkpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAyOlxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDkwOyBpKyspIHtcbiAgICAgICAgICBhcnIucHVzaChpKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xuICAgICAgICAgIGFyci5wdXNoKGkpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBsZXQgbGltaXRzO1xuICAgIHN3aXRjaCAoYmxvY2subGVuZ3RoKSB7XG4gICAgICBjYXNlIDQ6XG4gICAgICAgIGxpbWl0cyA9IFs3LCA4LCA5XTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIGxpbWl0cyA9IFs4LCA5XTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIGxpbWl0cyA9IFs5XTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcbiAgICAgIGNvbnN0IG51bVN0ciA9IGkudG9TdHJpbmcoKTtcbiAgICAgIGxldCBhdmFpbCA9IHRydWU7XG4gICAgICBsaW1pdHMuZm9yRWFjaCgobnVtKSA9PiB7XG4gICAgICAgIGlmIChpID09PSBudW0gfHwgbnVtU3RyWzFdID09IG51bSkge1xuICAgICAgICAgIGF2YWlsID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgaWYgKGF2YWlsKSB7XG4gICAgICAgIGFyci5wdXNoKGkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gYXJyO1xufTtcblxuY29uc3QgZ2V0TmV3UG9zID0gKGJsb2NrLCBzdGFydGluZ1B0KSA9PiB7XG4gIGNvbnN0IG5ld1BvcyA9IFtdO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgZm9yIChsZXQgaiA9IDA7IGogPCBibG9jay5sZW5ndGg7IGorKykge1xuICAgIG5ld1Bvcy5wdXNoKFxuICAgICAgc3RhcnRpbmdQdCArIChibG9jay5vcmllbnRhdGlvbiA9PT0gJ3BvcnRyYWl0JyA/IGogKiAxMCA6IGopXG4gICAgKTtcbiAgfVxuICByZXR1cm4gbmV3UG9zO1xufTtcblxuY29uc3QgY2hlY2tQb3MgPSAobW9kZSwgcGxheWVyLCBwb3MsIG9sZFBvcykgPT4ge1xuICBsZXQgYXZhaWwgPSB0cnVlO1xuICBjb25zdCBhcnIgPSBwbGF5ZXIuZ2FtZWJvYXJkLmdldEFsbFBvcygpO1xuICBpZiAobW9kZSA9PT0gJ2V4aXN0aW5nJykge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2xkUG9zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcnIuc3BsaWNlKGFyci5pbmRleE9mKG9sZFBvc1tpXSksIDEpO1xuICAgIH1cbiAgfVxuICBwb3MuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgIGlmIChhcnIuaW5jbHVkZXMoaXRlbSkpIHtcbiAgICAgIGF2YWlsID0gZmFsc2U7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGF2YWlsO1xufTtcblxuY29uc3QgYWRkQmxvY2tFdmVudHMgPSAoYmxvY2ssIHNoaXAsIHBsYXllcikgPT4ge1xuICBjb25zdCBvcHRpb25zID0gZ2V0T3B0aW9ucyhibG9jayk7XG4gIGNvbnN0IGdyaWRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdyaWQnKTtcbiAgLy8gYWN0aXZhdGUgdGhlc2UgZnVuY3Rpb25zIGR1cmluZyBkcmFnc3RhcnRcbiAgLy8gZ2V0IGxlbmd0aCBvZiBibG9jayB0aGF0IGlzIGJlaW5nIGRyYWdnZWRcbiAgLy8gY2hhbmdlIGRyb3AgdGFyZ2V0cyBhY2NvcmRpbmcgdG8gYmxvY2sgbGVuZ3RoIGFuZCBvcmllbnRhdGlvblxuICBjb25zdCBkcmFnRW50ZXIgPSAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkcm9wcGFibGUnKSkge1xuICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZCgnZHJhZy1vdmVyJyk7XG4gICAgfVxuICB9O1xuXG4gIC8vIGFkZCBkcmFnJmRyb3AgcHJvcGVydGllcyB0byBhbGwgZ3JpZHNcbiAgLy8gZ2V0IGJsb2NrIHByZXZpb3VzIHBvc2l0aW9uIG9uIGRyYWdzdGFydFxuICAvLyBhZGQgc3BlY2lmaWMgY2xhc3Mgb24gbm9uLWRyb3BwYWJsZSBncmlkc1xuICAvLyBjaGVjayBpZiBncmlkIGlzIGluY2x1ZGVkIGluIG9wdGlvbnMgd2hlbiBkcmFnZ2luZyBvdmVyL2Ryb3BwaW5nXG4gIC8vIGlmIHllcywgYWRkIGRyYWctb3ZlciBjbGFzcyBhbmQgYWxsb3cgZHJvcFxuICAvLyBpZiBubywgZG8gbm90IGRpc3BsYXkgZHJhZy1vdmVyIGNsYXNzXG4gIC8vIGFsc28gY2hlY2sgaWYgdGhlIHJlc3Qgb2YgdGhlIGJsb2NrIG9jY3VwaWVzIGFub3RoZXIgYmxvY2tcbiAgLy8gaWYgeWVzLCByZXR1cm4gYmxvY2sgdG8gcHJldmlvdXMgcG9zaXRpb25cbiAgLy8gaWYgYSBibG9jayBpcyBkcm9wcGVkIG9uIG5vbi1vcHRpb24gZ3JpZCxcbiAgLy8gcmV0dXJuIGJsb2NrIHRvIHByZXZpb3VzIHBvc2l0aW9uXG4gIGNvbnN0IGRyYWdPdmVyID0gKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZHJvcHBhYmxlJykpIHtcbiAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2RyYWctb3ZlcicpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBkcmFnTGVhdmUgPSAoZSkgPT4ge1xuICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2RyYWctb3ZlcicpO1xuICB9O1xuXG4gIGNvbnN0IGRyb3AgPSAoZSkgPT4ge1xuICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2RyYWctb3ZlcicpO1xuICAgIGNvbnN0IGRyYWdnZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZHJhZ2dlZCcpO1xuICAgIGxldCBuZXdQb3M7XG4gICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZ3JpZCcpKSB7XG4gICAgICBuZXdQb3MgPSBnZXROZXdQb3MoYmxvY2ssIEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwoZ3JpZHMsIGUudGFyZ2V0KSk7XG4gICAgICBjb25zdCBhdmFpbCA9IGNoZWNrUG9zKCdleGlzdGluZycsIHBsYXllciwgbmV3UG9zLCBibG9jay5wb3MpO1xuICAgICAgaWYgKGF2YWlsICYmIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZHJvcHBhYmxlJykpIHtcbiAgICAgICAgZS50YXJnZXQuYXBwZW5kQ2hpbGQoZHJhZ2dlZCk7XG4gICAgICAgIHNoaXAuY2hhbmdlUG9zKG5ld1Bvcyk7XG4gICAgICAgIGJsb2NrLnBvcyA9IG5ld1BvcztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGdyaWRzW2Jsb2NrLnBvc1swXV0uYXBwZW5kQ2hpbGQoZHJhZ2dlZCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGdyaWRzW2Jsb2NrLnBvc1swXV0uYXBwZW5kQ2hpbGQoZHJhZ2dlZCk7XG4gICAgfVxuXG4gICAgZHJhZ2dlZC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgZHJhZ2dlZC5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnZ2VkJyk7XG4gICAgZ3JpZHMuZm9yRWFjaCgoZ3JpZCkgPT4ge1xuICAgICAgZ3JpZC5jbGFzc0xpc3QucmVtb3ZlKCdkcm9wcGFibGUnKTtcbiAgICAgIGdyaWQuY2xhc3NMaXN0LnJlbW92ZSgnbm9uLWRyb3BwYWJsZScpO1xuICAgICAgZ3JpZC5yZW1vdmVFdmVudExpc3RlbmVyKCdkcmFnZW50ZXInLCBkcmFnRW50ZXIpO1xuICAgICAgZ3JpZC5yZW1vdmVFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIGRyYWdPdmVyKTtcbiAgICAgIGdyaWQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgZHJhZ0xlYXZlKTtcbiAgICAgIGdyaWQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJvcCcsIGRyb3ApO1xuICAgIH0pO1xuICB9O1xuXG4gIGJsb2NrLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIChlKSA9PiB7XG4gICAgLy8gYWRkIGRyYWcgcHJvcGVydGllcyB0byBncmlkIG9uIGRyYWdzdGFydFxuICAgIC8vIGZvbGxvdyBwZXJjZW50YWdlIGJlbG93IGZvciBncmlkcyBhbGxvd2VkIHRvIGJlIHBsYWNlZCBvblxuICAgIC8vIHJlbW92ZSBkcmFnIHByb3BlcnRpZXMgb24gZ3JpZHMgYWZ0ZXIgZHJvcHBpbmdcbiAgICAvLyBhZGQgY2hlY2tlciBzbyBibG9ja3Mgd29uJ3Qgb3ZlcmxhcFxuICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2RyYWdnZWQnKTtcbiAgICBsZXQgaiA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xuICAgICAgaWYgKGkgPT09IG9wdGlvbnNbal0pIHtcbiAgICAgICAgZ3JpZHNbaV0uY2xhc3NMaXN0LmFkZCgnZHJvcHBhYmxlJyk7XG4gICAgICAgIGorKztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGdyaWRzW2ldLmNsYXNzTGlzdC5hZGQoJ25vbi1kcm9wcGFibGUnKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZ3JpZHMuZm9yRWFjaCgoZ3JpZCkgPT4ge1xuICAgICAgZ3JpZC5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW50ZXInLCBkcmFnRW50ZXIpO1xuICAgICAgZ3JpZC5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIGRyYWdPdmVyKTtcbiAgICAgIGdyaWQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgZHJhZ0xlYXZlKTtcbiAgICAgIGdyaWQuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIGRyb3ApO1xuICAgIH0pO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgIH0sIDApO1xuICB9KTtcbn07XG5cbmNvbnN0IHJlbW92ZUJsb2NrRXZlbnRzID0gKCkgPT4ge1xuICBjb25zdCBibG9ja3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZHJhZ2dhYmxlJyk7XG4gIGJsb2Nrcy5mb3JFYWNoKChibG9jaykgPT4ge1xuICAgIGNvbnN0IGNsb25lID0gYmxvY2suY2xvbmVOb2RlKHRydWUpO1xuICAgIGNsb25lLmRyYWdnYWJsZSA9IGZhbHNlO1xuICAgIGNsb25lLnN0eWxlLmN1cnNvciA9ICdhdXRvJztcbiAgICBibG9jay5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChjbG9uZSwgYmxvY2spO1xuICB9KTtcbn07XG5cbmV4cG9ydCB7XG4gIGNyZWF0ZUNvbnRhaW5lcixcbiAgY3JlYXRlQmxvY2ssXG4gIGFkZEJsb2NrRXZlbnRzLFxuICByZW1vdmVCbG9ja0V2ZW50cyxcbiAgZ2V0TmV3UG9zLFxuICBnZXRPcHRpb25zLFxuICBjaGVja1Bvcyxcbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1wbHVzcGx1cyAqL1xuY29uc3QgR2FtZWJvYXJkID0gKCkgPT4ge1xuICBsZXQgc2hpcHMgPSBbXTtcbiAgbGV0IGFsbFBvcyA9IFtdO1xuICBjb25zdCBtaXNzZWRIaXRzID0gW107XG4gIGNvbnN0IHN1bmtlbiA9IFtdO1xuICBjb25zdCBoaXRzID0gW107XG5cbiAgY29uc3QgcGxhY2VTaGlwID0gKHNoaXApID0+IHtcbiAgICBzaGlwcy5wdXNoKHNoaXApO1xuICAgIHN1bmtlbi5wdXNoKCcnKTtcbiAgfTtcblxuICBjb25zdCBnZXRNaXNzZWRIaXRzID0gKCkgPT4gbWlzc2VkSGl0cztcblxuICBjb25zdCBnZXRIaXRzID0gKCkgPT4gaGl0cztcblxuICBjb25zdCBjaGVja1N1bmtlbiA9IChzaGlwKSA9PiB7XG4gICAgaWYgKHNoaXAuaXNTdW5rKCkpIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gc2hpcHMuaW5kZXhPZihzaGlwKTtcbiAgICAgIHN1bmtlbltpbmRleF0gPSAneCc7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoY29vcmQpID0+IHtcbiAgICBsZXQgaXNTaGlwSGl0ID0gZmFsc2U7XG4gICAgc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgc2hpcC5nZXRQb3MoKS5mb3JFYWNoKChwb3NpdGlvbikgPT4ge1xuICAgICAgICBpZiAocG9zaXRpb24gPT09IGNvb3JkKSB7XG4gICAgICAgICAgaXNTaGlwSGl0ID0gdHJ1ZTtcbiAgICAgICAgICBzaGlwLmhpdChjb29yZCk7XG4gICAgICAgICAgaGl0cy5wdXNoKGNvb3JkKTtcbiAgICAgICAgICBjaGVja1N1bmtlbihzaGlwKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpZiAoIWlzU2hpcEhpdCkge1xuICAgICAgaGl0cy5wdXNoKGNvb3JkKTtcbiAgICAgIG1pc3NlZEhpdHMucHVzaChjb29yZCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGlzU2hpcEhpdDtcbiAgfTtcblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbiAgY29uc3QgYXJlQWxsU3Vua2VuID0gKCkgPT4ge1xuICAgIGxldCBjb3VudCA9IDA7XG4gICAgc3Vua2VuLmZvckVhY2goKG1hcmspID0+IHtcbiAgICAgIGlmIChtYXJrID09PSAneCcpIHtcbiAgICAgICAgY291bnQrKztcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBjb3VudCA9PT0gc2hpcHMubGVuZ3RoO1xuICB9O1xuXG4gIGNvbnN0IHVwZGF0ZUFsbFBvcyA9ICgpID0+IHtcbiAgICBhbGxQb3MgPSBbXTtcbiAgICBzaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICBzaGlwLmdldFBvcygpLmZvckVhY2goKHBvcykgPT4ge1xuICAgICAgICBhbGxQb3MucHVzaChwb3MpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgZ2V0QWxsUG9zID0gKCkgPT4ge1xuICAgIHVwZGF0ZUFsbFBvcygpO1xuICAgIHJldHVybiBhbGxQb3M7XG4gIH07XG5cbiAgY29uc3Qgd2lwZSA9ICgpID0+IHtcbiAgICBzaGlwcyA9IFtdO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgcGxhY2VTaGlwLFxuICAgIHJlY2VpdmVBdHRhY2ssXG4gICAgZ2V0TWlzc2VkSGl0cyxcbiAgICBhcmVBbGxTdW5rZW4sXG4gICAgZ2V0SGl0cyxcbiAgICBnZXRBbGxQb3MsXG4gICAgd2lwZSxcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gR2FtZWJvYXJkO1xuIiwiLyogZXNsaW50LWRpc2FibGUgY29uc2lzdGVudC1yZXR1cm4gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXBsdXNwbHVzICovXG5jb25zdCBHYW1lYm9hcmQgPSByZXF1aXJlKCcuL2dhbWVib2FyZCcpO1xuXG5jb25zdCBQbGF5ZXIgPSAodHlwZSA9ICdodW1hbicpID0+IHtcbiAgY29uc3QgZ2FtZWJvYXJkID0gR2FtZWJvYXJkKCk7XG4gIGNvbnN0IGdldFdpblN0YXR1cyA9IChlbmVteSkgPT4gZW5lbXkuZ2FtZWJvYXJkLmFyZUFsbFN1bmtlbigpO1xuXG4gIGNvbnN0IGdldFBvcyA9IChwb3MpID0+IHtcbiAgICAvLyBpZiBwcmV2UG9zIGlzIHVuZGVmaW5lZCwgY2hvb3NlIHJhbmRvbSBwb3NcbiAgICAvLyBjaGVjayBpZiByYW5kb20gcG9zIGlzIGhpdCBvciBub3RcbiAgICAvLyBpZiBub3QgaGl0LCByZXR1cm4gcG9zXG4gICAgLy8gaWYgaGl0LCBjaG9vc2UgYW5vdGhlciBvbmVcbiAgICBsZXQgY2hvc2VuUG9zO1xuXG4gICAgY29uc3QgZ2V0UmFuZG9tTnVtID0gKCkgPT4ge1xuICAgICAgY29uc3QgbWluID0gTWF0aC5jZWlsKDApOyAvLyBpbmNsdXNpdmVcbiAgICAgIGNvbnN0IG1heCA9IE1hdGguZmxvb3IoMTAwKTsgLy8gZXhjbHVzaXZlXG4gICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKyBtaW4pO1xuICAgIH07XG5cbiAgICBjb25zdCBjaGVja0lmQXZhaWwgPSAodGVtcFBvcykgPT4gIWdhbWVib2FyZC5nZXRIaXRzKCkuaW5jbHVkZXModGVtcFBvcyk7XG5cbiAgICBjb25zdCBnZXRSYW5kb21Qb3MgPSAoKSA9PiB7XG4gICAgICBsZXQgYXZhaWw7XG4gICAgICBsZXQgbmV3UG9zO1xuXG4gICAgICB3aGlsZSAoIWF2YWlsKSB7XG4gICAgICAgIG5ld1BvcyA9IGdldFJhbmRvbU51bSgpO1xuICAgICAgICBhdmFpbCA9IGNoZWNrSWZBdmFpbChuZXdQb3MpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3UG9zO1xuICAgIH07XG5cbiAgICBpZiAocG9zID09PSBudWxsKSB7XG4gICAgICBjaG9zZW5Qb3MgPSBnZXRSYW5kb21Qb3MoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gY2hlY2sgcmFuZG9tIHN1cnJvdW5kaW5nIHBvcyBpZiBoaXQgdW50aWwgeW91IGZpbmQgYSBwb3MgYXZhaWxhYmxlXG4gICAgICAvLyBpZiBzdXJyb3VuZGluZyBwb3NpdGlvbnMgYXJlIGhpdCwgcGljayBhIHJhbmRvbSBwb3MgaW5zdGVhZFxuICAgICAgbGV0IGF2YWlsLCB0ZW1wUG9zO1xuXG4gICAgICBjb25zdCBnZXROZXdQb3MgPSAoaSkgPT4ge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZGVmYXVsdC1jYXNlXG4gICAgICAgIHN3aXRjaCAoaSkge1xuICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIHJldHVybiBwb3MgKyAxO1xuICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIHJldHVybiBwb3MgLSAxO1xuICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIHJldHVybiBwb3MgKyAxMDtcbiAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICByZXR1cm4gcG9zIC0gMTA7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIC8vIHNlbGVjdCByYW5kb21seSBpZiBvbmUgb3IgemVyb1xuICAgICAgLy8gaWYgemVybywgbG9vcCBmcm9tIGx0clxuICAgICAgLy8gaWYgb25lLCBsb29wIGZyb20gcnRsXG4gICAgICAvLyBldmVyeSBsb29wIGNoZWNrIGlmIGNvb3JkIGlzIGF2YWlsYWJsZVxuICAgICAgLy8gcmV0dXJuIGlmIGF2YWlsYWJsZVxuICAgICAgLy8gbG9vcCA0IHRpbWVzXG4gICAgICAvLyBpZiByZXN1bHRpbmcgY29vcmQgaXMgMTAwLCBpZ25vcmUgaXRcbiAgICAgIGNvbnN0IHJhbmRvbWl6ZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKTtcbiAgICAgIGlmIChyYW5kb21pemVyID09PSAwKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICAgICAgdGVtcFBvcyA9IGdldE5ld1BvcyhpKTtcbiAgICAgICAgICBpZiAodGVtcFBvcyA9PT0gMTAwKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBhdmFpbCA9IGNoZWNrSWZBdmFpbCh0ZW1wUG9zKTtcbiAgICAgICAgICBpZiAoYXZhaWwpIHtcbiAgICAgICAgICAgIGNob3NlblBvcyA9IHRlbXBQb3M7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFhdmFpbCkge1xuICAgICAgICAgIGNob3NlblBvcyA9IGdldFJhbmRvbVBvcygpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKGxldCBpID0gMzsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICB0ZW1wUG9zID0gZ2V0TmV3UG9zKGkpO1xuICAgICAgICAgIGF2YWlsID0gY2hlY2tJZkF2YWlsKHRlbXBQb3MpO1xuICAgICAgICAgIGlmIChhdmFpbCkge1xuICAgICAgICAgICAgY2hvc2VuUG9zID0gdGVtcFBvcztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIWF2YWlsKSB7XG4gICAgICAgICAgY2hvc2VuUG9zID0gZ2V0UmFuZG9tUG9zKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNob3NlblBvcztcbiAgfTtcblxuICBjb25zdCBhdHRhY2sgPSAoZW5lbXksIHBvcyA9IG51bGwpID0+IHtcbiAgICBjb25zdCBhdHRQb3MgPSB0eXBlID09PSAnY29tcCcgPyBnZXRQb3MocG9zKSA6IHBvcztcbiAgICBjb25zdCBpc0hpdCA9IGVuZW15LmdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKGF0dFBvcyk7XG4gICAgaWYgKHR5cGUgPT09ICdjb21wJykge1xuICAgICAgcmV0dXJuIHsgaXNIaXQsIGhpdFBvczogYXR0UG9zIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIGlzSGl0O1xuICB9O1xuXG4gIHJldHVybiB7IGdldFdpblN0YXR1cywgZ2FtZWJvYXJkLCBhdHRhY2ssIHR5cGUgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUGxheWVyO1xuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tcGx1c3BsdXMgKi9cbmNvbnN0IFNoaXAgPSAobGVuZ3RoLCBwb3MpID0+IHtcbiAgY29uc3QgaGl0bWFya3MgPSBbXTtcblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgY29uc3QgZmlsbEhpdHMgPSAoKCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGhpdG1hcmtzW2ldID0gJyc7XG4gICAgfVxuICB9KSgpO1xuXG4gIGNvbnN0IGhpdCA9IChoaXRQb3MpID0+IHtcbiAgICBjb25zdCBpbmRleCA9IHBvcy5pbmRleE9mKGhpdFBvcyk7XG4gICAgaGl0bWFya3NbaW5kZXhdID0gJ3gnO1xuICB9O1xuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBjb25zdCBpc1N1bmsgPSAoKSA9PiB7XG4gICAgbGV0IGNvdW50ID0gMDtcbiAgICBoaXRtYXJrcy5mb3JFYWNoKChtYXJrKSA9PiB7XG4gICAgICBpZiAobWFyayA9PT0gJ3gnKSB7XG4gICAgICAgIGNvdW50Kys7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gY291bnQgPT09IGxlbmd0aDtcbiAgfTtcblxuICBjb25zdCBjaGFuZ2VQb3MgPSAobmV3UG9zKSA9PiB7XG4gICAgcG9zID0gbmV3UG9zO1xuICB9O1xuXG4gIGNvbnN0IGdldExlbmd0aCA9ICgpID0+IGxlbmd0aDtcbiAgY29uc3QgZ2V0UG9zID0gKCkgPT4gcG9zO1xuXG4gIHJldHVybiB7XG4gICAgZ2V0TGVuZ3RoLFxuICAgIGdldFBvcyxcbiAgICBoaXQsXG4gICAgaXNTdW5rLFxuICAgIGNoYW5nZVBvcyxcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU2hpcDtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1wbHVzcGx1cyAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbmltcG9ydCAqIGFzIGRvbSBmcm9tICcuL2RvbSc7XG5pbXBvcnQgU2hpcCBmcm9tICcuL2ZhY3Rvcmllcy9zaGlwJztcbmltcG9ydCBQbGF5ZXIgZnJvbSAnLi9mYWN0b3JpZXMvcGxheWVyJztcblxuLy8gbWFpbiBnYW1lIGxvb3Bcbi8vIHN0YXJ0cyB3aXRoIGNyZWF0aW5nIHBsYXllcnMgJiBwb3B1bGF0ZSBlYWNoIGdhbWVib2FyZFxuLy8gY3JlYXRlIGh1bWFuIHBsYXllciAmIGdhbWVib2FyZCBmaXJzdFxuLy8gcGxhY2Ugc2hpcHMgb24gcGxheWVyIGdhbWVib2FyZFxuLy8gY3JlYXRlIGNvbXAgcGxheWVyICYgZ2FtZWJvYXJkXG4vLyBwbGFjZSBzaGlwcyBpbiByYW5kb20gcG9zaXRpb24gaW4gZW5lbXkgZ2FtZWJvYXJkXG4vLyBkaXNwbGF5IGJvdGggZ2FtZWJvYXJkc1xuLy8gZ2FtZSBsb29wIHNob3VsZCBzdGVwIHRocm91Z2ggdGhlIGdhbWUgdHVybiBieSB0dXJuXG4vLyB1c2luZyBvbmx5IGZ1bmN0aW9uIGluc2lkZSB0aGUgZ2FtZSBsb29wXG4vLyBjcmVhdGUgY29uZGl0aW9ucyBzbyB0aGF0IHRoZSBnYW1lIGVuZHMgb25jZVxuLy8gb25lIHBsYXllcidzIHNoaXBzIGhhdmUgYWxsIGJlZW4gc3Vua1xuY29uc3QgZ2FtZUZ1bmMgPSAoKCkgPT4ge1xuICBjb25zdCBnZW5lcmF0ZVNoaXBzID0gKHBsYXllcikgPT4ge1xuICAgIGNvbnN0IGdyaWRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAgIHBsYXllci50eXBlID09PSAnaHVtYW4nID8gJy5ncmlkJyA6ICcuYWlncmlkJ1xuICAgICk7XG4gICAgY29uc3QgcmFuZEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbjpmaXJzdC1vZi10eXBlJyk7XG5cbiAgICBjb25zdCBjcmVhdGVQbGF5ZXJTaGlwcyA9ICgpID0+IHtcbiAgICAgIGxldCBsZW5ndGggPSA0O1xuICAgICAgbGV0IGNvdW50ID0gMTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgY291bnQ7IGsrKykge1xuICAgICAgICAgIGNvbnN0IGJsb2NrID0gZG9tLmNyZWF0ZUJsb2NrKHBsYXllciwgbGVuZ3RoKTtcbiAgICAgICAgICBibG9jay5sZW5ndGggPSBsZW5ndGg7XG4gICAgICAgICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgICAgICAgYmxvY2sub3JpZW50YXRpb24gPSBibG9jay5zdHlsZS53aWR0aC5tYXRjaCgvXi4rPyg/PXB4KS8pWzBdIC8gNDAuOTEgPiAxXG4gICAgICAgICAgICA/ICdsYW5kc2NhcGUnXG4gICAgICAgICAgICA6ICdwb3J0cmFpdCc7XG4gICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IGRvbS5nZXRPcHRpb25zKGJsb2NrKTtcbiAgICAgICAgICBsZXQgYXZhaWwgPSBmYWxzZTtcblxuICAgICAgICAgIHdoaWxlICghYXZhaWwpIHtcbiAgICAgICAgICAgIGNvbnN0IHJhbmRJbmQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBvcHRpb25zLmxlbmd0aCk7XG4gICAgICAgICAgICBjb25zdCB0ZW1wUG9zID0gZG9tLmdldE5ld1BvcyhibG9jaywgb3B0aW9uc1tyYW5kSW5kXSk7XG4gICAgICAgICAgICBibG9jay5wb3MgPSB0ZW1wUG9zO1xuICAgICAgICAgICAgYXZhaWwgPSBkb20uY2hlY2tQb3MoJ25ldycsIHBsYXllciwgYmxvY2sucG9zKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZ3JpZHNbYmxvY2sucG9zWzBdXS5hcHBlbmRDaGlsZChibG9jayk7XG4gICAgICAgICAgY29uc3Qgc2hpcCA9IFNoaXAoYmxvY2subGVuZ3RoLCBibG9jay5wb3MpO1xuICAgICAgICAgIHBsYXllci5nYW1lYm9hcmQucGxhY2VTaGlwKHNoaXApO1xuICAgICAgICAgIGRvbS5hZGRCbG9ja0V2ZW50cyhibG9jaywgc2hpcCwgcGxheWVyKTtcbiAgICAgICAgfVxuICAgICAgICBsZW5ndGgtLTtcbiAgICAgICAgY291bnQrKztcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKHBsYXllci50eXBlID09PSAnaHVtYW4nKSB7XG4gICAgICBjcmVhdGVQbGF5ZXJTaGlwcygpO1xuXG4gICAgICByYW5kQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBncmlkcy5mb3JFYWNoKChncmlkKSA9PiB7XG4gICAgICAgICAgZ3JpZC5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgfSk7XG4gICAgICAgIHBsYXllci5nYW1lYm9hcmQud2lwZSgpO1xuICAgICAgICBjcmVhdGVQbGF5ZXJTaGlwcygpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNyZWF0ZVBsYXllclNoaXBzKCk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGluaXQgPSAoKCkgPT4ge1xuICAgIGNvbnN0IHN0YXJ0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uOm50aC1vZi10eXBlKDIpJyk7XG4gICAgY29uc3QgaHVtYW4gPSBQbGF5ZXIoKTtcbiAgICBjb25zdCBhaSA9IFBsYXllcignY29tcCcpO1xuICAgIGRvbS5jcmVhdGVDb250YWluZXIoaHVtYW4pO1xuICAgIGdlbmVyYXRlU2hpcHMoaHVtYW4pO1xuXG4gICAgY29uc3Qgc3RhcnRHYW1lID0gKCkgPT4ge1xuICAgICAgZG9tLmNyZWF0ZUNvbnRhaW5lcihhaSk7XG4gICAgICBnZW5lcmF0ZVNoaXBzKGFpKTtcbiAgICAgIGRvbS5yZW1vdmVCbG9ja0V2ZW50cygpO1xuICAgICAgY29uc3QgYWlnYW1lYm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYWlncmlkJyk7XG4gICAgICBjb25zdCBwbGF5ZXJUdXJuID0gKGUpID0+IHtcbiAgICAgICAgY29uc3QgcG9zID0gQXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChhaWdhbWVib2FyZCwgZS50YXJnZXQpO1xuICAgICAgICBjb25zdCBpc0hpdCA9IGh1bWFuLmF0dGFjayhhaSwgcG9zKTtcbiAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZChpc0hpdCA/ICdoaXQnIDogJ21pc3MnKTtcbiAgICAgICAgZS50YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwbGF5ZXJUdXJuKTtcbiAgICAgICAgZS50YXJnZXQuc3R5bGUuY3Vyc29yID0gJ2F1dG8nO1xuICAgICAgfTtcbiAgICAgIGFpZ2FtZWJvYXJkLmZvckVhY2goKGdyaWQpID0+IHtcbiAgICAgICAgZ3JpZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHBsYXllclR1cm4pO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3RhcnRHYW1lKTtcbiAgfSkoKTtcbn0pKCk7XG4iXSwibmFtZXMiOlsiY3JlYXRlQ29udGFpbmVyIiwicGxheWVyIiwiYWxwaExhYmVsIiwiY29udGFpbmVyc0RpdiIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImNvbnRhaW5lciIsImNyZWF0ZUVsZW1lbnQiLCJnYW1lYm9hcmQiLCJ0b3BDb250Iiwic2lkZUNvbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJhcHBlbmRDaGlsZCIsImkiLCJzcGFuIiwidHlwZSIsImxlbmd0aCIsInRvcFNwYW4iLCJ0ZXh0Q29udGVudCIsInNpZGVTcGFuIiwiY3JlYXRlQmxvY2siLCJzaXplIiwiYmxvY2siLCJkcmFnZ2FibGUiLCJzdHlsZSIsInZpc2liaWxpdHkiLCJyYW5kb20iLCJNYXRoIiwiZmxvb3IiLCJ3aWR0aCIsImhlaWdodCIsImdldE9wdGlvbnMiLCJhcnIiLCJvcmllbnRhdGlvbiIsInB1c2giLCJsaW1pdHMiLCJudW1TdHIiLCJ0b1N0cmluZyIsImF2YWlsIiwiZm9yRWFjaCIsIm51bSIsImdldE5ld1BvcyIsInN0YXJ0aW5nUHQiLCJuZXdQb3MiLCJqIiwiY2hlY2tQb3MiLCJtb2RlIiwicG9zIiwib2xkUG9zIiwiZ2V0QWxsUG9zIiwic3BsaWNlIiwiaW5kZXhPZiIsIml0ZW0iLCJpbmNsdWRlcyIsImFkZEJsb2NrRXZlbnRzIiwic2hpcCIsIm9wdGlvbnMiLCJncmlkcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJkcmFnRW50ZXIiLCJlIiwicHJldmVudERlZmF1bHQiLCJ0YXJnZXQiLCJjb250YWlucyIsImRyYWdPdmVyIiwiZHJhZ0xlYXZlIiwicmVtb3ZlIiwiZHJvcCIsImRyYWdnZWQiLCJBcnJheSIsInByb3RvdHlwZSIsImNhbGwiLCJjaGFuZ2VQb3MiLCJncmlkIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImFkZEV2ZW50TGlzdGVuZXIiLCJzZXRUaW1lb3V0IiwicmVtb3ZlQmxvY2tFdmVudHMiLCJibG9ja3MiLCJjbG9uZSIsImNsb25lTm9kZSIsImN1cnNvciIsInBhcmVudE5vZGUiLCJyZXBsYWNlQ2hpbGQiLCJHYW1lYm9hcmQiLCJzaGlwcyIsImFsbFBvcyIsIm1pc3NlZEhpdHMiLCJzdW5rZW4iLCJoaXRzIiwicGxhY2VTaGlwIiwiZ2V0TWlzc2VkSGl0cyIsImdldEhpdHMiLCJjaGVja1N1bmtlbiIsImlzU3VuayIsImluZGV4IiwicmVjZWl2ZUF0dGFjayIsImNvb3JkIiwiaXNTaGlwSGl0IiwiZ2V0UG9zIiwicG9zaXRpb24iLCJoaXQiLCJhcmVBbGxTdW5rZW4iLCJjb3VudCIsIm1hcmsiLCJ1cGRhdGVBbGxQb3MiLCJ3aXBlIiwibW9kdWxlIiwiZXhwb3J0cyIsInJlcXVpcmUiLCJQbGF5ZXIiLCJnZXRXaW5TdGF0dXMiLCJlbmVteSIsImNob3NlblBvcyIsImdldFJhbmRvbU51bSIsIm1pbiIsImNlaWwiLCJtYXgiLCJjaGVja0lmQXZhaWwiLCJ0ZW1wUG9zIiwiZ2V0UmFuZG9tUG9zIiwicmFuZG9taXplciIsImF0dGFjayIsImF0dFBvcyIsImlzSGl0IiwiaGl0UG9zIiwiU2hpcCIsImhpdG1hcmtzIiwiZmlsbEhpdHMiLCJnZXRMZW5ndGgiLCJkb20iLCJnYW1lRnVuYyIsImdlbmVyYXRlU2hpcHMiLCJyYW5kQnRuIiwiY3JlYXRlUGxheWVyU2hpcHMiLCJrIiwibWF0Y2giLCJyYW5kSW5kIiwiaW5uZXJIVE1MIiwiaW5pdCIsInN0YXJ0QnRuIiwiaHVtYW4iLCJhaSIsInN0YXJ0R2FtZSIsImFpZ2FtZWJvYXJkIiwicGxheWVyVHVybiJdLCJzb3VyY2VSb290IjoiIn0=