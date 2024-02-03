/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./cypress/e2e/2-advanced-examples/connectors.cy.js":
/*!**********************************************************!*\
  !*** ./cypress/e2e/2-advanced-examples/connectors.cy.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/// <reference types="cypress" />
context('Connectors', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/connectors');
  });
  it('.each() - iterate over an array of elements', () => {
    // https://on.cypress.io/each
    cy.get('.connectors-each-ul>li').each(($el, index, $list) => {
      console.log($el, index, $list);
    });
  });
  it('.its() - get properties on the current subject', () => {
    // https://on.cypress.io/its
    cy.get('.connectors-its-ul>li') // calls the 'length' property yielding that value
    .its('length').should('be.gt', 2);
  });
  it('.invoke() - invoke a function on the current subject', () => {
    // our div is hidden in our script.js
    // $('.connectors-div').hide()
    // https://on.cypress.io/invoke
    cy.get('.connectors-div').should('be.hidden') // call the jquery method 'show' on the 'div.container'
    .invoke('show').should('be.visible');
  });
  it('.spread() - spread an array as individual args to callback function', () => {
    // https://on.cypress.io/spread
    const arr = ['foo', 'bar', 'baz'];
    cy.wrap(arr).spread((foo, bar, baz) => {
      expect(foo).to.eq('foo');
      expect(bar).to.eq('bar');
      expect(baz).to.eq('baz');
    });
  });
  describe('.then()', () => {
    it('invokes a callback function with the current subject', () => {
      // https://on.cypress.io/then
      cy.get('.connectors-list > li').then($lis => {
        expect($lis, '3 items').to.have.length(3);
        expect($lis.eq(0), 'first item').to.contain('Walk the dog');
        expect($lis.eq(1), 'second item').to.contain('Feed the cat');
        expect($lis.eq(2), 'third item').to.contain('Write JavaScript');
      });
    });
    it('yields the returned value to the next command', () => {
      cy.wrap(1).then(num => {
        expect(num).to.equal(1);
        return 2;
      }).then(num => {
        expect(num).to.equal(2);
      });
    });
    it('yields the original subject without return', () => {
      cy.wrap(1).then(num => {
        expect(num).to.equal(1); // note that nothing is returned from this callback
      }).then(num => {
        // this callback receives the original unchanged value 1
        expect(num).to.equal(1);
      });
    });
    it('yields the value yielded by the last Cypress command inside', () => {
      cy.wrap(1).then(num => {
        expect(num).to.equal(1); // note how we run a Cypress command
        // the result yielded by this Cypress command
        // will be passed to the second ".then"

        cy.wrap(2);
      }).then(num => {
        // this callback receives the value yielded by "cy.wrap(2)"
        expect(num).to.equal(2);
      });
    });
  });
});

/***/ }),

/***/ 0:
/*!****************************************************************!*\
  !*** multi ./cypress/e2e/2-advanced-examples/connectors.cy.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/node/test/cypress/e2e/2-advanced-examples/connectors.cy.js */"./cypress/e2e/2-advanced-examples/connectors.cy.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vY3lwcmVzcy9lMmUvMi1hZHZhbmNlZC1leGFtcGxlcy9jb25uZWN0b3JzLmN5LmpzIl0sIm5hbWVzIjpbImNvbnRleHQiLCJiZWZvcmVFYWNoIiwiY3kiLCJ2aXNpdCIsIml0IiwiZ2V0IiwiZWFjaCIsIiRlbCIsImluZGV4IiwiJGxpc3QiLCJjb25zb2xlIiwibG9nIiwiaXRzIiwic2hvdWxkIiwiaW52b2tlIiwiYXJyIiwid3JhcCIsInNwcmVhZCIsImZvbyIsImJhciIsImJheiIsImV4cGVjdCIsInRvIiwiZXEiLCJkZXNjcmliZSIsInRoZW4iLCIkbGlzIiwiaGF2ZSIsImxlbmd0aCIsImNvbnRhaW4iLCJudW0iLCJlcXVhbCJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBO0FBRUFBLE9BQU8sQ0FBQyxZQUFE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LEVBQVosQ0FBZVMsS0FBZixDQUFxQixDQUFyQjtBQUNELE9BUkg7QUFTRCxLQVZDLENBQUY7QUFZQTNCLE1BQUUsQ0FBQyw0Q0FBRCxFQUErQyxNQUFNO0FBQ3JERixRQUFFLENBQUNjLElBQUgsQ0FBUSxDQUFSLEVBQ0dTLElBREgsQ0FDU0ssR0FBRCxJQUFTO0FBQ2JULGNBQU0sQ0FBQ1MsR0FBRCxDQUFOLENBQVlSLEVBQVosQ0FBZVMsS0FBZixDQUFxQixDQUFyQixFQURhLENBRWI7QUFDRCxPQUpILEVBS0dOLElBTEgsQ0FLU0ssR0FBRCxJQUFTO0FBQ2I7QUFDQVQsY0FBTSxDQUFDUyxHQUFELENBQU4sQ0FBWVIsRUFBWixDQUFlUyxLQUFmLENBQXFCLENBQXJCO0FBQ0QsT0FSSDtBQVNELEtBVkMsQ0FBRjtBQVlBM0IsTUFBRSxDQUFDLDZEQUFELEVBQWdFLE1BQU07QUFDdEVGLFFBQUUsQ0FBQ2MsSUFBSCxDQUFRLENBQVIsRUFDR1MsSUFESCxDQUNTSyxHQUFELElBQVM7QUFDYlQsY0FBTSxDQUFDUyxHQUFELENBQU4sQ0FBWVIsRUFBWixDQUFlUyxLQUFmLENBQXFCLENBQXJCLEVBRGEsQ0FFYjtBQUNBO0FBQ0E7O0FBQ0E3QixVQUFFLENBQUNjLElBQUgsQ0FBUSxDQUFSO0FBQ0QsT0FQSCxFQVFHUyxJQVJILENBUVNLLEdBQUQsSUFBUztBQUNiO0FBQ0FULGNBQU0sQ0FBQ1MsR0FBRCxDQUFOLENBQVlSLEVBQVosQ0FBZVMsS0FBZixDQUFxQixDQUFyQjtBQUNELE9BWEg7QUFZRCxLQWJDLENBQUY7QUFjRCxHQWxETyxDQUFSO0FBbURELENBOUZNLENBQVAsQyIsImZpbGUiOiJjb25uZWN0b3JzLmN5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwiLy8vIDxyZWZlcmVuY2UgdHlwZXM9XCJjeXByZXNzXCIgLz5cblxuY29udGV4dCgnQ29ubmVjdG9ycycsICgpID0+IHtcbiAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgY3kudmlzaXQoJ2h0dHBzOi8vZXhhbXBsZS5jeXByZXNzLmlvL2NvbW1hbmRzL2Nvbm5lY3RvcnMnKVxuICB9KVxuXG4gIGl0KCcuZWFjaCgpIC0gaXRlcmF0ZSBvdmVyIGFuIGFycmF5IG9mIGVsZW1lbnRzJywgKCkgPT4ge1xuICAgIC8vIGh0dHBzOi8vb24uY3lwcmVzcy5pby9lYWNoXG4gICAgY3kuZ2V0KCcuY29ubmVjdG9ycy1lYWNoLXVsPmxpJylcbiAgICAgIC5lYWNoKCgkZWwsIGluZGV4LCAkbGlzdCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygkZWwsIGluZGV4LCAkbGlzdClcbiAgICAgIH0pXG4gIH0pXG5cbiAgaXQoJy5pdHMoKSAtIGdldCBwcm9wZXJ0aWVzIG9uIHRoZSBjdXJyZW50IHN1YmplY3QnLCAoKSA9PiB7XG4gICAgLy8gaHR0cHM6Ly9vbi5jeXByZXNzLmlvL2l0c1xuICAgIGN5LmdldCgnLmNvbm5lY3RvcnMtaXRzLXVsPmxpJylcbiAgICAgIC8vIGNhbGxzIHRoZSAnbGVuZ3RoJyBwcm9wZXJ0eSB5aWVsZGluZyB0aGF0IHZhbHVlXG4gICAgICAuaXRzKCdsZW5ndGgnKVxuICAgICAgLnNob3VsZCgnYmUuZ3QnLCAyKVxuICB9KVxuXG4gIGl0KCcuaW52b2tlKCkgLSBpbnZva2UgYSBmdW5jdGlvbiBvbiB0aGUgY3VycmVudCBzdWJqZWN0JywgKCkgPT4ge1xuICAgIC8vIG91ciBkaXYgaXMgaGlkZGVuIGluIG91ciBzY3JpcHQuanNcbiAgICAvLyAkKCcuY29ubmVjdG9ycy1kaXYnKS5oaWRlKClcblxuICAgIC8vIGh0dHBzOi8vb24uY3lwcmVzcy5pby9pbnZva2VcbiAgICBjeS5nZXQoJy5jb25uZWN0b3JzLWRpdicpLnNob3VsZCgnYmUuaGlkZGVuJylcbiAgICAgIC8vIGNhbGwgdGhlIGpxdWVyeSBtZXRob2QgJ3Nob3cnIG9uIHRoZSAnZGl2LmNvbnRhaW5lcidcbiAgICAgIC5pbnZva2UoJ3Nob3cnKVxuICAgICAgLnNob3VsZCgnYmUudmlzaWJsZScpXG4gIH0pXG5cbiAgaXQoJy5zcHJlYWQoKSAtIHNwcmVhZCBhbiBhcnJheSBhcyBpbmRpdmlkdWFsIGFyZ3MgdG8gY2FsbGJhY2sgZnVuY3Rpb24nLCAoKSA9PiB7XG4gICAgLy8gaHR0cHM6Ly9vbi5jeXByZXNzLmlvL3NwcmVhZFxuICAgIGNvbnN0IGFyciA9IFsnZm9vJywgJ2JhcicsICdiYXonXVxuXG4gICAgY3kud3JhcChhcnIpLnNwcmVhZCgoZm9vLCBiYXIsIGJheikgPT4ge1xuICAgICAgZXhwZWN0KGZvbykudG8uZXEoJ2ZvbycpXG4gICAgICBleHBlY3QoYmFyKS50by5lcSgnYmFyJylcbiAgICAgIGV4cGVjdChiYXopLnRvLmVxKCdiYXonKVxuICAgIH0pXG4gIH0pXG5cbiAgZGVzY3JpYmUoJy50aGVuKCknLCAoKSA9PiB7XG4gICAgaXQoJ2ludm9rZXMgYSBjYWxsYmFjayBmdW5jdGlvbiB3aXRoIHRoZSBjdXJyZW50IHN1YmplY3QnLCAoKSA9PiB7XG4gICAgICAvLyBodHRwczovL29uLmN5cHJlc3MuaW8vdGhlblxuICAgICAgY3kuZ2V0KCcuY29ubmVjdG9ycy1saXN0ID4gbGknKVxuICAgICAgICAudGhlbigoJGxpcykgPT4ge1xuICAgICAgICAgIGV4cGVjdCgkbGlzLCAnMyBpdGVtcycpLnRvLmhhdmUubGVuZ3RoKDMpXG4gICAgICAgICAgZXhwZWN0KCRsaXMuZXEoMCksICdmaXJzdCBpdGVtJykudG8uY29udGFpbignV2FsayB0aGUgZG9nJylcbiAgICAgICAgICBleHBlY3QoJGxpcy5lcSgxKSwgJ3NlY29uZCBpdGVtJykudG8uY29udGFpbignRmVlZCB0aGUgY2F0JylcbiAgICAgICAgICBleHBlY3QoJGxpcy5lcSgyKSwgJ3RoaXJkIGl0ZW0nKS50by5jb250YWluKCdXcml0ZSBKYXZhU2NyaXB0JylcbiAgICAgICAgfSlcbiAgICB9KVxuXG4gICAgaXQoJ3lpZWxkcyB0aGUgcmV0dXJuZWQgdmFsdWUgdG8gdGhlIG5leHQgY29tbWFuZCcsICgpID0+IHtcbiAgICAgIGN5LndyYXAoMSlcbiAgICAgICAgLnRoZW4oKG51bSkgPT4ge1xuICAgICAgICAgIGV4cGVjdChudW0pLnRvLmVxdWFsKDEpXG5cbiAgICAgICAgICByZXR1cm4gMlxuICAgICAgICB9KVxuICAgICAgICAudGhlbigobnVtKSA9PiB7XG4gICAgICAgICAgZXhwZWN0KG51bSkudG8uZXF1YWwoMilcbiAgICAgICAgfSlcbiAgICB9KVxuXG4gICAgaXQoJ3lpZWxkcyB0aGUgb3JpZ2luYWwgc3ViamVjdCB3aXRob3V0IHJldHVybicsICgpID0+IHtcbiAgICAgIGN5LndyYXAoMSlcbiAgICAgICAgLnRoZW4oKG51bSkgPT4ge1xuICAgICAgICAgIGV4cGVjdChudW0pLnRvLmVxdWFsKDEpXG4gICAgICAgICAgLy8gbm90ZSB0aGF0IG5vdGhpbmcgaXMgcmV0dXJuZWQgZnJvbSB0aGlzIGNhbGxiYWNrXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChudW0pID0+IHtcbiAgICAgICAgICAvLyB0aGlzIGNhbGxiYWNrIHJlY2VpdmVzIHRoZSBvcmlnaW5hbCB1bmNoYW5nZWQgdmFsdWUgMVxuICAgICAgICAgIGV4cGVjdChudW0pLnRvLmVxdWFsKDEpXG4gICAgICAgIH0pXG4gICAgfSlcblxuICAgIGl0KCd5aWVsZHMgdGhlIHZhbHVlIHlpZWxkZWQgYnkgdGhlIGxhc3QgQ3lwcmVzcyBjb21tYW5kIGluc2lkZScsICgpID0+IHtcbiAgICAgIGN5LndyYXAoMSlcbiAgICAgICAgLnRoZW4oKG51bSkgPT4ge1xuICAgICAgICAgIGV4cGVjdChudW0pLnRvLmVxdWFsKDEpXG4gICAgICAgICAgLy8gbm90ZSBob3cgd2UgcnVuIGEgQ3lwcmVzcyBjb21tYW5kXG4gICAgICAgICAgLy8gdGhlIHJlc3VsdCB5aWVsZGVkIGJ5IHRoaXMgQ3lwcmVzcyBjb21tYW5kXG4gICAgICAgICAgLy8gd2lsbCBiZSBwYXNzZWQgdG8gdGhlIHNlY29uZCBcIi50aGVuXCJcbiAgICAgICAgICBjeS53cmFwKDIpXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChudW0pID0+IHtcbiAgICAgICAgICAvLyB0aGlzIGNhbGxiYWNrIHJlY2VpdmVzIHRoZSB2YWx1ZSB5aWVsZGVkIGJ5IFwiY3kud3JhcCgyKVwiXG4gICAgICAgICAgZXhwZWN0KG51bSkudG8uZXF1YWwoMilcbiAgICAgICAgfSlcbiAgICB9KVxuICB9KVxufSlcbiJdLCJzb3VyY2VSb290IjoiIn0=