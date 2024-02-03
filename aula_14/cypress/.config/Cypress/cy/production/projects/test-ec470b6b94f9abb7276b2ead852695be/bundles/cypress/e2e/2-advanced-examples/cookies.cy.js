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

/***/ "./cypress/e2e/2-advanced-examples/cookies.cy.js":
/*!*******************************************************!*\
  !*** ./cypress/e2e/2-advanced-examples/cookies.cy.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/// <reference types="cypress" />
context('Cookies', () => {
  beforeEach(() => {
    Cypress.Cookies.debug(true);
    cy.visit('https://example.cypress.io/commands/cookies'); // clear cookies again after visiting to remove
    // any 3rd party cookies picked up such as cloudflare

    cy.clearCookies();
  });
  it('cy.getCookie() - get a browser cookie', () => {
    // https://on.cypress.io/getcookie
    cy.get('#getCookie .set-a-cookie').click(); // cy.getCookie() yields a cookie object

    cy.getCookie('token').should('have.property', 'value', '123ABC');
  });
  it('cy.getCookies() - get browser cookies', () => {
    // https://on.cypress.io/getcookies
    cy.getCookies().should('be.empty');
    cy.get('#getCookies .set-a-cookie').click(); // cy.getCookies() yields an array of cookies

    cy.getCookies().should('have.length', 1).should(cookies => {
      // each cookie has these properties
      expect(cookies[0]).to.have.property('name', 'token');
      expect(cookies[0]).to.have.property('value', '123ABC');
      expect(cookies[0]).to.have.property('httpOnly', false);
      expect(cookies[0]).to.have.property('secure', false);
      expect(cookies[0]).to.have.property('domain');
      expect(cookies[0]).to.have.property('path');
    });
  });
  it('cy.setCookie() - set a browser cookie', () => {
    // https://on.cypress.io/setcookie
    cy.getCookies().should('be.empty');
    cy.setCookie('foo', 'bar'); // cy.getCookie() yields a cookie object

    cy.getCookie('foo').should('have.property', 'value', 'bar');
  });
  it('cy.clearCookie() - clear a browser cookie', () => {
    // https://on.cypress.io/clearcookie
    cy.getCookie('token').should('be.null');
    cy.get('#clearCookie .set-a-cookie').click();
    cy.getCookie('token').should('have.property', 'value', '123ABC'); // cy.clearCookies() yields null

    cy.clearCookie('token').should('be.null');
    cy.getCookie('token').should('be.null');
  });
  it('cy.clearCookies() - clear browser cookies', () => {
    // https://on.cypress.io/clearcookies
    cy.getCookies().should('be.empty');
    cy.get('#clearCookies .set-a-cookie').click();
    cy.getCookies().should('have.length', 1); // cy.clearCookies() yields null

    cy.clearCookies();
    cy.getCookies().should('be.empty');
  });
});

/***/ }),

/***/ 0:
/*!*************************************************************!*\
  !*** multi ./cypress/e2e/2-advanced-examples/cookies.cy.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/node/test/cypress/e2e/2-advanced-examples/cookies.cy.js */"./cypress/e2e/2-advanced-examples/cookies.cy.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vY3lwcmVzcy9lMmUvMi1hZHZhbmNlZC1leGFtcGxlcy9jb29raWVzLmN5LmpzIl0sIm5hbWVzIjpbImNvbnRleHQiLCJiZWZvcmVFYWNoIiwiQ3lwcmVzcyIsIkNvb2tpZXMiLCJkZWJ1ZyIsImN5IiwidmlzaXQiLCJjbGVhckNvb2tpZXMiLCJpdCIsImdldCIsImNsaWNrIiwiZ2V0Q29va2llIiwic2hvdWxkIiwiZ2V0Q29va2llcyIsImNvb2tpZXMiLCJleHBlY3QiLCJ0byIsImhhdmUiLCJwcm9wZXJ0eSIsInNldENvb2tpZSIsImNsZWFyQ29va2llIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFFQUEsT0FBTyxDQUFDLFNBQUQsRUFBWSxNQUFNO0FBQ3ZCQyxZQUFVLENBQUMsTUFBTTtBQUNmQyxXQUFP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SUFBRSxDQUFDLDJDQUFELEVBQThDLE1BQU07QUFDcEQ7QUFDQUgsTUFBRSxDQUFDUSxVQUFILEdBQWdCRCxNQUFoQixDQUF1QixVQUF2QjtBQUVBUCxNQUFFLENBQUNJLEdBQUgsQ0FBTyw2QkFBUCxFQUFzQ0MsS0FBdEM7QUFFQUwsTUFBRSxDQUFDUSxVQUFILEdBQWdCRCxNQUFoQixDQUF1QixhQUF2QixFQUFzQyxDQUF0QyxFQU5vRCxDQVFwRDs7QUFDQVAsTUFBRSxDQUFDRSxZQUFIO0FBRUFGLE1BQUUsQ0FBQ1EsVUFBSCxHQUFnQkQsTUFBaEIsQ0FBdUIsVUFBdkI7QUFDRCxHQVpDLENBQUY7QUFhRCxDQTFFTSxDQUFQLEMiLCJmaWxlIjoiY29va2llcy5jeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsIi8vLyA8cmVmZXJlbmNlIHR5cGVzPVwiY3lwcmVzc1wiIC8+XG5cbmNvbnRleHQoJ0Nvb2tpZXMnLCAoKSA9PiB7XG4gIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgIEN5cHJlc3MuQ29va2llcy5kZWJ1Zyh0cnVlKVxuXG4gICAgY3kudmlzaXQoJ2h0dHBzOi8vZXhhbXBsZS5jeXByZXNzLmlvL2NvbW1hbmRzL2Nvb2tpZXMnKVxuXG4gICAgLy8gY2xlYXIgY29va2llcyBhZ2FpbiBhZnRlciB2aXNpdGluZyB0byByZW1vdmVcbiAgICAvLyBhbnkgM3JkIHBhcnR5IGNvb2tpZXMgcGlja2VkIHVwIHN1Y2ggYXMgY2xvdWRmbGFyZVxuICAgIGN5LmNsZWFyQ29va2llcygpXG4gIH0pXG5cbiAgaXQoJ2N5LmdldENvb2tpZSgpIC0gZ2V0IGEgYnJvd3NlciBjb29raWUnLCAoKSA9PiB7XG4gICAgLy8gaHR0cHM6Ly9vbi5jeXByZXNzLmlvL2dldGNvb2tpZVxuICAgIGN5LmdldCgnI2dldENvb2tpZSAuc2V0LWEtY29va2llJykuY2xpY2soKVxuXG4gICAgLy8gY3kuZ2V0Q29va2llKCkgeWllbGRzIGEgY29va2llIG9iamVjdFxuICAgIGN5LmdldENvb2tpZSgndG9rZW4nKS5zaG91bGQoJ2hhdmUucHJvcGVydHknLCAndmFsdWUnLCAnMTIzQUJDJylcbiAgfSlcblxuICBpdCgnY3kuZ2V0Q29va2llcygpIC0gZ2V0IGJyb3dzZXIgY29va2llcycsICgpID0+IHtcbiAgICAvLyBodHRwczovL29uLmN5cHJlc3MuaW8vZ2V0Y29va2llc1xuICAgIGN5LmdldENvb2tpZXMoKS5zaG91bGQoJ2JlLmVtcHR5JylcblxuICAgIGN5LmdldCgnI2dldENvb2tpZXMgLnNldC1hLWNvb2tpZScpLmNsaWNrKClcblxuICAgIC8vIGN5LmdldENvb2tpZXMoKSB5aWVsZHMgYW4gYXJyYXkgb2YgY29va2llc1xuICAgIGN5LmdldENvb2tpZXMoKS5zaG91bGQoJ2hhdmUubGVuZ3RoJywgMSkuc2hvdWxkKChjb29raWVzKSA9PiB7XG4gICAgICAvLyBlYWNoIGNvb2tpZSBoYXMgdGhlc2UgcHJvcGVydGllc1xuICAgICAgZXhwZWN0KGNvb2tpZXNbMF0pLnRvLmhhdmUucHJvcGVydHkoJ25hbWUnLCAndG9rZW4nKVxuICAgICAgZXhwZWN0KGNvb2tpZXNbMF0pLnRvLmhhdmUucHJvcGVydHkoJ3ZhbHVlJywgJzEyM0FCQycpXG4gICAgICBleHBlY3QoY29va2llc1swXSkudG8uaGF2ZS5wcm9wZXJ0eSgnaHR0cE9ubHknLCBmYWxzZSlcbiAgICAgIGV4cGVjdChjb29raWVzWzBdKS50by5oYXZlLnByb3BlcnR5KCdzZWN1cmUnLCBmYWxzZSlcbiAgICAgIGV4cGVjdChjb29raWVzWzBdKS50by5oYXZlLnByb3BlcnR5KCdkb21haW4nKVxuICAgICAgZXhwZWN0KGNvb2tpZXNbMF0pLnRvLmhhdmUucHJvcGVydHkoJ3BhdGgnKVxuICAgIH0pXG4gIH0pXG5cbiAgaXQoJ2N5LnNldENvb2tpZSgpIC0gc2V0IGEgYnJvd3NlciBjb29raWUnLCAoKSA9PiB7XG4gICAgLy8gaHR0cHM6Ly9vbi5jeXByZXNzLmlvL3NldGNvb2tpZVxuICAgIGN5LmdldENvb2tpZXMoKS5zaG91bGQoJ2JlLmVtcHR5JylcblxuICAgIGN5LnNldENvb2tpZSgnZm9vJywgJ2JhcicpXG5cbiAgICAvLyBjeS5nZXRDb29raWUoKSB5aWVsZHMgYSBjb29raWUgb2JqZWN0XG4gICAgY3kuZ2V0Q29va2llKCdmb28nKS5zaG91bGQoJ2hhdmUucHJvcGVydHknLCAndmFsdWUnLCAnYmFyJylcbiAgfSlcblxuICBpdCgnY3kuY2xlYXJDb29raWUoKSAtIGNsZWFyIGEgYnJvd3NlciBjb29raWUnLCAoKSA9PiB7XG4gICAgLy8gaHR0cHM6Ly9vbi5jeXByZXNzLmlvL2NsZWFyY29va2llXG4gICAgY3kuZ2V0Q29va2llKCd0b2tlbicpLnNob3VsZCgnYmUubnVsbCcpXG5cbiAgICBjeS5nZXQoJyNjbGVhckNvb2tpZSAuc2V0LWEtY29va2llJykuY2xpY2soKVxuXG4gICAgY3kuZ2V0Q29va2llKCd0b2tlbicpLnNob3VsZCgnaGF2ZS5wcm9wZXJ0eScsICd2YWx1ZScsICcxMjNBQkMnKVxuXG4gICAgLy8gY3kuY2xlYXJDb29raWVzKCkgeWllbGRzIG51bGxcbiAgICBjeS5jbGVhckNvb2tpZSgndG9rZW4nKS5zaG91bGQoJ2JlLm51bGwnKVxuXG4gICAgY3kuZ2V0Q29va2llKCd0b2tlbicpLnNob3VsZCgnYmUubnVsbCcpXG4gIH0pXG5cbiAgaXQoJ2N5LmNsZWFyQ29va2llcygpIC0gY2xlYXIgYnJvd3NlciBjb29raWVzJywgKCkgPT4ge1xuICAgIC8vIGh0dHBzOi8vb24uY3lwcmVzcy5pby9jbGVhcmNvb2tpZXNcbiAgICBjeS5nZXRDb29raWVzKCkuc2hvdWxkKCdiZS5lbXB0eScpXG5cbiAgICBjeS5nZXQoJyNjbGVhckNvb2tpZXMgLnNldC1hLWNvb2tpZScpLmNsaWNrKClcblxuICAgIGN5LmdldENvb2tpZXMoKS5zaG91bGQoJ2hhdmUubGVuZ3RoJywgMSlcblxuICAgIC8vIGN5LmNsZWFyQ29va2llcygpIHlpZWxkcyBudWxsXG4gICAgY3kuY2xlYXJDb29raWVzKClcblxuICAgIGN5LmdldENvb2tpZXMoKS5zaG91bGQoJ2JlLmVtcHR5JylcbiAgfSlcbn0pXG4iXSwic291cmNlUm9vdCI6IiJ9