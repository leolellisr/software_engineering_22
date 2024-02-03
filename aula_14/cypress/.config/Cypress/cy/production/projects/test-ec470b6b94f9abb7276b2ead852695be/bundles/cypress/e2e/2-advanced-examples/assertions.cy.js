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

/***/ "./cypress/e2e/2-advanced-examples/assertions.cy.js":
/*!**********************************************************!*\
  !*** ./cypress/e2e/2-advanced-examples/assertions.cy.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/// <reference types="cypress" />
context('Assertions', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/assertions');
  });
  describe('Implicit Assertions', () => {
    it('.should() - make an assertion about the current subject', () => {
      // https://on.cypress.io/should
      cy.get('.assertion-table').find('tbody tr:last').should('have.class', 'success').find('td').first() // checking the text of the <td> element in various ways
      .should('have.text', 'Column content').should('contain', 'Column content').should('have.html', 'Column content') // chai-jquery uses "is()" to check if element matches selector
      .should('match', 'td') // to match text content against a regular expression
      // first need to invoke jQuery method text()
      // and then match using regular expression
      .invoke('text').should('match', /column content/i); // a better way to check element's text content against a regular expression
      // is to use "cy.contains"
      // https://on.cypress.io/contains

      cy.get('.assertion-table').find('tbody tr:last') // finds first <td> element with text content matching regular expression
      .contains('td', /column content/i).should('be.visible'); // for more information about asserting element's text
      // see https://on.cypress.io/using-cypress-faq#How-do-I-get-an-element’s-text-contents
    });
    it('.and() - chain multiple assertions together', () => {
      // https://on.cypress.io/and
      cy.get('.assertions-link').should('have.class', 'active').and('have.attr', 'href').and('include', 'cypress.io');
    });
  });
  describe('Explicit Assertions', () => {
    // https://on.cypress.io/assertions
    it('expect - make an assertion about a specified subject', () => {
      // We can use Chai's BDD style assertions
      expect(true).to.be.true;
      const o = {
        foo: 'bar'
      };
      expect(o).to.equal(o);
      expect(o).to.deep.equal({
        foo: 'bar'
      }); // matching text using regular expression

      expect('FooBar').to.match(/bar$/i);
    });
    it('pass your own callback function to should()', () => {
      // Pass a function to should that can have any number
      // of explicit assertions within it.
      // The ".should(cb)" function will be retried
      // automatically until it passes all your explicit assertions or times out.
      cy.get('.assertions-p').find('p').should($p => {
        // https://on.cypress.io/$
        // return an array of texts from all of the p's
        const texts = $p.map((i, el) => Cypress.$(el).text()); // jquery map returns jquery object
        // and .get() convert this to simple array

        const paragraphs = texts.get(); // array should have length of 3

        expect(paragraphs, 'has 3 paragraphs').to.have.length(3); // use second argument to expect(...) to provide clear
        // message with each assertion

        expect(paragraphs, 'has expected text in each paragraph').to.deep.eq(['Some text from first p', 'More text from second p', 'And even more text from third p']);
      });
    });
    it('finds element by class name regex', () => {
      cy.get('.docs-header').find('div') // .should(cb) callback function will be retried
      .should($div => {
        expect($div).to.have.length(1);
        const className = $div[0].className;
        expect(className).to.match(/heading-/);
      }) // .then(cb) callback is not retried,
      // it either passes or fails
      .then($div => {
        expect($div, 'text content').to.have.text('Introduction');
      });
    });
    it('can throw any error', () => {
      cy.get('.docs-header').find('div').should($div => {
        if ($div.length !== 1) {
          // you can throw your own errors
          throw new Error('Did not find 1 element');
        }

        const className = $div[0].className;

        if (!className.match(/heading-/)) {
          throw new Error(`Could not find class "heading-" in ${className}`);
        }
      });
    });
    it('matches unknown text between two elements', () => {
      /**
       * Text from the first element.
       * @type {string}
      */
      let text;
      /**
       * Normalizes passed text,
       * useful before comparing text with spaces and different capitalization.
       * @param {string} s Text to normalize
      */

      const normalizeText = s => s.replace(/\s/g, '').toLowerCase();

      cy.get('.two-elements').find('.first').then($first => {
        // save text from the first element
        text = normalizeText($first.text());
      });
      cy.get('.two-elements').find('.second').should($div => {
        // we can massage text before comparing
        const secondText = normalizeText($div.text());
        expect(secondText, 'second text').to.equal(text);
      });
    });
    it('assert - assert shape of an object', () => {
      const person = {
        name: 'Joe',
        age: 20
      };
      assert.isObject(person, 'value is object');
    });
    it('retries the should callback until assertions pass', () => {
      cy.get('#random-number').should($div => {
        const n = parseFloat($div.text());
        expect(n).to.be.gte(1).and.be.lte(10);
      });
    });
  });
});

/***/ }),

/***/ 0:
/*!****************************************************************!*\
  !*** multi ./cypress/e2e/2-advanced-examples/assertions.cy.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/node/test/cypress/e2e/2-advanced-examples/assertions.cy.js */"./cypress/e2e/2-advanced-examples/assertions.cy.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vY3lwcmVzcy9lMmUvMi1hZHZhbmNlZC1leGFtcGxlcy9hc3NlcnRpb25zLmN5LmpzIl0sIm5hbWVzIjpbImNvbnRleHQiLCJiZWZvcmVFYWNoIiwiY3kiLCJ2aXNpdCIsImRlc2NyaWJlIiwiaXQiLCJnZXQiLCJmaW5kIiwic2hvdWxkIiwiZmlyc3QiLCJpbnZva2UiLCJjb250YWlucyIsImFuZCIsImV4cGVjdCIsInRvIiwiYmUiLCJ0cnVlIiwibyIsImZvbyIsImVxdWFsIiwiZGVlcCIsIm1hdGNoIiwiJHAiLCJ0ZXh0cyIsIm1hcCIsImkiLCJlbCIsIkN5cHJlc3MiLCIkIiwidGV4dCIsInBhcmFncmFwaHMiLCJoYXZlIiwibGVuZ3RoIiwiZXEiLCIkZGl2IiwiY2xhc3NOYW1lIiwidGhlbiIsIkVycm9yIiwibm9ybWFsaXplVGV4dCIsInMiLCJyZXBsYWNlIiwidG9Mb3dlckNhc2UiLCIkZmlyc3QiLCJzZWNvbmRUZXh0IiwicGVyc29uIiwibmFtZSIsImFnZSIsImFzc2VydCIsImlzT2JqZWN0IiwibiIsInBhcnNlRmxvYXQiLCJndGUiLCJsdGUiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFt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N0JDLENBQUY7QUErQkF4QixNQUFFLENBQUMsb0NBQUQsRUFBdUMsTUFBTTtBQUM3QyxZQUFNdUMsTUFBTSxHQUFHO0FBQ2JDLFlBQUksRUFBRSxLQURPO0FBRWJDLFdBQUcsRUFBRTtBQUZRLE9BQWY7QUFLQUMsWUFBTSxDQUFDQyxRQUFQLENBQWdCSixNQUFoQixFQUF3QixpQkFBeEI7QUFDRCxLQVBDLENBQUY7QUFTQXZDLE1BQUUsQ0FBQyxtREFBRCxFQUFzRCxNQUFNO0FBQzVESCxRQUFFLENBQUNJLEdBQUgsQ0FBTyxnQkFBUCxFQUNHRSxNQURILENBQ1cwQixJQUFELElBQVU7QUFDaEIsY0FBTWUsQ0FBQyxHQUFHQyxVQUFVLENBQUNoQixJQUFJLENBQUNMLElBQUwsRUFBRCxDQUFwQjtBQUVBaEIsY0FBTSxDQUFDb0MsQ0FBRCxDQUFOLENBQVVuQyxFQUFWLENBQWFDLEVBQWIsQ0FBZ0JvQyxHQUFoQixDQUFvQixDQUFwQixFQUF1QnZDLEdBQXZCLENBQTJCRyxFQUEzQixDQUE4QnFDLEdBQTlCLENBQWtDLEVBQWxDO0FBQ0QsT0FMSDtBQU1ELEtBUEMsQ0FBRjtBQVFELEdBN0hPLENBQVI7QUE4SEQsQ0E3S00sQ0FBUCxDIiwiZmlsZSI6ImFzc2VydGlvbnMuY3kuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCIvLy8gPHJlZmVyZW5jZSB0eXBlcz1cImN5cHJlc3NcIiAvPlxuXG5jb250ZXh0KCdBc3NlcnRpb25zJywgKCkgPT4ge1xuICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICBjeS52aXNpdCgnaHR0cHM6Ly9leGFtcGxlLmN5cHJlc3MuaW8vY29tbWFuZHMvYXNzZXJ0aW9ucycpXG4gIH0pXG5cbiAgZGVzY3JpYmUoJ0ltcGxpY2l0IEFzc2VydGlvbnMnLCAoKSA9PiB7XG4gICAgaXQoJy5zaG91bGQoKSAtIG1ha2UgYW4gYXNzZXJ0aW9uIGFib3V0IHRoZSBjdXJyZW50IHN1YmplY3QnLCAoKSA9PiB7XG4gICAgICAvLyBodHRwczovL29uLmN5cHJlc3MuaW8vc2hvdWxkXG4gICAgICBjeS5nZXQoJy5hc3NlcnRpb24tdGFibGUnKVxuICAgICAgICAuZmluZCgndGJvZHkgdHI6bGFzdCcpXG4gICAgICAgIC5zaG91bGQoJ2hhdmUuY2xhc3MnLCAnc3VjY2VzcycpXG4gICAgICAgIC5maW5kKCd0ZCcpXG4gICAgICAgIC5maXJzdCgpXG4gICAgICAgIC8vIGNoZWNraW5nIHRoZSB0ZXh0IG9mIHRoZSA8dGQ+IGVsZW1lbnQgaW4gdmFyaW91cyB3YXlzXG4gICAgICAgIC5zaG91bGQoJ2hhdmUudGV4dCcsICdDb2x1bW4gY29udGVudCcpXG4gICAgICAgIC5zaG91bGQoJ2NvbnRhaW4nLCAnQ29sdW1uIGNvbnRlbnQnKVxuICAgICAgICAuc2hvdWxkKCdoYXZlLmh0bWwnLCAnQ29sdW1uIGNvbnRlbnQnKVxuICAgICAgICAvLyBjaGFpLWpxdWVyeSB1c2VzIFwiaXMoKVwiIHRvIGNoZWNrIGlmIGVsZW1lbnQgbWF0Y2hlcyBzZWxlY3RvclxuICAgICAgICAuc2hvdWxkKCdtYXRjaCcsICd0ZCcpXG4gICAgICAgIC8vIHRvIG1hdGNoIHRleHQgY29udGVudCBhZ2FpbnN0IGEgcmVndWxhciBleHByZXNzaW9uXG4gICAgICAgIC8vIGZpcnN0IG5lZWQgdG8gaW52b2tlIGpRdWVyeSBtZXRob2QgdGV4dCgpXG4gICAgICAgIC8vIGFuZCB0aGVuIG1hdGNoIHVzaW5nIHJlZ3VsYXIgZXhwcmVzc2lvblxuICAgICAgICAuaW52b2tlKCd0ZXh0JylcbiAgICAgICAgLnNob3VsZCgnbWF0Y2gnLCAvY29sdW1uIGNvbnRlbnQvaSlcblxuICAgICAgLy8gYSBiZXR0ZXIgd2F5IHRvIGNoZWNrIGVsZW1lbnQncyB0ZXh0IGNvbnRlbnQgYWdhaW5zdCBhIHJlZ3VsYXIgZXhwcmVzc2lvblxuICAgICAgLy8gaXMgdG8gdXNlIFwiY3kuY29udGFpbnNcIlxuICAgICAgLy8gaHR0cHM6Ly9vbi5jeXByZXNzLmlvL2NvbnRhaW5zXG4gICAgICBjeS5nZXQoJy5hc3NlcnRpb24tdGFibGUnKVxuICAgICAgICAuZmluZCgndGJvZHkgdHI6bGFzdCcpXG4gICAgICAgIC8vIGZpbmRzIGZpcnN0IDx0ZD4gZWxlbWVudCB3aXRoIHRleHQgY29udGVudCBtYXRjaGluZyByZWd1bGFyIGV4cHJlc3Npb25cbiAgICAgICAgLmNvbnRhaW5zKCd0ZCcsIC9jb2x1bW4gY29udGVudC9pKVxuICAgICAgICAuc2hvdWxkKCdiZS52aXNpYmxlJylcblxuICAgICAgLy8gZm9yIG1vcmUgaW5mb3JtYXRpb24gYWJvdXQgYXNzZXJ0aW5nIGVsZW1lbnQncyB0ZXh0XG4gICAgICAvLyBzZWUgaHR0cHM6Ly9vbi5jeXByZXNzLmlvL3VzaW5nLWN5cHJlc3MtZmFxI0hvdy1kby1JLWdldC1hbi1lbGVtZW504oCZcy10ZXh0LWNvbnRlbnRzXG4gICAgfSlcblxuICAgIGl0KCcuYW5kKCkgLSBjaGFpbiBtdWx0aXBsZSBhc3NlcnRpb25zIHRvZ2V0aGVyJywgKCkgPT4ge1xuICAgICAgLy8gaHR0cHM6Ly9vbi5jeXByZXNzLmlvL2FuZFxuICAgICAgY3kuZ2V0KCcuYXNzZXJ0aW9ucy1saW5rJylcbiAgICAgICAgLnNob3VsZCgnaGF2ZS5jbGFzcycsICdhY3RpdmUnKVxuICAgICAgICAuYW5kKCdoYXZlLmF0dHInLCAnaHJlZicpXG4gICAgICAgIC5hbmQoJ2luY2x1ZGUnLCAnY3lwcmVzcy5pbycpXG4gICAgfSlcbiAgfSlcblxuICBkZXNjcmliZSgnRXhwbGljaXQgQXNzZXJ0aW9ucycsICgpID0+IHtcbiAgICAvLyBodHRwczovL29uLmN5cHJlc3MuaW8vYXNzZXJ0aW9uc1xuICAgIGl0KCdleHBlY3QgLSBtYWtlIGFuIGFzc2VydGlvbiBhYm91dCBhIHNwZWNpZmllZCBzdWJqZWN0JywgKCkgPT4ge1xuICAgICAgLy8gV2UgY2FuIHVzZSBDaGFpJ3MgQkREIHN0eWxlIGFzc2VydGlvbnNcbiAgICAgIGV4cGVjdCh0cnVlKS50by5iZS50cnVlXG4gICAgICBjb25zdCBvID0geyBmb286ICdiYXInIH1cblxuICAgICAgZXhwZWN0KG8pLnRvLmVxdWFsKG8pXG4gICAgICBleHBlY3QobykudG8uZGVlcC5lcXVhbCh7IGZvbzogJ2JhcicgfSlcbiAgICAgIC8vIG1hdGNoaW5nIHRleHQgdXNpbmcgcmVndWxhciBleHByZXNzaW9uXG4gICAgICBleHBlY3QoJ0Zvb0JhcicpLnRvLm1hdGNoKC9iYXIkL2kpXG4gICAgfSlcblxuICAgIGl0KCdwYXNzIHlvdXIgb3duIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIHNob3VsZCgpJywgKCkgPT4ge1xuICAgICAgLy8gUGFzcyBhIGZ1bmN0aW9uIHRvIHNob3VsZCB0aGF0IGNhbiBoYXZlIGFueSBudW1iZXJcbiAgICAgIC8vIG9mIGV4cGxpY2l0IGFzc2VydGlvbnMgd2l0aGluIGl0LlxuICAgICAgLy8gVGhlIFwiLnNob3VsZChjYilcIiBmdW5jdGlvbiB3aWxsIGJlIHJldHJpZWRcbiAgICAgIC8vIGF1dG9tYXRpY2FsbHkgdW50aWwgaXQgcGFzc2VzIGFsbCB5b3VyIGV4cGxpY2l0IGFzc2VydGlvbnMgb3IgdGltZXMgb3V0LlxuICAgICAgY3kuZ2V0KCcuYXNzZXJ0aW9ucy1wJylcbiAgICAgICAgLmZpbmQoJ3AnKVxuICAgICAgICAuc2hvdWxkKCgkcCkgPT4ge1xuICAgICAgICAgIC8vIGh0dHBzOi8vb24uY3lwcmVzcy5pby8kXG4gICAgICAgICAgLy8gcmV0dXJuIGFuIGFycmF5IG9mIHRleHRzIGZyb20gYWxsIG9mIHRoZSBwJ3NcbiAgICAgICAgICBjb25zdCB0ZXh0cyA9ICRwLm1hcCgoaSwgZWwpID0+IEN5cHJlc3MuJChlbCkudGV4dCgpKVxuXG4gICAgICAgICAgLy8ganF1ZXJ5IG1hcCByZXR1cm5zIGpxdWVyeSBvYmplY3RcbiAgICAgICAgICAvLyBhbmQgLmdldCgpIGNvbnZlcnQgdGhpcyB0byBzaW1wbGUgYXJyYXlcbiAgICAgICAgICBjb25zdCBwYXJhZ3JhcGhzID0gdGV4dHMuZ2V0KClcblxuICAgICAgICAgIC8vIGFycmF5IHNob3VsZCBoYXZlIGxlbmd0aCBvZiAzXG4gICAgICAgICAgZXhwZWN0KHBhcmFncmFwaHMsICdoYXMgMyBwYXJhZ3JhcGhzJykudG8uaGF2ZS5sZW5ndGgoMylcblxuICAgICAgICAgIC8vIHVzZSBzZWNvbmQgYXJndW1lbnQgdG8gZXhwZWN0KC4uLikgdG8gcHJvdmlkZSBjbGVhclxuICAgICAgICAgIC8vIG1lc3NhZ2Ugd2l0aCBlYWNoIGFzc2VydGlvblxuICAgICAgICAgIGV4cGVjdChwYXJhZ3JhcGhzLCAnaGFzIGV4cGVjdGVkIHRleHQgaW4gZWFjaCBwYXJhZ3JhcGgnKS50by5kZWVwLmVxKFtcbiAgICAgICAgICAgICdTb21lIHRleHQgZnJvbSBmaXJzdCBwJyxcbiAgICAgICAgICAgICdNb3JlIHRleHQgZnJvbSBzZWNvbmQgcCcsXG4gICAgICAgICAgICAnQW5kIGV2ZW4gbW9yZSB0ZXh0IGZyb20gdGhpcmQgcCcsXG4gICAgICAgICAgXSlcbiAgICAgICAgfSlcbiAgICB9KVxuXG4gICAgaXQoJ2ZpbmRzIGVsZW1lbnQgYnkgY2xhc3MgbmFtZSByZWdleCcsICgpID0+IHtcbiAgICAgIGN5LmdldCgnLmRvY3MtaGVhZGVyJylcbiAgICAgICAgLmZpbmQoJ2RpdicpXG4gICAgICAgIC8vIC5zaG91bGQoY2IpIGNhbGxiYWNrIGZ1bmN0aW9uIHdpbGwgYmUgcmV0cmllZFxuICAgICAgICAuc2hvdWxkKCgkZGl2KSA9PiB7XG4gICAgICAgICAgZXhwZWN0KCRkaXYpLnRvLmhhdmUubGVuZ3RoKDEpXG5cbiAgICAgICAgICBjb25zdCBjbGFzc05hbWUgPSAkZGl2WzBdLmNsYXNzTmFtZVxuXG4gICAgICAgICAgZXhwZWN0KGNsYXNzTmFtZSkudG8ubWF0Y2goL2hlYWRpbmctLylcbiAgICAgICAgfSlcbiAgICAgICAgLy8gLnRoZW4oY2IpIGNhbGxiYWNrIGlzIG5vdCByZXRyaWVkLFxuICAgICAgICAvLyBpdCBlaXRoZXIgcGFzc2VzIG9yIGZhaWxzXG4gICAgICAgIC50aGVuKCgkZGl2KSA9PiB7XG4gICAgICAgICAgZXhwZWN0KCRkaXYsICd0ZXh0IGNvbnRlbnQnKS50by5oYXZlLnRleHQoJ0ludHJvZHVjdGlvbicpXG4gICAgICAgIH0pXG4gICAgfSlcblxuICAgIGl0KCdjYW4gdGhyb3cgYW55IGVycm9yJywgKCkgPT4ge1xuICAgICAgY3kuZ2V0KCcuZG9jcy1oZWFkZXInKVxuICAgICAgICAuZmluZCgnZGl2JylcbiAgICAgICAgLnNob3VsZCgoJGRpdikgPT4ge1xuICAgICAgICAgIGlmICgkZGl2Lmxlbmd0aCAhPT0gMSkge1xuICAgICAgICAgICAgLy8geW91IGNhbiB0aHJvdyB5b3VyIG93biBlcnJvcnNcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRGlkIG5vdCBmaW5kIDEgZWxlbWVudCcpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgY2xhc3NOYW1lID0gJGRpdlswXS5jbGFzc05hbWVcblxuICAgICAgICAgIGlmICghY2xhc3NOYW1lLm1hdGNoKC9oZWFkaW5nLS8pKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENvdWxkIG5vdCBmaW5kIGNsYXNzIFwiaGVhZGluZy1cIiBpbiAke2NsYXNzTmFtZX1gKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9KVxuXG4gICAgaXQoJ21hdGNoZXMgdW5rbm93biB0ZXh0IGJldHdlZW4gdHdvIGVsZW1lbnRzJywgKCkgPT4ge1xuICAgICAgLyoqXG4gICAgICAgKiBUZXh0IGZyb20gdGhlIGZpcnN0IGVsZW1lbnQuXG4gICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgKi9cbiAgICAgIGxldCB0ZXh0XG5cbiAgICAgIC8qKlxuICAgICAgICogTm9ybWFsaXplcyBwYXNzZWQgdGV4dCxcbiAgICAgICAqIHVzZWZ1bCBiZWZvcmUgY29tcGFyaW5nIHRleHQgd2l0aCBzcGFjZXMgYW5kIGRpZmZlcmVudCBjYXBpdGFsaXphdGlvbi5cbiAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzIFRleHQgdG8gbm9ybWFsaXplXG4gICAgICAqL1xuICAgICAgY29uc3Qgbm9ybWFsaXplVGV4dCA9IChzKSA9PiBzLnJlcGxhY2UoL1xccy9nLCAnJykudG9Mb3dlckNhc2UoKVxuXG4gICAgICBjeS5nZXQoJy50d28tZWxlbWVudHMnKVxuICAgICAgICAuZmluZCgnLmZpcnN0JylcbiAgICAgICAgLnRoZW4oKCRmaXJzdCkgPT4ge1xuICAgICAgICAgIC8vIHNhdmUgdGV4dCBmcm9tIHRoZSBmaXJzdCBlbGVtZW50XG4gICAgICAgICAgdGV4dCA9IG5vcm1hbGl6ZVRleHQoJGZpcnN0LnRleHQoKSlcbiAgICAgICAgfSlcblxuICAgICAgY3kuZ2V0KCcudHdvLWVsZW1lbnRzJylcbiAgICAgICAgLmZpbmQoJy5zZWNvbmQnKVxuICAgICAgICAuc2hvdWxkKCgkZGl2KSA9PiB7XG4gICAgICAgICAgLy8gd2UgY2FuIG1hc3NhZ2UgdGV4dCBiZWZvcmUgY29tcGFyaW5nXG4gICAgICAgICAgY29uc3Qgc2Vjb25kVGV4dCA9IG5vcm1hbGl6ZVRleHQoJGRpdi50ZXh0KCkpXG5cbiAgICAgICAgICBleHBlY3Qoc2Vjb25kVGV4dCwgJ3NlY29uZCB0ZXh0JykudG8uZXF1YWwodGV4dClcbiAgICAgICAgfSlcbiAgICB9KVxuXG4gICAgaXQoJ2Fzc2VydCAtIGFzc2VydCBzaGFwZSBvZiBhbiBvYmplY3QnLCAoKSA9PiB7XG4gICAgICBjb25zdCBwZXJzb24gPSB7XG4gICAgICAgIG5hbWU6ICdKb2UnLFxuICAgICAgICBhZ2U6IDIwLFxuICAgICAgfVxuXG4gICAgICBhc3NlcnQuaXNPYmplY3QocGVyc29uLCAndmFsdWUgaXMgb2JqZWN0JylcbiAgICB9KVxuXG4gICAgaXQoJ3JldHJpZXMgdGhlIHNob3VsZCBjYWxsYmFjayB1bnRpbCBhc3NlcnRpb25zIHBhc3MnLCAoKSA9PiB7XG4gICAgICBjeS5nZXQoJyNyYW5kb20tbnVtYmVyJylcbiAgICAgICAgLnNob3VsZCgoJGRpdikgPT4ge1xuICAgICAgICAgIGNvbnN0IG4gPSBwYXJzZUZsb2F0KCRkaXYudGV4dCgpKVxuXG4gICAgICAgICAgZXhwZWN0KG4pLnRvLmJlLmd0ZSgxKS5hbmQuYmUubHRlKDEwKVxuICAgICAgICB9KVxuICAgIH0pXG4gIH0pXG59KVxuIl0sInNvdXJjZVJvb3QiOiIifQ==