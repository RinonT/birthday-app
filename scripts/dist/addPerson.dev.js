"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addNewPerson = void 0;

var _script = require("../script.js");

var _elements = require("./elements.js");

var _html_generator = require("./html_generator.js");

var _displayPeople = require("./displayPeople.js");

var _utils = require("./utils.js");

// Add the list 
var addNewPerson = function addNewPerson(e) {
  var maxDate = new Date().toISOString().slice(0, 10);
  var addListForm = document.createElement('form');
  addListForm.classList.add('popup');
  addListForm.insertAdjacentHTML('afterbegin', " \n    <div class=\"container form_container\">\n        <h3> Add the list</h3>\n        <button type=\"button\" class=\"cancel exit\" name=\"exit\" >\n            <svg fill=\"none\" stroke=\"#094067\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M6 18L18 6M6 6l12 12\"></path></svg>\n        </button>\n        <label class=\"d-block\" for=\"firstname\">First Name:</label>\n        <input type=\"text\" name=\"firstname\" placeholder=\"first name\" id=\"firstname\" required>\n        <label class=\"d-block\" for=\"lastname\">Last Name:</label>\n        <input type=\"text\" name=\"lastname\" placeholder=\"last name\" id=\"lastname\" required>\n        <label class=\"d-block\" for=\"birthday\"> Birthday:</label>\n        <input type=\"date\" name=\"birthday\" max=\"".concat(maxDate, "\" id=\"birthday\">\n        <label class=\"d-block\" for=\"picture\"> Image url:</label>\n        <input type=\"text\" name=\"picture\" value=\"https://picsum.photos/100\" placeholder=\"url for the profile picture\" id=\"picture\" required>\n        <div class=\"button_container\">\n            <button class=\"submit save_btn\" type=\"submit\"> Save</button> \n            <button class=\"cancel\" name=\"cancel\" type=\"button\"> Cancel</button>\n        </div>\n    </div>"));
  document.body.appendChild(addListForm);
  addListForm.classList.add("open");

  _elements.body.classList.add("overflow_hidden"); // Add the list of the people


  var addPeopleList = function addPeopleList(e) {
    addListForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var addForm = e.target.closest(".popup");
      var AddFirstNameInput = addForm.querySelector("#firstname").value;
      var AddLastNameInput = addForm.querySelector("#lastname").value;
      var AddPictureInput = addForm.querySelector("#picture").value;
      var addBirthdayInput = addForm.querySelector("#birthday").value;
      var newPerson = {
        "id": Date.now(),
        "lastName": AddLastNameInput,
        "firstName": AddFirstNameInput,
        "picture": AddPictureInput,
        "birthday": addBirthdayInput
      };

      _script.persons.push(newPerson); // Create the html 


      var addPersonHtml = (0, _html_generator.htmlGenerator)(_script.persons); // Append the html to the list container

      _elements.listContainer.innerHTML = addPersonHtml;
      (0, _displayPeople.displayPersonsList)(); // Reset the form after submitting

      addForm.reset(); // Destroy it after submitting

      (0, _utils.destroyPopup)(addForm);

      _elements.table.dispatchEvent(new CustomEvent('updateList'));
    });
  };

  addPeopleList(); // Remove the form by clicking the cancel button

  if (addListForm.cancel) {
    var cancelAddButton = addListForm.cancel;
    cancelAddButton.addEventListener('click', function () {
      (0, _utils.destroyPopup)(addListForm);
    });
  }

  if (addListForm.exit) {
    var _cancelAddButton = addListForm.exit;

    _cancelAddButton.addEventListener('click', function () {
      (0, _utils.destroyPopup)(addListForm);
    });
  }
};

exports.addNewPerson = addNewPerson;