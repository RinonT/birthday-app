"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wait = wait;
exports.destroyPopup = destroyPopup;
exports.displayList = void 0;

var _html_generator = require("./html_generator.js");

var _elements = require("./elements.js");

// This is reussable wait function that we can always use when we wanna wait before firing sth
function wait() {
  var ms = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
} // Show the list in the html: this will be a reusabe function


var displayList = function displayList(object) {
  var listHtml = (0, _html_generator.htmlGenerator)(object);
  _elements.listContainer.innerHTML = listHtml;

  _elements.table.dispatchEvent(new CustomEvent('updateList'));
}; // Distroy the popup while canceling or save


exports.displayList = displayList;

function destroyPopup(popup) {
  return regeneratorRuntime.async(function destroyPopup$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          popup.classList.remove('open');
          _context.next = 3;
          return regeneratorRuntime.awrap(wait(500));

        case 3:
          // remove the popup from the DOM
          popup.remove();

          _elements.body.classList.remove("overflow_hidden"); // remove it from the js memory


          popup = null;

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
}