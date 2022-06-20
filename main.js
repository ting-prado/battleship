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
  container.classList.add('container');
  gameboard.classList.add('gameboard');
  topCont.classList.add('topCont');
  sideCont.classList.add('sideCont');
  document.querySelector('body').appendChild(container);
  container.appendChild(gameboard);
  container.appendChild(topCont);
  container.appendChild(sideCont);

  var _loop = function _loop(i) {
    var span = document.createElement('span');
    span.classList.add('grid');
    gameboard.appendChild(span);
    span.addEventListener('click', function () {
      console.log(Math.floor(span.offsetLeft / 40.91) - 7, Math.floor(span.offsetTop / 40.91) - 1);
    });
  };

  for (var i = 0; i < 100; i++) {
    _loop(i);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOQTtBQUVBQSxnREFBZSxHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbWFpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wbHVzcGx1cyAqL1xuZnVuY3Rpb24gY3JlYXRlQ29udGFpbmVyKCkge1xuICBjb25zdCBhbHBoTGFiZWwgPSBbJ0EnLCAnQicsICdDJywgJ0QnLCAnRScsICdGJywgJ0cnLCAnSCcsICdJJywgJ0onXTtcblxuICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29uc3QgZ2FtZWJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNvbnN0IHRvcENvbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29uc3Qgc2lkZUNvbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2NvbnRhaW5lcicpO1xuICBnYW1lYm9hcmQuY2xhc3NMaXN0LmFkZCgnZ2FtZWJvYXJkJyk7XG4gIHRvcENvbnQuY2xhc3NMaXN0LmFkZCgndG9wQ29udCcpO1xuICBzaWRlQ29udC5jbGFzc0xpc3QuYWRkKCdzaWRlQ29udCcpO1xuXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZ2FtZWJvYXJkKTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRvcENvbnQpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc2lkZUNvbnQpO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcbiAgICBjb25zdCBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIHNwYW4uY2xhc3NMaXN0LmFkZCgnZ3JpZCcpO1xuICAgIGdhbWVib2FyZC5hcHBlbmRDaGlsZChzcGFuKTtcblxuICAgIHNwYW4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgTWF0aC5mbG9vcihzcGFuLm9mZnNldExlZnQgLyA0MC45MSkgLSA3LFxuICAgICAgICBNYXRoLmZsb29yKHNwYW4ub2Zmc2V0VG9wIC8gNDAuOTEpIC0gMVxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYWxwaExhYmVsLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgdG9wU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICB0b3BTcGFuLnRleHRDb250ZW50ID0gYWxwaExhYmVsW2ldO1xuICAgIHRvcENvbnQuYXBwZW5kQ2hpbGQodG9wU3Bhbik7XG5cbiAgICBjb25zdCBzaWRlU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBzaWRlU3Bhbi50ZXh0Q29udGVudCA9IGkgKyAxO1xuICAgIHNpZGVDb250LmFwcGVuZENoaWxkKHNpZGVTcGFuKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb250YWluZXI7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBjcmVhdGVDb250YWluZXIgZnJvbSAnLi9kb20nO1xuXG5jcmVhdGVDb250YWluZXIoKTtcbiJdLCJuYW1lcyI6WyJjcmVhdGVDb250YWluZXIiLCJhbHBoTGFiZWwiLCJjb250YWluZXIiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJnYW1lYm9hcmQiLCJ0b3BDb250Iiwic2lkZUNvbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJxdWVyeVNlbGVjdG9yIiwiYXBwZW5kQ2hpbGQiLCJpIiwic3BhbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJjb25zb2xlIiwibG9nIiwiTWF0aCIsImZsb29yIiwib2Zmc2V0TGVmdCIsIm9mZnNldFRvcCIsImxlbmd0aCIsInRvcFNwYW4iLCJ0ZXh0Q29udGVudCIsInNpZGVTcGFuIl0sInNvdXJjZVJvb3QiOiIifQ==