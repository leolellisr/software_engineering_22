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

/***/ "./cypress/e2e/2-advanced-examples/actions.cy.js":
/*!*******************************************************!*\
  !*** ./cypress/e2e/2-advanced-examples/actions.cy.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/// <reference types="cypress" />
context('Actions', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/actions');
  }); // https://on.cypress.io/interacting-with-elements

  it('.type() - type into a DOM element', () => {
    // https://on.cypress.io/type
    cy.get('.action-email').type('fake@email.com').should('have.value', 'fake@email.com') // .type() with special character sequences
    .type('{leftarrow}{rightarrow}{uparrow}{downarrow}').type('{del}{selectall}{backspace}') // .type() with key modifiers
    .type('{alt}{option}') //these are equivalent
    .type('{ctrl}{control}') //these are equivalent
    .type('{meta}{command}{cmd}') //these are equivalent
    .type('{shift}') // Delay each keypress by 0.1 sec
    .type('slow.typing@email.com', {
      delay: 100
    }).should('have.value', 'slow.typing@email.com');
    cy.get('.action-disabled') // Ignore error checking prior to type
    // like whether the input is visible or disabled
    .type('disabled error checking', {
      force: true
    }).should('have.value', 'disabled error checking');
  });
  it('.focus() - focus on a DOM element', () => {
    // https://on.cypress.io/focus
    cy.get('.action-focus').focus().should('have.class', 'focus').prev().should('have.attr', 'style', 'color: orange;');
  });
  it('.blur() - blur off a DOM element', () => {
    // https://on.cypress.io/blur
    cy.get('.action-blur').type('About to blur').blur().should('have.class', 'error').prev().should('have.attr', 'style', 'color: red;');
  });
  it('.clear() - clears an input or textarea element', () => {
    // https://on.cypress.io/clear
    cy.get('.action-clear').type('Clear this text').should('have.value', 'Clear this text').clear().should('have.value', '');
  });
  it('.submit() - submit a form', () => {
    // https://on.cypress.io/submit
    cy.get('.action-form').find('[type="text"]').type('HALFOFF');
    cy.get('.action-form').submit().next().should('contain', 'Your form has been submitted!');
  });
  it('.click() - click on a DOM element', () => {
    // https://on.cypress.io/click
    cy.get('.action-btn').click(); // You can click on 9 specific positions of an element:
    //  -----------------------------------
    // | topLeft        top       topRight |
    // |                                   |
    // |                                   |
    // |                                   |
    // | left          center        right |
    // |                                   |
    // |                                   |
    // |                                   |
    // | bottomLeft   bottom   bottomRight |
    //  -----------------------------------
    // clicking in the center of the element is the default

    cy.get('#action-canvas').click();
    cy.get('#action-canvas').click('topLeft');
    cy.get('#action-canvas').click('top');
    cy.get('#action-canvas').click('topRight');
    cy.get('#action-canvas').click('left');
    cy.get('#action-canvas').click('right');
    cy.get('#action-canvas').click('bottomLeft');
    cy.get('#action-canvas').click('bottom');
    cy.get('#action-canvas').click('bottomRight'); // .click() accepts an x and y coordinate
    // that controls where the click occurs :)

    cy.get('#action-canvas').click(80, 75) // click 80px on x coord and 75px on y coord
    .click(170, 75).click(80, 165).click(100, 185).click(125, 190).click(150, 185).click(170, 165); // click multiple elements by passing multiple: true

    cy.get('.action-labels>.label').click({
      multiple: true
    }); // Ignore error checking prior to clicking

    cy.get('.action-opacity>.btn').click({
      force: true
    });
  });
  it('.dblclick() - double click on a DOM element', () => {
    // https://on.cypress.io/dblclick
    // Our app has a listener on 'dblclick' event in our 'scripts.js'
    // that hides the div and shows an input on double click
    cy.get('.action-div').dblclick().should('not.be.visible');
    cy.get('.action-input-hidden').should('be.visible');
  });
  it('.rightclick() - right click on a DOM element', () => {
    // https://on.cypress.io/rightclick
    // Our app has a listener on 'contextmenu' event in our 'scripts.js'
    // that hides the div and shows an input on right click
    cy.get('.rightclick-action-div').rightclick().should('not.be.visible');
    cy.get('.rightclick-action-input-hidden').should('be.visible');
  });
  it('.check() - check a checkbox or radio element', () => {
    // https://on.cypress.io/check
    // By default, .check() will check all
    // matching checkbox or radio elements in succession, one after another
    cy.get('.action-checkboxes [type="checkbox"]').not('[disabled]').check().should('be.checked');
    cy.get('.action-radios [type="radio"]').not('[disabled]').check().should('be.checked'); // .check() accepts a value argument

    cy.get('.action-radios [type="radio"]').check('radio1').should('be.checked'); // .check() accepts an array of values

    cy.get('.action-multiple-checkboxes [type="checkbox"]').check(['checkbox1', 'checkbox2']).should('be.checked'); // Ignore error checking prior to checking

    cy.get('.action-checkboxes [disabled]').check({
      force: true
    }).should('be.checked');
    cy.get('.action-radios [type="radio"]').check('radio3', {
      force: true
    }).should('be.checked');
  });
  it('.uncheck() - uncheck a checkbox element', () => {
    // https://on.cypress.io/uncheck
    // By default, .uncheck() will uncheck all matching
    // checkbox elements in succession, one after another
    cy.get('.action-check [type="checkbox"]').not('[disabled]').uncheck().should('not.be.checked'); // .uncheck() accepts a value argument

    cy.get('.action-check [type="checkbox"]').check('checkbox1').uncheck('checkbox1').should('not.be.checked'); // .uncheck() accepts an array of values

    cy.get('.action-check [type="checkbox"]').check(['checkbox1', 'checkbox3']).uncheck(['checkbox1', 'checkbox3']).should('not.be.checked'); // Ignore error checking prior to unchecking

    cy.get('.action-check [disabled]').uncheck({
      force: true
    }).should('not.be.checked');
  });
  it('.select() - select an option in a <select> element', () => {
    // https://on.cypress.io/select
    // at first, no option should be selected
    cy.get('.action-select').should('have.value', '--Select a fruit--'); // Select option(s) with matching text content

    cy.get('.action-select').select('apples'); // confirm the apples were selected
    // note that each value starts with "fr-" in our HTML

    cy.get('.action-select').should('have.value', 'fr-apples');
    cy.get('.action-select-multiple').select(['apples', 'oranges', 'bananas']) // when getting multiple values, invoke "val" method first
    .invoke('val').should('deep.equal', ['fr-apples', 'fr-oranges', 'fr-bananas']); // Select option(s) with matching value

    cy.get('.action-select').select('fr-bananas') // can attach an assertion right away to the element
    .should('have.value', 'fr-bananas');
    cy.get('.action-select-multiple').select(['fr-apples', 'fr-oranges', 'fr-bananas']).invoke('val').should('deep.equal', ['fr-apples', 'fr-oranges', 'fr-bananas']); // assert the selected values include oranges

    cy.get('.action-select-multiple').invoke('val').should('include', 'fr-oranges');
  });
  it('.scrollIntoView() - scroll an element into view', () => {
    // https://on.cypress.io/scrollintoview
    // normally all of these buttons are hidden,
    // because they're not within
    // the viewable area of their parent
    // (we need to scroll to see them)
    cy.get('#scroll-horizontal button').should('not.be.visible'); // scroll the button into view, as if the user had scrolled

    cy.get('#scroll-horizontal button').scrollIntoView().should('be.visible');
    cy.get('#scroll-vertical button').should('not.be.visible'); // Cypress handles the scroll direction needed

    cy.get('#scroll-vertical button').scrollIntoView().should('be.visible');
    cy.get('#scroll-both button').should('not.be.visible'); // Cypress knows to scroll to the right and down

    cy.get('#scroll-both button').scrollIntoView().should('be.visible');
  });
  it('.trigger() - trigger an event on a DOM element', () => {
    // https://on.cypress.io/trigger
    // To interact with a range input (slider)
    // we need to set its value & trigger the
    // event to signal it changed
    // Here, we invoke jQuery's val() method to set
    // the value and trigger the 'change' event
    cy.get('.trigger-input-range').invoke('val', 25).trigger('change').get('input[type=range]').siblings('p').should('have.text', '25');
  });
  it('cy.scrollTo() - scroll the window or element to a position', () => {
    // https://on.cypress.io/scrollto
    // You can scroll to 9 specific positions of an element:
    //  -----------------------------------
    // | topLeft        top       topRight |
    // |                                   |
    // |                                   |
    // |                                   |
    // | left          center        right |
    // |                                   |
    // |                                   |
    // |                                   |
    // | bottomLeft   bottom   bottomRight |
    //  -----------------------------------
    // if you chain .scrollTo() off of cy, we will
    // scroll the entire window
    cy.scrollTo('bottom');
    cy.get('#scrollable-horizontal').scrollTo('right'); // or you can scroll to a specific coordinate:
    // (x axis, y axis) in pixels

    cy.get('#scrollable-vertical').scrollTo(250, 250); // or you can scroll to a specific percentage
    // of the (width, height) of the element

    cy.get('#scrollable-both').scrollTo('75%', '25%'); // control the easing of the scroll (default is 'swing')

    cy.get('#scrollable-vertical').scrollTo('center', {
      easing: 'linear'
    }); // control the duration of the scroll (in ms)

    cy.get('#scrollable-both').scrollTo('center', {
      duration: 2000
    });
  });
});

/***/ }),

/***/ 0:
/*!*************************************************************!*\
  !*** multi ./cypress/e2e/2-advanced-examples/actions.cy.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/node/test/cypress/e2e/2-advanced-examples/actions.cy.js */"./cypress/e2e/2-advanced-examples/actions.cy.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vY3lwcmVzcy9lMmUvMi1hZHZhbmNlZC1leGFtcGxlcy9hY3Rpb25zLmN5LmpzIl0sIm5hbWVzIjpbImNvbnRleHQiLCJiZWZvcmVFYWNoIiwiY3kiLCJ2aXNpdCIsIml0IiwiZ2V0IiwidHlwZSIsInNob3VsZCIsImRlbGF5IiwiZm9yY2UiLCJmb2N1cyIsInByZXYiLCJibHVyIiwiY2xlYXIiLCJmaW5kIiwic3VibWl0IiwibmV4dCIsImNsaWNrIiwibXVsdGlwbGUiLCJkYmxjbGljayIsInJpZ2h0Y2xpY2siLCJub3QiLCJjaGVjayIsInVuY2hlY2siLCJzZWxlY3QiLCJpbnZva2UiLCJzY3JvbGxJbnRvVmlldyIsInRyaWdnZXIiLCJzaWJsaW5ncyIsInNjcm9sbFRvIiwiZWFzaW5nIiwiZHVyYXRpb24iXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FB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LEVBNUJxRSxDQThCckU7O0FBQ0EzQixNQUFFLENBQUNHLEdBQUgsQ0FBTyxzQkFBUCxFQUErQndCLFFBQS9CLENBQXdDLFFBQXhDLEVBQWtEO0FBQUVDLFlBQU0sRUFBRTtBQUFWLEtBQWxELEVBL0JxRSxDQWlDckU7O0FBQ0E1QixNQUFFLENBQUNHLEdBQUgsQ0FBTyxrQkFBUCxFQUEyQndCLFFBQTNCLENBQW9DLFFBQXBDLEVBQThDO0FBQUVFLGNBQVEsRUFBRTtBQUFaLEtBQTlDO0FBQ0QsR0FuQ0MsQ0FBRjtBQW9DRCxDQXhTTSxDQUFQLEMiLCJmaWxlIjoiYWN0aW9ucy5jeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsIi8vLyA8cmVmZXJlbmNlIHR5cGVzPVwiY3lwcmVzc1wiIC8+XG5cbmNvbnRleHQoJ0FjdGlvbnMnLCAoKSA9PiB7XG4gIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgIGN5LnZpc2l0KCdodHRwczovL2V4YW1wbGUuY3lwcmVzcy5pby9jb21tYW5kcy9hY3Rpb25zJylcbiAgfSlcblxuICAvLyBodHRwczovL29uLmN5cHJlc3MuaW8vaW50ZXJhY3Rpbmctd2l0aC1lbGVtZW50c1xuXG4gIGl0KCcudHlwZSgpIC0gdHlwZSBpbnRvIGEgRE9NIGVsZW1lbnQnLCAoKSA9PiB7XG4gICAgLy8gaHR0cHM6Ly9vbi5jeXByZXNzLmlvL3R5cGVcbiAgICBjeS5nZXQoJy5hY3Rpb24tZW1haWwnKVxuICAgICAgLnR5cGUoJ2Zha2VAZW1haWwuY29tJykuc2hvdWxkKCdoYXZlLnZhbHVlJywgJ2Zha2VAZW1haWwuY29tJylcblxuICAgICAgLy8gLnR5cGUoKSB3aXRoIHNwZWNpYWwgY2hhcmFjdGVyIHNlcXVlbmNlc1xuICAgICAgLnR5cGUoJ3tsZWZ0YXJyb3d9e3JpZ2h0YXJyb3d9e3VwYXJyb3d9e2Rvd25hcnJvd30nKVxuICAgICAgLnR5cGUoJ3tkZWx9e3NlbGVjdGFsbH17YmFja3NwYWNlfScpXG5cbiAgICAgIC8vIC50eXBlKCkgd2l0aCBrZXkgbW9kaWZpZXJzXG4gICAgICAudHlwZSgne2FsdH17b3B0aW9ufScpIC8vdGhlc2UgYXJlIGVxdWl2YWxlbnRcbiAgICAgIC50eXBlKCd7Y3RybH17Y29udHJvbH0nKSAvL3RoZXNlIGFyZSBlcXVpdmFsZW50XG4gICAgICAudHlwZSgne21ldGF9e2NvbW1hbmR9e2NtZH0nKSAvL3RoZXNlIGFyZSBlcXVpdmFsZW50XG4gICAgICAudHlwZSgne3NoaWZ0fScpXG5cbiAgICAgIC8vIERlbGF5IGVhY2gga2V5cHJlc3MgYnkgMC4xIHNlY1xuICAgICAgLnR5cGUoJ3Nsb3cudHlwaW5nQGVtYWlsLmNvbScsIHsgZGVsYXk6IDEwMCB9KVxuICAgICAgLnNob3VsZCgnaGF2ZS52YWx1ZScsICdzbG93LnR5cGluZ0BlbWFpbC5jb20nKVxuXG4gICAgY3kuZ2V0KCcuYWN0aW9uLWRpc2FibGVkJylcbiAgICAgIC8vIElnbm9yZSBlcnJvciBjaGVja2luZyBwcmlvciB0byB0eXBlXG4gICAgICAvLyBsaWtlIHdoZXRoZXIgdGhlIGlucHV0IGlzIHZpc2libGUgb3IgZGlzYWJsZWRcbiAgICAgIC50eXBlKCdkaXNhYmxlZCBlcnJvciBjaGVja2luZycsIHsgZm9yY2U6IHRydWUgfSlcbiAgICAgIC5zaG91bGQoJ2hhdmUudmFsdWUnLCAnZGlzYWJsZWQgZXJyb3IgY2hlY2tpbmcnKVxuICB9KVxuXG4gIGl0KCcuZm9jdXMoKSAtIGZvY3VzIG9uIGEgRE9NIGVsZW1lbnQnLCAoKSA9PiB7XG4gICAgLy8gaHR0cHM6Ly9vbi5jeXByZXNzLmlvL2ZvY3VzXG4gICAgY3kuZ2V0KCcuYWN0aW9uLWZvY3VzJykuZm9jdXMoKVxuICAgICAgLnNob3VsZCgnaGF2ZS5jbGFzcycsICdmb2N1cycpXG4gICAgICAucHJldigpLnNob3VsZCgnaGF2ZS5hdHRyJywgJ3N0eWxlJywgJ2NvbG9yOiBvcmFuZ2U7JylcbiAgfSlcblxuICBpdCgnLmJsdXIoKSAtIGJsdXIgb2ZmIGEgRE9NIGVsZW1lbnQnLCAoKSA9PiB7XG4gICAgLy8gaHR0cHM6Ly9vbi5jeXByZXNzLmlvL2JsdXJcbiAgICBjeS5nZXQoJy5hY3Rpb24tYmx1cicpLnR5cGUoJ0Fib3V0IHRvIGJsdXInKS5ibHVyKClcbiAgICAgIC5zaG91bGQoJ2hhdmUuY2xhc3MnLCAnZXJyb3InKVxuICAgICAgLnByZXYoKS5zaG91bGQoJ2hhdmUuYXR0cicsICdzdHlsZScsICdjb2xvcjogcmVkOycpXG4gIH0pXG5cbiAgaXQoJy5jbGVhcigpIC0gY2xlYXJzIGFuIGlucHV0IG9yIHRleHRhcmVhIGVsZW1lbnQnLCAoKSA9PiB7XG4gICAgLy8gaHR0cHM6Ly9vbi5jeXByZXNzLmlvL2NsZWFyXG4gICAgY3kuZ2V0KCcuYWN0aW9uLWNsZWFyJykudHlwZSgnQ2xlYXIgdGhpcyB0ZXh0JylcbiAgICAgIC5zaG91bGQoJ2hhdmUudmFsdWUnLCAnQ2xlYXIgdGhpcyB0ZXh0JylcbiAgICAgIC5jbGVhcigpXG4gICAgICAuc2hvdWxkKCdoYXZlLnZhbHVlJywgJycpXG4gIH0pXG5cbiAgaXQoJy5zdWJtaXQoKSAtIHN1Ym1pdCBhIGZvcm0nLCAoKSA9PiB7XG4gICAgLy8gaHR0cHM6Ly9vbi5jeXByZXNzLmlvL3N1Ym1pdFxuICAgIGN5LmdldCgnLmFjdGlvbi1mb3JtJylcbiAgICAgIC5maW5kKCdbdHlwZT1cInRleHRcIl0nKS50eXBlKCdIQUxGT0ZGJylcblxuICAgIGN5LmdldCgnLmFjdGlvbi1mb3JtJykuc3VibWl0KClcbiAgICAgIC5uZXh0KCkuc2hvdWxkKCdjb250YWluJywgJ1lvdXIgZm9ybSBoYXMgYmVlbiBzdWJtaXR0ZWQhJylcbiAgfSlcblxuICBpdCgnLmNsaWNrKCkgLSBjbGljayBvbiBhIERPTSBlbGVtZW50JywgKCkgPT4ge1xuICAgIC8vIGh0dHBzOi8vb24uY3lwcmVzcy5pby9jbGlja1xuICAgIGN5LmdldCgnLmFjdGlvbi1idG4nKS5jbGljaygpXG5cbiAgICAvLyBZb3UgY2FuIGNsaWNrIG9uIDkgc3BlY2lmaWMgcG9zaXRpb25zIG9mIGFuIGVsZW1lbnQ6XG4gICAgLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gfCB0b3BMZWZ0ICAgICAgICB0b3AgICAgICAgdG9wUmlnaHQgfFxuICAgIC8vIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAgICAvLyB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gICAgLy8gfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICAgIC8vIHwgbGVmdCAgICAgICAgICBjZW50ZXIgICAgICAgIHJpZ2h0IHxcbiAgICAvLyB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gICAgLy8gfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICAgIC8vIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAgICAvLyB8IGJvdHRvbUxlZnQgICBib3R0b20gICBib3R0b21SaWdodCB8XG4gICAgLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvLyBjbGlja2luZyBpbiB0aGUgY2VudGVyIG9mIHRoZSBlbGVtZW50IGlzIHRoZSBkZWZhdWx0XG4gICAgY3kuZ2V0KCcjYWN0aW9uLWNhbnZhcycpLmNsaWNrKClcblxuICAgIGN5LmdldCgnI2FjdGlvbi1jYW52YXMnKS5jbGljaygndG9wTGVmdCcpXG4gICAgY3kuZ2V0KCcjYWN0aW9uLWNhbnZhcycpLmNsaWNrKCd0b3AnKVxuICAgIGN5LmdldCgnI2FjdGlvbi1jYW52YXMnKS5jbGljaygndG9wUmlnaHQnKVxuICAgIGN5LmdldCgnI2FjdGlvbi1jYW52YXMnKS5jbGljaygnbGVmdCcpXG4gICAgY3kuZ2V0KCcjYWN0aW9uLWNhbnZhcycpLmNsaWNrKCdyaWdodCcpXG4gICAgY3kuZ2V0KCcjYWN0aW9uLWNhbnZhcycpLmNsaWNrKCdib3R0b21MZWZ0JylcbiAgICBjeS5nZXQoJyNhY3Rpb24tY2FudmFzJykuY2xpY2soJ2JvdHRvbScpXG4gICAgY3kuZ2V0KCcjYWN0aW9uLWNhbnZhcycpLmNsaWNrKCdib3R0b21SaWdodCcpXG5cbiAgICAvLyAuY2xpY2soKSBhY2NlcHRzIGFuIHggYW5kIHkgY29vcmRpbmF0ZVxuICAgIC8vIHRoYXQgY29udHJvbHMgd2hlcmUgdGhlIGNsaWNrIG9jY3VycyA6KVxuXG4gICAgY3kuZ2V0KCcjYWN0aW9uLWNhbnZhcycpXG4gICAgICAuY2xpY2soODAsIDc1KSAvLyBjbGljayA4MHB4IG9uIHggY29vcmQgYW5kIDc1cHggb24geSBjb29yZFxuICAgICAgLmNsaWNrKDE3MCwgNzUpXG4gICAgICAuY2xpY2soODAsIDE2NSlcbiAgICAgIC5jbGljaygxMDAsIDE4NSlcbiAgICAgIC5jbGljaygxMjUsIDE5MClcbiAgICAgIC5jbGljaygxNTAsIDE4NSlcbiAgICAgIC5jbGljaygxNzAsIDE2NSlcblxuICAgIC8vIGNsaWNrIG11bHRpcGxlIGVsZW1lbnRzIGJ5IHBhc3NpbmcgbXVsdGlwbGU6IHRydWVcbiAgICBjeS5nZXQoJy5hY3Rpb24tbGFiZWxzPi5sYWJlbCcpLmNsaWNrKHsgbXVsdGlwbGU6IHRydWUgfSlcblxuICAgIC8vIElnbm9yZSBlcnJvciBjaGVja2luZyBwcmlvciB0byBjbGlja2luZ1xuICAgIGN5LmdldCgnLmFjdGlvbi1vcGFjaXR5Pi5idG4nKS5jbGljayh7IGZvcmNlOiB0cnVlIH0pXG4gIH0pXG5cbiAgaXQoJy5kYmxjbGljaygpIC0gZG91YmxlIGNsaWNrIG9uIGEgRE9NIGVsZW1lbnQnLCAoKSA9PiB7XG4gICAgLy8gaHR0cHM6Ly9vbi5jeXByZXNzLmlvL2RibGNsaWNrXG5cbiAgICAvLyBPdXIgYXBwIGhhcyBhIGxpc3RlbmVyIG9uICdkYmxjbGljaycgZXZlbnQgaW4gb3VyICdzY3JpcHRzLmpzJ1xuICAgIC8vIHRoYXQgaGlkZXMgdGhlIGRpdiBhbmQgc2hvd3MgYW4gaW5wdXQgb24gZG91YmxlIGNsaWNrXG4gICAgY3kuZ2V0KCcuYWN0aW9uLWRpdicpLmRibGNsaWNrKCkuc2hvdWxkKCdub3QuYmUudmlzaWJsZScpXG4gICAgY3kuZ2V0KCcuYWN0aW9uLWlucHV0LWhpZGRlbicpLnNob3VsZCgnYmUudmlzaWJsZScpXG4gIH0pXG5cbiAgaXQoJy5yaWdodGNsaWNrKCkgLSByaWdodCBjbGljayBvbiBhIERPTSBlbGVtZW50JywgKCkgPT4ge1xuICAgIC8vIGh0dHBzOi8vb24uY3lwcmVzcy5pby9yaWdodGNsaWNrXG5cbiAgICAvLyBPdXIgYXBwIGhhcyBhIGxpc3RlbmVyIG9uICdjb250ZXh0bWVudScgZXZlbnQgaW4gb3VyICdzY3JpcHRzLmpzJ1xuICAgIC8vIHRoYXQgaGlkZXMgdGhlIGRpdiBhbmQgc2hvd3MgYW4gaW5wdXQgb24gcmlnaHQgY2xpY2tcbiAgICBjeS5nZXQoJy5yaWdodGNsaWNrLWFjdGlvbi1kaXYnKS5yaWdodGNsaWNrKCkuc2hvdWxkKCdub3QuYmUudmlzaWJsZScpXG4gICAgY3kuZ2V0KCcucmlnaHRjbGljay1hY3Rpb24taW5wdXQtaGlkZGVuJykuc2hvdWxkKCdiZS52aXNpYmxlJylcbiAgfSlcblxuICBpdCgnLmNoZWNrKCkgLSBjaGVjayBhIGNoZWNrYm94IG9yIHJhZGlvIGVsZW1lbnQnLCAoKSA9PiB7XG4gICAgLy8gaHR0cHM6Ly9vbi5jeXByZXNzLmlvL2NoZWNrXG5cbiAgICAvLyBCeSBkZWZhdWx0LCAuY2hlY2soKSB3aWxsIGNoZWNrIGFsbFxuICAgIC8vIG1hdGNoaW5nIGNoZWNrYm94IG9yIHJhZGlvIGVsZW1lbnRzIGluIHN1Y2Nlc3Npb24sIG9uZSBhZnRlciBhbm90aGVyXG4gICAgY3kuZ2V0KCcuYWN0aW9uLWNoZWNrYm94ZXMgW3R5cGU9XCJjaGVja2JveFwiXScpLm5vdCgnW2Rpc2FibGVkXScpXG4gICAgICAuY2hlY2soKS5zaG91bGQoJ2JlLmNoZWNrZWQnKVxuXG4gICAgY3kuZ2V0KCcuYWN0aW9uLXJhZGlvcyBbdHlwZT1cInJhZGlvXCJdJykubm90KCdbZGlzYWJsZWRdJylcbiAgICAgIC5jaGVjaygpLnNob3VsZCgnYmUuY2hlY2tlZCcpXG5cbiAgICAvLyAuY2hlY2soKSBhY2NlcHRzIGEgdmFsdWUgYXJndW1lbnRcbiAgICBjeS5nZXQoJy5hY3Rpb24tcmFkaW9zIFt0eXBlPVwicmFkaW9cIl0nKVxuICAgICAgLmNoZWNrKCdyYWRpbzEnKS5zaG91bGQoJ2JlLmNoZWNrZWQnKVxuXG4gICAgLy8gLmNoZWNrKCkgYWNjZXB0cyBhbiBhcnJheSBvZiB2YWx1ZXNcbiAgICBjeS5nZXQoJy5hY3Rpb24tbXVsdGlwbGUtY2hlY2tib3hlcyBbdHlwZT1cImNoZWNrYm94XCJdJylcbiAgICAgIC5jaGVjayhbJ2NoZWNrYm94MScsICdjaGVja2JveDInXSkuc2hvdWxkKCdiZS5jaGVja2VkJylcblxuICAgIC8vIElnbm9yZSBlcnJvciBjaGVja2luZyBwcmlvciB0byBjaGVja2luZ1xuICAgIGN5LmdldCgnLmFjdGlvbi1jaGVja2JveGVzIFtkaXNhYmxlZF0nKVxuICAgICAgLmNoZWNrKHsgZm9yY2U6IHRydWUgfSkuc2hvdWxkKCdiZS5jaGVja2VkJylcblxuICAgIGN5LmdldCgnLmFjdGlvbi1yYWRpb3MgW3R5cGU9XCJyYWRpb1wiXScpXG4gICAgICAuY2hlY2soJ3JhZGlvMycsIHsgZm9yY2U6IHRydWUgfSkuc2hvdWxkKCdiZS5jaGVja2VkJylcbiAgfSlcblxuICBpdCgnLnVuY2hlY2soKSAtIHVuY2hlY2sgYSBjaGVja2JveCBlbGVtZW50JywgKCkgPT4ge1xuICAgIC8vIGh0dHBzOi8vb24uY3lwcmVzcy5pby91bmNoZWNrXG5cbiAgICAvLyBCeSBkZWZhdWx0LCAudW5jaGVjaygpIHdpbGwgdW5jaGVjayBhbGwgbWF0Y2hpbmdcbiAgICAvLyBjaGVja2JveCBlbGVtZW50cyBpbiBzdWNjZXNzaW9uLCBvbmUgYWZ0ZXIgYW5vdGhlclxuICAgIGN5LmdldCgnLmFjdGlvbi1jaGVjayBbdHlwZT1cImNoZWNrYm94XCJdJylcbiAgICAgIC5ub3QoJ1tkaXNhYmxlZF0nKVxuICAgICAgLnVuY2hlY2soKS5zaG91bGQoJ25vdC5iZS5jaGVja2VkJylcblxuICAgIC8vIC51bmNoZWNrKCkgYWNjZXB0cyBhIHZhbHVlIGFyZ3VtZW50XG4gICAgY3kuZ2V0KCcuYWN0aW9uLWNoZWNrIFt0eXBlPVwiY2hlY2tib3hcIl0nKVxuICAgICAgLmNoZWNrKCdjaGVja2JveDEnKVxuICAgICAgLnVuY2hlY2soJ2NoZWNrYm94MScpLnNob3VsZCgnbm90LmJlLmNoZWNrZWQnKVxuXG4gICAgLy8gLnVuY2hlY2soKSBhY2NlcHRzIGFuIGFycmF5IG9mIHZhbHVlc1xuICAgIGN5LmdldCgnLmFjdGlvbi1jaGVjayBbdHlwZT1cImNoZWNrYm94XCJdJylcbiAgICAgIC5jaGVjayhbJ2NoZWNrYm94MScsICdjaGVja2JveDMnXSlcbiAgICAgIC51bmNoZWNrKFsnY2hlY2tib3gxJywgJ2NoZWNrYm94MyddKS5zaG91bGQoJ25vdC5iZS5jaGVja2VkJylcblxuICAgIC8vIElnbm9yZSBlcnJvciBjaGVja2luZyBwcmlvciB0byB1bmNoZWNraW5nXG4gICAgY3kuZ2V0KCcuYWN0aW9uLWNoZWNrIFtkaXNhYmxlZF0nKVxuICAgICAgLnVuY2hlY2soeyBmb3JjZTogdHJ1ZSB9KS5zaG91bGQoJ25vdC5iZS5jaGVja2VkJylcbiAgfSlcblxuICBpdCgnLnNlbGVjdCgpIC0gc2VsZWN0IGFuIG9wdGlvbiBpbiBhIDxzZWxlY3Q+IGVsZW1lbnQnLCAoKSA9PiB7XG4gICAgLy8gaHR0cHM6Ly9vbi5jeXByZXNzLmlvL3NlbGVjdFxuXG4gICAgLy8gYXQgZmlyc3QsIG5vIG9wdGlvbiBzaG91bGQgYmUgc2VsZWN0ZWRcbiAgICBjeS5nZXQoJy5hY3Rpb24tc2VsZWN0JylcbiAgICAgIC5zaG91bGQoJ2hhdmUudmFsdWUnLCAnLS1TZWxlY3QgYSBmcnVpdC0tJylcblxuICAgIC8vIFNlbGVjdCBvcHRpb24ocykgd2l0aCBtYXRjaGluZyB0ZXh0IGNvbnRlbnRcbiAgICBjeS5nZXQoJy5hY3Rpb24tc2VsZWN0Jykuc2VsZWN0KCdhcHBsZXMnKVxuICAgIC8vIGNvbmZpcm0gdGhlIGFwcGxlcyB3ZXJlIHNlbGVjdGVkXG4gICAgLy8gbm90ZSB0aGF0IGVhY2ggdmFsdWUgc3RhcnRzIHdpdGggXCJmci1cIiBpbiBvdXIgSFRNTFxuICAgIGN5LmdldCgnLmFjdGlvbi1zZWxlY3QnKS5zaG91bGQoJ2hhdmUudmFsdWUnLCAnZnItYXBwbGVzJylcblxuICAgIGN5LmdldCgnLmFjdGlvbi1zZWxlY3QtbXVsdGlwbGUnKVxuICAgICAgLnNlbGVjdChbJ2FwcGxlcycsICdvcmFuZ2VzJywgJ2JhbmFuYXMnXSlcbiAgICAgIC8vIHdoZW4gZ2V0dGluZyBtdWx0aXBsZSB2YWx1ZXMsIGludm9rZSBcInZhbFwiIG1ldGhvZCBmaXJzdFxuICAgICAgLmludm9rZSgndmFsJylcbiAgICAgIC5zaG91bGQoJ2RlZXAuZXF1YWwnLCBbJ2ZyLWFwcGxlcycsICdmci1vcmFuZ2VzJywgJ2ZyLWJhbmFuYXMnXSlcblxuICAgIC8vIFNlbGVjdCBvcHRpb24ocykgd2l0aCBtYXRjaGluZyB2YWx1ZVxuICAgIGN5LmdldCgnLmFjdGlvbi1zZWxlY3QnKS5zZWxlY3QoJ2ZyLWJhbmFuYXMnKVxuICAgICAgLy8gY2FuIGF0dGFjaCBhbiBhc3NlcnRpb24gcmlnaHQgYXdheSB0byB0aGUgZWxlbWVudFxuICAgICAgLnNob3VsZCgnaGF2ZS52YWx1ZScsICdmci1iYW5hbmFzJylcblxuICAgIGN5LmdldCgnLmFjdGlvbi1zZWxlY3QtbXVsdGlwbGUnKVxuICAgICAgLnNlbGVjdChbJ2ZyLWFwcGxlcycsICdmci1vcmFuZ2VzJywgJ2ZyLWJhbmFuYXMnXSlcbiAgICAgIC5pbnZva2UoJ3ZhbCcpXG4gICAgICAuc2hvdWxkKCdkZWVwLmVxdWFsJywgWydmci1hcHBsZXMnLCAnZnItb3JhbmdlcycsICdmci1iYW5hbmFzJ10pXG5cbiAgICAvLyBhc3NlcnQgdGhlIHNlbGVjdGVkIHZhbHVlcyBpbmNsdWRlIG9yYW5nZXNcbiAgICBjeS5nZXQoJy5hY3Rpb24tc2VsZWN0LW11bHRpcGxlJylcbiAgICAgIC5pbnZva2UoJ3ZhbCcpLnNob3VsZCgnaW5jbHVkZScsICdmci1vcmFuZ2VzJylcbiAgfSlcblxuICBpdCgnLnNjcm9sbEludG9WaWV3KCkgLSBzY3JvbGwgYW4gZWxlbWVudCBpbnRvIHZpZXcnLCAoKSA9PiB7XG4gICAgLy8gaHR0cHM6Ly9vbi5jeXByZXNzLmlvL3Njcm9sbGludG92aWV3XG5cbiAgICAvLyBub3JtYWxseSBhbGwgb2YgdGhlc2UgYnV0dG9ucyBhcmUgaGlkZGVuLFxuICAgIC8vIGJlY2F1c2UgdGhleSdyZSBub3Qgd2l0aGluXG4gICAgLy8gdGhlIHZpZXdhYmxlIGFyZWEgb2YgdGhlaXIgcGFyZW50XG4gICAgLy8gKHdlIG5lZWQgdG8gc2Nyb2xsIHRvIHNlZSB0aGVtKVxuICAgIGN5LmdldCgnI3Njcm9sbC1ob3Jpem9udGFsIGJ1dHRvbicpXG4gICAgICAuc2hvdWxkKCdub3QuYmUudmlzaWJsZScpXG5cbiAgICAvLyBzY3JvbGwgdGhlIGJ1dHRvbiBpbnRvIHZpZXcsIGFzIGlmIHRoZSB1c2VyIGhhZCBzY3JvbGxlZFxuICAgIGN5LmdldCgnI3Njcm9sbC1ob3Jpem9udGFsIGJ1dHRvbicpLnNjcm9sbEludG9WaWV3KClcbiAgICAgIC5zaG91bGQoJ2JlLnZpc2libGUnKVxuXG4gICAgY3kuZ2V0KCcjc2Nyb2xsLXZlcnRpY2FsIGJ1dHRvbicpXG4gICAgICAuc2hvdWxkKCdub3QuYmUudmlzaWJsZScpXG5cbiAgICAvLyBDeXByZXNzIGhhbmRsZXMgdGhlIHNjcm9sbCBkaXJlY3Rpb24gbmVlZGVkXG4gICAgY3kuZ2V0KCcjc2Nyb2xsLXZlcnRpY2FsIGJ1dHRvbicpLnNjcm9sbEludG9WaWV3KClcbiAgICAgIC5zaG91bGQoJ2JlLnZpc2libGUnKVxuXG4gICAgY3kuZ2V0KCcjc2Nyb2xsLWJvdGggYnV0dG9uJylcbiAgICAgIC5zaG91bGQoJ25vdC5iZS52aXNpYmxlJylcblxuICAgIC8vIEN5cHJlc3Mga25vd3MgdG8gc2Nyb2xsIHRvIHRoZSByaWdodCBhbmQgZG93blxuICAgIGN5LmdldCgnI3Njcm9sbC1ib3RoIGJ1dHRvbicpLnNjcm9sbEludG9WaWV3KClcbiAgICAgIC5zaG91bGQoJ2JlLnZpc2libGUnKVxuICB9KVxuXG4gIGl0KCcudHJpZ2dlcigpIC0gdHJpZ2dlciBhbiBldmVudCBvbiBhIERPTSBlbGVtZW50JywgKCkgPT4ge1xuICAgIC8vIGh0dHBzOi8vb24uY3lwcmVzcy5pby90cmlnZ2VyXG5cbiAgICAvLyBUbyBpbnRlcmFjdCB3aXRoIGEgcmFuZ2UgaW5wdXQgKHNsaWRlcilcbiAgICAvLyB3ZSBuZWVkIHRvIHNldCBpdHMgdmFsdWUgJiB0cmlnZ2VyIHRoZVxuICAgIC8vIGV2ZW50IHRvIHNpZ25hbCBpdCBjaGFuZ2VkXG5cbiAgICAvLyBIZXJlLCB3ZSBpbnZva2UgalF1ZXJ5J3MgdmFsKCkgbWV0aG9kIHRvIHNldFxuICAgIC8vIHRoZSB2YWx1ZSBhbmQgdHJpZ2dlciB0aGUgJ2NoYW5nZScgZXZlbnRcbiAgICBjeS5nZXQoJy50cmlnZ2VyLWlucHV0LXJhbmdlJylcbiAgICAgIC5pbnZva2UoJ3ZhbCcsIDI1KVxuICAgICAgLnRyaWdnZXIoJ2NoYW5nZScpXG4gICAgICAuZ2V0KCdpbnB1dFt0eXBlPXJhbmdlXScpLnNpYmxpbmdzKCdwJylcbiAgICAgIC5zaG91bGQoJ2hhdmUudGV4dCcsICcyNScpXG4gIH0pXG5cbiAgaXQoJ2N5LnNjcm9sbFRvKCkgLSBzY3JvbGwgdGhlIHdpbmRvdyBvciBlbGVtZW50IHRvIGEgcG9zaXRpb24nLCAoKSA9PiB7XG4gICAgLy8gaHR0cHM6Ly9vbi5jeXByZXNzLmlvL3Njcm9sbHRvXG5cbiAgICAvLyBZb3UgY2FuIHNjcm9sbCB0byA5IHNwZWNpZmljIHBvc2l0aW9ucyBvZiBhbiBlbGVtZW50OlxuICAgIC8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIHwgdG9wTGVmdCAgICAgICAgdG9wICAgICAgIHRvcFJpZ2h0IHxcbiAgICAvLyB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gICAgLy8gfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICAgIC8vIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAgICAvLyB8IGxlZnQgICAgICAgICAgY2VudGVyICAgICAgICByaWdodCB8XG4gICAgLy8gfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICAgIC8vIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAgICAvLyB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gICAgLy8gfCBib3R0b21MZWZ0ICAgYm90dG9tICAgYm90dG9tUmlnaHQgfFxuICAgIC8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLy8gaWYgeW91IGNoYWluIC5zY3JvbGxUbygpIG9mZiBvZiBjeSwgd2Ugd2lsbFxuICAgIC8vIHNjcm9sbCB0aGUgZW50aXJlIHdpbmRvd1xuICAgIGN5LnNjcm9sbFRvKCdib3R0b20nKVxuXG4gICAgY3kuZ2V0KCcjc2Nyb2xsYWJsZS1ob3Jpem9udGFsJykuc2Nyb2xsVG8oJ3JpZ2h0JylcblxuICAgIC8vIG9yIHlvdSBjYW4gc2Nyb2xsIHRvIGEgc3BlY2lmaWMgY29vcmRpbmF0ZTpcbiAgICAvLyAoeCBheGlzLCB5IGF4aXMpIGluIHBpeGVsc1xuICAgIGN5LmdldCgnI3Njcm9sbGFibGUtdmVydGljYWwnKS5zY3JvbGxUbygyNTAsIDI1MClcblxuICAgIC8vIG9yIHlvdSBjYW4gc2Nyb2xsIHRvIGEgc3BlY2lmaWMgcGVyY2VudGFnZVxuICAgIC8vIG9mIHRoZSAod2lkdGgsIGhlaWdodCkgb2YgdGhlIGVsZW1lbnRcbiAgICBjeS5nZXQoJyNzY3JvbGxhYmxlLWJvdGgnKS5zY3JvbGxUbygnNzUlJywgJzI1JScpXG5cbiAgICAvLyBjb250cm9sIHRoZSBlYXNpbmcgb2YgdGhlIHNjcm9sbCAoZGVmYXVsdCBpcyAnc3dpbmcnKVxuICAgIGN5LmdldCgnI3Njcm9sbGFibGUtdmVydGljYWwnKS5zY3JvbGxUbygnY2VudGVyJywgeyBlYXNpbmc6ICdsaW5lYXInIH0pXG5cbiAgICAvLyBjb250cm9sIHRoZSBkdXJhdGlvbiBvZiB0aGUgc2Nyb2xsIChpbiBtcylcbiAgICBjeS5nZXQoJyNzY3JvbGxhYmxlLWJvdGgnKS5zY3JvbGxUbygnY2VudGVyJywgeyBkdXJhdGlvbjogMjAwMCB9KVxuICB9KVxufSlcbiJdLCJzb3VyY2VSb290IjoiIn0=