// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"scripts/elements.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.endpoint = exports.resetFilterButton = exports.selectByMonth = exports.filterByNameInput = exports.filterForm = exports.addList = exports.listContainer = exports.table = void 0;
// Grab all the necesssary elements
const table = document.querySelector(".peopleList_container");
exports.table = table;
const listContainer = document.querySelector(".contents_container");
exports.listContainer = listContainer;
const addList = document.querySelector(".add_list");
exports.addList = addList;
const filterForm = document.querySelector(".filter_list_container");
exports.filterForm = filterForm;
const filterByNameInput = document.querySelector("#filterByName");
exports.filterByNameInput = filterByNameInput;
const selectByMonth = document.querySelector("#select_month");
exports.selectByMonth = selectByMonth;
const resetFilterButton = document.querySelector('#reset_filter'); // Importing the data

exports.resetFilterButton = resetFilterButton;
const endpoint = "./people.json";
exports.endpoint = endpoint;
},{}],"scripts/html_generator.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.htmlGenerator = void 0;

var _script = require("../script");

// Generate the html
const htmlGenerator = list => {
  return list.map(person => {
    return `
        <div data-id="${person.id}" class="list_container">
        <img class="peopleList_image" src="${person.picture}" alt="${person.firstName}'s picture">
	     <div class="peopleList_info">
		<p class="peopleList_name">
            ${person.firstName} ${person.lastName} 
		</p>
        <span class="peopleList_birthday date">
        Turns <strong>${person.ages > 1 ? person.ages + " years" : person.ages + " year"} old</strong> on the ${person.date}
        </span>
        ${person.days == 0 ? `<p class="whishingBirthday_text">
                <svg class="w-6 h-6" fill="none" stroke="pink" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z"></path></svg>
                Wish <span class="personName">${person.firstName}</span> a happy birthday
                <svg class="w-6 h-6" fill="none" stroke="pink" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z"></path></svg> 
            </p>` : ""}
	 </div>
	 <div class="peopleList_access">
         <p class="peopleList_numberOfDays days">
            ${person.days > 1 ? `In ${person.days}` + " days" : person.days == 0 ? `<span class="today"> That's today!</span>` : person.days == 1 ? "Tomorrow" : "Invalid"}
         </p>
         <div class="peopleList_edit">
            <div class="edit">
                <svg class="w-6 h-6 edit" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
            </div>
            <div data-id="${person.id}" class="delete"> 
                <svg class="w-6 h-6 delete_btn"  fill="none" stroke="#EF4565" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"></path></svg>
            </div>
		 </div>
	 </div>
     </div>`;
  }).join("");
};

exports.htmlGenerator = htmlGenerator;
},{"../script":"script.js"}],"scripts/utils.js":[function(require,module,exports) {
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
function wait(ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms));
} // Show the list in the html: this will be a reusabe function


const displayList = object => {
  const listHtml = (0, _html_generator.htmlGenerator)(object);
  _elements.listContainer.innerHTML = listHtml;

  _elements.table.dispatchEvent(new CustomEvent('updateList'));
}; // Distroy the popup while canceling or save


exports.displayList = displayList;

async function destroyPopup(popup) {
  popup.classList.remove('open');
  await wait(500); // remove the popup from the DOM

  popup.remove(); // remove it from the js memory

  popup = null;
}
},{"./html_generator.js":"scripts/html_generator.js","./elements.js":"scripts/elements.js"}],"scripts/displayPeople.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.displayPersonsList = exports.newPeopleArray = void 0;

var _script = require("../script.js");

var _elements = require("./elements.js");

var _utils = require("./utils.js");

let newPeopleArray;
exports.newPeopleArray = newPeopleArray;

const displayPersonsList = () => {
  exports.newPeopleArray = newPeopleArray = _script.persons.map(data => {
    // Store all the months in a variable
    const monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]; // Get the day and month

    let date = new Date(data.birthday),
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


    const dateString = monthName[month] + " " + day; // To get the number of the days

    const oneDay = 1000 * 60 * 60 * 24; // get current year  

    const today = new Date();
    let birthDayYear; // A function that calculates the age each person

    function calculateAge(dob) {
      let diffMs = Date.now() - dob.getTime();
      let ageDt = new Date(diffMs);
      return Math.abs(ageDt.getUTCFullYear() - 1970);
    } // Assign the age in a variable so that we can use it with the object


    let age = calculateAge(new Date(data.birthday)); // Set a condition for the number of days untill the birthday comes

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

    let birthdayDate = new Date(birthDayYear, date.getMonth(), date.getDate());
    let diffDays = Math.ceil((birthdayDate.getTime() - today.getTime()) / oneDay); // This is an object that is used to store the person with the days and date

    const newPerson = {
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

  const sortedPersons = newPeopleArray.sort(function (a, b) {
    return a.days - b.days;
  }); // Filter the people

  const fiterListsFunction = () => {
    // Filter the list by firstName and lastName
    _elements.filterByNameInput.addEventListener("keyup", () => {
      const searchInputValue = _elements.filterByNameInput.value; // Filter the people that includes what the user types in the search input

      let filteredListByName = newPeopleArray.filter(person => person.firstName.toLowerCase().includes(searchInputValue.toLowerCase()) || person.lastName.toLowerCase().includes(searchInputValue.toLowerCase())); // Call the function that generate the lists add pass the filtered variable in it 

      (0, _utils.displayList)(filteredListByName);
    }); // Filter by month  


    _elements.selectByMonth.addEventListener("change", () => {
      // Get the value from the search by select styles
      let filteredListByMonth = _elements.selectByMonth.value; // Filter the people that includes what the user types in the search input

      let filteredPeopleByMonth = newPeopleArray.filter(person => person.date.toLowerCase().includes(filteredListByMonth.toLowerCase())); // Call the function that generate the lists add pass the filtered variable in it

      (0, _utils.displayList)(filteredPeopleByMonth);
    }); //Reset the filter by the reset filter button


    _elements.resetFilterButton.addEventListener("click", () => {
      // Just call the function with the html
      _elements.filterForm.reset();

      (0, _utils.displayList)(sortedPersons);
    });
  };

  fiterListsFunction(); // Display the sorted list in the document

  (0, _utils.displayList)(sortedPersons);
};

exports.displayPersonsList = displayPersonsList;
},{"../script.js":"script.js","./elements.js":"scripts/elements.js","./utils.js":"scripts/utils.js"}],"scripts/addPerson.js":[function(require,module,exports) {
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
const addNewPerson = e => {
  let addListForm = document.createElement('form');
  addListForm.classList.add('popup');
  addListForm.insertAdjacentHTML('afterbegin', ` 
    <div class="container form_container">
        <h3> Add the list</h3>
        <button class="cancel exit" name="exit" >
            <svg fill="none" stroke="#094067" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        <label class="d-block" for="firstname">First Name:</label>
        <input type="text" name="firstname" placeholder="first name" id="firstname">
        <label class="d-block" for="lastname">Last Name:</label>
        <input type="text" name="lastname" placeholder="last name" id="lastname">
        <label class="d-block" for="birthday"> Birthday:</label>
        <input type="date" name="birthday" id="birthday">
        <label class="d-block" for="picture"> Image url:</label>
        <input type="text" name="picture" placeholder="url for the profile picture" id="picture">
        <div class="button_container">
            <button class="submit save_btn" type="submit"> Save</button> 
            <button class="cancel" name="cancel" type="button"> Cancel</button>
        </div>
    </div>`);
  document.body.appendChild(addListForm);
  addListForm.classList.add("open"); // Add the list of the people

  const addPeopleList = e => {
    addListForm.addEventListener("submit", e => {
      e.preventDefault();
      const addForm = e.target.closest(".popup");
      const AddFirstNameInput = addForm.querySelector("#firstname").value;
      const AddLastNameInput = addForm.querySelector("#lastname").value;
      const AddPictureInput = addForm.querySelector("#picture").value;
      const addBirthdayInput = addForm.querySelector("#birthday").value;
      const newPerson = {
        "id": Date.now(),
        "lastName": AddLastNameInput,
        "firstName": AddFirstNameInput,
        "picture": AddPictureInput,
        "birthday": addBirthdayInput
      };

      _script.persons.push(newPerson); // Create the html 


      const addPersonHtml = (0, _html_generator.htmlGenerator)(_script.persons); // Append the html to the list container

      _elements.listContainer.innerHTML = addPersonHtml;
      (0, _displayPeople.displayPersonsList)(); // Reset the form after submitting

      addForm.reset(); // Destroy it after submitting

      (0, _utils.destroyPopup)(addForm);

      _elements.table.dispatchEvent(new CustomEvent('updateList'));
    });
  };

  addPeopleList(); // Remove the form by clicking the cancel button

  if (addListForm.cancel) {
    const cancelAddButton = addListForm.cancel;
    cancelAddButton.addEventListener('click', () => {
      (0, _utils.destroyPopup)(addListForm);
    });
  }
};

exports.addNewPerson = addNewPerson;
},{"../script.js":"script.js","./elements.js":"scripts/elements.js","./html_generator.js":"scripts/html_generator.js","./displayPeople.js":"scripts/displayPeople.js","./utils.js":"scripts/utils.js"}],"scripts/editPerson.js":[function(require,module,exports) {
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
const editPerson = e => {
  // Open the modal 
  return new Promise(function (resolve) {
    const editIcon = e.target.closest(".edit"); // If the target is the edit icon, add the className to open the popup

    if (editIcon) {
      const id = e.target.closest(".list_container").dataset.id;
      editPersonPopup(id);
    }
  });
}; // Edit the form


exports.editPerson = editPerson;

function editPersonPopup(id) {
  const personToEdit = _script.persons.find(person => person.id == id); // Create the form element


  let formPopup = document.createElement('form');
  formPopup.classList.add('popup');
  formPopup.insertAdjacentHTML('afterbegin', `
    <div class="container form_container">
        <h3> Edit ${personToEdit.firstName} ${personToEdit.lastName}</h3>
        <button class="cancel exit" name="exit" >
            <svg fill="none" stroke="#094067" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        <label class="d-block" for="firstname">First Name:</label>
        <input type="text" name="firstname" id="firstname" value="${personToEdit.firstName}" required>
        <label class="d-block" for="lastname">Last Name:</label>
        <input type="text" name="lastname" id="lastname" value="${personToEdit.lastName}" required>
        <label class="d-block" for="birthday"> Birthday:</label>
        <input type="date" name="birthday" id="birthday" value="${personToEdit.birthday}">
        <label class="d-block" for="url"> Image url:</label>
        <input type="text" name="picture" id="picture" value="${personToEdit.picture}" required>
        <div class="button_container">
            <button class="submit_button" type="submit" data-id="${id}"> Save changes</button>
            <button class="cancel" name="cancel" type="button" data-id="${id}"> Cancel</button>
        </div>
    </div>`);
  document.body.appendChild(formPopup);
  formPopup.classList.add("open"); // Save the changes

  formPopup.addEventListener("submit", e => {
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
    const cancelButton = formPopup.cancel;
    cancelButton.addEventListener('click', () => {
      (0, _utils.destroyPopup)(formPopup);
    });
  }
}
},{"../script.js":"script.js","./elements.js":"scripts/elements.js","./utils.js":"scripts/utils.js","./displayPeople.js":"scripts/displayPeople.js"}],"script.js":[function(require,module,exports) {
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

let persons = [];
exports.persons = persons;
let array; // Fetch the data

exports.array = array;

async function fetchPersons() {
  const respose = await fetch("https://gist.githubusercontent.com/Pinois/e1c72b75917985dc77f5c808e876b67f/raw/b17e08696906abeaac8bc260f57738eaa3f6abb1/birthdayPeople.json");
  let data = await respose.json();
  exports.persons = persons = data; // Save in the local storage

  const mirrorToLocalStorage = () => {
    localStorage.setItem('persons', JSON.stringify(persons));
  }; // restor from local storage


  const initLocalStorage = () => {
    const personListString = localStorage.getItem('persons');
    const personsList = JSON.parse(personListString);

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

  const deletePerson = e => {
    const deleteButton = e.target.closest(".delete_btn");

    if (deleteButton) {
      const buttonContainer = e.target.closest('div.delete');
      const idToDelete = buttonContainer.dataset.id;
      deleteList(idToDelete);
    }
  }; // A function that deletes the list


  const deleteList = idToDelete => {
    //(If I use double equals, it doesn't filter)
    const personsToKeep = persons.filter(person => person.id != idToDelete); // Show a warning before the user decides

    let deleteContainerPopup = document.createElement('div');
    deleteContainerPopup.classList.add('popup');
    deleteContainerPopup.insertAdjacentHTML('afterbegin', `
        <div class="delete_container bg-warning">
            <p class="warning">
                Are you sure you want to delete?
            </p>
            <button type="button" name="confirm" class="confirm_delete"> Yes</button>
            <button type="button" name="cancel" class="cancel_delete">Not yet</button>
        </div>`);
    document.body.appendChild(deleteContainerPopup);
    deleteContainerPopup.classList.add("open"); // Look for the confirm delete button and delete it

    deleteContainerPopup.addEventListener("click", e => {
      e.preventDefault();
      const confirmDeleteButton = e.target.closest("button.confirm_delete");

      if (confirmDeleteButton) {
        exports.persons = persons = personsToKeep;
        (0, _displayPeople.displayPersonsList)(persons);
        (0, _utils.destroyPopup)(deleteContainerPopup);

        _elements.table.dispatchEvent(new CustomEvent('updateList'));
      }
    }); // Cancel if the user doesn't wanna delete yet

    deleteContainerPopup.addEventListener("click", e => {
      e.preventDefault();
      const cancelDeleteButton = e.target.closest("button.cancel_delete");

      if (cancelDeleteButton) {
        (0, _utils.destroyPopup)(deleteContainerPopup);
      }
    });

    _elements.table.dispatchEvent(new CustomEvent('updateList'));
  }; //************ ALL EVENT LISTNERS **************
  // Add the list 


  _elements.addList.addEventListener("click", _addPerson.addNewPerson); // Delete a person


  window.addEventListener("click", deletePerson); // Edit a person

  window.addEventListener("click", _editPerson.editPerson); // Local storage

  _elements.table.addEventListener("updateList", mirrorToLocalStorage);

  initLocalStorage();
}

fetchPersons();
},{"./scripts/elements.js":"scripts/elements.js","./scripts/displayPeople.js":"scripts/displayPeople.js","./scripts/utils.js":"scripts/utils.js","./scripts/addPerson.js":"scripts/addPerson.js","./scripts/editPerson.js":"scripts/editPerson.js"}],"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59678" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.75da7f30.js.map