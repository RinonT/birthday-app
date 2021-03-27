"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.displayPersonsList = exports.newPeopleArray = void 0;

var _elements = require("../scripts/elements.js");

var _script = require("../script.js");

var _elements2 = require("./elements.js");

var _utils = require("./utils.js");

var newPeopleArray; // export let sortedPersons;

exports.newPeopleArray = newPeopleArray;

var displayPersonsList = function displayPersonsList() {
  exports.newPeopleArray = newPeopleArray = _script.persons.map(function (data) {
    // Store all the months in a variable
    var monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]; // Get the day and month

    var date = new Date(data.birthday),
        day = date.getDate(),
        month = date.getMonth(); // Adding "st", "nd", "rd" depending on the number

    if (day == 1 || day == 21 || day == 31) {
      day = day + "st";
    } else if (day == 2 || day == 22) {
      day = day + "nd";
    } else if (day == 3 || day == 23) {
      day = day + "rd";
    } else {
      day = day + "th";
    } // Get the full converted date


    var dateString = monthName[month] + " " + day; // To get the number of the days

    var oneDay = 1000 * 60 * 60 * 24; // get current year  

    var today = new Date();
    var birthDayYear; // A function that calculates the age each person

    function calculateAge(dob) {
      var diffMs = Date.now() - dob.getTime();
      var ageDt = new Date(diffMs);
      return Math.abs(ageDt.getUTCFullYear() - 1970);
    } // Assign the age in a variable so that we can use it with the object


    var age = calculateAge(new Date(data.birthday)); // Set a condition for the number of days untill the birthday comes

    if (date.getMonth() < today.getMonth()) {
      birthDayYear = today.getFullYear() + 1;
      age++;
    } else if (date.getMonth() == today.getMonth() && date.getDate() > today.getDate()) {
      birthDayYear = today.getFullYear();
      age = age;
    } else if (date.getMonth() == today.getMonth() && date.getDate() < today.getDate()) {
      birthDayYear = today.getFullYear() + 1;
      age++;
    } else {
      birthDayYear = today.getFullYear();
    }

    var birthdayDate = new Date(birthDayYear, date.getMonth(), date.getDate());
    var diffDays = Math.ceil((birthdayDate.getTime() - today.getTime()) / oneDay); // This is an object that is used to store the person with the days and date

    var newPerson = {
      firstName: data.firstName,
      lastName: data.lastName,
      id: data.id,
      birthday: data.birthday,
      picture: data.picture,
      ages: age,
      date: dateString,
      days: diffDays
    };
    return newPerson;
  }); // Sorting people

  var sortedPersons = newPeopleArray.sort(function (a, b) {
    return a.days - b.days;
  });

  function filterByName(peopleToFilter) {
    var searchInputValue = _elements2.filterByNameInput.value.trim(); // Filter the people that includes what the user types in the search input


    return peopleToFilter.filter(function (person) {
      return person.firstName.toLowerCase().includes(searchInputValue.toLowerCase()) || person.lastName.toLowerCase().includes(searchInputValue.toLowerCase());
    });
  }

  function filterByMonth(peopleToFilter) {
    var selectedMonth = _elements2.selectByMonth.value;

    if (selectedMonth === "empty") {
      return peopleToFilter;
    }

    return peopleToFilter.filter(function (person) {
      return person.date.toLowerCase().includes(selectedMonth.toLowerCase());
    });
  } // Filter the people


  function filterByNameAndMonth(peopleToFilter) {
    var filteredByName = filterByName(peopleToFilter);
    var filteredByNameAndMonth = filterByMonth(filteredByName);
    (0, _utils.displayList)(filteredByNameAndMonth);
  }

  var fiterListsFunction = function fiterListsFunction() {
    // Filter the list by firstName and lastName
    _elements2.filterByNameInput.addEventListener("keyup", function () {
      filterByNameAndMonth(sortedPersons);
    }); // Filter by month  


    _elements2.selectByMonth.addEventListener("change", function () {
      filterByNameAndMonth(sortedPersons);
    }); // //Reset the filter by the reset filter button
    // resetFilterButton.addEventListener("click", () => {
    //    // Just call the function with the html
    //    filterForm.reset();
    //    displayList(sortedPersons);
    // });

  };

  fiterListsFunction(); // Display the sorted list in the document

  (0, _utils.displayList)(sortedPersons);
};

exports.displayPersonsList = displayPersonsList;