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
/* harmony export */   "addFuncs": () => (/* binding */ addFuncs),
/* harmony export */   "createBlock": () => (/* binding */ createBlock),
/* harmony export */   "createContainer": () => (/* binding */ createContainer)
/* harmony export */ });
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
  var random = Math.floor(Math.random() * 2); // change the appendable grids depending on length

  if (random === 1) {
    block.style.width = "".concat(size, "px");
    block.style.height = "".concat(size * length, "px");
  } else {
    block.style.width = "".concat(size * length, "px");
    block.style.height = "".concat(size, "px");
  }

  return block;
};

var addFuncs = function addFuncs(block, orientation) {
  // activate these functions during dragstart
  // get length of block that is being dragged
  // change drop targets according to length
  var grids = document.querySelectorAll('.grid');

  var dragEnter = function dragEnter(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');
  };

  var dragOver = function dragOver(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');
  };

  var dragLeave = function dragLeave(e) {
    e.target.classList.remove('drag-over');
  };

  var drop = function drop(e) {
    e.target.classList.remove('drag-over');
    var dragged = document.querySelector('.dragged');
    e.target.appendChild(dragged);
    dragged.classList.remove('hide');
    dragged.classList.remove('dragged');
  };

  grids.forEach(function (grid) {
    grid.addEventListener('dragenter', dragEnter);
    grid.addEventListener('dragover', dragOver);
    grid.addEventListener('dragleave', dragLeave);
    grid.addEventListener('drop', drop);
  });
  block.addEventListener('click', function () {
    var grid = block.parentNode;
    var index = Array.prototype.indexOf.call(grids, grid);
    var pos = [];

    for (var k = 0; // prettier-ignore
    k < Math.round((random === 1 ? block.offsetHeight : block.offsetWidth) / size); k++) {
      pos.push(index + (random === 1 ? k * 10 : k));
    }

    console.log(pos.join(', '));
  });
  block.addEventListener('dragstart', function (e) {
    // add drag properties to grid on dragstart
    // follow percentage below for grids allowed to be placed on
    // remove drag properties on grids after dropping
    // add checker so blocks won't overlap
    e.target.classList.add('dragged');
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

  var getAllPos = function getAllPos() {
    var arr = [];
    ships.forEach(function (ship) {
      ship.getPos().forEach(function (pos) {
        arr.push(pos);
      });
    });
    return arr;
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
    isSunk: isSunk
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
/* eslint-disable default-case */

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
  var checkAvailPos = function checkAvailPos(length, orientation) {
    var arr = [];

    if (orientation === 'portrait') {
      switch (length) {
        case 4:
          for (var i = 0; i < 70; i++) {
            arr.push(i);
          }

          break;

        case 3:
          for (var _i = 0; _i < 80; _i++) {
            arr.push(_i);
          }

          break;

        case 2:
          for (var _i2 = 0; _i2 < 90; _i2++) {
            arr.push(_i2);
          }

          break;

        case 1:
          for (var _i3 = 0; _i3 < 100; _i3++) {
            arr.push(_i3);
          }

          break;
      }
    } else {
      var limits;

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

      var _loop = function _loop(_i4) {
        var numStr = _i4.toString();

        var avail = true;
        limits.forEach(function (num) {
          if (_i4 === num || numStr[1] == num) {
            avail = false;
          }
        });

        if (avail) {
          arr.push(_i4);
        }
      };

      for (var _i4 = 0; _i4 < 100; _i4++) {
        _loop(_i4);
      }
    }

    return arr;
  };

  var createPlayerShips = function createPlayerShips(player) {
    var checkPos = function checkPos(pos) {
      var avail = true;
      pos.forEach(function (item) {
        if (player.gameboard.getAllPos().includes(item)) {
          avail = false;
        }
      });
      return avail;
    };

    if (player.type === 'human') {
      var grids = document.querySelectorAll('.grid');
      var length = 4;
      var count = 1;

      for (var i = 0; i < 4; i++) {
        for (var k = 0; k < count; k++) {
          var block = _dom__WEBPACK_IMPORTED_MODULE_0__.createBlock(length); // prettier-ignore

          var orientation = block.style.width.match(/^.+?(?=px)/)[0] / 40.91 > 1 ? 'landscape' : 'portrait';
          var options = checkAvailPos(length, orientation);
          var pos = void 0,
              avail = false;

          while (!avail) {
            var tempPos = [];
            var randInd = Math.floor(Math.random() * options.length);

            for (var j = 0; j < length; j++) {
              tempPos.push(options[randInd] + (orientation === 'portrait' ? j * 10 : j));
            }

            pos = tempPos;
            avail = checkPos(pos);
          }

          grids[pos[0]].appendChild(block);
          var ship = _factories_ship__WEBPACK_IMPORTED_MODULE_1___default()(length, pos);
          player.gameboard.placeShip(ship);
        }

        length--;
        count++;
      }
    }
  };

  var init = function () {
    _dom__WEBPACK_IMPORTED_MODULE_0__.createContainer();
    var human = _factories_player__WEBPACK_IMPORTED_MODULE_2___default()();
    var ai = _factories_player__WEBPACK_IMPORTED_MODULE_2___default()('comp');
    createPlayerShips(human);
    var grids = document.querySelectorAll('.grid');
    var randBtn = document.querySelector('button:first-of-type');
    randBtn.addEventListener('click', function () {
      grids.forEach(function (grid) {
        grid.innerHTML = '';
      });
      human.gameboard.wipe();
      createPlayerShips(human);
    });
  }();
}();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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anMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbWFpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wbHVzcGx1cyAqL1xuY29uc3QgY3JlYXRlQ29udGFpbmVyID0gKCkgPT4ge1xuICBjb25zdCBhbHBoTGFiZWwgPSBbJ0EnLCAnQicsICdDJywgJ0QnLCAnRScsICdGJywgJ0cnLCAnSCcsICdJJywgJ0onXTtcblxuICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29uc3QgZ2FtZWJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNvbnN0IHRvcENvbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29uc3Qgc2lkZUNvbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2NvbnRhaW5lcicpO1xuICBnYW1lYm9hcmQuY2xhc3NMaXN0LmFkZCgnZ2FtZWJvYXJkJyk7XG4gIHRvcENvbnQuY2xhc3NMaXN0LmFkZCgndG9wQ29udCcpO1xuICBzaWRlQ29udC5jbGFzc0xpc3QuYWRkKCdzaWRlQ29udCcpO1xuXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZ2FtZWJvYXJkKTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRvcENvbnQpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc2lkZUNvbnQpO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcbiAgICBjb25zdCBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIHNwYW4uY2xhc3NMaXN0LmFkZCgnZ3JpZCcpO1xuICAgIGdhbWVib2FyZC5hcHBlbmRDaGlsZChzcGFuKTtcbiAgfVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYWxwaExhYmVsLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgdG9wU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICB0b3BTcGFuLnRleHRDb250ZW50ID0gYWxwaExhYmVsW2ldO1xuICAgIHRvcENvbnQuYXBwZW5kQ2hpbGQodG9wU3Bhbik7XG5cbiAgICBjb25zdCBzaWRlU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBzaWRlU3Bhbi50ZXh0Q29udGVudCA9IGkgKyAxO1xuICAgIHNpZGVDb250LmFwcGVuZENoaWxkKHNpZGVTcGFuKTtcbiAgfVxufTtcblxuY29uc3QgY3JlYXRlQmxvY2sgPSAobGVuZ3RoKSA9PiB7XG4gIGNvbnN0IHNpemUgPSA0MC45MTtcbiAgY29uc3QgYmxvY2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgYmxvY2suY2xhc3NMaXN0LmFkZCgnZHJhZ2dhYmxlJyk7XG4gIGJsb2NrLmRyYWdnYWJsZSA9IHRydWU7XG4gIGNvbnN0IHJhbmRvbSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpO1xuICAvLyBjaGFuZ2UgdGhlIGFwcGVuZGFibGUgZ3JpZHMgZGVwZW5kaW5nIG9uIGxlbmd0aFxuICBpZiAocmFuZG9tID09PSAxKSB7XG4gICAgYmxvY2suc3R5bGUud2lkdGggPSBgJHtzaXplfXB4YDtcbiAgICBibG9jay5zdHlsZS5oZWlnaHQgPSBgJHtzaXplICogbGVuZ3RofXB4YDtcbiAgfSBlbHNlIHtcbiAgICBibG9jay5zdHlsZS53aWR0aCA9IGAke3NpemUgKiBsZW5ndGh9cHhgO1xuICAgIGJsb2NrLnN0eWxlLmhlaWdodCA9IGAke3NpemV9cHhgO1xuICB9XG5cbiAgcmV0dXJuIGJsb2NrO1xufTtcblxuY29uc3QgYWRkRnVuY3MgPSAoYmxvY2ssIG9yaWVudGF0aW9uKSA9PiB7XG4gIC8vIGFjdGl2YXRlIHRoZXNlIGZ1bmN0aW9ucyBkdXJpbmcgZHJhZ3N0YXJ0XG4gIC8vIGdldCBsZW5ndGggb2YgYmxvY2sgdGhhdCBpcyBiZWluZyBkcmFnZ2VkXG4gIC8vIGNoYW5nZSBkcm9wIHRhcmdldHMgYWNjb3JkaW5nIHRvIGxlbmd0aFxuICBjb25zdCBncmlkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ncmlkJyk7XG4gIGNvbnN0IGRyYWdFbnRlciA9IChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2RyYWctb3ZlcicpO1xuICB9O1xuXG4gIGNvbnN0IGRyYWdPdmVyID0gKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZCgnZHJhZy1vdmVyJyk7XG4gIH07XG5cbiAgY29uc3QgZHJhZ0xlYXZlID0gKGUpID0+IHtcbiAgICBlLnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnLW92ZXInKTtcbiAgfTtcblxuICBjb25zdCBkcm9wID0gKGUpID0+IHtcbiAgICBlLnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnLW92ZXInKTtcblxuICAgIGNvbnN0IGRyYWdnZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZHJhZ2dlZCcpO1xuXG4gICAgZS50YXJnZXQuYXBwZW5kQ2hpbGQoZHJhZ2dlZCk7XG4gICAgZHJhZ2dlZC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgZHJhZ2dlZC5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnZ2VkJyk7XG4gIH07XG5cbiAgZ3JpZHMuZm9yRWFjaCgoZ3JpZCkgPT4ge1xuICAgIGdyaWQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VudGVyJywgZHJhZ0VudGVyKTtcbiAgICBncmlkLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgZHJhZ092ZXIpO1xuICAgIGdyaWQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgZHJhZ0xlYXZlKTtcbiAgICBncmlkLmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCBkcm9wKTtcbiAgfSk7XG5cbiAgYmxvY2suYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgY29uc3QgZ3JpZCA9IGJsb2NrLnBhcmVudE5vZGU7XG4gICAgY29uc3QgaW5kZXggPSBBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKGdyaWRzLCBncmlkKTtcbiAgICBjb25zdCBwb3MgPSBbXTtcbiAgICBmb3IgKFxuICAgICAgbGV0IGsgPSAwO1xuICAgICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgICBrIDwgTWF0aC5yb3VuZChcbiAgICAgICAgKHJhbmRvbSA9PT0gMSA/IGJsb2NrLm9mZnNldEhlaWdodCA6IGJsb2NrLm9mZnNldFdpZHRoKSAvIHNpemVcbiAgICAgICk7XG4gICAgICBrKytcbiAgICApIHtcbiAgICAgIHBvcy5wdXNoKGluZGV4ICsgKHJhbmRvbSA9PT0gMSA/IGsgKiAxMCA6IGspKTtcbiAgICB9XG4gICAgY29uc29sZS5sb2cocG9zLmpvaW4oJywgJykpO1xuICB9KTtcblxuICBibG9jay5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCAoZSkgPT4ge1xuICAgIC8vIGFkZCBkcmFnIHByb3BlcnRpZXMgdG8gZ3JpZCBvbiBkcmFnc3RhcnRcbiAgICAvLyBmb2xsb3cgcGVyY2VudGFnZSBiZWxvdyBmb3IgZ3JpZHMgYWxsb3dlZCB0byBiZSBwbGFjZWQgb25cbiAgICAvLyByZW1vdmUgZHJhZyBwcm9wZXJ0aWVzIG9uIGdyaWRzIGFmdGVyIGRyb3BwaW5nXG4gICAgLy8gYWRkIGNoZWNrZXIgc28gYmxvY2tzIHdvbid0IG92ZXJsYXBcbiAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKCdkcmFnZ2VkJyk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgfSwgMCk7XG4gIH0pO1xufTtcblxuZXhwb3J0IHsgY3JlYXRlQ29udGFpbmVyLCBjcmVhdGVCbG9jaywgYWRkRnVuY3MgfTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXBsdXNwbHVzICovXG5jb25zdCBHYW1lYm9hcmQgPSAoKSA9PiB7XG4gIGxldCBzaGlwcyA9IFtdO1xuICBjb25zdCBtaXNzZWRIaXRzID0gW107XG4gIGNvbnN0IHN1bmtlbiA9IFtdO1xuICBjb25zdCBoaXRzID0gW107XG5cbiAgY29uc3QgcGxhY2VTaGlwID0gKHNoaXApID0+IHtcbiAgICBzaGlwcy5wdXNoKHNoaXApO1xuICAgIHN1bmtlbi5wdXNoKCcnKTtcbiAgfTtcblxuICBjb25zdCBnZXRNaXNzZWRIaXRzID0gKCkgPT4gbWlzc2VkSGl0cztcblxuICBjb25zdCBnZXRIaXRzID0gKCkgPT4gaGl0cztcblxuICBjb25zdCBjaGVja1N1bmtlbiA9IChzaGlwKSA9PiB7XG4gICAgaWYgKHNoaXAuaXNTdW5rKCkpIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gc2hpcHMuaW5kZXhPZihzaGlwKTtcbiAgICAgIHN1bmtlbltpbmRleF0gPSAneCc7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoY29vcmQpID0+IHtcbiAgICBsZXQgaXNTaGlwSGl0ID0gZmFsc2U7XG4gICAgc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgc2hpcC5nZXRQb3MoKS5mb3JFYWNoKChwb3NpdGlvbikgPT4ge1xuICAgICAgICBpZiAocG9zaXRpb24gPT09IGNvb3JkKSB7XG4gICAgICAgICAgaXNTaGlwSGl0ID0gdHJ1ZTtcbiAgICAgICAgICBzaGlwLmhpdChjb29yZCk7XG4gICAgICAgICAgaGl0cy5wdXNoKGNvb3JkKTtcbiAgICAgICAgICBjaGVja1N1bmtlbihzaGlwKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpZiAoIWlzU2hpcEhpdCkge1xuICAgICAgaGl0cy5wdXNoKGNvb3JkKTtcbiAgICAgIG1pc3NlZEhpdHMucHVzaChjb29yZCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGlzU2hpcEhpdDtcbiAgfTtcblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbiAgY29uc3QgYXJlQWxsU3Vua2VuID0gKCkgPT4ge1xuICAgIGxldCBjb3VudCA9IDA7XG4gICAgc3Vua2VuLmZvckVhY2goKG1hcmspID0+IHtcbiAgICAgIGlmIChtYXJrID09PSAneCcpIHtcbiAgICAgICAgY291bnQrKztcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBjb3VudCA9PT0gc2hpcHMubGVuZ3RoO1xuICB9O1xuXG4gIGNvbnN0IGdldEFsbFBvcyA9ICgpID0+IHtcbiAgICBjb25zdCBhcnIgPSBbXTtcbiAgICBzaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICBzaGlwLmdldFBvcygpLmZvckVhY2goKHBvcykgPT4ge1xuICAgICAgICBhcnIucHVzaChwb3MpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGFycjtcbiAgfTtcblxuICBjb25zdCB3aXBlID0gKCkgPT4ge1xuICAgIHNoaXBzID0gW107XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBwbGFjZVNoaXAsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICBnZXRNaXNzZWRIaXRzLFxuICAgIGFyZUFsbFN1bmtlbixcbiAgICBnZXRIaXRzLFxuICAgIGdldEFsbFBvcyxcbiAgICB3aXBlLFxuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBHYW1lYm9hcmQ7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjb25zaXN0ZW50LXJldHVybiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tcGx1c3BsdXMgKi9cbmNvbnN0IEdhbWVib2FyZCA9IHJlcXVpcmUoJy4vZ2FtZWJvYXJkJyk7XG5cbmNvbnN0IFBsYXllciA9ICh0eXBlID0gJ2h1bWFuJykgPT4ge1xuICBjb25zdCBnYW1lYm9hcmQgPSBHYW1lYm9hcmQoKTtcbiAgY29uc3QgZ2V0V2luU3RhdHVzID0gKGVuZW15KSA9PiBlbmVteS5nYW1lYm9hcmQuYXJlQWxsU3Vua2VuKCk7XG5cbiAgY29uc3QgZ2V0UG9zID0gKHBvcykgPT4ge1xuICAgIC8vIGlmIHByZXZQb3MgaXMgdW5kZWZpbmVkLCBjaG9vc2UgcmFuZG9tIHBvc1xuICAgIC8vIGNoZWNrIGlmIHJhbmRvbSBwb3MgaXMgaGl0IG9yIG5vdFxuICAgIC8vIGlmIG5vdCBoaXQsIHJldHVybiBwb3NcbiAgICAvLyBpZiBoaXQsIGNob29zZSBhbm90aGVyIG9uZVxuICAgIGxldCBjaG9zZW5Qb3M7XG5cbiAgICBjb25zdCBnZXRSYW5kb21OdW0gPSAoKSA9PiB7XG4gICAgICBjb25zdCBtaW4gPSBNYXRoLmNlaWwoMCk7IC8vIGluY2x1c2l2ZVxuICAgICAgY29uc3QgbWF4ID0gTWF0aC5mbG9vcigxMDApOyAvLyBleGNsdXNpdmVcbiAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSArIG1pbik7XG4gICAgfTtcblxuICAgIGNvbnN0IGNoZWNrSWZBdmFpbCA9ICh0ZW1wUG9zKSA9PiAhZ2FtZWJvYXJkLmdldEhpdHMoKS5pbmNsdWRlcyh0ZW1wUG9zKTtcblxuICAgIGNvbnN0IGdldFJhbmRvbVBvcyA9ICgpID0+IHtcbiAgICAgIGxldCBhdmFpbDtcbiAgICAgIGxldCBuZXdQb3M7XG5cbiAgICAgIHdoaWxlICghYXZhaWwpIHtcbiAgICAgICAgbmV3UG9zID0gZ2V0UmFuZG9tTnVtKCk7XG4gICAgICAgIGF2YWlsID0gY2hlY2tJZkF2YWlsKG5ld1Bvcyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXdQb3M7XG4gICAgfTtcblxuICAgIGlmIChwb3MgPT09IG51bGwpIHtcbiAgICAgIGNob3NlblBvcyA9IGdldFJhbmRvbVBvcygpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBjaGVjayByYW5kb20gc3Vycm91bmRpbmcgcG9zIGlmIGhpdCB1bnRpbCB5b3UgZmluZCBhIHBvcyBhdmFpbGFibGVcbiAgICAgIC8vIGlmIHN1cnJvdW5kaW5nIHBvc2l0aW9ucyBhcmUgaGl0LCBwaWNrIGEgcmFuZG9tIHBvcyBpbnN0ZWFkXG4gICAgICBsZXQgYXZhaWwsIHRlbXBQb3M7XG5cbiAgICAgIGNvbnN0IGdldE5ld1BvcyA9IChpKSA9PiB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBkZWZhdWx0LWNhc2VcbiAgICAgICAgc3dpdGNoIChpKSB7XG4gICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgcmV0dXJuIHBvcyArIDE7XG4gICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgcmV0dXJuIHBvcyAtIDE7XG4gICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgcmV0dXJuIHBvcyArIDEwO1xuICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgIHJldHVybiBwb3MgLSAxMDtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgLy8gc2VsZWN0IHJhbmRvbWx5IGlmIG9uZSBvciB6ZXJvXG4gICAgICAvLyBpZiB6ZXJvLCBsb29wIGZyb20gbHRyXG4gICAgICAvLyBpZiBvbmUsIGxvb3AgZnJvbSBydGxcbiAgICAgIC8vIGV2ZXJ5IGxvb3AgY2hlY2sgaWYgY29vcmQgaXMgYXZhaWxhYmxlXG4gICAgICAvLyByZXR1cm4gaWYgYXZhaWxhYmxlXG4gICAgICAvLyBsb29wIDQgdGltZXNcbiAgICAgIC8vIGlmIHJlc3VsdGluZyBjb29yZCBpcyAxMDAsIGlnbm9yZSBpdFxuICAgICAgY29uc3QgcmFuZG9taXplciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpO1xuICAgICAgaWYgKHJhbmRvbWl6ZXIgPT09IDApIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgICAgICB0ZW1wUG9zID0gZ2V0TmV3UG9zKGkpO1xuICAgICAgICAgIGlmICh0ZW1wUG9zID09PSAxMDApIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGF2YWlsID0gY2hlY2tJZkF2YWlsKHRlbXBQb3MpO1xuICAgICAgICAgIGlmIChhdmFpbCkge1xuICAgICAgICAgICAgY2hvc2VuUG9zID0gdGVtcFBvcztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIWF2YWlsKSB7XG4gICAgICAgICAgY2hvc2VuUG9zID0gZ2V0UmFuZG9tUG9zKCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAzOyBpID49IDA7IGktLSkge1xuICAgICAgICAgIHRlbXBQb3MgPSBnZXROZXdQb3MoaSk7XG4gICAgICAgICAgYXZhaWwgPSBjaGVja0lmQXZhaWwodGVtcFBvcyk7XG4gICAgICAgICAgaWYgKGF2YWlsKSB7XG4gICAgICAgICAgICBjaG9zZW5Qb3MgPSB0ZW1wUG9zO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghYXZhaWwpIHtcbiAgICAgICAgICBjaG9zZW5Qb3MgPSBnZXRSYW5kb21Qb3MoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY2hvc2VuUG9zO1xuICB9O1xuXG4gIGNvbnN0IGF0dGFjayA9IChlbmVteSwgcG9zID0gbnVsbCkgPT4ge1xuICAgIGNvbnN0IGF0dFBvcyA9IHR5cGUgPT09ICdjb21wJyA/IGdldFBvcyhwb3MpIDogcG9zO1xuICAgIGNvbnN0IGlzSGl0ID0gZW5lbXkuZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soYXR0UG9zKTtcbiAgICBpZiAodHlwZSA9PT0gJ2NvbXAnKSB7XG4gICAgICByZXR1cm4geyBpc0hpdCwgaGl0UG9zOiBhdHRQb3MgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gaXNIaXQ7XG4gIH07XG5cbiAgcmV0dXJuIHsgZ2V0V2luU3RhdHVzLCBnYW1lYm9hcmQsIGF0dGFjaywgdHlwZSB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBQbGF5ZXI7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1wbHVzcGx1cyAqL1xuY29uc3QgU2hpcCA9IChsZW5ndGgsIHBvcykgPT4ge1xuICBjb25zdCBoaXRtYXJrcyA9IFtdO1xuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuICBjb25zdCBmaWxsSGl0cyA9ICgoKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaGl0bWFya3NbaV0gPSAnJztcbiAgICB9XG4gIH0pKCk7XG5cbiAgY29uc3QgaGl0ID0gKGhpdFBvcykgPT4ge1xuICAgIGNvbnN0IGluZGV4ID0gcG9zLmluZGV4T2YoaGl0UG9zKTtcbiAgICBoaXRtYXJrc1tpbmRleF0gPSAneCc7XG4gIH07XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbnNpc3RlbnQtcmV0dXJuXG4gIGNvbnN0IGlzU3VuayA9ICgpID0+IHtcbiAgICBsZXQgY291bnQgPSAwO1xuICAgIGhpdG1hcmtzLmZvckVhY2goKG1hcmspID0+IHtcbiAgICAgIGlmIChtYXJrID09PSAneCcpIHtcbiAgICAgICAgY291bnQrKztcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBjb3VudCA9PT0gbGVuZ3RoO1xuICB9O1xuXG4gIGNvbnN0IGdldExlbmd0aCA9ICgpID0+IGxlbmd0aDtcbiAgY29uc3QgZ2V0UG9zID0gKCkgPT4gcG9zO1xuXG4gIHJldHVybiB7XG4gICAgZ2V0TGVuZ3RoLFxuICAgIGdldFBvcyxcbiAgICBoaXQsXG4gICAgaXNTdW5rLFxuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBTaGlwO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qIGVzbGludC1kaXNhYmxlIGRlZmF1bHQtY2FzZSAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tcGx1c3BsdXMgKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG5pbXBvcnQgKiBhcyBkb20gZnJvbSAnLi9kb20nO1xuaW1wb3J0IFNoaXAgZnJvbSAnLi9mYWN0b3JpZXMvc2hpcCc7XG5pbXBvcnQgUGxheWVyIGZyb20gJy4vZmFjdG9yaWVzL3BsYXllcic7XG5cbi8vIG1haW4gZ2FtZSBsb29wXG4vLyBzdGFydHMgd2l0aCBjcmVhdGluZyBwbGF5ZXJzICYgcG9wdWxhdGUgZWFjaCBnYW1lYm9hcmRcbi8vIGNyZWF0ZSBodW1hbiBwbGF5ZXIgJiBnYW1lYm9hcmQgZmlyc3Rcbi8vIHBsYWNlIHNoaXBzIG9uIHBsYXllciBnYW1lYm9hcmRcbi8vIGNyZWF0ZSBjb21wIHBsYXllciAmIGdhbWVib2FyZFxuLy8gcGxhY2Ugc2hpcHMgaW4gcmFuZG9tIHBvc2l0aW9uIGluIGVuZW15IGdhbWVib2FyZFxuLy8gZGlzcGxheSBib3RoIGdhbWVib2FyZHNcbi8vIGdhbWUgbG9vcCBzaG91bGQgc3RlcCB0aHJvdWdoIHRoZSBnYW1lIHR1cm4gYnkgdHVyblxuLy8gdXNpbmcgb25seSBmdW5jdGlvbiBpbnNpZGUgdGhlIGdhbWUgbG9vcFxuLy8gY3JlYXRlIGNvbmRpdGlvbnMgc28gdGhhdCB0aGUgZ2FtZSBlbmRzIG9uY2Vcbi8vIG9uZSBwbGF5ZXIncyBzaGlwcyBoYXZlIGFsbCBiZWVuIHN1bmtcbmNvbnN0IGdhbWVGdW5jID0gKCgpID0+IHtcbiAgY29uc3QgY2hlY2tBdmFpbFBvcyA9IChsZW5ndGgsIG9yaWVudGF0aW9uKSA9PiB7XG4gICAgY29uc3QgYXJyID0gW107XG4gICAgaWYgKG9yaWVudGF0aW9uID09PSAncG9ydHJhaXQnKSB7XG4gICAgICBzd2l0Y2ggKGxlbmd0aCkge1xuICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA3MDsgaSsrKSB7XG4gICAgICAgICAgICBhcnIucHVzaChpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDgwOyBpKyspIHtcbiAgICAgICAgICAgIGFyci5wdXNoKGkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgOTA7IGkrKykge1xuICAgICAgICAgICAgYXJyLnB1c2goaSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xuICAgICAgICAgICAgYXJyLnB1c2goaSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgbGltaXRzO1xuICAgICAgc3dpdGNoIChsZW5ndGgpIHtcbiAgICAgICAgY2FzZSA0OlxuICAgICAgICAgIGxpbWl0cyA9IFs3LCA4LCA5XTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgIGxpbWl0cyA9IFs4LCA5XTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgIGxpbWl0cyA9IFs5XTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcbiAgICAgICAgY29uc3QgbnVtU3RyID0gaS50b1N0cmluZygpO1xuICAgICAgICBsZXQgYXZhaWwgPSB0cnVlO1xuICAgICAgICBsaW1pdHMuZm9yRWFjaCgobnVtKSA9PiB7XG4gICAgICAgICAgaWYgKGkgPT09IG51bSB8fCBudW1TdHJbMV0gPT0gbnVtKSB7XG4gICAgICAgICAgICBhdmFpbCA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChhdmFpbCkge1xuICAgICAgICAgIGFyci5wdXNoKGkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhcnI7XG4gIH07XG5cbiAgY29uc3QgY3JlYXRlUGxheWVyU2hpcHMgPSAocGxheWVyKSA9PiB7XG4gICAgY29uc3QgY2hlY2tQb3MgPSAocG9zKSA9PiB7XG4gICAgICBsZXQgYXZhaWwgPSB0cnVlO1xuICAgICAgcG9zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgaWYgKHBsYXllci5nYW1lYm9hcmQuZ2V0QWxsUG9zKCkuaW5jbHVkZXMoaXRlbSkpIHtcbiAgICAgICAgICBhdmFpbCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBhdmFpbDtcbiAgICB9O1xuXG4gICAgaWYgKHBsYXllci50eXBlID09PSAnaHVtYW4nKSB7XG4gICAgICBjb25zdCBncmlkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ncmlkJyk7XG4gICAgICBsZXQgbGVuZ3RoID0gNDtcbiAgICAgIGxldCBjb3VudCA9IDE7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IGNvdW50OyBrKyspIHtcbiAgICAgICAgICBjb25zdCBibG9jayA9IGRvbS5jcmVhdGVCbG9jayhsZW5ndGgpO1xuICAgICAgICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgICAgICAgIGNvbnN0IG9yaWVudGF0aW9uID0gYmxvY2suc3R5bGUud2lkdGgubWF0Y2goL14uKz8oPz1weCkvKVswXSAvIDQwLjkxID4gMVxuICAgICAgICAgICAgPyAnbGFuZHNjYXBlJ1xuICAgICAgICAgICAgOiAncG9ydHJhaXQnO1xuICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSBjaGVja0F2YWlsUG9zKGxlbmd0aCwgb3JpZW50YXRpb24pO1xuICAgICAgICAgIGxldCBwb3MsXG4gICAgICAgICAgICBhdmFpbCA9IGZhbHNlO1xuXG4gICAgICAgICAgd2hpbGUgKCFhdmFpbCkge1xuICAgICAgICAgICAgY29uc3QgdGVtcFBvcyA9IFtdO1xuICAgICAgICAgICAgY29uc3QgcmFuZEluZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG9wdGlvbnMubGVuZ3RoKTtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgdGVtcFBvcy5wdXNoKFxuICAgICAgICAgICAgICAgIG9wdGlvbnNbcmFuZEluZF0gKyAob3JpZW50YXRpb24gPT09ICdwb3J0cmFpdCcgPyBqICogMTAgOiBqKVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcG9zID0gdGVtcFBvcztcbiAgICAgICAgICAgIGF2YWlsID0gY2hlY2tQb3MocG9zKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZ3JpZHNbcG9zWzBdXS5hcHBlbmRDaGlsZChibG9jayk7XG4gICAgICAgICAgY29uc3Qgc2hpcCA9IFNoaXAobGVuZ3RoLCBwb3MpO1xuICAgICAgICAgIHBsYXllci5nYW1lYm9hcmQucGxhY2VTaGlwKHNoaXApO1xuICAgICAgICB9XG4gICAgICAgIGxlbmd0aC0tO1xuICAgICAgICBjb3VudCsrO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCBpbml0ID0gKCgpID0+IHtcbiAgICBkb20uY3JlYXRlQ29udGFpbmVyKCk7XG4gICAgY29uc3QgaHVtYW4gPSBQbGF5ZXIoKTtcbiAgICBjb25zdCBhaSA9IFBsYXllcignY29tcCcpO1xuICAgIGNyZWF0ZVBsYXllclNoaXBzKGh1bWFuKTtcblxuICAgIGNvbnN0IGdyaWRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdyaWQnKTtcbiAgICBjb25zdCByYW5kQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uOmZpcnN0LW9mLXR5cGUnKTtcbiAgICByYW5kQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgZ3JpZHMuZm9yRWFjaCgoZ3JpZCkgPT4ge1xuICAgICAgICBncmlkLmlubmVySFRNTCA9ICcnO1xuICAgICAgfSk7XG4gICAgICBodW1hbi5nYW1lYm9hcmQud2lwZSgpO1xuICAgICAgY3JlYXRlUGxheWVyU2hpcHMoaHVtYW4pO1xuICAgIH0pO1xuICB9KSgpO1xufSkoKTtcbiJdLCJuYW1lcyI6WyJjcmVhdGVDb250YWluZXIiLCJhbHBoTGFiZWwiLCJjb250YWluZXIiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJnYW1lYm9hcmQiLCJ0b3BDb250Iiwic2lkZUNvbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJxdWVyeVNlbGVjdG9yIiwiYXBwZW5kQ2hpbGQiLCJpIiwic3BhbiIsImxlbmd0aCIsInRvcFNwYW4iLCJ0ZXh0Q29udGVudCIsInNpZGVTcGFuIiwiY3JlYXRlQmxvY2siLCJzaXplIiwiYmxvY2siLCJkcmFnZ2FibGUiLCJyYW5kb20iLCJNYXRoIiwiZmxvb3IiLCJzdHlsZSIsIndpZHRoIiwiaGVpZ2h0IiwiYWRkRnVuY3MiLCJvcmllbnRhdGlvbiIsImdyaWRzIiwicXVlcnlTZWxlY3RvckFsbCIsImRyYWdFbnRlciIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInRhcmdldCIsImRyYWdPdmVyIiwiZHJhZ0xlYXZlIiwicmVtb3ZlIiwiZHJvcCIsImRyYWdnZWQiLCJmb3JFYWNoIiwiZ3JpZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJwYXJlbnROb2RlIiwiaW5kZXgiLCJBcnJheSIsInByb3RvdHlwZSIsImluZGV4T2YiLCJjYWxsIiwicG9zIiwiayIsInJvdW5kIiwib2Zmc2V0SGVpZ2h0Iiwib2Zmc2V0V2lkdGgiLCJwdXNoIiwiY29uc29sZSIsImxvZyIsImpvaW4iLCJzZXRUaW1lb3V0IiwiR2FtZWJvYXJkIiwic2hpcHMiLCJtaXNzZWRIaXRzIiwic3Vua2VuIiwiaGl0cyIsInBsYWNlU2hpcCIsInNoaXAiLCJnZXRNaXNzZWRIaXRzIiwiZ2V0SGl0cyIsImNoZWNrU3Vua2VuIiwiaXNTdW5rIiwicmVjZWl2ZUF0dGFjayIsImNvb3JkIiwiaXNTaGlwSGl0IiwiZ2V0UG9zIiwicG9zaXRpb24iLCJoaXQiLCJhcmVBbGxTdW5rZW4iLCJjb3VudCIsIm1hcmsiLCJnZXRBbGxQb3MiLCJhcnIiLCJ3aXBlIiwibW9kdWxlIiwiZXhwb3J0cyIsInJlcXVpcmUiLCJQbGF5ZXIiLCJ0eXBlIiwiZ2V0V2luU3RhdHVzIiwiZW5lbXkiLCJjaG9zZW5Qb3MiLCJnZXRSYW5kb21OdW0iLCJtaW4iLCJjZWlsIiwibWF4IiwiY2hlY2tJZkF2YWlsIiwidGVtcFBvcyIsImluY2x1ZGVzIiwiZ2V0UmFuZG9tUG9zIiwiYXZhaWwiLCJuZXdQb3MiLCJnZXROZXdQb3MiLCJyYW5kb21pemVyIiwiYXR0YWNrIiwiYXR0UG9zIiwiaXNIaXQiLCJoaXRQb3MiLCJTaGlwIiwiaGl0bWFya3MiLCJmaWxsSGl0cyIsImdldExlbmd0aCIsImRvbSIsImdhbWVGdW5jIiwiY2hlY2tBdmFpbFBvcyIsImxpbWl0cyIsIm51bVN0ciIsInRvU3RyaW5nIiwibnVtIiwiY3JlYXRlUGxheWVyU2hpcHMiLCJwbGF5ZXIiLCJjaGVja1BvcyIsIml0ZW0iLCJtYXRjaCIsIm9wdGlvbnMiLCJyYW5kSW5kIiwiaiIsImluaXQiLCJodW1hbiIsImFpIiwicmFuZEJ0biIsImlubmVySFRNTCJdLCJzb3VyY2VSb290IjoiIn0=