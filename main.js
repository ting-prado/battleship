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
    if (player.type === 'human') {
      var grids = document.querySelectorAll('.grid');
      var length = 4;
      var count = 1;

      for (var i = 0; i < 4; i++) {
        for (var k = 0; k < count; k++) {
          var block = _dom__WEBPACK_IMPORTED_MODULE_0__.createBlock(length); // prettier-ignore

          var orientation = block.style.width.match(/^.+?(?=px)/)[0] / 40.91 > 1 ? 'landscape' : 'portrait';
          var options = checkAvailPos(length, orientation);
          grids[options[Math.floor(Math.random() * options.length)]].appendChild(block);
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
  }();
}();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SCxXQUZGLENBRWNTLEtBRmQ7UUFHRDs7UUFDRE4sTUFBTTtRQUNOZ0UsS0FBSztNQUNOO0lBQ0Y7RUFDRixDQXJCRDs7RUF1QkEsSUFBTTBDLElBQUksR0FBSSxZQUFNO0lBQ2xCWixpREFBQTtJQUNBLElBQU1hLEtBQUssR0FBR3RDLHdEQUFNLEVBQXBCO0lBQ0EsSUFBTXVDLEVBQUUsR0FBR3ZDLHdEQUFNLENBQUMsTUFBRCxDQUFqQjtJQUNBaUMsaUJBQWlCLENBQUNLLEtBQUQsQ0FBakI7RUFDRCxDQUxZLEVBQWI7QUFNRCxDQXBGZ0IsRUFBakIsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tcGx1c3BsdXMgKi9cbmNvbnN0IGNyZWF0ZUNvbnRhaW5lciA9ICgpID0+IHtcbiAgY29uc3QgYWxwaExhYmVsID0gWydBJywgJ0InLCAnQycsICdEJywgJ0UnLCAnRicsICdHJywgJ0gnLCAnSScsICdKJ107XG5cbiAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNvbnN0IGdhbWVib2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb25zdCB0b3BDb250ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNvbnN0IHNpZGVDb250ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdjb250YWluZXInKTtcbiAgZ2FtZWJvYXJkLmNsYXNzTGlzdC5hZGQoJ2dhbWVib2FyZCcpO1xuICB0b3BDb250LmNsYXNzTGlzdC5hZGQoJ3RvcENvbnQnKTtcbiAgc2lkZUNvbnQuY2xhc3NMaXN0LmFkZCgnc2lkZUNvbnQnKTtcblxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGdhbWVib2FyZCk7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0b3BDb250KTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHNpZGVDb250KTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XG4gICAgY29uc3Qgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBzcGFuLmNsYXNzTGlzdC5hZGQoJ2dyaWQnKTtcbiAgICBnYW1lYm9hcmQuYXBwZW5kQ2hpbGQoc3Bhbik7XG4gIH1cblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGFscGhMYWJlbC5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IHRvcFNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgdG9wU3Bhbi50ZXh0Q29udGVudCA9IGFscGhMYWJlbFtpXTtcbiAgICB0b3BDb250LmFwcGVuZENoaWxkKHRvcFNwYW4pO1xuXG4gICAgY29uc3Qgc2lkZVNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgc2lkZVNwYW4udGV4dENvbnRlbnQgPSBpICsgMTtcbiAgICBzaWRlQ29udC5hcHBlbmRDaGlsZChzaWRlU3Bhbik7XG4gIH1cbn07XG5cbmNvbnN0IGNyZWF0ZUJsb2NrID0gKGxlbmd0aCkgPT4ge1xuICBjb25zdCBzaXplID0gNDAuOTE7XG4gIGNvbnN0IGJsb2NrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGJsb2NrLmNsYXNzTGlzdC5hZGQoJ2RyYWdnYWJsZScpO1xuICBibG9jay5kcmFnZ2FibGUgPSB0cnVlO1xuICBjb25zdCByYW5kb20gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKTtcbiAgLy8gY2hhbmdlIHRoZSBhcHBlbmRhYmxlIGdyaWRzIGRlcGVuZGluZyBvbiBsZW5ndGhcbiAgaWYgKHJhbmRvbSA9PT0gMSkge1xuICAgIGJsb2NrLnN0eWxlLndpZHRoID0gYCR7c2l6ZX1weGA7XG4gICAgYmxvY2suc3R5bGUuaGVpZ2h0ID0gYCR7c2l6ZSAqIGxlbmd0aH1weGA7XG4gIH0gZWxzZSB7XG4gICAgYmxvY2suc3R5bGUud2lkdGggPSBgJHtzaXplICogbGVuZ3RofXB4YDtcbiAgICBibG9jay5zdHlsZS5oZWlnaHQgPSBgJHtzaXplfXB4YDtcbiAgfVxuXG4gIHJldHVybiBibG9jaztcbn07XG5cbmNvbnN0IGFkZEZ1bmNzID0gKGJsb2NrLCBvcmllbnRhdGlvbikgPT4ge1xuICAvLyBhY3RpdmF0ZSB0aGVzZSBmdW5jdGlvbnMgZHVyaW5nIGRyYWdzdGFydFxuICAvLyBnZXQgbGVuZ3RoIG9mIGJsb2NrIHRoYXQgaXMgYmVpbmcgZHJhZ2dlZFxuICAvLyBjaGFuZ2UgZHJvcCB0YXJnZXRzIGFjY29yZGluZyB0byBsZW5ndGhcbiAgY29uc3QgZ3JpZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ3JpZCcpO1xuICBjb25zdCBkcmFnRW50ZXIgPSAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKCdkcmFnLW92ZXInKTtcbiAgfTtcblxuICBjb25zdCBkcmFnT3ZlciA9IChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2RyYWctb3ZlcicpO1xuICB9O1xuXG4gIGNvbnN0IGRyYWdMZWF2ZSA9IChlKSA9PiB7XG4gICAgZS50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZy1vdmVyJyk7XG4gIH07XG5cbiAgY29uc3QgZHJvcCA9IChlKSA9PiB7XG4gICAgZS50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZy1vdmVyJyk7XG5cbiAgICBjb25zdCBkcmFnZ2VkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRyYWdnZWQnKTtcblxuICAgIGUudGFyZ2V0LmFwcGVuZENoaWxkKGRyYWdnZWQpO1xuICAgIGRyYWdnZWQuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgIGRyYWdnZWQuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZ2dlZCcpO1xuICB9O1xuXG4gIGdyaWRzLmZvckVhY2goKGdyaWQpID0+IHtcbiAgICBncmlkLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbnRlcicsIGRyYWdFbnRlcik7XG4gICAgZ3JpZC5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIGRyYWdPdmVyKTtcbiAgICBncmlkLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIGRyYWdMZWF2ZSk7XG4gICAgZ3JpZC5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgZHJvcCk7XG4gIH0pO1xuXG4gIGJsb2NrLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGNvbnN0IGdyaWQgPSBibG9jay5wYXJlbnROb2RlO1xuICAgIGNvbnN0IGluZGV4ID0gQXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChncmlkcywgZ3JpZCk7XG4gICAgY29uc3QgcG9zID0gW107XG4gICAgZm9yIChcbiAgICAgIGxldCBrID0gMDtcbiAgICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgICAgayA8IE1hdGgucm91bmQoXG4gICAgICAgIChyYW5kb20gPT09IDEgPyBibG9jay5vZmZzZXRIZWlnaHQgOiBibG9jay5vZmZzZXRXaWR0aCkgLyBzaXplXG4gICAgICApO1xuICAgICAgaysrXG4gICAgKSB7XG4gICAgICBwb3MucHVzaChpbmRleCArIChyYW5kb20gPT09IDEgPyBrICogMTAgOiBrKSk7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKHBvcy5qb2luKCcsICcpKTtcbiAgfSk7XG5cbiAgYmxvY2suYWRkRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgKGUpID0+IHtcbiAgICAvLyBhZGQgZHJhZyBwcm9wZXJ0aWVzIHRvIGdyaWQgb24gZHJhZ3N0YXJ0XG4gICAgLy8gZm9sbG93IHBlcmNlbnRhZ2UgYmVsb3cgZm9yIGdyaWRzIGFsbG93ZWQgdG8gYmUgcGxhY2VkIG9uXG4gICAgLy8gcmVtb3ZlIGRyYWcgcHJvcGVydGllcyBvbiBncmlkcyBhZnRlciBkcm9wcGluZ1xuICAgIC8vIGFkZCBjaGVja2VyIHNvIGJsb2NrcyB3b24ndCBvdmVybGFwXG4gICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZCgnZHJhZ2dlZCcpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgIH0sIDApO1xuICB9KTtcbn07XG5cbmV4cG9ydCB7IGNyZWF0ZUNvbnRhaW5lciwgY3JlYXRlQmxvY2ssIGFkZEZ1bmNzIH07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1wbHVzcGx1cyAqL1xuY29uc3QgR2FtZWJvYXJkID0gKCkgPT4ge1xuICBjb25zdCBzaGlwcyA9IFtdO1xuICBjb25zdCBtaXNzZWRIaXRzID0gW107XG4gIGNvbnN0IHN1bmtlbiA9IFtdO1xuICBjb25zdCBoaXRzID0gW107XG5cbiAgY29uc3QgcGxhY2VTaGlwID0gKHNoaXApID0+IHtcbiAgICBzaGlwcy5wdXNoKHNoaXApO1xuICAgIHN1bmtlbi5wdXNoKCcnKTtcbiAgfTtcblxuICBjb25zdCBnZXRNaXNzZWRIaXRzID0gKCkgPT4gbWlzc2VkSGl0cztcblxuICBjb25zdCBnZXRIaXRzID0gKCkgPT4gaGl0cztcblxuICBjb25zdCBjaGVja1N1bmtlbiA9IChzaGlwKSA9PiB7XG4gICAgaWYgKHNoaXAuaXNTdW5rKCkpIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gc2hpcHMuaW5kZXhPZihzaGlwKTtcbiAgICAgIHN1bmtlbltpbmRleF0gPSAneCc7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoY29vcmQpID0+IHtcbiAgICBsZXQgaXNTaGlwSGl0ID0gZmFsc2U7XG4gICAgc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgc2hpcC5nZXRQb3MoKS5mb3JFYWNoKChwb3NpdGlvbikgPT4ge1xuICAgICAgICBpZiAocG9zaXRpb24gPT09IGNvb3JkKSB7XG4gICAgICAgICAgaXNTaGlwSGl0ID0gdHJ1ZTtcbiAgICAgICAgICBzaGlwLmhpdChjb29yZCk7XG4gICAgICAgICAgaGl0cy5wdXNoKGNvb3JkKTtcbiAgICAgICAgICBjaGVja1N1bmtlbihzaGlwKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpZiAoIWlzU2hpcEhpdCkge1xuICAgICAgaGl0cy5wdXNoKGNvb3JkKTtcbiAgICAgIG1pc3NlZEhpdHMucHVzaChjb29yZCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGlzU2hpcEhpdDtcbiAgfTtcblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbiAgY29uc3QgYXJlQWxsU3Vua2VuID0gKCkgPT4ge1xuICAgIGxldCBjb3VudCA9IDA7XG4gICAgc3Vua2VuLmZvckVhY2goKG1hcmspID0+IHtcbiAgICAgIGlmIChtYXJrID09PSAneCcpIHtcbiAgICAgICAgY291bnQrKztcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBjb3VudCA9PT0gc2hpcHMubGVuZ3RoO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgcGxhY2VTaGlwLFxuICAgIHJlY2VpdmVBdHRhY2ssXG4gICAgZ2V0TWlzc2VkSGl0cyxcbiAgICBhcmVBbGxTdW5rZW4sXG4gICAgZ2V0SGl0cyxcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gR2FtZWJvYXJkO1xuIiwiLyogZXNsaW50LWRpc2FibGUgY29uc2lzdGVudC1yZXR1cm4gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXBsdXNwbHVzICovXG5jb25zdCBHYW1lYm9hcmQgPSByZXF1aXJlKCcuL2dhbWVib2FyZCcpO1xuXG5jb25zdCBQbGF5ZXIgPSAodHlwZSA9ICdodW1hbicpID0+IHtcbiAgY29uc3QgZ2FtZWJvYXJkID0gR2FtZWJvYXJkKCk7XG4gIGNvbnN0IGdldFdpblN0YXR1cyA9IChlbmVteSkgPT4gZW5lbXkuZ2FtZWJvYXJkLmFyZUFsbFN1bmtlbigpO1xuXG4gIGNvbnN0IGdldFBvcyA9IChwb3MpID0+IHtcbiAgICAvLyBpZiBwcmV2UG9zIGlzIHVuZGVmaW5lZCwgY2hvb3NlIHJhbmRvbSBwb3NcbiAgICAvLyBjaGVjayBpZiByYW5kb20gcG9zIGlzIGhpdCBvciBub3RcbiAgICAvLyBpZiBub3QgaGl0LCByZXR1cm4gcG9zXG4gICAgLy8gaWYgaGl0LCBjaG9vc2UgYW5vdGhlciBvbmVcbiAgICBsZXQgY2hvc2VuUG9zO1xuXG4gICAgY29uc3QgZ2V0UmFuZG9tTnVtID0gKCkgPT4ge1xuICAgICAgY29uc3QgbWluID0gTWF0aC5jZWlsKDApOyAvLyBpbmNsdXNpdmVcbiAgICAgIGNvbnN0IG1heCA9IE1hdGguZmxvb3IoMTAwKTsgLy8gZXhjbHVzaXZlXG4gICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKyBtaW4pO1xuICAgIH07XG5cbiAgICBjb25zdCBjaGVja0lmQXZhaWwgPSAodGVtcFBvcykgPT4gIWdhbWVib2FyZC5nZXRIaXRzKCkuaW5jbHVkZXModGVtcFBvcyk7XG5cbiAgICBjb25zdCBnZXRSYW5kb21Qb3MgPSAoKSA9PiB7XG4gICAgICBsZXQgYXZhaWw7XG4gICAgICBsZXQgbmV3UG9zO1xuXG4gICAgICB3aGlsZSAoIWF2YWlsKSB7XG4gICAgICAgIG5ld1BvcyA9IGdldFJhbmRvbU51bSgpO1xuICAgICAgICBhdmFpbCA9IGNoZWNrSWZBdmFpbChuZXdQb3MpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3UG9zO1xuICAgIH07XG5cbiAgICBpZiAocG9zID09PSBudWxsKSB7XG4gICAgICBjaG9zZW5Qb3MgPSBnZXRSYW5kb21Qb3MoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gY2hlY2sgcmFuZG9tIHN1cnJvdW5kaW5nIHBvcyBpZiBoaXQgdW50aWwgeW91IGZpbmQgYSBwb3MgYXZhaWxhYmxlXG4gICAgICAvLyBpZiBzdXJyb3VuZGluZyBwb3NpdGlvbnMgYXJlIGhpdCwgcGljayBhIHJhbmRvbSBwb3MgaW5zdGVhZFxuICAgICAgbGV0IGF2YWlsLCB0ZW1wUG9zO1xuXG4gICAgICBjb25zdCBnZXROZXdQb3MgPSAoaSkgPT4ge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZGVmYXVsdC1jYXNlXG4gICAgICAgIHN3aXRjaCAoaSkge1xuICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIHJldHVybiBwb3MgKyAxO1xuICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIHJldHVybiBwb3MgLSAxO1xuICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIHJldHVybiBwb3MgKyAxMDtcbiAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICByZXR1cm4gcG9zIC0gMTA7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIC8vIHNlbGVjdCByYW5kb21seSBpZiBvbmUgb3IgemVyb1xuICAgICAgLy8gaWYgemVybywgbG9vcCBmcm9tIGx0clxuICAgICAgLy8gaWYgb25lLCBsb29wIGZyb20gcnRsXG4gICAgICAvLyBldmVyeSBsb29wIGNoZWNrIGlmIGNvb3JkIGlzIGF2YWlsYWJsZVxuICAgICAgLy8gcmV0dXJuIGlmIGF2YWlsYWJsZVxuICAgICAgLy8gbG9vcCA0IHRpbWVzXG4gICAgICAvLyBpZiByZXN1bHRpbmcgY29vcmQgaXMgMTAwLCBpZ25vcmUgaXRcbiAgICAgIGNvbnN0IHJhbmRvbWl6ZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKTtcbiAgICAgIGlmIChyYW5kb21pemVyID09PSAwKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICAgICAgdGVtcFBvcyA9IGdldE5ld1BvcyhpKTtcbiAgICAgICAgICBpZiAodGVtcFBvcyA9PT0gMTAwKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBhdmFpbCA9IGNoZWNrSWZBdmFpbCh0ZW1wUG9zKTtcbiAgICAgICAgICBpZiAoYXZhaWwpIHtcbiAgICAgICAgICAgIGNob3NlblBvcyA9IHRlbXBQb3M7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFhdmFpbCkge1xuICAgICAgICAgIGNob3NlblBvcyA9IGdldFJhbmRvbVBvcygpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKGxldCBpID0gMzsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICB0ZW1wUG9zID0gZ2V0TmV3UG9zKGkpO1xuICAgICAgICAgIGF2YWlsID0gY2hlY2tJZkF2YWlsKHRlbXBQb3MpO1xuICAgICAgICAgIGlmIChhdmFpbCkge1xuICAgICAgICAgICAgY2hvc2VuUG9zID0gdGVtcFBvcztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIWF2YWlsKSB7XG4gICAgICAgICAgY2hvc2VuUG9zID0gZ2V0UmFuZG9tUG9zKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNob3NlblBvcztcbiAgfTtcblxuICBjb25zdCBhdHRhY2sgPSAoZW5lbXksIHBvcyA9IG51bGwpID0+IHtcbiAgICBjb25zdCBhdHRQb3MgPSB0eXBlID09PSAnY29tcCcgPyBnZXRQb3MocG9zKSA6IHBvcztcbiAgICBjb25zdCBpc0hpdCA9IGVuZW15LmdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKGF0dFBvcyk7XG4gICAgaWYgKHR5cGUgPT09ICdjb21wJykge1xuICAgICAgcmV0dXJuIHsgaXNIaXQsIGhpdFBvczogYXR0UG9zIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIGlzSGl0O1xuICB9O1xuXG4gIHJldHVybiB7IGdldFdpblN0YXR1cywgZ2FtZWJvYXJkLCBhdHRhY2ssIHR5cGUgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUGxheWVyO1xuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tcGx1c3BsdXMgKi9cbmNvbnN0IFNoaXAgPSAobGVuZ3RoLCBwb3MpID0+IHtcbiAgY29uc3QgaGl0bWFya3MgPSBbXTtcblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgY29uc3QgZmlsbEhpdHMgPSAoKCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGhpdG1hcmtzW2ldID0gJyc7XG4gICAgfVxuICB9KSgpO1xuXG4gIGNvbnN0IGhpdCA9IChoaXRQb3MpID0+IHtcbiAgICBjb25zdCBpbmRleCA9IHBvcy5pbmRleE9mKGhpdFBvcyk7XG4gICAgaGl0bWFya3NbaW5kZXhdID0gJ3gnO1xuICB9O1xuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBjb25zdCBpc1N1bmsgPSAoKSA9PiB7XG4gICAgbGV0IGNvdW50ID0gMDtcbiAgICBoaXRtYXJrcy5mb3JFYWNoKChtYXJrKSA9PiB7XG4gICAgICBpZiAobWFyayA9PT0gJ3gnKSB7XG4gICAgICAgIGNvdW50Kys7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gY291bnQgPT09IGxlbmd0aDtcbiAgfTtcblxuICBjb25zdCBnZXRMZW5ndGggPSAoKSA9PiBsZW5ndGg7XG4gIGNvbnN0IGdldFBvcyA9ICgpID0+IHBvcztcblxuICByZXR1cm4ge1xuICAgIGdldExlbmd0aCxcbiAgICBnZXRQb3MsXG4gICAgaGl0LFxuICAgIGlzU3VuayxcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU2hpcDtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKiBlc2xpbnQtZGlzYWJsZSBkZWZhdWx0LWNhc2UgKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXBsdXNwbHVzICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuaW1wb3J0ICogYXMgZG9tIGZyb20gJy4vZG9tJztcbmltcG9ydCBTaGlwIGZyb20gJy4vZmFjdG9yaWVzL3NoaXAnO1xuaW1wb3J0IFBsYXllciBmcm9tICcuL2ZhY3Rvcmllcy9wbGF5ZXInO1xuXG4vLyBtYWluIGdhbWUgbG9vcFxuLy8gc3RhcnRzIHdpdGggY3JlYXRpbmcgcGxheWVycyAmIHBvcHVsYXRlIGVhY2ggZ2FtZWJvYXJkXG4vLyBjcmVhdGUgaHVtYW4gcGxheWVyICYgZ2FtZWJvYXJkIGZpcnN0XG4vLyBwbGFjZSBzaGlwcyBvbiBwbGF5ZXIgZ2FtZWJvYXJkXG4vLyBjcmVhdGUgY29tcCBwbGF5ZXIgJiBnYW1lYm9hcmRcbi8vIHBsYWNlIHNoaXBzIGluIHJhbmRvbSBwb3NpdGlvbiBpbiBlbmVteSBnYW1lYm9hcmRcbi8vIGRpc3BsYXkgYm90aCBnYW1lYm9hcmRzXG4vLyBnYW1lIGxvb3Agc2hvdWxkIHN0ZXAgdGhyb3VnaCB0aGUgZ2FtZSB0dXJuIGJ5IHR1cm5cbi8vIHVzaW5nIG9ubHkgZnVuY3Rpb24gaW5zaWRlIHRoZSBnYW1lIGxvb3Bcbi8vIGNyZWF0ZSBjb25kaXRpb25zIHNvIHRoYXQgdGhlIGdhbWUgZW5kcyBvbmNlXG4vLyBvbmUgcGxheWVyJ3Mgc2hpcHMgaGF2ZSBhbGwgYmVlbiBzdW5rXG5jb25zdCBnYW1lRnVuYyA9ICgoKSA9PiB7XG4gIGNvbnN0IGNoZWNrQXZhaWxQb3MgPSAobGVuZ3RoLCBvcmllbnRhdGlvbikgPT4ge1xuICAgIGNvbnN0IGFyciA9IFtdO1xuICAgIGlmIChvcmllbnRhdGlvbiA9PT0gJ3BvcnRyYWl0Jykge1xuICAgICAgc3dpdGNoIChsZW5ndGgpIHtcbiAgICAgICAgY2FzZSA0OlxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNzA7IGkrKykge1xuICAgICAgICAgICAgYXJyLnB1c2goaSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA4MDsgaSsrKSB7XG4gICAgICAgICAgICBhcnIucHVzaChpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDkwOyBpKyspIHtcbiAgICAgICAgICAgIGFyci5wdXNoKGkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcbiAgICAgICAgICAgIGFyci5wdXNoKGkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGxpbWl0cztcbiAgICAgIHN3aXRjaCAobGVuZ3RoKSB7XG4gICAgICAgIGNhc2UgNDpcbiAgICAgICAgICBsaW1pdHMgPSBbNywgOCwgOV07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICBsaW1pdHMgPSBbOCwgOV07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICBsaW1pdHMgPSBbOV07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IG51bVN0ciA9IGkudG9TdHJpbmcoKTtcbiAgICAgICAgbGV0IGF2YWlsID0gdHJ1ZTtcbiAgICAgICAgbGltaXRzLmZvckVhY2goKG51bSkgPT4ge1xuICAgICAgICAgIGlmIChpID09PSBudW0gfHwgbnVtU3RyWzFdID09IG51bSkge1xuICAgICAgICAgICAgYXZhaWwgPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoYXZhaWwpIHtcbiAgICAgICAgICBhcnIucHVzaChpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYXJyO1xuICB9O1xuXG4gIGNvbnN0IGNyZWF0ZVBsYXllclNoaXBzID0gKHBsYXllcikgPT4ge1xuICAgIGlmIChwbGF5ZXIudHlwZSA9PT0gJ2h1bWFuJykge1xuICAgICAgY29uc3QgZ3JpZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ3JpZCcpO1xuICAgICAgbGV0IGxlbmd0aCA9IDQ7XG4gICAgICBsZXQgY291bnQgPSAxO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBjb3VudDsgaysrKSB7XG4gICAgICAgICAgY29uc3QgYmxvY2sgPSBkb20uY3JlYXRlQmxvY2sobGVuZ3RoKTtcbiAgICAgICAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICAgICAgICBjb25zdCBvcmllbnRhdGlvbiA9IGJsb2NrLnN0eWxlLndpZHRoLm1hdGNoKC9eLis/KD89cHgpLylbMF0gLyA0MC45MSA+IDFcbiAgICAgICAgICAgID8gJ2xhbmRzY2FwZSdcbiAgICAgICAgICAgIDogJ3BvcnRyYWl0JztcbiAgICAgICAgICBjb25zdCBvcHRpb25zID0gY2hlY2tBdmFpbFBvcyhsZW5ndGgsIG9yaWVudGF0aW9uKTtcbiAgICAgICAgICBncmlkc1tcbiAgICAgICAgICAgIG9wdGlvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogb3B0aW9ucy5sZW5ndGgpXVxuICAgICAgICAgIF0uYXBwZW5kQ2hpbGQoYmxvY2spO1xuICAgICAgICB9XG4gICAgICAgIGxlbmd0aC0tO1xuICAgICAgICBjb3VudCsrO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCBpbml0ID0gKCgpID0+IHtcbiAgICBkb20uY3JlYXRlQ29udGFpbmVyKCk7XG4gICAgY29uc3QgaHVtYW4gPSBQbGF5ZXIoKTtcbiAgICBjb25zdCBhaSA9IFBsYXllcignY29tcCcpO1xuICAgIGNyZWF0ZVBsYXllclNoaXBzKGh1bWFuKTtcbiAgfSkoKTtcbn0pKCk7XG4iXSwibmFtZXMiOlsiY3JlYXRlQ29udGFpbmVyIiwiYWxwaExhYmVsIiwiY29udGFpbmVyIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiZ2FtZWJvYXJkIiwidG9wQ29udCIsInNpZGVDb250IiwiY2xhc3NMaXN0IiwiYWRkIiwicXVlcnlTZWxlY3RvciIsImFwcGVuZENoaWxkIiwiaSIsInNwYW4iLCJsZW5ndGgiLCJ0b3BTcGFuIiwidGV4dENvbnRlbnQiLCJzaWRlU3BhbiIsImNyZWF0ZUJsb2NrIiwic2l6ZSIsImJsb2NrIiwiZHJhZ2dhYmxlIiwicmFuZG9tIiwiTWF0aCIsImZsb29yIiwic3R5bGUiLCJ3aWR0aCIsImhlaWdodCIsImFkZEZ1bmNzIiwib3JpZW50YXRpb24iLCJncmlkcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJkcmFnRW50ZXIiLCJlIiwicHJldmVudERlZmF1bHQiLCJ0YXJnZXQiLCJkcmFnT3ZlciIsImRyYWdMZWF2ZSIsInJlbW92ZSIsImRyb3AiLCJkcmFnZ2VkIiwiZm9yRWFjaCIsImdyaWQiLCJhZGRFdmVudExpc3RlbmVyIiwicGFyZW50Tm9kZSIsImluZGV4IiwiQXJyYXkiLCJwcm90b3R5cGUiLCJpbmRleE9mIiwiY2FsbCIsInBvcyIsImsiLCJyb3VuZCIsIm9mZnNldEhlaWdodCIsIm9mZnNldFdpZHRoIiwicHVzaCIsImNvbnNvbGUiLCJsb2ciLCJqb2luIiwic2V0VGltZW91dCIsIkdhbWVib2FyZCIsInNoaXBzIiwibWlzc2VkSGl0cyIsInN1bmtlbiIsImhpdHMiLCJwbGFjZVNoaXAiLCJzaGlwIiwiZ2V0TWlzc2VkSGl0cyIsImdldEhpdHMiLCJjaGVja1N1bmtlbiIsImlzU3VuayIsInJlY2VpdmVBdHRhY2siLCJjb29yZCIsImlzU2hpcEhpdCIsImdldFBvcyIsInBvc2l0aW9uIiwiaGl0IiwiYXJlQWxsU3Vua2VuIiwiY291bnQiLCJtYXJrIiwibW9kdWxlIiwiZXhwb3J0cyIsInJlcXVpcmUiLCJQbGF5ZXIiLCJ0eXBlIiwiZ2V0V2luU3RhdHVzIiwiZW5lbXkiLCJjaG9zZW5Qb3MiLCJnZXRSYW5kb21OdW0iLCJtaW4iLCJjZWlsIiwibWF4IiwiY2hlY2tJZkF2YWlsIiwidGVtcFBvcyIsImluY2x1ZGVzIiwiZ2V0UmFuZG9tUG9zIiwiYXZhaWwiLCJuZXdQb3MiLCJnZXROZXdQb3MiLCJyYW5kb21pemVyIiwiYXR0YWNrIiwiYXR0UG9zIiwiaXNIaXQiLCJoaXRQb3MiLCJTaGlwIiwiaGl0bWFya3MiLCJmaWxsSGl0cyIsImdldExlbmd0aCIsImRvbSIsImdhbWVGdW5jIiwiY2hlY2tBdmFpbFBvcyIsImFyciIsImxpbWl0cyIsIm51bVN0ciIsInRvU3RyaW5nIiwibnVtIiwiY3JlYXRlUGxheWVyU2hpcHMiLCJwbGF5ZXIiLCJtYXRjaCIsIm9wdGlvbnMiLCJpbml0IiwiaHVtYW4iLCJhaSJdLCJzb3VyY2VSb290IjoiIn0=