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
/* harmony export */   "createBlocks": () => (/* binding */ createBlocks),
/* harmony export */   "createContainer": () => (/* binding */ createContainer)
/* harmony export */ });
/* eslint-disable no-console */

/* eslint-disable no-plusplus */
function createContainer() {
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

  var grids = document.querySelectorAll('.gameboard > span');
  grids.forEach(function (grid) {
    grid.addEventListener('dragenter', dragEnter);
    grid.addEventListener('dragover', dragOver);
    grid.addEventListener('dragleave', dragLeave);
    grid.addEventListener('drop', drop);
  });
}

function createBlocks() {
  var block = document.createElement('div');
  var btn = document.querySelector('button');
  block.classList.add('draggable');
  var grids = document.querySelectorAll('.grid');
  grids[Math.floor(Math.random() * 100)].appendChild(block);
  block.draggable = true; // randomize either height or width gets multiplied instead of rotating
  // length 4, vertical, left 0 - 90%; top 0 - 60%
  // length 3, vertical, left 0 - 90%, top 0 - 70%
  // length 2, vertical, left 0 - 90%, top 0 - 80%
  // length 4, horizontal, left 0 - 60%, top 0 - 90%
  // length 3, horizontal, left 0 - 70%, top 0 - 90%
  // length 2, horizontal, left 0 - 80%, top 0 - 90%
  // length 1, left 0 - 90%, top 0 - 90%

  var min = Math.ceil(1); // inclusive

  var max = Math.floor(8); // exclusive
  // block.style.left = '10%'; // `${Math.floor(Math.random() * (max - min) + min) * 10}%`;
  // block.style.top = '70%'; // `${Math.floor(Math.random() * (max - min) + min) * 10}%`;

  block.addEventListener('dragstart', function (e) {
    e.target.classList.add('dragged');
    setTimeout(function () {
      e.target.classList.add('hide');
    }, 0);
  });
  btn.addEventListener('click', function () {
    var pos = block.getBoundingClientRect();
    var width = Math.ceil(pos.width / 40.91);
    var height = Math.ceil(pos.height / 40.91);
    var posTop = Math.floor(pos.top / 40.91) - 1;
    var posLeft = Math.floor(pos.left / 40.91) - 7;

    if (width > 1 || height > 1) {
      if (height > 1) {
        for (var i = 0; i < height; i++) {
          console.log(posLeft, posTop + i);
        }
      } else if (width > 1) {
        for (var _i2 = 0; _i2 < width; _i2++) {
          console.log(posLeft + _i2, posTop);
        }
      }
    } else {
      console.log(posLeft, posTop);
    }
  });
}



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

  return {
    placeShip: placeShip,
    receiveAttack: receiveAttack,
    getMissedHits: getMissedHits,
    areAllSunken: areAllSunken,
    getHits: getHits
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

  var getCoord = function getCoord(coord) {
    // if prevCoord is undefined, choose random coord
    // check if random coord is hit or not
    // if not hit, return coord
    // if hit, choose another one
    var chosenCoord;

    var getRandomNum = function getRandomNum() {
      var min = Math.ceil(1); // inclusive

      var max = Math.floor(11); // exclusive

      return Math.floor(Math.random() * (max - min) + min);
    };

    var checkIfAvail = function checkIfAvail(tempCoord) {
      return !gameboard.getHits().includes(tempCoord);
    };

    var getRandomCoord = function getRandomCoord() {
      var avail;
      var newCoord;

      while (!avail) {
        newCoord = "(".concat(getRandomNum(), ", ").concat(getRandomNum(), ")");
        avail = checkIfAvail(newCoord);
      }

      return newCoord;
    };

    if (coord === null) {
      chosenCoord = getRandomCoord();
    } else {
      // get both row and col numbers
      // if 10, only decrease either row or col by 1 and check if hit
      // if not, either add or subtract 1 from row or col
      // check random surrounding coord if hit until you find a coord available
      // if surrounding coords are hit, pick a random coord instead
      var selection = [coord[1], coord[4]];
      var avail, tempCoord;

      var getFormat = function getFormat(i) {
        // eslint-disable-next-line default-case
        switch (i) {
          case 0:
            return "(".concat(selection[0], ", ").concat(Number(selection[1]) + 1, ")");

          case 1:
            return "(".concat(selection[0], ", ").concat(Number(selection[1]) - 1, ")");

          case 2:
            return "(".concat(Number(selection[0]) + 1, ", ").concat(selection[1], ")");

          case 3:
            return "(".concat(Number(selection[0]) - 1, ", ").concat(selection[1], ")");
        }
      }; // select randomly if one or zero
      // if zero, loop from ltr
      // if one, loop from rtl
      // every loop check if coord is available
      // return if available
      // loop 4 times
      // if resulting coord is 11, ignore it


      var randomizer = Math.floor(Math.random() * 2);

      if (randomizer === 0) {
        for (var i = 0; i < 4; i++) {
          tempCoord = getFormat(i);

          if (tempCoord[1] === 11 || tempCoord[4] === 11) {
            continue;
          }

          avail = checkIfAvail(tempCoord);

          if (avail) {
            chosenCoord = tempCoord;
            break;
          }
        }

        if (!avail) {
          chosenCoord = getRandomCoord();
        }
      } else {
        for (var _i = 3; _i >= 0; _i--) {
          tempCoord = getFormat(_i);
          avail = checkIfAvail(tempCoord);

          if (avail) {
            chosenCoord = tempCoord;
            break;
          }
        }

        if (!avail) {
          chosenCoord = getRandomCoord();
        }
      }
    }

    return chosenCoord;
  };

  var attack = function attack(enemy) {
    var coord = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var attCoord = type === 'comp' ? getCoord(coord) : coord;
    var isHit = enemy.gameboard.receiveAttack(attCoord);

    if (type === 'comp') {
      return {
        isHit: isHit,
        hitCoord: attCoord
      };
    }

    return isHit;
  };

  return {
    getWinStatus: getWinStatus,
    gameboard: gameboard,
    attack: attack
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

  var hit = function hit(coord) {
    var index = pos.indexOf(coord);
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



window.addEventListener('load', function () {
  (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createContainer)();
  (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createBlocks)();
}); // main game loop
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

var gameLoop = function () {
  var ai = _factories_player__WEBPACK_IMPORTED_MODULE_2___default()('comp');
  var human = _factories_player__WEBPACK_IMPORTED_MODULE_2___default()();
}();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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d0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFFQUksTUFBTSxDQUFDekUsZ0JBQVAsQ0FBd0IsTUFBeEIsRUFBZ0MsWUFBTTtFQUNwQy9CLHFEQUFlO0VBQ2ZnQyxrREFBWTtBQUNiLENBSEQsR0FLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLElBQU15RSxRQUFRLEdBQUksWUFBTTtFQUN0QixJQUFNQyxFQUFFLEdBQUczQix3REFBTSxDQUFDLE1BQUQsQ0FBakI7RUFDQSxJQUFNNEIsS0FBSyxHQUFHNUIsd0RBQU0sRUFBcEI7QUFDRCxDQUhnQixFQUFqQixDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbWFpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wbHVzcGx1cyAqL1xuZnVuY3Rpb24gY3JlYXRlQ29udGFpbmVyKCkge1xuICBjb25zdCBhbHBoTGFiZWwgPSBbJ0EnLCAnQicsICdDJywgJ0QnLCAnRScsICdGJywgJ0cnLCAnSCcsICdJJywgJ0onXTtcblxuICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29uc3QgZ2FtZWJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNvbnN0IHRvcENvbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29uc3Qgc2lkZUNvbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2NvbnRhaW5lcicpO1xuICBnYW1lYm9hcmQuY2xhc3NMaXN0LmFkZCgnZ2FtZWJvYXJkJyk7XG4gIHRvcENvbnQuY2xhc3NMaXN0LmFkZCgndG9wQ29udCcpO1xuICBzaWRlQ29udC5jbGFzc0xpc3QuYWRkKCdzaWRlQ29udCcpO1xuXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZ2FtZWJvYXJkKTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRvcENvbnQpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc2lkZUNvbnQpO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcbiAgICBjb25zdCBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIHNwYW4uY2xhc3NMaXN0LmFkZCgnZ3JpZCcpO1xuICAgIGdhbWVib2FyZC5hcHBlbmRDaGlsZChzcGFuKTtcbiAgfVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYWxwaExhYmVsLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgdG9wU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICB0b3BTcGFuLnRleHRDb250ZW50ID0gYWxwaExhYmVsW2ldO1xuICAgIHRvcENvbnQuYXBwZW5kQ2hpbGQodG9wU3Bhbik7XG5cbiAgICBjb25zdCBzaWRlU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBzaWRlU3Bhbi50ZXh0Q29udGVudCA9IGkgKyAxO1xuICAgIHNpZGVDb250LmFwcGVuZENoaWxkKHNpZGVTcGFuKTtcbiAgfVxuXG4gIGNvbnN0IGRyYWdFbnRlciA9IChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2RyYWctb3ZlcicpO1xuICB9O1xuXG4gIGNvbnN0IGRyYWdPdmVyID0gKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZCgnZHJhZy1vdmVyJyk7XG4gIH07XG5cbiAgY29uc3QgZHJhZ0xlYXZlID0gKGUpID0+IHtcbiAgICBlLnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnLW92ZXInKTtcbiAgfTtcblxuICBjb25zdCBkcm9wID0gKGUpID0+IHtcbiAgICBlLnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnLW92ZXInKTtcblxuICAgIGNvbnN0IGRyYWdnZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZHJhZ2dlZCcpO1xuXG4gICAgZS50YXJnZXQuYXBwZW5kQ2hpbGQoZHJhZ2dlZCk7XG4gICAgZHJhZ2dlZC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgZHJhZ2dlZC5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnZ2VkJyk7XG4gIH07XG5cbiAgY29uc3QgZ3JpZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ2FtZWJvYXJkID4gc3BhbicpO1xuICBncmlkcy5mb3JFYWNoKChncmlkKSA9PiB7XG4gICAgZ3JpZC5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW50ZXInLCBkcmFnRW50ZXIpO1xuICAgIGdyaWQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCBkcmFnT3Zlcik7XG4gICAgZ3JpZC5hZGRFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCBkcmFnTGVhdmUpO1xuICAgIGdyaWQuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIGRyb3ApO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQmxvY2tzKCkge1xuICBjb25zdCBibG9jayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb25zdCBidG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b24nKTtcbiAgYmxvY2suY2xhc3NMaXN0LmFkZCgnZHJhZ2dhYmxlJyk7XG4gIGNvbnN0IGdyaWRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdyaWQnKTtcbiAgZ3JpZHNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKV0uYXBwZW5kQ2hpbGQoYmxvY2spO1xuXG4gIGJsb2NrLmRyYWdnYWJsZSA9IHRydWU7XG4gIC8vIHJhbmRvbWl6ZSBlaXRoZXIgaGVpZ2h0IG9yIHdpZHRoIGdldHMgbXVsdGlwbGllZCBpbnN0ZWFkIG9mIHJvdGF0aW5nXG4gIC8vIGxlbmd0aCA0LCB2ZXJ0aWNhbCwgbGVmdCAwIC0gOTAlOyB0b3AgMCAtIDYwJVxuICAvLyBsZW5ndGggMywgdmVydGljYWwsIGxlZnQgMCAtIDkwJSwgdG9wIDAgLSA3MCVcbiAgLy8gbGVuZ3RoIDIsIHZlcnRpY2FsLCBsZWZ0IDAgLSA5MCUsIHRvcCAwIC0gODAlXG4gIC8vIGxlbmd0aCA0LCBob3Jpem9udGFsLCBsZWZ0IDAgLSA2MCUsIHRvcCAwIC0gOTAlXG4gIC8vIGxlbmd0aCAzLCBob3Jpem9udGFsLCBsZWZ0IDAgLSA3MCUsIHRvcCAwIC0gOTAlXG4gIC8vIGxlbmd0aCAyLCBob3Jpem9udGFsLCBsZWZ0IDAgLSA4MCUsIHRvcCAwIC0gOTAlXG4gIC8vIGxlbmd0aCAxLCBsZWZ0IDAgLSA5MCUsIHRvcCAwIC0gOTAlXG4gIGNvbnN0IG1pbiA9IE1hdGguY2VpbCgxKTsgLy8gaW5jbHVzaXZlXG4gIGNvbnN0IG1heCA9IE1hdGguZmxvb3IoOCk7IC8vIGV4Y2x1c2l2ZVxuICAvLyBibG9jay5zdHlsZS5sZWZ0ID0gJzEwJSc7IC8vIGAke01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluKSAqIDEwfSVgO1xuICAvLyBibG9jay5zdHlsZS50b3AgPSAnNzAlJzsgLy8gYCR7TWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKyBtaW4pICogMTB9JWA7XG5cbiAgYmxvY2suYWRkRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgKGUpID0+IHtcbiAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKCdkcmFnZ2VkJyk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgfSwgMCk7XG4gIH0pO1xuXG4gIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBjb25zdCBwb3MgPSBibG9jay5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCB3aWR0aCA9IE1hdGguY2VpbChwb3Mud2lkdGggLyA0MC45MSk7XG4gICAgY29uc3QgaGVpZ2h0ID0gTWF0aC5jZWlsKHBvcy5oZWlnaHQgLyA0MC45MSk7XG4gICAgY29uc3QgcG9zVG9wID0gTWF0aC5mbG9vcihwb3MudG9wIC8gNDAuOTEpIC0gMTtcbiAgICBjb25zdCBwb3NMZWZ0ID0gTWF0aC5mbG9vcihwb3MubGVmdCAvIDQwLjkxKSAtIDc7XG5cbiAgICBpZiAod2lkdGggPiAxIHx8IGhlaWdodCA+IDEpIHtcbiAgICAgIGlmIChoZWlnaHQgPiAxKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaGVpZ2h0OyBpKyspIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhwb3NMZWZ0LCBwb3NUb3AgKyBpKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh3aWR0aCA+IDEpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3aWR0aDsgaSsrKSB7XG4gICAgICAgICAgY29uc29sZS5sb2cocG9zTGVmdCArIGksIHBvc1RvcCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2cocG9zTGVmdCwgcG9zVG9wKTtcbiAgICB9XG4gIH0pO1xufVxuXG5leHBvcnQgeyBjcmVhdGVDb250YWluZXIsIGNyZWF0ZUJsb2NrcyB9O1xuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tcGx1c3BsdXMgKi9cbmNvbnN0IEdhbWVib2FyZCA9ICgpID0+IHtcbiAgY29uc3Qgc2hpcHMgPSBbXTtcbiAgY29uc3QgbWlzc2VkSGl0cyA9IFtdO1xuICBjb25zdCBzdW5rZW4gPSBbXTtcbiAgY29uc3QgaGl0cyA9IFtdO1xuXG4gIGNvbnN0IHBsYWNlU2hpcCA9IChzaGlwKSA9PiB7XG4gICAgc2hpcHMucHVzaChzaGlwKTtcbiAgICBzdW5rZW4ucHVzaCgnJyk7XG4gIH07XG5cbiAgY29uc3QgZ2V0TWlzc2VkSGl0cyA9ICgpID0+IG1pc3NlZEhpdHM7XG5cbiAgY29uc3QgZ2V0SGl0cyA9ICgpID0+IGhpdHM7XG5cbiAgY29uc3QgY2hlY2tTdW5rZW4gPSAoc2hpcCkgPT4ge1xuICAgIGlmIChzaGlwLmlzU3VuaygpKSB7XG4gICAgICBjb25zdCBpbmRleCA9IHNoaXBzLmluZGV4T2Yoc2hpcCk7XG4gICAgICBzdW5rZW5baW5kZXhdID0gJ3gnO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKGNvb3JkKSA9PiB7XG4gICAgbGV0IGlzU2hpcEhpdCA9IGZhbHNlO1xuICAgIHNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICAgIHNoaXAuZ2V0UG9zKCkuZm9yRWFjaCgocG9zaXRpb24pID0+IHtcbiAgICAgICAgaWYgKHBvc2l0aW9uID09PSBjb29yZCkge1xuICAgICAgICAgIGlzU2hpcEhpdCA9IHRydWU7XG4gICAgICAgICAgc2hpcC5oaXQoY29vcmQpO1xuICAgICAgICAgIGhpdHMucHVzaChjb29yZCk7XG4gICAgICAgICAgY2hlY2tTdW5rZW4oc2hpcCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaWYgKCFpc1NoaXBIaXQpIHtcbiAgICAgIGhpdHMucHVzaChjb29yZCk7XG4gICAgICBtaXNzZWRIaXRzLnB1c2goY29vcmQpO1xuICAgIH1cblxuICAgIHJldHVybiBpc1NoaXBIaXQ7XG4gIH07XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbnNpc3RlbnQtcmV0dXJuXG4gIGNvbnN0IGFyZUFsbFN1bmtlbiA9ICgpID0+IHtcbiAgICBsZXQgY291bnQgPSAwO1xuICAgIHN1bmtlbi5mb3JFYWNoKChtYXJrKSA9PiB7XG4gICAgICBpZiAobWFyayA9PT0gJ3gnKSB7XG4gICAgICAgIGNvdW50Kys7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gY291bnQgPT09IHNoaXBzLmxlbmd0aDtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIHBsYWNlU2hpcCxcbiAgICByZWNlaXZlQXR0YWNrLFxuICAgIGdldE1pc3NlZEhpdHMsXG4gICAgYXJlQWxsU3Vua2VuLFxuICAgIGdldEhpdHMsXG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEdhbWVib2FyZDtcbiIsIi8qIGVzbGludC1kaXNhYmxlIGNvbnNpc3RlbnQtcmV0dXJuICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wbHVzcGx1cyAqL1xuY29uc3QgR2FtZWJvYXJkID0gcmVxdWlyZSgnLi9nYW1lYm9hcmQnKTtcblxuY29uc3QgUGxheWVyID0gKHR5cGUgPSAnaHVtYW4nKSA9PiB7XG4gIGNvbnN0IGdhbWVib2FyZCA9IEdhbWVib2FyZCgpO1xuICBjb25zdCBnZXRXaW5TdGF0dXMgPSAoZW5lbXkpID0+IGVuZW15LmdhbWVib2FyZC5hcmVBbGxTdW5rZW4oKTtcblxuICBjb25zdCBnZXRDb29yZCA9IChjb29yZCkgPT4ge1xuICAgIC8vIGlmIHByZXZDb29yZCBpcyB1bmRlZmluZWQsIGNob29zZSByYW5kb20gY29vcmRcbiAgICAvLyBjaGVjayBpZiByYW5kb20gY29vcmQgaXMgaGl0IG9yIG5vdFxuICAgIC8vIGlmIG5vdCBoaXQsIHJldHVybiBjb29yZFxuICAgIC8vIGlmIGhpdCwgY2hvb3NlIGFub3RoZXIgb25lXG4gICAgbGV0IGNob3NlbkNvb3JkO1xuXG4gICAgY29uc3QgZ2V0UmFuZG9tTnVtID0gKCkgPT4ge1xuICAgICAgY29uc3QgbWluID0gTWF0aC5jZWlsKDEpOyAvLyBpbmNsdXNpdmVcbiAgICAgIGNvbnN0IG1heCA9IE1hdGguZmxvb3IoMTEpOyAvLyBleGNsdXNpdmVcbiAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSArIG1pbik7XG4gICAgfTtcblxuICAgIGNvbnN0IGNoZWNrSWZBdmFpbCA9ICh0ZW1wQ29vcmQpID0+XG4gICAgICAhZ2FtZWJvYXJkLmdldEhpdHMoKS5pbmNsdWRlcyh0ZW1wQ29vcmQpO1xuXG4gICAgY29uc3QgZ2V0UmFuZG9tQ29vcmQgPSAoKSA9PiB7XG4gICAgICBsZXQgYXZhaWw7XG4gICAgICBsZXQgbmV3Q29vcmQ7XG5cbiAgICAgIHdoaWxlICghYXZhaWwpIHtcbiAgICAgICAgbmV3Q29vcmQgPSBgKCR7Z2V0UmFuZG9tTnVtKCl9LCAke2dldFJhbmRvbU51bSgpfSlgO1xuICAgICAgICBhdmFpbCA9IGNoZWNrSWZBdmFpbChuZXdDb29yZCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXdDb29yZDtcbiAgICB9O1xuXG4gICAgaWYgKGNvb3JkID09PSBudWxsKSB7XG4gICAgICBjaG9zZW5Db29yZCA9IGdldFJhbmRvbUNvb3JkKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGdldCBib3RoIHJvdyBhbmQgY29sIG51bWJlcnNcbiAgICAgIC8vIGlmIDEwLCBvbmx5IGRlY3JlYXNlIGVpdGhlciByb3cgb3IgY29sIGJ5IDEgYW5kIGNoZWNrIGlmIGhpdFxuICAgICAgLy8gaWYgbm90LCBlaXRoZXIgYWRkIG9yIHN1YnRyYWN0IDEgZnJvbSByb3cgb3IgY29sXG4gICAgICAvLyBjaGVjayByYW5kb20gc3Vycm91bmRpbmcgY29vcmQgaWYgaGl0IHVudGlsIHlvdSBmaW5kIGEgY29vcmQgYXZhaWxhYmxlXG4gICAgICAvLyBpZiBzdXJyb3VuZGluZyBjb29yZHMgYXJlIGhpdCwgcGljayBhIHJhbmRvbSBjb29yZCBpbnN0ZWFkXG4gICAgICBjb25zdCBzZWxlY3Rpb24gPSBbY29vcmRbMV0sIGNvb3JkWzRdXTtcbiAgICAgIGxldCBhdmFpbCwgdGVtcENvb3JkO1xuXG4gICAgICBjb25zdCBnZXRGb3JtYXQgPSAoaSkgPT4ge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZGVmYXVsdC1jYXNlXG4gICAgICAgIHN3aXRjaCAoaSkge1xuICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIHJldHVybiBgKCR7c2VsZWN0aW9uWzBdfSwgJHtOdW1iZXIoc2VsZWN0aW9uWzFdKSArIDF9KWA7XG4gICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgcmV0dXJuIGAoJHtzZWxlY3Rpb25bMF19LCAke051bWJlcihzZWxlY3Rpb25bMV0pIC0gMX0pYDtcbiAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICByZXR1cm4gYCgke051bWJlcihzZWxlY3Rpb25bMF0pICsgMX0sICR7c2VsZWN0aW9uWzFdfSlgO1xuICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgIHJldHVybiBgKCR7TnVtYmVyKHNlbGVjdGlvblswXSkgLSAxfSwgJHtzZWxlY3Rpb25bMV19KWA7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIC8vIHNlbGVjdCByYW5kb21seSBpZiBvbmUgb3IgemVyb1xuICAgICAgLy8gaWYgemVybywgbG9vcCBmcm9tIGx0clxuICAgICAgLy8gaWYgb25lLCBsb29wIGZyb20gcnRsXG4gICAgICAvLyBldmVyeSBsb29wIGNoZWNrIGlmIGNvb3JkIGlzIGF2YWlsYWJsZVxuICAgICAgLy8gcmV0dXJuIGlmIGF2YWlsYWJsZVxuICAgICAgLy8gbG9vcCA0IHRpbWVzXG4gICAgICAvLyBpZiByZXN1bHRpbmcgY29vcmQgaXMgMTEsIGlnbm9yZSBpdFxuICAgICAgY29uc3QgcmFuZG9taXplciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpO1xuICAgICAgaWYgKHJhbmRvbWl6ZXIgPT09IDApIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgICAgICB0ZW1wQ29vcmQgPSBnZXRGb3JtYXQoaSk7XG4gICAgICAgICAgaWYgKHRlbXBDb29yZFsxXSA9PT0gMTEgfHwgdGVtcENvb3JkWzRdID09PSAxMSkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYXZhaWwgPSBjaGVja0lmQXZhaWwodGVtcENvb3JkKTtcbiAgICAgICAgICBpZiAoYXZhaWwpIHtcbiAgICAgICAgICAgIGNob3NlbkNvb3JkID0gdGVtcENvb3JkO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghYXZhaWwpIHtcbiAgICAgICAgICBjaG9zZW5Db29yZCA9IGdldFJhbmRvbUNvb3JkKCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAzOyBpID49IDA7IGktLSkge1xuICAgICAgICAgIHRlbXBDb29yZCA9IGdldEZvcm1hdChpKTtcbiAgICAgICAgICBhdmFpbCA9IGNoZWNrSWZBdmFpbCh0ZW1wQ29vcmQpO1xuICAgICAgICAgIGlmIChhdmFpbCkge1xuICAgICAgICAgICAgY2hvc2VuQ29vcmQgPSB0ZW1wQ29vcmQ7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFhdmFpbCkge1xuICAgICAgICAgIGNob3NlbkNvb3JkID0gZ2V0UmFuZG9tQ29vcmQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY2hvc2VuQ29vcmQ7XG4gIH07XG5cbiAgY29uc3QgYXR0YWNrID0gKGVuZW15LCBjb29yZCA9IG51bGwpID0+IHtcbiAgICBjb25zdCBhdHRDb29yZCA9IHR5cGUgPT09ICdjb21wJyA/IGdldENvb3JkKGNvb3JkKSA6IGNvb3JkO1xuICAgIGNvbnN0IGlzSGl0ID0gZW5lbXkuZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soYXR0Q29vcmQpO1xuICAgIGlmICh0eXBlID09PSAnY29tcCcpIHtcbiAgICAgIHJldHVybiB7IGlzSGl0LCBoaXRDb29yZDogYXR0Q29vcmQgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gaXNIaXQ7XG4gIH07XG5cbiAgcmV0dXJuIHsgZ2V0V2luU3RhdHVzLCBnYW1lYm9hcmQsIGF0dGFjayB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBQbGF5ZXI7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1wbHVzcGx1cyAqL1xuY29uc3QgU2hpcCA9IChsZW5ndGgsIHBvcykgPT4ge1xuICBjb25zdCBoaXRtYXJrcyA9IFtdO1xuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuICBjb25zdCBmaWxsSGl0cyA9ICgoKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaGl0bWFya3NbaV0gPSAnJztcbiAgICB9XG4gIH0pKCk7XG5cbiAgY29uc3QgaGl0ID0gKGNvb3JkKSA9PiB7XG4gICAgY29uc3QgaW5kZXggPSBwb3MuaW5kZXhPZihjb29yZCk7XG4gICAgaGl0bWFya3NbaW5kZXhdID0gJ3gnO1xuICB9O1xuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBjb25zdCBpc1N1bmsgPSAoKSA9PiB7XG4gICAgbGV0IGNvdW50ID0gMDtcbiAgICBoaXRtYXJrcy5mb3JFYWNoKChtYXJrKSA9PiB7XG4gICAgICBpZiAobWFyayA9PT0gJ3gnKSB7XG4gICAgICAgIGNvdW50Kys7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gY291bnQgPT09IGxlbmd0aDtcbiAgfTtcblxuICBjb25zdCBnZXRMZW5ndGggPSAoKSA9PiBsZW5ndGg7XG4gIGNvbnN0IGdldFBvcyA9ICgpID0+IHBvcztcblxuICByZXR1cm4ge1xuICAgIGdldExlbmd0aCxcbiAgICBnZXRQb3MsXG4gICAgaGl0LFxuICAgIGlzU3VuayxcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU2hpcDtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBjcmVhdGVDb250YWluZXIsIGNyZWF0ZUJsb2NrcyB9IGZyb20gJy4vZG9tJztcbmltcG9ydCBTaGlwIGZyb20gJy4vZmFjdG9yaWVzL3NoaXAnO1xuaW1wb3J0IFBsYXllciBmcm9tICcuL2ZhY3Rvcmllcy9wbGF5ZXInO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgY3JlYXRlQ29udGFpbmVyKCk7XG4gIGNyZWF0ZUJsb2NrcygpO1xufSk7XG5cbi8vIG1haW4gZ2FtZSBsb29wXG4vLyBzdGFydHMgd2l0aCBjcmVhdGluZyBwbGF5ZXJzICYgcG9wdWxhdGUgZWFjaCBnYW1lYm9hcmRcbi8vIGNyZWF0ZSBodW1hbiBwbGF5ZXIgJiBnYW1lYm9hcmQgZmlyc3Rcbi8vIHBsYWNlIHNoaXBzIG9uIHBsYXllciBnYW1lYm9hcmRcbi8vIGNyZWF0ZSBjb21wIHBsYXllciAmIGdhbWVib2FyZFxuLy8gcGxhY2Ugc2hpcHMgaW4gcmFuZG9tIHBvc2l0aW9uIGluIGVuZW15IGdhbWVib2FyZFxuLy8gZGlzcGxheSBib3RoIGdhbWVib2FyZHNcbi8vIGdhbWUgbG9vcCBzaG91bGQgc3RlcCB0aHJvdWdoIHRoZSBnYW1lIHR1cm4gYnkgdHVyblxuLy8gdXNpbmcgb25seSBmdW5jdGlvbiBpbnNpZGUgdGhlIGdhbWUgbG9vcFxuLy8gY3JlYXRlIGNvbmRpdGlvbnMgc28gdGhhdCB0aGUgZ2FtZSBlbmRzIG9uY2Vcbi8vIG9uZSBwbGF5ZXIncyBzaGlwcyBoYXZlIGFsbCBiZWVuIHN1bmtcblxuY29uc3QgZ2FtZUxvb3AgPSAoKCkgPT4ge1xuICBjb25zdCBhaSA9IFBsYXllcignY29tcCcpO1xuICBjb25zdCBodW1hbiA9IFBsYXllcigpO1xufSkoKTtcbiJdLCJuYW1lcyI6WyJjcmVhdGVDb250YWluZXIiLCJhbHBoTGFiZWwiLCJjb250YWluZXIiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJnYW1lYm9hcmQiLCJ0b3BDb250Iiwic2lkZUNvbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJxdWVyeVNlbGVjdG9yIiwiYXBwZW5kQ2hpbGQiLCJpIiwic3BhbiIsImxlbmd0aCIsInRvcFNwYW4iLCJ0ZXh0Q29udGVudCIsInNpZGVTcGFuIiwiZHJhZ0VudGVyIiwiZSIsInByZXZlbnREZWZhdWx0IiwidGFyZ2V0IiwiZHJhZ092ZXIiLCJkcmFnTGVhdmUiLCJyZW1vdmUiLCJkcm9wIiwiZHJhZ2dlZCIsImdyaWRzIiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJncmlkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNyZWF0ZUJsb2NrcyIsImJsb2NrIiwiYnRuIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiZHJhZ2dhYmxlIiwibWluIiwiY2VpbCIsIm1heCIsInNldFRpbWVvdXQiLCJwb3MiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ3aWR0aCIsImhlaWdodCIsInBvc1RvcCIsInRvcCIsInBvc0xlZnQiLCJsZWZ0IiwiY29uc29sZSIsImxvZyIsIkdhbWVib2FyZCIsInNoaXBzIiwibWlzc2VkSGl0cyIsInN1bmtlbiIsImhpdHMiLCJwbGFjZVNoaXAiLCJzaGlwIiwicHVzaCIsImdldE1pc3NlZEhpdHMiLCJnZXRIaXRzIiwiY2hlY2tTdW5rZW4iLCJpc1N1bmsiLCJpbmRleCIsImluZGV4T2YiLCJyZWNlaXZlQXR0YWNrIiwiY29vcmQiLCJpc1NoaXBIaXQiLCJnZXRQb3MiLCJwb3NpdGlvbiIsImhpdCIsImFyZUFsbFN1bmtlbiIsImNvdW50IiwibWFyayIsIm1vZHVsZSIsImV4cG9ydHMiLCJyZXF1aXJlIiwiUGxheWVyIiwidHlwZSIsImdldFdpblN0YXR1cyIsImVuZW15IiwiZ2V0Q29vcmQiLCJjaG9zZW5Db29yZCIsImdldFJhbmRvbU51bSIsImNoZWNrSWZBdmFpbCIsInRlbXBDb29yZCIsImluY2x1ZGVzIiwiZ2V0UmFuZG9tQ29vcmQiLCJhdmFpbCIsIm5ld0Nvb3JkIiwic2VsZWN0aW9uIiwiZ2V0Rm9ybWF0IiwiTnVtYmVyIiwicmFuZG9taXplciIsImF0dGFjayIsImF0dENvb3JkIiwiaXNIaXQiLCJoaXRDb29yZCIsIlNoaXAiLCJoaXRtYXJrcyIsImZpbGxIaXRzIiwiZ2V0TGVuZ3RoIiwid2luZG93IiwiZ2FtZUxvb3AiLCJhaSIsImh1bWFuIl0sInNvdXJjZVJvb3QiOiIifQ==