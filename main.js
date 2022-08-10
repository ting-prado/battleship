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
/* harmony export */   "getOptions": () => (/* binding */ getOptions)
/* harmony export */ });
/* eslint-disable default-case */

/* eslint-disable no-console */

/* eslint-disable no-plusplus */
var createContainer = function createContainer() {
  var alphLabel = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  var container = document.createElement('div');
  var gameboard = document.createElement('div');
  var topCont = document.createElement('div');
  var sideCont = document.createElement('div');
  container.classList.add('container');
  gameboard.classList.add('gameboard');
  topCont.classList.add('topCont');
  sideCont.classList.add('sideCont');
  document.querySelector('body').appendChild(container);
  container.appendChild(gameboard);
  container.appendChild(topCont);
  container.appendChild(sideCont);

  for (var i = 0; i < 100; i++) {
    var span = document.createElement('span');
    span.classList.add('grid');
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

var createBlock = function createBlock(length) {
  var size = 40.91;
  var block = document.createElement('div');
  block.classList.add('draggable');
  block.draggable = true;
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
    var grids = document.querySelectorAll('.grid');
    var randBtn = document.querySelector('button:first-of-type');

    var createPlayerShips = function createPlayerShips() {
      var length = 4;
      var count = 1;

      for (var i = 0; i < 4; i++) {
        for (var k = 0; k < count; k++) {
          var block = _dom__WEBPACK_IMPORTED_MODULE_0__.createBlock(length);
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
    } else {}
  };

  var init = function () {
    _dom__WEBPACK_IMPORTED_MODULE_0__.createContainer(); // separate class name for human and ai container

    var human = _factories_player__WEBPACK_IMPORTED_MODULE_2___default()();
    var ai = _factories_player__WEBPACK_IMPORTED_MODULE_2___default()('comp');
    generateShips(human);
    generateShips(ai);
  }();
}();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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TWdDLEVBQUUsR0FBR2hDLHdEQUFNLENBQUMsTUFBRCxDQUFqQjtJQUNBdUIsYUFBYSxDQUFDUSxLQUFELENBQWI7SUFDQVIsYUFBYSxDQUFDUyxFQUFELENBQWI7RUFDRCxDQVBZLEVBQWI7QUFRRCxDQXpEZ0IsRUFBakIsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgZGVmYXVsdC1jYXNlICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wbHVzcGx1cyAqL1xuY29uc3QgY3JlYXRlQ29udGFpbmVyID0gKCkgPT4ge1xuICBjb25zdCBhbHBoTGFiZWwgPSBbJ0EnLCAnQicsICdDJywgJ0QnLCAnRScsICdGJywgJ0cnLCAnSCcsICdJJywgJ0onXTtcblxuICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29uc3QgZ2FtZWJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNvbnN0IHRvcENvbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29uc3Qgc2lkZUNvbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2NvbnRhaW5lcicpO1xuICBnYW1lYm9hcmQuY2xhc3NMaXN0LmFkZCgnZ2FtZWJvYXJkJyk7XG4gIHRvcENvbnQuY2xhc3NMaXN0LmFkZCgndG9wQ29udCcpO1xuICBzaWRlQ29udC5jbGFzc0xpc3QuYWRkKCdzaWRlQ29udCcpO1xuXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZ2FtZWJvYXJkKTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRvcENvbnQpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc2lkZUNvbnQpO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcbiAgICBjb25zdCBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIHNwYW4uY2xhc3NMaXN0LmFkZCgnZ3JpZCcpO1xuICAgIGdhbWVib2FyZC5hcHBlbmRDaGlsZChzcGFuKTtcbiAgfVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYWxwaExhYmVsLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgdG9wU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICB0b3BTcGFuLnRleHRDb250ZW50ID0gYWxwaExhYmVsW2ldO1xuICAgIHRvcENvbnQuYXBwZW5kQ2hpbGQodG9wU3Bhbik7XG5cbiAgICBjb25zdCBzaWRlU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBzaWRlU3Bhbi50ZXh0Q29udGVudCA9IGkgKyAxO1xuICAgIHNpZGVDb250LmFwcGVuZENoaWxkKHNpZGVTcGFuKTtcbiAgfVxufTtcblxuY29uc3QgY3JlYXRlQmxvY2sgPSAobGVuZ3RoKSA9PiB7XG4gIGNvbnN0IHNpemUgPSA0MC45MTtcbiAgY29uc3QgYmxvY2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgYmxvY2suY2xhc3NMaXN0LmFkZCgnZHJhZ2dhYmxlJyk7XG4gIGJsb2NrLmRyYWdnYWJsZSA9IHRydWU7XG4gIGNvbnN0IHJhbmRvbSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpO1xuICBpZiAocmFuZG9tID09PSAxKSB7XG4gICAgYmxvY2suc3R5bGUud2lkdGggPSBgJHtzaXplfXB4YDtcbiAgICBibG9jay5zdHlsZS5oZWlnaHQgPSBgJHtzaXplICogbGVuZ3RofXB4YDtcbiAgfSBlbHNlIHtcbiAgICBibG9jay5zdHlsZS53aWR0aCA9IGAke3NpemUgKiBsZW5ndGh9cHhgO1xuICAgIGJsb2NrLnN0eWxlLmhlaWdodCA9IGAke3NpemV9cHhgO1xuICB9XG5cbiAgcmV0dXJuIGJsb2NrO1xufTtcblxuY29uc3QgZ2V0T3B0aW9ucyA9IChibG9jaykgPT4ge1xuICBjb25zdCBhcnIgPSBbXTtcbiAgaWYgKGJsb2NrLm9yaWVudGF0aW9uID09PSAncG9ydHJhaXQnKSB7XG4gICAgc3dpdGNoIChibG9jay5sZW5ndGgpIHtcbiAgICAgIGNhc2UgNDpcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA3MDsgaSsrKSB7XG4gICAgICAgICAgYXJyLnB1c2goaSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgODA7IGkrKykge1xuICAgICAgICAgIGFyci5wdXNoKGkpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAyOlxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDkwOyBpKyspIHtcbiAgICAgICAgICBhcnIucHVzaChpKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xuICAgICAgICAgIGFyci5wdXNoKGkpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBsZXQgbGltaXRzO1xuICAgIHN3aXRjaCAoYmxvY2subGVuZ3RoKSB7XG4gICAgICBjYXNlIDQ6XG4gICAgICAgIGxpbWl0cyA9IFs3LCA4LCA5XTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIGxpbWl0cyA9IFs4LCA5XTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIGxpbWl0cyA9IFs5XTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcbiAgICAgIGNvbnN0IG51bVN0ciA9IGkudG9TdHJpbmcoKTtcbiAgICAgIGxldCBhdmFpbCA9IHRydWU7XG4gICAgICBsaW1pdHMuZm9yRWFjaCgobnVtKSA9PiB7XG4gICAgICAgIGlmIChpID09PSBudW0gfHwgbnVtU3RyWzFdID09IG51bSkge1xuICAgICAgICAgIGF2YWlsID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgaWYgKGF2YWlsKSB7XG4gICAgICAgIGFyci5wdXNoKGkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gYXJyO1xufTtcblxuY29uc3QgZ2V0TmV3UG9zID0gKGJsb2NrLCBzdGFydGluZ1B0KSA9PiB7XG4gIGNvbnN0IG5ld1BvcyA9IFtdO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgZm9yIChsZXQgaiA9IDA7IGogPCBibG9jay5sZW5ndGg7IGorKykge1xuICAgIG5ld1Bvcy5wdXNoKFxuICAgICAgc3RhcnRpbmdQdCArIChibG9jay5vcmllbnRhdGlvbiA9PT0gJ3BvcnRyYWl0JyA/IGogKiAxMCA6IGopXG4gICAgKTtcbiAgfVxuICByZXR1cm4gbmV3UG9zO1xufTtcblxuY29uc3QgY2hlY2tQb3MgPSAobW9kZSwgcGxheWVyLCBwb3MsIG9sZFBvcykgPT4ge1xuICBsZXQgYXZhaWwgPSB0cnVlO1xuICBjb25zdCBhcnIgPSBwbGF5ZXIuZ2FtZWJvYXJkLmdldEFsbFBvcygpO1xuICBpZiAobW9kZSA9PT0gJ2V4aXN0aW5nJykge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2xkUG9zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcnIuc3BsaWNlKGFyci5pbmRleE9mKG9sZFBvc1tpXSksIDEpO1xuICAgIH1cbiAgfVxuICBwb3MuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgIGlmIChhcnIuaW5jbHVkZXMoaXRlbSkpIHtcbiAgICAgIGF2YWlsID0gZmFsc2U7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGF2YWlsO1xufTtcblxuY29uc3QgYWRkQmxvY2tFdmVudHMgPSAoYmxvY2ssIHNoaXAsIHBsYXllcikgPT4ge1xuICBjb25zdCBvcHRpb25zID0gZ2V0T3B0aW9ucyhibG9jayk7XG4gIGNvbnN0IGdyaWRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdyaWQnKTtcbiAgLy8gYWN0aXZhdGUgdGhlc2UgZnVuY3Rpb25zIGR1cmluZyBkcmFnc3RhcnRcbiAgLy8gZ2V0IGxlbmd0aCBvZiBibG9jayB0aGF0IGlzIGJlaW5nIGRyYWdnZWRcbiAgLy8gY2hhbmdlIGRyb3AgdGFyZ2V0cyBhY2NvcmRpbmcgdG8gYmxvY2sgbGVuZ3RoIGFuZCBvcmllbnRhdGlvblxuICBjb25zdCBkcmFnRW50ZXIgPSAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkcm9wcGFibGUnKSkge1xuICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZCgnZHJhZy1vdmVyJyk7XG4gICAgfVxuICB9O1xuXG4gIC8vIGFkZCBkcmFnJmRyb3AgcHJvcGVydGllcyB0byBhbGwgZ3JpZHNcbiAgLy8gZ2V0IGJsb2NrIHByZXZpb3VzIHBvc2l0aW9uIG9uIGRyYWdzdGFydFxuICAvLyBhZGQgc3BlY2lmaWMgY2xhc3Mgb24gbm9uLWRyb3BwYWJsZSBncmlkc1xuICAvLyBjaGVjayBpZiBncmlkIGlzIGluY2x1ZGVkIGluIG9wdGlvbnMgd2hlbiBkcmFnZ2luZyBvdmVyL2Ryb3BwaW5nXG4gIC8vIGlmIHllcywgYWRkIGRyYWctb3ZlciBjbGFzcyBhbmQgYWxsb3cgZHJvcFxuICAvLyBpZiBubywgZG8gbm90IGRpc3BsYXkgZHJhZy1vdmVyIGNsYXNzXG4gIC8vIGFsc28gY2hlY2sgaWYgdGhlIHJlc3Qgb2YgdGhlIGJsb2NrIG9jY3VwaWVzIGFub3RoZXIgYmxvY2tcbiAgLy8gaWYgeWVzLCByZXR1cm4gYmxvY2sgdG8gcHJldmlvdXMgcG9zaXRpb25cbiAgLy8gaWYgYSBibG9jayBpcyBkcm9wcGVkIG9uIG5vbi1vcHRpb24gZ3JpZCxcbiAgLy8gcmV0dXJuIGJsb2NrIHRvIHByZXZpb3VzIHBvc2l0aW9uXG4gIGNvbnN0IGRyYWdPdmVyID0gKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZHJvcHBhYmxlJykpIHtcbiAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2RyYWctb3ZlcicpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBkcmFnTGVhdmUgPSAoZSkgPT4ge1xuICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2RyYWctb3ZlcicpO1xuICB9O1xuXG4gIGNvbnN0IGRyb3AgPSAoZSkgPT4ge1xuICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2RyYWctb3ZlcicpO1xuICAgIGNvbnN0IGRyYWdnZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZHJhZ2dlZCcpO1xuICAgIGxldCBuZXdQb3M7XG4gICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZ3JpZCcpKSB7XG4gICAgICBuZXdQb3MgPSBnZXROZXdQb3MoYmxvY2ssIEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwoZ3JpZHMsIGUudGFyZ2V0KSk7XG4gICAgICBjb25zdCBhdmFpbCA9IGNoZWNrUG9zKCdleGlzdGluZycsIHBsYXllciwgbmV3UG9zLCBibG9jay5wb3MpO1xuICAgICAgaWYgKGF2YWlsICYmIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZHJvcHBhYmxlJykpIHtcbiAgICAgICAgZS50YXJnZXQuYXBwZW5kQ2hpbGQoZHJhZ2dlZCk7XG4gICAgICAgIHNoaXAuY2hhbmdlUG9zKG5ld1Bvcyk7XG4gICAgICAgIGJsb2NrLnBvcyA9IG5ld1BvcztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGdyaWRzW2Jsb2NrLnBvc1swXV0uYXBwZW5kQ2hpbGQoZHJhZ2dlZCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGdyaWRzW2Jsb2NrLnBvc1swXV0uYXBwZW5kQ2hpbGQoZHJhZ2dlZCk7XG4gICAgfVxuXG4gICAgZHJhZ2dlZC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgZHJhZ2dlZC5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnZ2VkJyk7XG4gICAgZ3JpZHMuZm9yRWFjaCgoZ3JpZCkgPT4ge1xuICAgICAgZ3JpZC5jbGFzc0xpc3QucmVtb3ZlKCdkcm9wcGFibGUnKTtcbiAgICAgIGdyaWQuY2xhc3NMaXN0LnJlbW92ZSgnbm9uLWRyb3BwYWJsZScpO1xuICAgICAgZ3JpZC5yZW1vdmVFdmVudExpc3RlbmVyKCdkcmFnZW50ZXInLCBkcmFnRW50ZXIpO1xuICAgICAgZ3JpZC5yZW1vdmVFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIGRyYWdPdmVyKTtcbiAgICAgIGdyaWQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgZHJhZ0xlYXZlKTtcbiAgICAgIGdyaWQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJvcCcsIGRyb3ApO1xuICAgIH0pO1xuICB9O1xuXG4gIGJsb2NrLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIChlKSA9PiB7XG4gICAgLy8gYWRkIGRyYWcgcHJvcGVydGllcyB0byBncmlkIG9uIGRyYWdzdGFydFxuICAgIC8vIGZvbGxvdyBwZXJjZW50YWdlIGJlbG93IGZvciBncmlkcyBhbGxvd2VkIHRvIGJlIHBsYWNlZCBvblxuICAgIC8vIHJlbW92ZSBkcmFnIHByb3BlcnRpZXMgb24gZ3JpZHMgYWZ0ZXIgZHJvcHBpbmdcbiAgICAvLyBhZGQgY2hlY2tlciBzbyBibG9ja3Mgd29uJ3Qgb3ZlcmxhcFxuICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2RyYWdnZWQnKTtcbiAgICBsZXQgaiA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xuICAgICAgaWYgKGkgPT09IG9wdGlvbnNbal0pIHtcbiAgICAgICAgZ3JpZHNbaV0uY2xhc3NMaXN0LmFkZCgnZHJvcHBhYmxlJyk7XG4gICAgICAgIGorKztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGdyaWRzW2ldLmNsYXNzTGlzdC5hZGQoJ25vbi1kcm9wcGFibGUnKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZ3JpZHMuZm9yRWFjaCgoZ3JpZCkgPT4ge1xuICAgICAgZ3JpZC5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW50ZXInLCBkcmFnRW50ZXIpO1xuICAgICAgZ3JpZC5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIGRyYWdPdmVyKTtcbiAgICAgIGdyaWQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgZHJhZ0xlYXZlKTtcbiAgICAgIGdyaWQuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIGRyb3ApO1xuICAgIH0pO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgIH0sIDApO1xuICB9KTtcbn07XG5cbmV4cG9ydCB7XG4gIGNyZWF0ZUNvbnRhaW5lcixcbiAgY3JlYXRlQmxvY2ssXG4gIGFkZEJsb2NrRXZlbnRzLFxuICBnZXROZXdQb3MsXG4gIGdldE9wdGlvbnMsXG4gIGNoZWNrUG9zLFxufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXBsdXNwbHVzICovXG5jb25zdCBHYW1lYm9hcmQgPSAoKSA9PiB7XG4gIGxldCBzaGlwcyA9IFtdO1xuICBsZXQgYWxsUG9zID0gW107XG4gIGNvbnN0IG1pc3NlZEhpdHMgPSBbXTtcbiAgY29uc3Qgc3Vua2VuID0gW107XG4gIGNvbnN0IGhpdHMgPSBbXTtcblxuICBjb25zdCBwbGFjZVNoaXAgPSAoc2hpcCkgPT4ge1xuICAgIHNoaXBzLnB1c2goc2hpcCk7XG4gICAgc3Vua2VuLnB1c2goJycpO1xuICB9O1xuXG4gIGNvbnN0IGdldE1pc3NlZEhpdHMgPSAoKSA9PiBtaXNzZWRIaXRzO1xuXG4gIGNvbnN0IGdldEhpdHMgPSAoKSA9PiBoaXRzO1xuXG4gIGNvbnN0IGNoZWNrU3Vua2VuID0gKHNoaXApID0+IHtcbiAgICBpZiAoc2hpcC5pc1N1bmsoKSkge1xuICAgICAgY29uc3QgaW5kZXggPSBzaGlwcy5pbmRleE9mKHNoaXApO1xuICAgICAgc3Vua2VuW2luZGV4XSA9ICd4JztcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IChjb29yZCkgPT4ge1xuICAgIGxldCBpc1NoaXBIaXQgPSBmYWxzZTtcbiAgICBzaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICBzaGlwLmdldFBvcygpLmZvckVhY2goKHBvc2l0aW9uKSA9PiB7XG4gICAgICAgIGlmIChwb3NpdGlvbiA9PT0gY29vcmQpIHtcbiAgICAgICAgICBpc1NoaXBIaXQgPSB0cnVlO1xuICAgICAgICAgIHNoaXAuaGl0KGNvb3JkKTtcbiAgICAgICAgICBoaXRzLnB1c2goY29vcmQpO1xuICAgICAgICAgIGNoZWNrU3Vua2VuKHNoaXApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGlmICghaXNTaGlwSGl0KSB7XG4gICAgICBoaXRzLnB1c2goY29vcmQpO1xuICAgICAgbWlzc2VkSGl0cy5wdXNoKGNvb3JkKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaXNTaGlwSGl0O1xuICB9O1xuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBjb25zdCBhcmVBbGxTdW5rZW4gPSAoKSA9PiB7XG4gICAgbGV0IGNvdW50ID0gMDtcbiAgICBzdW5rZW4uZm9yRWFjaCgobWFyaykgPT4ge1xuICAgICAgaWYgKG1hcmsgPT09ICd4Jykge1xuICAgICAgICBjb3VudCsrO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGNvdW50ID09PSBzaGlwcy5sZW5ndGg7XG4gIH07XG5cbiAgY29uc3QgdXBkYXRlQWxsUG9zID0gKCkgPT4ge1xuICAgIGFsbFBvcyA9IFtdO1xuICAgIHNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICAgIHNoaXAuZ2V0UG9zKCkuZm9yRWFjaCgocG9zKSA9PiB7XG4gICAgICAgIGFsbFBvcy5wdXNoKHBvcyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBnZXRBbGxQb3MgPSAoKSA9PiB7XG4gICAgdXBkYXRlQWxsUG9zKCk7XG4gICAgcmV0dXJuIGFsbFBvcztcbiAgfTtcblxuICBjb25zdCB3aXBlID0gKCkgPT4ge1xuICAgIHNoaXBzID0gW107XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBwbGFjZVNoaXAsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICBnZXRNaXNzZWRIaXRzLFxuICAgIGFyZUFsbFN1bmtlbixcbiAgICBnZXRIaXRzLFxuICAgIGdldEFsbFBvcyxcbiAgICB3aXBlLFxuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBHYW1lYm9hcmQ7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjb25zaXN0ZW50LXJldHVybiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tcGx1c3BsdXMgKi9cbmNvbnN0IEdhbWVib2FyZCA9IHJlcXVpcmUoJy4vZ2FtZWJvYXJkJyk7XG5cbmNvbnN0IFBsYXllciA9ICh0eXBlID0gJ2h1bWFuJykgPT4ge1xuICBjb25zdCBnYW1lYm9hcmQgPSBHYW1lYm9hcmQoKTtcbiAgY29uc3QgZ2V0V2luU3RhdHVzID0gKGVuZW15KSA9PiBlbmVteS5nYW1lYm9hcmQuYXJlQWxsU3Vua2VuKCk7XG5cbiAgY29uc3QgZ2V0UG9zID0gKHBvcykgPT4ge1xuICAgIC8vIGlmIHByZXZQb3MgaXMgdW5kZWZpbmVkLCBjaG9vc2UgcmFuZG9tIHBvc1xuICAgIC8vIGNoZWNrIGlmIHJhbmRvbSBwb3MgaXMgaGl0IG9yIG5vdFxuICAgIC8vIGlmIG5vdCBoaXQsIHJldHVybiBwb3NcbiAgICAvLyBpZiBoaXQsIGNob29zZSBhbm90aGVyIG9uZVxuICAgIGxldCBjaG9zZW5Qb3M7XG5cbiAgICBjb25zdCBnZXRSYW5kb21OdW0gPSAoKSA9PiB7XG4gICAgICBjb25zdCBtaW4gPSBNYXRoLmNlaWwoMCk7IC8vIGluY2x1c2l2ZVxuICAgICAgY29uc3QgbWF4ID0gTWF0aC5mbG9vcigxMDApOyAvLyBleGNsdXNpdmVcbiAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSArIG1pbik7XG4gICAgfTtcblxuICAgIGNvbnN0IGNoZWNrSWZBdmFpbCA9ICh0ZW1wUG9zKSA9PiAhZ2FtZWJvYXJkLmdldEhpdHMoKS5pbmNsdWRlcyh0ZW1wUG9zKTtcblxuICAgIGNvbnN0IGdldFJhbmRvbVBvcyA9ICgpID0+IHtcbiAgICAgIGxldCBhdmFpbDtcbiAgICAgIGxldCBuZXdQb3M7XG5cbiAgICAgIHdoaWxlICghYXZhaWwpIHtcbiAgICAgICAgbmV3UG9zID0gZ2V0UmFuZG9tTnVtKCk7XG4gICAgICAgIGF2YWlsID0gY2hlY2tJZkF2YWlsKG5ld1Bvcyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXdQb3M7XG4gICAgfTtcblxuICAgIGlmIChwb3MgPT09IG51bGwpIHtcbiAgICAgIGNob3NlblBvcyA9IGdldFJhbmRvbVBvcygpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBjaGVjayByYW5kb20gc3Vycm91bmRpbmcgcG9zIGlmIGhpdCB1bnRpbCB5b3UgZmluZCBhIHBvcyBhdmFpbGFibGVcbiAgICAgIC8vIGlmIHN1cnJvdW5kaW5nIHBvc2l0aW9ucyBhcmUgaGl0LCBwaWNrIGEgcmFuZG9tIHBvcyBpbnN0ZWFkXG4gICAgICBsZXQgYXZhaWwsIHRlbXBQb3M7XG5cbiAgICAgIGNvbnN0IGdldE5ld1BvcyA9IChpKSA9PiB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBkZWZhdWx0LWNhc2VcbiAgICAgICAgc3dpdGNoIChpKSB7XG4gICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgcmV0dXJuIHBvcyArIDE7XG4gICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgcmV0dXJuIHBvcyAtIDE7XG4gICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgcmV0dXJuIHBvcyArIDEwO1xuICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgIHJldHVybiBwb3MgLSAxMDtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgLy8gc2VsZWN0IHJhbmRvbWx5IGlmIG9uZSBvciB6ZXJvXG4gICAgICAvLyBpZiB6ZXJvLCBsb29wIGZyb20gbHRyXG4gICAgICAvLyBpZiBvbmUsIGxvb3AgZnJvbSBydGxcbiAgICAgIC8vIGV2ZXJ5IGxvb3AgY2hlY2sgaWYgY29vcmQgaXMgYXZhaWxhYmxlXG4gICAgICAvLyByZXR1cm4gaWYgYXZhaWxhYmxlXG4gICAgICAvLyBsb29wIDQgdGltZXNcbiAgICAgIC8vIGlmIHJlc3VsdGluZyBjb29yZCBpcyAxMDAsIGlnbm9yZSBpdFxuICAgICAgY29uc3QgcmFuZG9taXplciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpO1xuICAgICAgaWYgKHJhbmRvbWl6ZXIgPT09IDApIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgICAgICB0ZW1wUG9zID0gZ2V0TmV3UG9zKGkpO1xuICAgICAgICAgIGlmICh0ZW1wUG9zID09PSAxMDApIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGF2YWlsID0gY2hlY2tJZkF2YWlsKHRlbXBQb3MpO1xuICAgICAgICAgIGlmIChhdmFpbCkge1xuICAgICAgICAgICAgY2hvc2VuUG9zID0gdGVtcFBvcztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIWF2YWlsKSB7XG4gICAgICAgICAgY2hvc2VuUG9zID0gZ2V0UmFuZG9tUG9zKCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAzOyBpID49IDA7IGktLSkge1xuICAgICAgICAgIHRlbXBQb3MgPSBnZXROZXdQb3MoaSk7XG4gICAgICAgICAgYXZhaWwgPSBjaGVja0lmQXZhaWwodGVtcFBvcyk7XG4gICAgICAgICAgaWYgKGF2YWlsKSB7XG4gICAgICAgICAgICBjaG9zZW5Qb3MgPSB0ZW1wUG9zO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghYXZhaWwpIHtcbiAgICAgICAgICBjaG9zZW5Qb3MgPSBnZXRSYW5kb21Qb3MoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY2hvc2VuUG9zO1xuICB9O1xuXG4gIGNvbnN0IGF0dGFjayA9IChlbmVteSwgcG9zID0gbnVsbCkgPT4ge1xuICAgIGNvbnN0IGF0dFBvcyA9IHR5cGUgPT09ICdjb21wJyA/IGdldFBvcyhwb3MpIDogcG9zO1xuICAgIGNvbnN0IGlzSGl0ID0gZW5lbXkuZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soYXR0UG9zKTtcbiAgICBpZiAodHlwZSA9PT0gJ2NvbXAnKSB7XG4gICAgICByZXR1cm4geyBpc0hpdCwgaGl0UG9zOiBhdHRQb3MgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gaXNIaXQ7XG4gIH07XG5cbiAgcmV0dXJuIHsgZ2V0V2luU3RhdHVzLCBnYW1lYm9hcmQsIGF0dGFjaywgdHlwZSB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBQbGF5ZXI7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1wbHVzcGx1cyAqL1xuY29uc3QgU2hpcCA9IChsZW5ndGgsIHBvcykgPT4ge1xuICBjb25zdCBoaXRtYXJrcyA9IFtdO1xuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuICBjb25zdCBmaWxsSGl0cyA9ICgoKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaGl0bWFya3NbaV0gPSAnJztcbiAgICB9XG4gIH0pKCk7XG5cbiAgY29uc3QgaGl0ID0gKGhpdFBvcykgPT4ge1xuICAgIGNvbnN0IGluZGV4ID0gcG9zLmluZGV4T2YoaGl0UG9zKTtcbiAgICBoaXRtYXJrc1tpbmRleF0gPSAneCc7XG4gIH07XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbnNpc3RlbnQtcmV0dXJuXG4gIGNvbnN0IGlzU3VuayA9ICgpID0+IHtcbiAgICBsZXQgY291bnQgPSAwO1xuICAgIGhpdG1hcmtzLmZvckVhY2goKG1hcmspID0+IHtcbiAgICAgIGlmIChtYXJrID09PSAneCcpIHtcbiAgICAgICAgY291bnQrKztcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBjb3VudCA9PT0gbGVuZ3RoO1xuICB9O1xuXG4gIGNvbnN0IGNoYW5nZVBvcyA9IChuZXdQb3MpID0+IHtcbiAgICBwb3MgPSBuZXdQb3M7XG4gIH07XG5cbiAgY29uc3QgZ2V0TGVuZ3RoID0gKCkgPT4gbGVuZ3RoO1xuICBjb25zdCBnZXRQb3MgPSAoKSA9PiBwb3M7XG5cbiAgcmV0dXJuIHtcbiAgICBnZXRMZW5ndGgsXG4gICAgZ2V0UG9zLFxuICAgIGhpdCxcbiAgICBpc1N1bmssXG4gICAgY2hhbmdlUG9zLFxuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBTaGlwO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXBsdXNwbHVzICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuaW1wb3J0ICogYXMgZG9tIGZyb20gJy4vZG9tJztcbmltcG9ydCBTaGlwIGZyb20gJy4vZmFjdG9yaWVzL3NoaXAnO1xuaW1wb3J0IFBsYXllciBmcm9tICcuL2ZhY3Rvcmllcy9wbGF5ZXInO1xuXG4vLyBtYWluIGdhbWUgbG9vcFxuLy8gc3RhcnRzIHdpdGggY3JlYXRpbmcgcGxheWVycyAmIHBvcHVsYXRlIGVhY2ggZ2FtZWJvYXJkXG4vLyBjcmVhdGUgaHVtYW4gcGxheWVyICYgZ2FtZWJvYXJkIGZpcnN0XG4vLyBwbGFjZSBzaGlwcyBvbiBwbGF5ZXIgZ2FtZWJvYXJkXG4vLyBjcmVhdGUgY29tcCBwbGF5ZXIgJiBnYW1lYm9hcmRcbi8vIHBsYWNlIHNoaXBzIGluIHJhbmRvbSBwb3NpdGlvbiBpbiBlbmVteSBnYW1lYm9hcmRcbi8vIGRpc3BsYXkgYm90aCBnYW1lYm9hcmRzXG4vLyBnYW1lIGxvb3Agc2hvdWxkIHN0ZXAgdGhyb3VnaCB0aGUgZ2FtZSB0dXJuIGJ5IHR1cm5cbi8vIHVzaW5nIG9ubHkgZnVuY3Rpb24gaW5zaWRlIHRoZSBnYW1lIGxvb3Bcbi8vIGNyZWF0ZSBjb25kaXRpb25zIHNvIHRoYXQgdGhlIGdhbWUgZW5kcyBvbmNlXG4vLyBvbmUgcGxheWVyJ3Mgc2hpcHMgaGF2ZSBhbGwgYmVlbiBzdW5rXG5jb25zdCBnYW1lRnVuYyA9ICgoKSA9PiB7XG4gIGNvbnN0IGdlbmVyYXRlU2hpcHMgPSAocGxheWVyKSA9PiB7XG4gICAgY29uc3QgZ3JpZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ3JpZCcpO1xuICAgIGNvbnN0IHJhbmRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b246Zmlyc3Qtb2YtdHlwZScpO1xuXG4gICAgY29uc3QgY3JlYXRlUGxheWVyU2hpcHMgPSAoKSA9PiB7XG4gICAgICBsZXQgbGVuZ3RoID0gNDtcbiAgICAgIGxldCBjb3VudCA9IDE7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IGNvdW50OyBrKyspIHtcbiAgICAgICAgICBjb25zdCBibG9jayA9IGRvbS5jcmVhdGVCbG9jayhsZW5ndGgpO1xuICAgICAgICAgIGJsb2NrLmxlbmd0aCA9IGxlbmd0aDtcbiAgICAgICAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICAgICAgICBibG9jay5vcmllbnRhdGlvbiA9IGJsb2NrLnN0eWxlLndpZHRoLm1hdGNoKC9eLis/KD89cHgpLylbMF0gLyA0MC45MSA+IDFcbiAgICAgICAgICAgID8gJ2xhbmRzY2FwZSdcbiAgICAgICAgICAgIDogJ3BvcnRyYWl0JztcbiAgICAgICAgICBjb25zdCBvcHRpb25zID0gZG9tLmdldE9wdGlvbnMoYmxvY2spO1xuICAgICAgICAgIGxldCBhdmFpbCA9IGZhbHNlO1xuXG4gICAgICAgICAgd2hpbGUgKCFhdmFpbCkge1xuICAgICAgICAgICAgY29uc3QgcmFuZEluZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG9wdGlvbnMubGVuZ3RoKTtcbiAgICAgICAgICAgIGNvbnN0IHRlbXBQb3MgPSBkb20uZ2V0TmV3UG9zKGJsb2NrLCBvcHRpb25zW3JhbmRJbmRdKTtcbiAgICAgICAgICAgIGJsb2NrLnBvcyA9IHRlbXBQb3M7XG4gICAgICAgICAgICBhdmFpbCA9IGRvbS5jaGVja1BvcygnbmV3JywgcGxheWVyLCBibG9jay5wb3MpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBncmlkc1tibG9jay5wb3NbMF1dLmFwcGVuZENoaWxkKGJsb2NrKTtcbiAgICAgICAgICBjb25zdCBzaGlwID0gU2hpcChibG9jay5sZW5ndGgsIGJsb2NrLnBvcyk7XG4gICAgICAgICAgcGxheWVyLmdhbWVib2FyZC5wbGFjZVNoaXAoc2hpcCk7XG4gICAgICAgICAgZG9tLmFkZEJsb2NrRXZlbnRzKGJsb2NrLCBzaGlwLCBwbGF5ZXIpO1xuICAgICAgICB9XG4gICAgICAgIGxlbmd0aC0tO1xuICAgICAgICBjb3VudCsrO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBpZiAocGxheWVyLnR5cGUgPT09ICdodW1hbicpIHtcbiAgICAgIGNyZWF0ZVBsYXllclNoaXBzKCk7XG5cbiAgICAgIHJhbmRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGdyaWRzLmZvckVhY2goKGdyaWQpID0+IHtcbiAgICAgICAgICBncmlkLmlubmVySFRNTCA9ICcnO1xuICAgICAgICB9KTtcbiAgICAgICAgcGxheWVyLmdhbWVib2FyZC53aXBlKCk7XG4gICAgICAgIGNyZWF0ZVBsYXllclNoaXBzKCk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBpbml0ID0gKCgpID0+IHtcbiAgICBkb20uY3JlYXRlQ29udGFpbmVyKCk7XG4gICAgLy8gc2VwYXJhdGUgY2xhc3MgbmFtZSBmb3IgaHVtYW4gYW5kIGFpIGNvbnRhaW5lclxuICAgIGNvbnN0IGh1bWFuID0gUGxheWVyKCk7XG4gICAgY29uc3QgYWkgPSBQbGF5ZXIoJ2NvbXAnKTtcbiAgICBnZW5lcmF0ZVNoaXBzKGh1bWFuKTtcbiAgICBnZW5lcmF0ZVNoaXBzKGFpKTtcbiAgfSkoKTtcbn0pKCk7XG4iXSwibmFtZXMiOlsiY3JlYXRlQ29udGFpbmVyIiwiYWxwaExhYmVsIiwiY29udGFpbmVyIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiZ2FtZWJvYXJkIiwidG9wQ29udCIsInNpZGVDb250IiwiY2xhc3NMaXN0IiwiYWRkIiwicXVlcnlTZWxlY3RvciIsImFwcGVuZENoaWxkIiwiaSIsInNwYW4iLCJsZW5ndGgiLCJ0b3BTcGFuIiwidGV4dENvbnRlbnQiLCJzaWRlU3BhbiIsImNyZWF0ZUJsb2NrIiwic2l6ZSIsImJsb2NrIiwiZHJhZ2dhYmxlIiwicmFuZG9tIiwiTWF0aCIsImZsb29yIiwic3R5bGUiLCJ3aWR0aCIsImhlaWdodCIsImdldE9wdGlvbnMiLCJhcnIiLCJvcmllbnRhdGlvbiIsInB1c2giLCJsaW1pdHMiLCJudW1TdHIiLCJ0b1N0cmluZyIsImF2YWlsIiwiZm9yRWFjaCIsIm51bSIsImdldE5ld1BvcyIsInN0YXJ0aW5nUHQiLCJuZXdQb3MiLCJqIiwiY2hlY2tQb3MiLCJtb2RlIiwicGxheWVyIiwicG9zIiwib2xkUG9zIiwiZ2V0QWxsUG9zIiwic3BsaWNlIiwiaW5kZXhPZiIsIml0ZW0iLCJpbmNsdWRlcyIsImFkZEJsb2NrRXZlbnRzIiwic2hpcCIsIm9wdGlvbnMiLCJncmlkcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJkcmFnRW50ZXIiLCJlIiwicHJldmVudERlZmF1bHQiLCJ0YXJnZXQiLCJjb250YWlucyIsImRyYWdPdmVyIiwiZHJhZ0xlYXZlIiwicmVtb3ZlIiwiZHJvcCIsImRyYWdnZWQiLCJBcnJheSIsInByb3RvdHlwZSIsImNhbGwiLCJjaGFuZ2VQb3MiLCJncmlkIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImFkZEV2ZW50TGlzdGVuZXIiLCJzZXRUaW1lb3V0IiwiR2FtZWJvYXJkIiwic2hpcHMiLCJhbGxQb3MiLCJtaXNzZWRIaXRzIiwic3Vua2VuIiwiaGl0cyIsInBsYWNlU2hpcCIsImdldE1pc3NlZEhpdHMiLCJnZXRIaXRzIiwiY2hlY2tTdW5rZW4iLCJpc1N1bmsiLCJpbmRleCIsInJlY2VpdmVBdHRhY2siLCJjb29yZCIsImlzU2hpcEhpdCIsImdldFBvcyIsInBvc2l0aW9uIiwiaGl0IiwiYXJlQWxsU3Vua2VuIiwiY291bnQiLCJtYXJrIiwidXBkYXRlQWxsUG9zIiwid2lwZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJyZXF1aXJlIiwiUGxheWVyIiwidHlwZSIsImdldFdpblN0YXR1cyIsImVuZW15IiwiY2hvc2VuUG9zIiwiZ2V0UmFuZG9tTnVtIiwibWluIiwiY2VpbCIsIm1heCIsImNoZWNrSWZBdmFpbCIsInRlbXBQb3MiLCJnZXRSYW5kb21Qb3MiLCJyYW5kb21pemVyIiwiYXR0YWNrIiwiYXR0UG9zIiwiaXNIaXQiLCJoaXRQb3MiLCJTaGlwIiwiaGl0bWFya3MiLCJmaWxsSGl0cyIsImdldExlbmd0aCIsImRvbSIsImdhbWVGdW5jIiwiZ2VuZXJhdGVTaGlwcyIsInJhbmRCdG4iLCJjcmVhdGVQbGF5ZXJTaGlwcyIsImsiLCJtYXRjaCIsInJhbmRJbmQiLCJpbm5lckhUTUwiLCJpbml0IiwiaHVtYW4iLCJhaSJdLCJzb3VyY2VSb290IjoiIn0=