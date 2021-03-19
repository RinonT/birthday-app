"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editPerson = void 0;

var _script = require("../script.js");

var _elements = require("./elements.js");

var _utils = require("./utils.js");

var _displayPeople = require("./displayPeople.js");

// A function that edits the person
var editPerson = function editPerson(e) {
  // Open the modal 
  return new Promise(function (resolve) {
    var editIcon = e.target.closest(".edit"); // If the target is the edit icon, add the className to open the popup

    if (editIcon) {
      var id = e.target.closest(".list_container").dataset.id;
      editPersonPopup(id);
    }
  });
}; // Edit the form


exports.editPerson = editPerson;

function editPersonPopup(id) {
  var personToEdit = _script.persons.find(function (person) {
    return person.id == id;
  }); // Create the form element 


  var birthdayDate = new Date(personToEdit.birthday).toISOString().slice(0, 10);
  var maxDate = new Date().toISOString().slice(0, 10);
  var formPopup = document.createElement('form');
  formPopup.classList.add('popup');
  formPopup.insertAdjacentHTML('afterbegin', "\n    <div class=\"container form_container\">\n        <h3> Edit ".concat(personToEdit.firstName, " ").concat(personToEdit.lastName, "</h3>\n        <button class=\"cancel exit\" name=\"exit\" >\n            <svg fill=\"none\" stroke=\"#094067\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M6 18L18 6M6 6l12 12\"></path></svg>\n        </button>\n        <label class=\"d-block\" for=\"firstname\">First Name:</label>\n        <input type=\"text\" name=\"firstname\" id=\"firstname\" value=\"").concat(personToEdit.firstName, "\" required>\n        <label class=\"d-block\" for=\"lastname\">Last Name:</label>\n        <input type=\"text\" name=\"lastname\" id=\"lastname\" value=\"").concat(personToEdit.lastName, "\" required>\n        <label class=\"d-block\" for=\"birthday\"> Birthday:</label>\n        <input type=\"date\" name=\"birthday\" id=\"birthday\" max=\"").concat(maxDate, "\" value=\"").concat(birthdayDate, "\">\n        <label class=\"d-block\" for=\"url\"> Image url:</label>\n        <input type=\"text\" name=\"picture\" id=\"picture\" value=\"").concat(personToEdit.picture, "\" required>\n        <div class=\"button_container\">\n            <button class=\"submit_button\" type=\"submit\" data-id=\"").concat(id, "\"> Save changes</button>\n            <button class=\"cancel\" name=\"cancel\" type=\"button\" data-id=\"").concat(id, "\"> Cancel</button>\n        </div>\n    </div>"));
  document.body.appendChild(formPopup);
  formPopup.classList.add("open");

  _elements.body.classList.add("overflow_hidden"); // Save the changes


  formPopup.addEventListener("submit", function (e) {
    e.preventDefault();
    personToEdit.lastName = formPopup.lastname.value;
    personToEdit.firstName = formPopup.firstname.value;
    personToEdit.birthday = formPopup.birthday.value;
    personToEdit.picture = formPopup.picture.value; // Display in the list

    (0, _displayPeople.displayPersonsList)();
    (0, _utils.destroyPopup)(formPopup);

    _elements.table.dispatchEvent(new CustomEvent('updateList'));
  }); // Remove form by clicking the cancel button

  if (formPopup.cancel) {
    var cancelButton = formPopup.cancel;
    cancelButton.addEventListener('click', function () {
      (0, _utils.destroyPopup)(formPopup);
    });
  }
}