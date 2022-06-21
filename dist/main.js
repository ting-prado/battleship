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

(0,_dom__WEBPACK_IMPORTED_MODULE_0__.createContainer)();
(0,_dom__WEBPACK_IMPORTED_MODULE_0__.createBlocks)();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QixHQUFDLEVBQTVCLEVBQWdDO1VBQzlCZ0IsT0FBTyxDQUFDQyxHQUFSLENBQVlRLE9BQU8sR0FBR3pCLEdBQXRCLEVBQXlCd0IsTUFBekI7UUFDRDtNQUNGO0lBQ0YsQ0FWRCxNQVVPO01BQ0xSLE9BQU8sQ0FBQ0MsR0FBUixDQUFZUSxPQUFaLEVBQXFCRCxNQUFyQjtJQUNEO0VBQ0YsQ0FwQkQ7QUFxQkQ7Ozs7Ozs7O1VDcEVEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOQTtBQUVBcEMscURBQWU7QUFDZmtCLGtEQUFZLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXBsdXNwbHVzICovXG5mdW5jdGlvbiBjcmVhdGVDb250YWluZXIoKSB7XG4gIGNvbnN0IGFscGhMYWJlbCA9IFsnQScsICdCJywgJ0MnLCAnRCcsICdFJywgJ0YnLCAnRycsICdIJywgJ0knLCAnSiddO1xuXG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb25zdCBnYW1lYm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29uc3QgdG9wQ29udCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb25zdCBzaWRlQ29udCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgnY29udGFpbmVyJyk7XG4gIGdhbWVib2FyZC5jbGFzc0xpc3QuYWRkKCdnYW1lYm9hcmQnKTtcbiAgdG9wQ29udC5jbGFzc0xpc3QuYWRkKCd0b3BDb250Jyk7XG4gIHNpZGVDb250LmNsYXNzTGlzdC5hZGQoJ3NpZGVDb250Jyk7XG5cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChnYW1lYm9hcmQpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQodG9wQ29udCk7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChzaWRlQ29udCk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xuICAgIGNvbnN0IHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgc3Bhbi5jbGFzc0xpc3QuYWRkKCdncmlkJyk7XG4gICAgZ2FtZWJvYXJkLmFwcGVuZENoaWxkKHNwYW4pO1xuICB9XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbHBoTGFiZWwubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCB0b3BTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIHRvcFNwYW4udGV4dENvbnRlbnQgPSBhbHBoTGFiZWxbaV07XG4gICAgdG9wQ29udC5hcHBlbmRDaGlsZCh0b3BTcGFuKTtcblxuICAgIGNvbnN0IHNpZGVTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIHNpZGVTcGFuLnRleHRDb250ZW50ID0gaSArIDE7XG4gICAgc2lkZUNvbnQuYXBwZW5kQ2hpbGQoc2lkZVNwYW4pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUJsb2NrcygpIHtcbiAgY29uc3QgYmxvY2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29uc3QgYnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uJyk7XG4gIGJsb2NrLmNsYXNzTGlzdC5hZGQoJ2RyYWdnYWJsZScpO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZWJvYXJkJykuYXBwZW5kQ2hpbGQoYmxvY2spO1xuXG4gIGJsb2NrLmRyYWdnYWJsZSA9IHRydWU7XG4gIGJsb2NrLnN0eWxlLmxlZnQgPSBgJHtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA4ICsgMSkgKiAxMH0lYDtcbiAgYmxvY2suc3R5bGUudG9wID0gJzAlJzsgLy8gYCR7TWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogOSArIDEpICogMTB9JWA7XG4gIGNvbnNvbGUubG9nKGJsb2NrLnN0eWxlLmxlZnQsIGJsb2NrLnN0eWxlLnRvcCk7XG5cbiAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGNvbnN0IHBvcyA9IGJsb2NrLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IHdpZHRoID0gTWF0aC5jZWlsKHBvcy53aWR0aCAvIDQwLjkxKTtcbiAgICBjb25zdCBoZWlnaHQgPSBNYXRoLmNlaWwocG9zLmhlaWdodCAvIDQwLjkxKTtcbiAgICBjb25zdCBwb3NUb3AgPSBNYXRoLmZsb29yKHBvcy50b3AgLyA0MC45MSkgLSAxO1xuICAgIGNvbnN0IHBvc0xlZnQgPSBNYXRoLmZsb29yKHBvcy5sZWZ0IC8gNDAuOTEpIC0gNztcblxuICAgIGlmICh3aWR0aCA+IDEgfHwgaGVpZ2h0ID4gMSkge1xuICAgICAgaWYgKGhlaWdodCA+IDEpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBoZWlnaHQ7IGkrKykge1xuICAgICAgICAgIGNvbnNvbGUubG9nKHBvc0xlZnQsIHBvc1RvcCArIGkpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHdpZHRoID4gMSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdpZHRoOyBpKyspIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhwb3NMZWZ0ICsgaSwgcG9zVG9wKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhwb3NMZWZ0LCBwb3NUb3ApO1xuICAgIH1cbiAgfSk7XG59XG5cbmV4cG9ydCB7IGNyZWF0ZUNvbnRhaW5lciwgY3JlYXRlQmxvY2tzIH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGNyZWF0ZUNvbnRhaW5lciwgY3JlYXRlQmxvY2tzIH0gZnJvbSAnLi9kb20nO1xuXG5jcmVhdGVDb250YWluZXIoKTtcbmNyZWF0ZUJsb2NrcygpO1xuIl0sIm5hbWVzIjpbImNyZWF0ZUNvbnRhaW5lciIsImFscGhMYWJlbCIsImNvbnRhaW5lciIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImdhbWVib2FyZCIsInRvcENvbnQiLCJzaWRlQ29udCIsImNsYXNzTGlzdCIsImFkZCIsInF1ZXJ5U2VsZWN0b3IiLCJhcHBlbmRDaGlsZCIsImkiLCJzcGFuIiwibGVuZ3RoIiwidG9wU3BhbiIsInRleHRDb250ZW50Iiwic2lkZVNwYW4iLCJjcmVhdGVCbG9ja3MiLCJibG9jayIsImJ0biIsImRyYWdnYWJsZSIsInN0eWxlIiwibGVmdCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInRvcCIsImNvbnNvbGUiLCJsb2ciLCJhZGRFdmVudExpc3RlbmVyIiwicG9zIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0Iiwid2lkdGgiLCJjZWlsIiwiaGVpZ2h0IiwicG9zVG9wIiwicG9zTGVmdCJdLCJzb3VyY2VSb290IjoiIn0=