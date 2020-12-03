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
})({"script.js":[function(require,module,exports) {
// Grab all the necesssary elements
const table = document.querySelector("table");
const listContainer = document.querySelector(".contents_container"); // Importing the data

const endpoint = "./people.json"; // This is reussable wait function that we can always use when we wanna wait before firing sth

function wait(ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms));
} // Fetch the data


async function fetchPersons() {
  const respose = await fetch(`${endpoint}?`);
  let persons = await respose.json(); //get the array from ls

  const generatePersonHtml = personList => {
    // To get the date
    const today = new Date(); // This is a function that handles the date and we'll call this when mapping the object

    const calcDate = (date1, date2) => {
      let diff = Math.floor(date1.getTime() - date2.getTime());
      let day = 1000 * 60 * 60 * 24;
      let days = Math.floor(diff / day);
      let message = days; // Return the message

      return message;
    }; // Show the list in the html


    return personList.map(data => `<tr data-id="${data.id}" class="list_container">
            <td scope="row">
             <img src="${data.picture}" alt>
             </td>
            <td class="persons_name">
                <span class="name d-block">
                  ${data.firstName}
                  ${data.lastName} 
                </span>
                <span class="date d-block">
                   Turns on the ${new Date(data.birthday).toLocaleDateString()}
                </span>
            </td>
         <td class="days">${calcDate(today, new Date(new Date(data.birthday).toLocaleDateString()))} Days</td>
            <td> 
                <button class="edit bg-primary text-white" type="button">
                    Edit
                </button>  
            </td>
            <td class="delete">
                <button class="delete_btn text-danger">
                    Delete
                </button>
            </td>
        </tr>`).join("");
  }; // Display the persons ' list in the html


  const displayPersonsList = () => {
    // Sorting the persons by birthday, from the soonest to the furthest
    const sortedPersons = persons.sort((person1, person2) => person2.birthday - person1.birthday);
    const listHtml = generatePersonHtml(sortedPersons);
    listContainer.innerHTML = listHtml;
  };

  displayPersonsList(); // A function that edits the person

  const editPerson = e => {
    // Open the modal 
    return new Promise(function (resolve) {
      const editIcon = e.target.closest(".edit"); // If the target is the edit icon, add the className to open the popup

      if (editIcon) {
        const id = e.target.closest(".list_container").dataset.id;
        editPersonPopup(id);
      }
    });
  }; // Distroy the popup while canceling or save


  async function destroyPopup(popup) {
    popup.classList.remove('open');
    await wait(500); // remove the popup from the DOM

    popup.remove(); // remove it from the js memory

    popup = null;
  } // Edit the form


  function editPersonPopup(id) {
    const personToEdit = persons.find(person => person.id == id); // Create the form element

    let formPopup = document.createElement('form');
    formPopup.classList.add('popup');
    formPopup.insertAdjacentHTML('afterbegin', `
        <div class="container bg-primary">
            <p> Edit the person</p>
            <label class="d-block" for="firstname">First Name:</label>
            <input type="text" name="firstname" id="firstname" value="${personToEdit.firstName}" required>
            <label class="d-block" for="lastname">Last Name:</label>
            <input type="text" name="lastname" id="lastname" value="${personToEdit.lastName}" required>
            <label class="d-block" for="birthday"> Birthday:</label>
            <input type="text" name="birthday" id="birthday" value="${personToEdit.birthday}" required>
            <label class="d-block" for="url"> Image url:</label>
            <input type="text" name="picture" id="picture" value="${personToEdit.picture}" required>
            <div class="button_container">
                <button class="submit_button" type="submit" data-id="${id}"> Save</button>
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

      displayPersonsList();
      destroyPopup(formPopup);
      table.dispatchEvent(new CustomEvent('updateList'));
    }); // Remove form by clicking the cancel button

    if (formPopup.cancel) {
      const cancelButton = formPopup.cancel;
      cancelButton.addEventListener('click', () => {
        destroyPopup(formPopup);
      });
    }
  } // Delete list from the local storage


  const deletePerson = e => {
    const deleteButton = e.target.closest(".delete_btn");

    if (deleteButton) {
      const tableRow = e.target.closest('tr');
      const idToDelete = tableRow.dataset.id;
      deleteList(idToDelete);
    }
  };

  const deleteList = idToDelete => {
    const personsToKeep = persons.filter(person => person.id !== idToDelete); // Show a warning before the user decides

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
        persons = personsToKeep;
        displayPersonsList(persons);
        destroyPopup(deleteContainerPopup);
        table.dispatchEvent(new CustomEvent('updateList'));
      }
    }); // Cancel if the user doesn't wanna delete yet

    deleteContainerPopup.addEventListener("click", e => {
      e.preventDefault();
      const cancelDeleteButton = e.target.closest("button.cancel_delete");

      if (cancelDeleteButton) {
        destroyPopup(deleteContainerPopup);
      }
    });
    table.dispatchEvent(new CustomEvent('updateList'));
  }; // Save in the local storage


  const mirrorToLocalStorage = () => {
    localStorage.setItem('persons', JSON.stringify(persons));
  }; // restor from local storage


  const initLocalStorage = () => {
    const personListString = localStorage.getItem('persons');
    const personsList = JSON.parse(personListString);

    if (personsList.length) {
      persons = personsList;
      displayPersonsList();
    }

    table.dispatchEvent(new CustomEvent('updateList'));
  }; // All event listners


  window.addEventListener("click", deletePerson);
  window.addEventListener("click", editPerson);
  table.addEventListener("updateList", mirrorToLocalStorage);
  initLocalStorage();
}

fetchPersons();
},{}],"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56167" + '/');

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