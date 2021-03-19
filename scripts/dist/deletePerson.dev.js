"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deletePerson = void 0;

var _script = _interopRequireDefault(require("../script.js"));

var _elements = require("./elements.js");

var _displayPeople = require("./displayPeople.js");

var _utils = require("./utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var people = _script["default"];

var deletePerson = function deletePerson(e) {
  var deleteButton = e.target.closest(".delete_btn");

  if (deleteButton) {
    var deleteButtonContainer = e.target.closest('div.delete');
    var idToDelete = deleteButtonContainer.dataset.id;
    deleteList(idToDelete);
  }
}; // A function that deletes the list


exports.deletePerson = deletePerson;

var deleteList = function deleteList(idToDelete) {
  //(If I use double equals, it doesn't filter)
  var personsToKeep = people.filter(function (person) {
    return person.id != idToDelete;
  });
  var personsToDelete = people.filter(function (person) {
    return person.id == idToDelete;
  }); // Show a warning before the user decides

  var deleteContainerPopup = document.createElement('div');
  deleteContainerPopup.classList.add('popup', "delete_popup");
  deleteContainerPopup.insertAdjacentHTML('afterbegin', "\n    <div class=\"delete_container bg-white\">\n        <p class=\"warning\">\n            Are you sure you want to delete ".concat(personsToDelete.lastName, "?\n        </p>\n        <button type=\"button\" name=\"confirm\" class=\"confirm_delete\"> Yes</button>\n        <button type=\"button\" name=\"cancel\" class=\"cancel_delete\">Not yet</button>\n    </div>"));
  document.body.appendChild(deleteContainerPopup);
  deleteContainerPopup.classList.add("open"); // Look for the confirm delete button and delete it

  deleteContainerPopup.addEventListener("click", function (e) {
    e.preventDefault();
    var confirmDeleteButton = e.target.closest("button.confirm_delete");

    if (confirmDeleteButton) {
      people = personsToKeep;
      (0, _displayPeople.displayPersonsList)(people);
      (0, _utils.destroyPopup)(deleteContainerPopup);

      _elements.table.dispatchEvent(new CustomEvent('updateList'));
    }
  }); // Cancel if the user doesn't wanna delete yet

  deleteContainerPopup.addEventListener("click", function (e) {
    e.preventDefault();
    var cancelDeleteButton = e.target.closest("button.cancel_delete");

    if (cancelDeleteButton) {
      (0, _utils.destroyPopup)(deleteContainerPopup);
    }
  });

  _elements.table.dispatchEvent(new CustomEvent('updateList'));
};