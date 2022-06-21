/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* eslint-disable no-console */

/* eslint-disable no-plusplus */
function createContainer() {
  var alphLabel = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  var container = document.createElement('div');
  var gameboard = document.createElement('div');
  var topCont = document.createElement('div');
  var sideCont = document.createElement('div');
  var block = document.createElement('div');
  var btn = document.querySelector('button');
  container.classList.add('container');
  gameboard.classList.add('gameboard');
  topCont.classList.add('topCont');
  sideCont.classList.add('sideCont');
  block.classList.add('draggable');
  block.draggable = true;
  document.querySelector('body').appendChild(container);
  container.appendChild(gameboard);
  container.appendChild(topCont);
  container.appendChild(sideCont);
  gameboard.appendChild(block);

  var _loop = function _loop(i) {
    var span = document.createElement('span');
    span.classList.add('grid');
    gameboard.appendChild(span);
    span.addEventListener('click', function () {
      console.log(Math.floor(span.offsetLeft / 40) + 1, // eslint-disable-next-line comma-dangle
      Math.floor(span.offsetTop / 40) + 1);
    });
  };

  for (var i = 0; i < 100; i++) {
    _loop(i);
  }

  btn.addEventListener('click', function () {
    var pos = block.getBoundingClientRect();
    var width = Math.ceil(pos.width / 40.91);
    var height = Math.ceil(pos.height / 40.91);
    var posTop = Math.floor(pos.top / 40.91) - 1;
    var posLeft = Math.floor(pos.left / 40.91) - 7;

    if (width > 1 || height > 1) {
      if (height > 1) {
        for (var _i = 0; _i < height; _i++) {
          console.log(posLeft, posTop + _i);
        }
      }
    } else {
      console.log(posLeft, posTop);
    }
  });

  for (var _i2 = 0; _i2 < alphLabel.length; _i2++) {
    var topSpan = document.createElement('span');
    topSpan.textContent = alphLabel[_i2];
    topCont.appendChild(topSpan);
    var sideSpan = document.createElement('span');
    sideSpan.textContent = _i2 + 1;
    sideCont.appendChild(sideSpan);
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createContainer);

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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/dom.js");

(0,_dom__WEBPACK_IMPORTED_MODULE_0__["default"])();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05BO0FBRUFBLGdEQUFlLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXBsdXNwbHVzICovXG5mdW5jdGlvbiBjcmVhdGVDb250YWluZXIoKSB7XG4gIGNvbnN0IGFscGhMYWJlbCA9IFsnQScsICdCJywgJ0MnLCAnRCcsICdFJywgJ0YnLCAnRycsICdIJywgJ0knLCAnSiddO1xuXG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb25zdCBnYW1lYm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29uc3QgdG9wQ29udCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb25zdCBzaWRlQ29udCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb25zdCBibG9jayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb25zdCBidG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b24nKTtcbiAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2NvbnRhaW5lcicpO1xuICBnYW1lYm9hcmQuY2xhc3NMaXN0LmFkZCgnZ2FtZWJvYXJkJyk7XG4gIHRvcENvbnQuY2xhc3NMaXN0LmFkZCgndG9wQ29udCcpO1xuICBzaWRlQ29udC5jbGFzc0xpc3QuYWRkKCdzaWRlQ29udCcpO1xuICBibG9jay5jbGFzc0xpc3QuYWRkKCdkcmFnZ2FibGUnKTtcblxuICBibG9jay5kcmFnZ2FibGUgPSB0cnVlO1xuXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZ2FtZWJvYXJkKTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRvcENvbnQpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc2lkZUNvbnQpO1xuICBnYW1lYm9hcmQuYXBwZW5kQ2hpbGQoYmxvY2spO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcbiAgICBjb25zdCBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIHNwYW4uY2xhc3NMaXN0LmFkZCgnZ3JpZCcpO1xuICAgIGdhbWVib2FyZC5hcHBlbmRDaGlsZChzcGFuKTtcblxuICAgIHNwYW4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgTWF0aC5mbG9vcihzcGFuLm9mZnNldExlZnQgLyA0MCkgKyAxLFxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29tbWEtZGFuZ2xlXG4gICAgICAgIE1hdGguZmxvb3Ioc3Bhbi5vZmZzZXRUb3AgLyA0MCkgKyAxXG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGNvbnN0IHBvcyA9IGJsb2NrLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IHdpZHRoID0gTWF0aC5jZWlsKHBvcy53aWR0aCAvIDQwLjkxKTtcbiAgICBjb25zdCBoZWlnaHQgPSBNYXRoLmNlaWwocG9zLmhlaWdodCAvIDQwLjkxKTtcbiAgICBjb25zdCBwb3NUb3AgPSBNYXRoLmZsb29yKHBvcy50b3AgLyA0MC45MSkgLSAxO1xuICAgIGNvbnN0IHBvc0xlZnQgPSBNYXRoLmZsb29yKHBvcy5sZWZ0IC8gNDAuOTEpIC0gNztcblxuICAgIGlmICh3aWR0aCA+IDEgfHwgaGVpZ2h0ID4gMSkge1xuICAgICAgaWYgKGhlaWdodCA+IDEpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBoZWlnaHQ7IGkrKykge1xuICAgICAgICAgIGNvbnNvbGUubG9nKHBvc0xlZnQsIHBvc1RvcCArIGkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKHBvc0xlZnQsIHBvc1RvcCk7XG4gICAgfVxuICB9KTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGFscGhMYWJlbC5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IHRvcFNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgdG9wU3Bhbi50ZXh0Q29udGVudCA9IGFscGhMYWJlbFtpXTtcbiAgICB0b3BDb250LmFwcGVuZENoaWxkKHRvcFNwYW4pO1xuXG4gICAgY29uc3Qgc2lkZVNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgc2lkZVNwYW4udGV4dENvbnRlbnQgPSBpICsgMTtcbiAgICBzaWRlQ29udC5hcHBlbmRDaGlsZChzaWRlU3Bhbik7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29udGFpbmVyO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgY3JlYXRlQ29udGFpbmVyIGZyb20gJy4vZG9tJztcblxuY3JlYXRlQ29udGFpbmVyKCk7XG4iXSwibmFtZXMiOlsiY3JlYXRlQ29udGFpbmVyIiwiYWxwaExhYmVsIiwiY29udGFpbmVyIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiZ2FtZWJvYXJkIiwidG9wQ29udCIsInNpZGVDb250IiwiYmxvY2siLCJidG4iLCJxdWVyeVNlbGVjdG9yIiwiY2xhc3NMaXN0IiwiYWRkIiwiZHJhZ2dhYmxlIiwiYXBwZW5kQ2hpbGQiLCJpIiwic3BhbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJjb25zb2xlIiwibG9nIiwiTWF0aCIsImZsb29yIiwib2Zmc2V0TGVmdCIsIm9mZnNldFRvcCIsInBvcyIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsIndpZHRoIiwiY2VpbCIsImhlaWdodCIsInBvc1RvcCIsInRvcCIsInBvc0xlZnQiLCJsZWZ0IiwibGVuZ3RoIiwidG9wU3BhbiIsInRleHRDb250ZW50Iiwic2lkZVNwYW4iXSwic291cmNlUm9vdCI6IiJ9