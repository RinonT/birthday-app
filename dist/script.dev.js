"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.array = exports.persons = void 0;

var _elements = require("./scripts/elements.js");

var _displayPeople = require("./scripts/displayPeople.js");

var _utils = require("./scripts/utils.js");

var _addPerson = require("./scripts/addPerson.js");

var _editPerson = require("./scripts/editPerson.js");

var persons = [];
exports.persons = persons;
var array; // Fetch the data

exports.array = array;

function fetchPersons() {
  var respose, data, mirrorToLocalStorage, initLocalStorage, deletePerson, deleteList;
  return regeneratorRuntime.async(function fetchPersons$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch("https://gist.githubusercontent.com/Pinois/e1c72b75917985dc77f5c808e876b67f/raw/b17e08696906abeaac8bc260f57738eaa3f6abb1/birthdayPeople.json"));

        case 2:
          respose = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(respose.json());

        case 5:
          data = _context.sent;
          exports.persons = persons = data; // Save in the local storage

          mirrorToLocalStorage = function mirrorToLocalStorage() {
            localStorage.setItem('persons', JSON.stringify(persons));
          }; // restor from local storage


          initLocalStorage = function initLocalStorage() {
            var personListString = localStorage.getItem('persons');
            var personsList = JSON.parse(personListString);

            if (personsList) {
              exports.persons = persons = personsList;
              (0, _displayPeople.displayPersonsList)();

              _elements.table.dispatchEvent(new CustomEvent('updateList'));
            } else {
              exports.persons = persons = person;
            }
          }; //get the array from the list


          (0, _displayPeople.displayPersonsList)(); // *********DELETE THE PERSON******************
          // Delete list from the local storage

          deletePerson = function deletePerson(e) {
            var deleteButton = e.target.closest(".delete_btn");

            if (deleteButton) {
              var buttonContainer = e.target.closest('div.delete');
              var idToDelete = buttonContainer.dataset.id;
              deleteList(idToDelete);
            }
          }; // A function that deletes the list


          deleteList = function deleteList(idToDelete) {
            //(If I use double equals, it doesn't filter)
            var personsToKeep = persons.filter(function (person) {
              return person.id != idToDelete;
            }); // Show a warning before the user decides

            var deleteContainerPopup = document.createElement('div');
            deleteContainerPopup.classList.add('popup');
            deleteContainerPopup.insertAdjacentHTML('afterbegin', "\n        <div class=\"delete_container\">\n            <button class=\"cancel exit\" name=\"cancel\" >\n                <svg fill=\"none\" stroke=\"#094067\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M6 18L18 6M6 6l12 12\"></path></svg>\n            </button>\n            <h3 class=\"warning_text\">\n                Are you sure you want to delete?\n            </h3>\n            <button type=\"button\" name=\"confirm\" class=\"confirm_delete confirm_btn\"> Confirm delete</button>\n            <button type=\"button\" name=\"cancel\" class=\"cancel cancel_delete cancel_btn\"> Cancel</button>\n        </div>");
            document.body.appendChild(deleteContainerPopup);
            deleteContainerPopup.classList.add("open");

            _elements.body.classList.add("overflow_hidden"); // Look for the confirm delete button and delete it


            deleteContainerPopup.addEventListener("click", function (e) {
              e.preventDefault();
              var confirmDeleteButton = e.target.closest("button.confirm_delete");

              if (confirmDeleteButton) {
                exports.persons = persons = personsToKeep;
                (0, _displayPeople.displayPersonsList)(persons);
                (0, _utils.destroyPopup)(deleteContainerPopup);

                _elements.table.dispatchEvent(new CustomEvent('updateList'));
              }
            }); // Cancel if the user doesn't wanna delete yet

            deleteContainerPopup.addEventListener("click", function (e) {
              e.preventDefault();
              var cancelDeleteButton = e.target.closest("button.cancel");

              if (cancelDeleteButton) {
                (0, _utils.destroyPopup)(deleteContainerPopup);
              }
            });

            _elements.table.dispatchEvent(new CustomEvent('updateList'));
          }; // if(form.classList.contains("open")) {
          //     main.classList.add("overflow_hidden");
          // }
          //************ ALL EVENT LISTNERS **************
          // Add the list 


          _elements.addList.addEventListener("click", _addPerson.addNewPerson); // Delete a person


          window.addEventListener("click", deletePerson); // Edit a person

          window.addEventListener("click", _editPerson.editPerson); // Local storage

          _elements.table.addEventListener("updateList", mirrorToLocalStorage);

          initLocalStorage();

        case 17:
        case "end":
          return _context.stop();
      }
    }
  });
}

fetchPersons();