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
}

function createBlocks() {
  var block = document.createElement('div');
  var btn = document.querySelector('button');
  block.classList.add('draggable');
  document.querySelector('.gameboard').appendChild(block);
  block.draggable = true;
  block.style.left = "".concat(Math.floor(Math.random() * 8 + 1) * 10, "%");
  block.style.top = '0%'; // `${Math.floor(Math.random() * 9 + 1) * 10}%`;

  console.log(block.style.left, block.style.top);
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
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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OUMsTUFBakI7RUFDRCxDQVREOztFQVdBLElBQU02RSxTQUFTLEdBQUcsU0FBWkEsU0FBWTtJQUFBLE9BQU03RSxNQUFOO0VBQUEsQ0FBbEI7O0VBQ0EsSUFBTTBDLE1BQU0sR0FBRyxTQUFUQSxNQUFTO0lBQUEsT0FBTXpCLEdBQU47RUFBQSxDQUFmOztFQUVBLE9BQU87SUFDTDRELFNBQVMsRUFBVEEsU0FESztJQUVMbkMsTUFBTSxFQUFOQSxNQUZLO0lBR0xFLEdBQUcsRUFBSEEsR0FISztJQUlMVCxNQUFNLEVBQU5BO0VBSkssQ0FBUDtBQU1ELENBcENEOztBQXNDQWEsTUFBTSxDQUFDQyxPQUFQLEdBQWlCeUIsSUFBakI7Ozs7OztVQ3ZDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFFQUksTUFBTSxDQUFDOUQsZ0JBQVAsQ0FBd0IsTUFBeEIsRUFBZ0MsWUFBTTtFQUNwQzlCLHFEQUFlO0VBQ2ZrQixrREFBWTtBQUNiLENBSEQsRSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tcGx1c3BsdXMgKi9cbmZ1bmN0aW9uIGNyZWF0ZUNvbnRhaW5lcigpIHtcbiAgY29uc3QgYWxwaExhYmVsID0gWydBJywgJ0InLCAnQycsICdEJywgJ0UnLCAnRicsICdHJywgJ0gnLCAnSScsICdKJ107XG5cbiAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNvbnN0IGdhbWVib2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb25zdCB0b3BDb250ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNvbnN0IHNpZGVDb250ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdjb250YWluZXInKTtcbiAgZ2FtZWJvYXJkLmNsYXNzTGlzdC5hZGQoJ2dhbWVib2FyZCcpO1xuICB0b3BDb250LmNsYXNzTGlzdC5hZGQoJ3RvcENvbnQnKTtcbiAgc2lkZUNvbnQuY2xhc3NMaXN0LmFkZCgnc2lkZUNvbnQnKTtcblxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGdhbWVib2FyZCk7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0b3BDb250KTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHNpZGVDb250KTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XG4gICAgY29uc3Qgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBzcGFuLmNsYXNzTGlzdC5hZGQoJ2dyaWQnKTtcbiAgICBnYW1lYm9hcmQuYXBwZW5kQ2hpbGQoc3Bhbik7XG4gIH1cblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGFscGhMYWJlbC5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IHRvcFNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgdG9wU3Bhbi50ZXh0Q29udGVudCA9IGFscGhMYWJlbFtpXTtcbiAgICB0b3BDb250LmFwcGVuZENoaWxkKHRvcFNwYW4pO1xuXG4gICAgY29uc3Qgc2lkZVNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgc2lkZVNwYW4udGV4dENvbnRlbnQgPSBpICsgMTtcbiAgICBzaWRlQ29udC5hcHBlbmRDaGlsZChzaWRlU3Bhbik7XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlQmxvY2tzKCkge1xuICBjb25zdCBibG9jayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb25zdCBidG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b24nKTtcbiAgYmxvY2suY2xhc3NMaXN0LmFkZCgnZHJhZ2dhYmxlJyk7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lYm9hcmQnKS5hcHBlbmRDaGlsZChibG9jayk7XG5cbiAgYmxvY2suZHJhZ2dhYmxlID0gdHJ1ZTtcbiAgYmxvY2suc3R5bGUubGVmdCA9IGAke01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDggKyAxKSAqIDEwfSVgO1xuICBibG9jay5zdHlsZS50b3AgPSAnMCUnOyAvLyBgJHtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA5ICsgMSkgKiAxMH0lYDtcbiAgY29uc29sZS5sb2coYmxvY2suc3R5bGUubGVmdCwgYmxvY2suc3R5bGUudG9wKTtcblxuICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgY29uc3QgcG9zID0gYmxvY2suZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3Qgd2lkdGggPSBNYXRoLmNlaWwocG9zLndpZHRoIC8gNDAuOTEpO1xuICAgIGNvbnN0IGhlaWdodCA9IE1hdGguY2VpbChwb3MuaGVpZ2h0IC8gNDAuOTEpO1xuICAgIGNvbnN0IHBvc1RvcCA9IE1hdGguZmxvb3IocG9zLnRvcCAvIDQwLjkxKSAtIDE7XG4gICAgY29uc3QgcG9zTGVmdCA9IE1hdGguZmxvb3IocG9zLmxlZnQgLyA0MC45MSkgLSA3O1xuXG4gICAgaWYgKHdpZHRoID4gMSB8fCBoZWlnaHQgPiAxKSB7XG4gICAgICBpZiAoaGVpZ2h0ID4gMSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhlaWdodDsgaSsrKSB7XG4gICAgICAgICAgY29uc29sZS5sb2cocG9zTGVmdCwgcG9zVG9wICsgaSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAod2lkdGggPiAxKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgd2lkdGg7IGkrKykge1xuICAgICAgICAgIGNvbnNvbGUubG9nKHBvc0xlZnQgKyBpLCBwb3NUb3ApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKHBvc0xlZnQsIHBvc1RvcCk7XG4gICAgfVxuICB9KTtcbn1cblxuZXhwb3J0IHsgY3JlYXRlQ29udGFpbmVyLCBjcmVhdGVCbG9ja3MgfTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXBsdXNwbHVzICovXG5jb25zdCBHYW1lYm9hcmQgPSAoKSA9PiB7XG4gIGNvbnN0IHNoaXBzID0gW107XG4gIGNvbnN0IG1pc3NlZEhpdHMgPSBbXTtcbiAgY29uc3Qgc3Vua2VuID0gW107XG4gIGNvbnN0IGhpdHMgPSBbXTtcblxuICBjb25zdCBwbGFjZVNoaXAgPSAoc2hpcCkgPT4ge1xuICAgIHNoaXBzLnB1c2goc2hpcCk7XG4gICAgc3Vua2VuLnB1c2goJycpO1xuICB9O1xuXG4gIGNvbnN0IGdldE1pc3NlZEhpdHMgPSAoKSA9PiBtaXNzZWRIaXRzO1xuXG4gIGNvbnN0IGdldEhpdHMgPSAoKSA9PiBoaXRzO1xuXG4gIGNvbnN0IGNoZWNrU3Vua2VuID0gKHNoaXApID0+IHtcbiAgICBpZiAoc2hpcC5pc1N1bmsoKSkge1xuICAgICAgY29uc3QgaW5kZXggPSBzaGlwcy5pbmRleE9mKHNoaXApO1xuICAgICAgc3Vua2VuW2luZGV4XSA9ICd4JztcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IChjb29yZCkgPT4ge1xuICAgIGxldCBpc1NoaXBIaXQgPSBmYWxzZTtcbiAgICBzaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICBzaGlwLmdldFBvcygpLmZvckVhY2goKHBvc2l0aW9uKSA9PiB7XG4gICAgICAgIGlmIChwb3NpdGlvbiA9PT0gY29vcmQpIHtcbiAgICAgICAgICBpc1NoaXBIaXQgPSB0cnVlO1xuICAgICAgICAgIHNoaXAuaGl0KGNvb3JkKTtcbiAgICAgICAgICBoaXRzLnB1c2goY29vcmQpO1xuICAgICAgICAgIGNoZWNrU3Vua2VuKHNoaXApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGlmICghaXNTaGlwSGl0KSB7XG4gICAgICBoaXRzLnB1c2goY29vcmQpO1xuICAgICAgbWlzc2VkSGl0cy5wdXNoKGNvb3JkKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaXNTaGlwSGl0O1xuICB9O1xuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBjb25zdCBhcmVBbGxTdW5rZW4gPSAoKSA9PiB7XG4gICAgbGV0IGNvdW50ID0gMDtcbiAgICBzdW5rZW4uZm9yRWFjaCgobWFyaykgPT4ge1xuICAgICAgaWYgKG1hcmsgPT09ICd4Jykge1xuICAgICAgICBjb3VudCsrO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGNvdW50ID09PSBzaGlwcy5sZW5ndGg7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBwbGFjZVNoaXAsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICBnZXRNaXNzZWRIaXRzLFxuICAgIGFyZUFsbFN1bmtlbixcbiAgICBnZXRIaXRzLFxuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBHYW1lYm9hcmQ7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjb25zaXN0ZW50LXJldHVybiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tcGx1c3BsdXMgKi9cbmNvbnN0IEdhbWVib2FyZCA9IHJlcXVpcmUoJy4vZ2FtZWJvYXJkJyk7XG5cbmNvbnN0IFBsYXllciA9ICh0eXBlID0gJ2h1bWFuJykgPT4ge1xuICBjb25zdCBnYW1lYm9hcmQgPSBHYW1lYm9hcmQoKTtcbiAgY29uc3QgZ2V0V2luU3RhdHVzID0gKGVuZW15KSA9PiBlbmVteS5nYW1lYm9hcmQuYXJlQWxsU3Vua2VuKCk7XG5cbiAgY29uc3QgZ2V0Q29vcmQgPSAoY29vcmQpID0+IHtcbiAgICAvLyBpZiBwcmV2Q29vcmQgaXMgdW5kZWZpbmVkLCBjaG9vc2UgcmFuZG9tIGNvb3JkXG4gICAgLy8gY2hlY2sgaWYgcmFuZG9tIGNvb3JkIGlzIGhpdCBvciBub3RcbiAgICAvLyBpZiBub3QgaGl0LCByZXR1cm4gY29vcmRcbiAgICAvLyBpZiBoaXQsIGNob29zZSBhbm90aGVyIG9uZVxuICAgIGxldCBjaG9zZW5Db29yZDtcblxuICAgIGNvbnN0IGdldFJhbmRvbU51bSA9ICgpID0+IHtcbiAgICAgIGNvbnN0IG1pbiA9IE1hdGguY2VpbCgxKTsgLy8gaW5jbHVzaXZlXG4gICAgICBjb25zdCBtYXggPSBNYXRoLmZsb29yKDExKTsgLy8gZXhjbHVzaXZlXG4gICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKyBtaW4pO1xuICAgIH07XG5cbiAgICBjb25zdCBjaGVja0lmQXZhaWwgPSAodGVtcENvb3JkKSA9PlxuICAgICAgIWdhbWVib2FyZC5nZXRIaXRzKCkuaW5jbHVkZXModGVtcENvb3JkKTtcblxuICAgIGNvbnN0IGdldFJhbmRvbUNvb3JkID0gKCkgPT4ge1xuICAgICAgbGV0IGF2YWlsO1xuICAgICAgbGV0IG5ld0Nvb3JkO1xuXG4gICAgICB3aGlsZSAoIWF2YWlsKSB7XG4gICAgICAgIG5ld0Nvb3JkID0gYCgke2dldFJhbmRvbU51bSgpfSwgJHtnZXRSYW5kb21OdW0oKX0pYDtcbiAgICAgICAgYXZhaWwgPSBjaGVja0lmQXZhaWwobmV3Q29vcmQpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3Q29vcmQ7XG4gICAgfTtcblxuICAgIGlmIChjb29yZCA9PT0gbnVsbCkge1xuICAgICAgY2hvc2VuQ29vcmQgPSBnZXRSYW5kb21Db29yZCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBnZXQgYm90aCByb3cgYW5kIGNvbCBudW1iZXJzXG4gICAgICAvLyBpZiAxMCwgb25seSBkZWNyZWFzZSBlaXRoZXIgcm93IG9yIGNvbCBieSAxIGFuZCBjaGVjayBpZiBoaXRcbiAgICAgIC8vIGlmIG5vdCwgZWl0aGVyIGFkZCBvciBzdWJ0cmFjdCAxIGZyb20gcm93IG9yIGNvbFxuICAgICAgLy8gY2hlY2sgcmFuZG9tIHN1cnJvdW5kaW5nIGNvb3JkIGlmIGhpdCB1bnRpbCB5b3UgZmluZCBhIGNvb3JkIGF2YWlsYWJsZVxuICAgICAgLy8gaWYgc3Vycm91bmRpbmcgY29vcmRzIGFyZSBoaXQsIHBpY2sgYSByYW5kb20gY29vcmQgaW5zdGVhZFxuICAgICAgY29uc3Qgc2VsZWN0aW9uID0gW2Nvb3JkWzFdLCBjb29yZFs0XV07XG4gICAgICBsZXQgYXZhaWwsIHRlbXBDb29yZDtcblxuICAgICAgY29uc3QgZ2V0Rm9ybWF0ID0gKGkpID0+IHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGRlZmF1bHQtY2FzZVxuICAgICAgICBzd2l0Y2ggKGkpIHtcbiAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICByZXR1cm4gYCgke3NlbGVjdGlvblswXX0sICR7TnVtYmVyKHNlbGVjdGlvblsxXSkgKyAxfSlgO1xuICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIHJldHVybiBgKCR7c2VsZWN0aW9uWzBdfSwgJHtOdW1iZXIoc2VsZWN0aW9uWzFdKSAtIDF9KWA7XG4gICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgcmV0dXJuIGAoJHtOdW1iZXIoc2VsZWN0aW9uWzBdKSArIDF9LCAke3NlbGVjdGlvblsxXX0pYDtcbiAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICByZXR1cm4gYCgke051bWJlcihzZWxlY3Rpb25bMF0pIC0gMX0sICR7c2VsZWN0aW9uWzFdfSlgO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICAvLyBzZWxlY3QgcmFuZG9tbHkgaWYgb25lIG9yIHplcm9cbiAgICAgIC8vIGlmIHplcm8sIGxvb3AgZnJvbSBsdHJcbiAgICAgIC8vIGlmIG9uZSwgbG9vcCBmcm9tIHJ0bFxuICAgICAgLy8gZXZlcnkgbG9vcCBjaGVjayBpZiBjb29yZCBpcyBhdmFpbGFibGVcbiAgICAgIC8vIHJldHVybiBpZiBhdmFpbGFibGVcbiAgICAgIC8vIGxvb3AgNCB0aW1lc1xuICAgICAgLy8gaWYgcmVzdWx0aW5nIGNvb3JkIGlzIDExLCBpZ25vcmUgaXRcbiAgICAgIGNvbnN0IHJhbmRvbWl6ZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKTtcbiAgICAgIGlmIChyYW5kb21pemVyID09PSAwKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICAgICAgdGVtcENvb3JkID0gZ2V0Rm9ybWF0KGkpO1xuICAgICAgICAgIGlmICh0ZW1wQ29vcmRbMV0gPT09IDExIHx8IHRlbXBDb29yZFs0XSA9PT0gMTEpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGF2YWlsID0gY2hlY2tJZkF2YWlsKHRlbXBDb29yZCk7XG4gICAgICAgICAgaWYgKGF2YWlsKSB7XG4gICAgICAgICAgICBjaG9zZW5Db29yZCA9IHRlbXBDb29yZDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIWF2YWlsKSB7XG4gICAgICAgICAgY2hvc2VuQ29vcmQgPSBnZXRSYW5kb21Db29yZCgpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKGxldCBpID0gMzsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICB0ZW1wQ29vcmQgPSBnZXRGb3JtYXQoaSk7XG4gICAgICAgICAgYXZhaWwgPSBjaGVja0lmQXZhaWwodGVtcENvb3JkKTtcbiAgICAgICAgICBpZiAoYXZhaWwpIHtcbiAgICAgICAgICAgIGNob3NlbkNvb3JkID0gdGVtcENvb3JkO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghYXZhaWwpIHtcbiAgICAgICAgICBjaG9zZW5Db29yZCA9IGdldFJhbmRvbUNvb3JkKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNob3NlbkNvb3JkO1xuICB9O1xuXG4gIGNvbnN0IGF0dGFjayA9IChlbmVteSwgY29vcmQgPSBudWxsKSA9PiB7XG4gICAgY29uc3QgYXR0Q29vcmQgPSB0eXBlID09PSAnY29tcCcgPyBnZXRDb29yZChjb29yZCkgOiBjb29yZDtcbiAgICBjb25zdCBpc0hpdCA9IGVuZW15LmdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKGF0dENvb3JkKTtcbiAgICBpZiAodHlwZSA9PT0gJ2NvbXAnKSB7XG4gICAgICByZXR1cm4geyBpc0hpdCwgaGl0Q29vcmQ6IGF0dENvb3JkIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIGlzSGl0O1xuICB9O1xuXG4gIHJldHVybiB7IGdldFdpblN0YXR1cywgZ2FtZWJvYXJkLCBhdHRhY2sgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUGxheWVyO1xuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tcGx1c3BsdXMgKi9cbmNvbnN0IFNoaXAgPSAobGVuZ3RoLCBwb3MpID0+IHtcbiAgY29uc3QgaGl0bWFya3MgPSBbXTtcblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgY29uc3QgZmlsbEhpdHMgPSAoKCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGhpdG1hcmtzW2ldID0gJyc7XG4gICAgfVxuICB9KSgpO1xuXG4gIGNvbnN0IGhpdCA9IChjb29yZCkgPT4ge1xuICAgIGNvbnN0IGluZGV4ID0gcG9zLmluZGV4T2YoY29vcmQpO1xuICAgIGhpdG1hcmtzW2luZGV4XSA9ICd4JztcbiAgfTtcblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbiAgY29uc3QgaXNTdW5rID0gKCkgPT4ge1xuICAgIGxldCBjb3VudCA9IDA7XG4gICAgaGl0bWFya3MuZm9yRWFjaCgobWFyaykgPT4ge1xuICAgICAgaWYgKG1hcmsgPT09ICd4Jykge1xuICAgICAgICBjb3VudCsrO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGNvdW50ID09PSBsZW5ndGg7XG4gIH07XG5cbiAgY29uc3QgZ2V0TGVuZ3RoID0gKCkgPT4gbGVuZ3RoO1xuICBjb25zdCBnZXRQb3MgPSAoKSA9PiBwb3M7XG5cbiAgcmV0dXJuIHtcbiAgICBnZXRMZW5ndGgsXG4gICAgZ2V0UG9zLFxuICAgIGhpdCxcbiAgICBpc1N1bmssXG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNoaXA7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgY3JlYXRlQ29udGFpbmVyLCBjcmVhdGVCbG9ja3MgfSBmcm9tICcuL2RvbSc7XG5pbXBvcnQgU2hpcCBmcm9tICcuL2ZhY3Rvcmllcy9zaGlwJztcbmltcG9ydCBQbGF5ZXIgZnJvbSAnLi9mYWN0b3JpZXMvcGxheWVyJztcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gIGNyZWF0ZUNvbnRhaW5lcigpO1xuICBjcmVhdGVCbG9ja3MoKTtcbn0pO1xuIl0sIm5hbWVzIjpbImNyZWF0ZUNvbnRhaW5lciIsImFscGhMYWJlbCIsImNvbnRhaW5lciIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImdhbWVib2FyZCIsInRvcENvbnQiLCJzaWRlQ29udCIsImNsYXNzTGlzdCIsImFkZCIsInF1ZXJ5U2VsZWN0b3IiLCJhcHBlbmRDaGlsZCIsImkiLCJzcGFuIiwibGVuZ3RoIiwidG9wU3BhbiIsInRleHRDb250ZW50Iiwic2lkZVNwYW4iLCJjcmVhdGVCbG9ja3MiLCJibG9jayIsImJ0biIsImRyYWdnYWJsZSIsInN0eWxlIiwibGVmdCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInRvcCIsImNvbnNvbGUiLCJsb2ciLCJhZGRFdmVudExpc3RlbmVyIiwicG9zIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0Iiwid2lkdGgiLCJjZWlsIiwiaGVpZ2h0IiwicG9zVG9wIiwicG9zTGVmdCIsIkdhbWVib2FyZCIsInNoaXBzIiwibWlzc2VkSGl0cyIsInN1bmtlbiIsImhpdHMiLCJwbGFjZVNoaXAiLCJzaGlwIiwicHVzaCIsImdldE1pc3NlZEhpdHMiLCJnZXRIaXRzIiwiY2hlY2tTdW5rZW4iLCJpc1N1bmsiLCJpbmRleCIsImluZGV4T2YiLCJyZWNlaXZlQXR0YWNrIiwiY29vcmQiLCJpc1NoaXBIaXQiLCJmb3JFYWNoIiwiZ2V0UG9zIiwicG9zaXRpb24iLCJoaXQiLCJhcmVBbGxTdW5rZW4iLCJjb3VudCIsIm1hcmsiLCJtb2R1bGUiLCJleHBvcnRzIiwicmVxdWlyZSIsIlBsYXllciIsInR5cGUiLCJnZXRXaW5TdGF0dXMiLCJlbmVteSIsImdldENvb3JkIiwiY2hvc2VuQ29vcmQiLCJnZXRSYW5kb21OdW0iLCJtaW4iLCJtYXgiLCJjaGVja0lmQXZhaWwiLCJ0ZW1wQ29vcmQiLCJpbmNsdWRlcyIsImdldFJhbmRvbUNvb3JkIiwiYXZhaWwiLCJuZXdDb29yZCIsInNlbGVjdGlvbiIsImdldEZvcm1hdCIsIk51bWJlciIsInJhbmRvbWl6ZXIiLCJhdHRhY2siLCJhdHRDb29yZCIsImlzSGl0IiwiaGl0Q29vcmQiLCJTaGlwIiwiaGl0bWFya3MiLCJmaWxsSGl0cyIsImdldExlbmd0aCIsIndpbmRvdyJdLCJzb3VyY2VSb290IjoiIn0=