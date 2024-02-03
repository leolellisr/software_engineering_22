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

/***/ "./cypress/integration/insert_aluno.spec.js":
/*!**************************************************!*\
  !*** ./cypress/integration/insert_aluno.spec.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


describe('test suite', function () {
  it('Visit my server', function () {
    cy.visit('http://127.0.0.1:3000/');
  });
  it('Login test', function () {
    cy.visit('http://127.0.0.1:3000/authentication');
    cy.get('[type="text"]').type('elias');
    cy.get('[type="password"]').type('kento');
    cy.contains('ENVIA').click();
    cy.contains('div', 'Sucesso');
  });
  it('Cadastro de Aluno', function () {
    Cypress.Cookies.preserveOnce();
    cy.setCookie('userAuth', JSON.stringify({
      "key": "secret",
      "role": "admin",
      "nome": "elias"
    }));
    cy.visit('http://127.0.0.1:3000/');
    cy.get('[id="ra"]').type('444444');
    cy.get('[id="nome"]').type('Peter Parker');
    cy.get('[id="curso"]').type('Vingadores');
    cy.contains('INSERE').click();
    cy.contains('[id="msg"]', 'Aluno inserido com sucesso');
  });
});

/***/ }),

/***/ 0:
/*!********************************************************!*\
  !*** multi ./cypress/integration/insert_aluno.spec.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/node/cypress/integration/insert_aluno.spec.js */"./cypress/integration/insert_aluno.spec.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vY3lwcmVzcy9pbnRlZ3JhdGlvbi9pbnNlcnRfYWx1bm8uc3BlYy5qcyJdLCJuYW1lcyI6WyJkZXNjcmliZSIsIml0IiwiY3kiLCJ2aXNpdCIsImdldCIsInR5cGUiLCJjb250YWlucyIsImNsaWNrIiwiQ3lwcmVzcyIsIkNvb2tpZXMiLCJwcmVzZXJ2ZU9uY2UiLCJzZXRDb29raWUiLCJKU09OIiwic3RyaW5naWZ5Il0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNsRkFBLFFBQVEsQ0FBQyxZQUFELEVBQWUsWUFBVztBQUU5QkMsSUFBRSxDQUFDLGlCQUFELEVBQW9CLFlBQVU7QUFDOUJDLE1BQUUsQ0FBQ0MsS0FBSCxDQUFTLHdCQUFUO0FBQ0QsR0FGQyxDQUFGO0FBSUFGLElBQUUsQ0FBQyxZQUFELEVBQWUsWUFBVTtBQUN6QkMsTUFBRSxDQUFDQyxLQUFILENBQVMsc0NBQVQ7QUFDQUQsTUFBRSxDQUFDRSxHQUFILENBQU8sZUFBUCxFQUNHQyxJQURILENBQ1EsT0FEUjtBQUVBSCxNQUFFLENBQUNFLEdBQUgsQ0FBTyxtQkFBUCxFQUNHQyxJQURILENBQ1EsT0FEUjtBQUVBSCxNQUFFLENBQUNJLFFBQUgsQ0FBWSxPQUFaLEVBQXFCQyxLQUFyQjtBQUNBTCxNQUFFLENBQUNJLFFBQUgsQ0FBWSxLQUFaLEVBQW1CLFNBQW5CO0FBQ0QsR0FSQyxDQUFGO0FBVUVMLElBQUUsQ0FBQyxtQkFBRCxFQUFzQixZQUFVO0FBQ2hDTyxXQUFPLENBQUNDLE9BQVIsQ0FBZ0JDLFlBQWhCO0FBQ0FSLE1BQUUsQ0FBQ1MsU0FBSCxDQUFhLFVBQWIsRUFBeUJDLElBQUksQ0FBQ0MsU0FBTCxDQUFlO0FBQUMsYUFBTSxRQUFQO0FBQWlCLGNBQU8sT0FBeEI7QUFBaUMsY0FBUTtBQUF6QyxLQUFmLENBQXpCO0FBQ0FYLE1BQUUsQ0FBQ0MsS0FBSCxDQUFTLHdCQUFUO0FBQ0FELE1BQUUsQ0FBQ0UsR0FBSCxDQUFPLFdBQVAsRUFDR0MsSUFESCxDQUNRLFFBRFI7QUFFQUgsTUFBRSxDQUFDRSxHQUFILENBQU8sYUFBUCxFQUNHQyxJQURILENBQ1EsY0FEUjtBQUVBSCxNQUFFLENBQUNFLEdBQUgsQ0FBTyxjQUFQLEVBQ0dDLElBREgsQ0FDUSxZQURSO0FBRUFILE1BQUUsQ0FBQ0ksUUFBSCxDQUFZLFFBQVosRUFBc0JDLEtBQXRCO0FBQ0FMLE1BQUUsQ0FBQ0ksUUFBSCxDQUFZLFlBQVosRUFBMEIsNEJBQTFCO0FBQ0QsR0FaQyxDQUFGO0FBY0gsQ0E5QkssQ0FBUixDIiwiZmlsZSI6Imluc2VydF9hbHVuby5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwiZGVzY3JpYmUoJ3Rlc3Qgc3VpdGUnLCBmdW5jdGlvbigpIHtcbiAgXG4gICAgaXQoJ1Zpc2l0IG15IHNlcnZlcicsIGZ1bmN0aW9uKCl7XG4gICAgICBjeS52aXNpdCgnaHR0cDovLzEyNy4wLjAuMTozMDAwLycpICAgIFxuICAgIH0pXG4gIFxuICAgIGl0KCdMb2dpbiB0ZXN0JywgZnVuY3Rpb24oKXtcbiAgICAgIGN5LnZpc2l0KCdodHRwOi8vMTI3LjAuMC4xOjMwMDAvYXV0aGVudGljYXRpb24nKVxuICAgICAgY3kuZ2V0KCdbdHlwZT1cInRleHRcIl0nKVxuICAgICAgICAudHlwZSgnZWxpYXMnKVxuICAgICAgY3kuZ2V0KCdbdHlwZT1cInBhc3N3b3JkXCJdJylcbiAgICAgICAgLnR5cGUoJ2tlbnRvJylcbiAgICAgIGN5LmNvbnRhaW5zKCdFTlZJQScpLmNsaWNrKClcbiAgICAgIGN5LmNvbnRhaW5zKCdkaXYnLCAnU3VjZXNzbycpXG4gICAgfSlcbiBcbiAgICAgIGl0KCdDYWRhc3RybyBkZSBBbHVubycsIGZ1bmN0aW9uKCl7XG4gICAgICAgIEN5cHJlc3MuQ29va2llcy5wcmVzZXJ2ZU9uY2UoKVxuICAgICAgICBjeS5zZXRDb29raWUoJ3VzZXJBdXRoJywgSlNPTi5zdHJpbmdpZnkoe1wia2V5XCI6XCJzZWNyZXRcIiwgXCJyb2xlXCI6XCJhZG1pblwiLCBcIm5vbWVcIjogXCJlbGlhc1wifSkpXG4gICAgICAgIGN5LnZpc2l0KCdodHRwOi8vMTI3LjAuMC4xOjMwMDAvJylcbiAgICAgICAgY3kuZ2V0KCdbaWQ9XCJyYVwiXScpXG4gICAgICAgICAgLnR5cGUoJzQ0NDQ0NCcpXG4gICAgICAgIGN5LmdldCgnW2lkPVwibm9tZVwiXScpXG4gICAgICAgICAgLnR5cGUoJ1BldGVyIFBhcmtlcicpXG4gICAgICAgIGN5LmdldCgnW2lkPVwiY3Vyc29cIl0nKVxuICAgICAgICAgIC50eXBlKCdWaW5nYWRvcmVzJylcbiAgICAgICAgY3kuY29udGFpbnMoJ0lOU0VSRScpLmNsaWNrKClcbiAgICAgICAgY3kuY29udGFpbnMoJ1tpZD1cIm1zZ1wiXScsICdBbHVubyBpbnNlcmlkbyBjb20gc3VjZXNzbycpXG4gICAgICB9KVxuXG4gIH0pOyJdLCJzb3VyY2VSb290IjoiIn0=