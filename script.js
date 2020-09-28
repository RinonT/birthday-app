// Grab all the necesssary elements
const table = document.querySelector("table");
const listContainer = document.querySelector(".contents_container");
const addList = document.querySelector(".add_list");
const filterByNameInput = document.querySelector("#filterByName");
const selectByMonth = document.querySelector("#select_month");

// Importing the data
const endpoint = "./people.json";

// This is reussable wait function that we can always use when we wanna wait before firing sth
function wait(ms = 0) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Generate the html
const htmlGenerator = (list) => {
    return list.map(person =>
        `<tr data-id="${person.id}" class="list_container">
   <td scope="row">
    <img src="${person.picture}" alt>
    </td>
   <td class="persons_name">
       <span class="name d-block">
         ${person.firstName}
         ${person.lastName} 
       </span>
       <span class="date d-block">
          Turns on the ${person.date}
       </span>
   </td>
   <td class="days">${person.days} days</td>
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
</tr>`
    ).join("");
}
// Fetch the data
async function fetchPersons() {
    const respose = await fetch(`${endpoint}?`);
    let data = await respose.json();
    let persons = data;

    // Save in the local storage
    const mirrorToLocalStorage = () => {
        localStorage.setItem('persons', JSON.stringify(persons));
    }

    // restor from local storage
    const initLocalStorage = () => {
        const personListString = localStorage.getItem('persons');
        const personsList = JSON.parse(personListString);
        if (personsList) {
            persons = personsList;
            displayPersonsList();
        }
        table.dispatchEvent(new CustomEvent('updateList'));
    };


    //get the array from the list
    const displayPersonsList = () => {
        const array = persons.map(data => {
            const monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

            // Get the day and month
            let date = new Date(data.birthday), day = date.getDate(), month = date.getMonth();

            // Adding "st", "nd", "rd" depending on the number
            if (day == 1 || day == 21 || day == 31) {
                day = day + "st";
            } else if (day == 2 || day == 22 || day == 32) {
                day = day + "nd";
            } else if (day == 3 || day == 23) {
                day = day + "rd";
            } else {
                day = day + "th";
            }

            // Get the full converted date
            const dateString = monthName[month] + " " + day;

            // To get the number of the days
            const oneDay = 1000 * 60 * 60 * 24;
            // get current year  
            const today = new Date();
            let birthDayYear;

            // Set a condition for the number of days untill the birthday comes
            if (date.getMonth() < today.getMonth()) {
                birthDayYear = today.getFullYear() + 1;
            } else if (date.getMonth() == today.getMonth() && date.getDate() > today.getDate()) {
                birthDayYear = today.getFullYear();
            }
            else if (date.getMonth() == today.getMonth() && date.getDate() < today.getDate()) {
                birthDayYear = today.getFullYear() + 1;
            } else {
                birthDayYear = today.getFullYear();
            }

            const birthdayDate = new Date(birthDayYear, date.getMonth(), date.getDate());
            const diffDays = Math.ceil((birthdayDate.getTime() - today.getTime()) / (oneDay));

            // This is an object that is used to store the person with the days and date
            const person = {
                firstName: data.firstName,
                lastName: data.lastName,
                id: data.id,
                birthday: data.birthday,
                picture: data.picture,
                date: dateString,
                days: diffDays,
            }
            return person;
        });

        // Sorting people
        const peopleSorted = array.sort(function (a, b) {
            return a.days - b.days;
        });


        // Show the list in the html: this will be a reusabe function
        const displayList = (object) => {
            const listHtml = htmlGenerator(object);
            listContainer.innerHTML = listHtml; 
            table.dispatchEvent(new CustomEvent('updateList'));
        }
        // Display the sorted list in the document
        displayList(peopleSorted);

        // Filter the list by firstName and lastName
        filterByNameInput.addEventListener("keyup", () => {
            const searchInputValue = filterByNameInput.value;
            // Filter the people that includes what the user types in the search input
            let filteredList = array.filter(person => person.firstName.toLowerCase().includes(searchInputValue.toLowerCase()) || person.lastName.toLowerCase().includes(searchInputValue.toLowerCase()));
            // Call the function that generate the lists add pass the filtered variable in it
            displayList(filteredList);
        });

        // Filter by month 
        selectByMonth.addEventListener("change", () => {
            // Get the value from the search by select styles
            let filteredListByMonth = selectByMonth.value;
            // Filter the people that includes what the user types in the search input
            let filteredPeopleByMonth = array.filter(person => person.date.toLowerCase().includes(filteredListByMonth.toLowerCase()));
            // Call the function that generate the lists add pass the filtered variable in it
            displayList(filteredPeopleByMonth);
        });
    }
    // Add the list 
    const addNewPerson = () => {
        let addListForm = document.createElement('form');
        addListForm.classList.add('popup');
        addListForm.insertAdjacentHTML('afterbegin', ` 
        <div class="container bg-primary">
            <p> Edit the person</p>
            <label class="d-block" for="firstname">First Name:</label>
            <input type="text" name="firstname" id="firstname">
            <label class="d-block" for="lastname">Last Name:</label>
            <input type="text" name="lastname" id="lastname">
            <label class="d-block" for="birthday"> Birthday:</label>
            <input type="date" name="birthday" id="birthday">
            <label class="d-block" for="picture"> Image url:</label>
            <input type="text" name="picture" id="picture">
            <div class="button_container">
                <button class="submit" type="submit"> Save</button> 
                <button class="cancel" name="cancel" type="button"> Cancel</button>
		    </div>
        </div>`);
        document.body.appendChild(addListForm);
        addListForm.classList.add("open");

        // Add the list of the people
        const addPeopleList = () => {
            addListForm.addEventListener("submit", (e) => {
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
                    "birthday": addBirthdayInput,
                };

                persons.push(newPerson);
                // Create the html 
                const addPersonHtml = generatePersonHtml(persons);
                // Append the html to the list container
                listContainer.innerHTML = addPersonHtml;
                // Reset the form after submitting
                addForm.reset();
                // Destroy it after submitting
                destroyPopup(addForm)
                table.dispatchEvent(new CustomEvent('updateList'));
            });
        }

        addPeopleList()
    }

    // A function that edits the person
    const editPerson = (e) => {
        // Open the modal 
        return new Promise(function (resolve) {
            const editIcon = e.target.closest(".edit");
            // If the target is the edit icon, add the className to open the popup
            if (editIcon) {
                const id = e.target.closest(".list_container").dataset.id;
                editPersonPopup(id);
            }
        });
    };

    // Distroy the popup while canceling or save
    async function destroyPopup(popup) {
        popup.classList.remove('open');
        await wait(500);
        // remove the popup from the DOM
        popup.remove();
        // remove it from the js memory
        popup = null;
    }

    // Edit the form
    function editPersonPopup(id) {
        const personToEdit = persons.find(person => person.id == id);
        // Create the form element
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
            <input type="date" name="birthday" id="birthday" value="${personToEdit.birthday}" required>
            <label class="d-block" for="url"> Image url:</label>
            <input type="text" name="picture" id="picture" value="${personToEdit.picture}" required>
            <div class="button_container">
                <button class="submit_button" type="submit" data-id="${id}"> Save</button>
                <button class="cancel" name="cancel" type="button" data-id="${id}"> Cancel</button>
		    </div>
        </div>`);
        document.body.appendChild(formPopup);
        formPopup.classList.add("open");

        // Save the changes
        formPopup.addEventListener("submit", (e) => {
            e.preventDefault();
            personToEdit.lastName = formPopup.lastname.value;
            personToEdit.firstName = formPopup.firstname.value;
            personToEdit.birthday = formPopup.birthday.value;
            personToEdit.picture = formPopup.picture.value;
            // Display in the list
            displayPersonsList();
            destroyPopup(formPopup)
            table.dispatchEvent(new CustomEvent('updateList'));
        })

        // Remove form by clicking the cancel button
        if (formPopup.cancel) {
            const cancelButton = formPopup.cancel;
            cancelButton.addEventListener('click', () => {
                destroyPopup(formPopup);
            });
        }

    }

    // Delete list from the local storage
    const deletePerson = (e) => {
        const deleteButton = e.target.closest(".delete_btn");
        if (deleteButton) {
            const tableRow = e.target.closest('tr');
            const idToDelete = tableRow.dataset.id;
            deleteList(idToDelete);
        }
    }

    const deleteList = (idToDelete) => {
        //(If I use double equals, it doesn't filter)
        const personsToKeep = persons.filter(person => person.id != idToDelete);

        // Show a warning before the user decides
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
        document.body.appendChild(deleteContainerPopup)
        deleteContainerPopup.classList.add("open");

        // Look for the confirm delete button and delete it
        deleteContainerPopup.addEventListener("click", (e) => {
            e.preventDefault()
            const confirmDeleteButton = e.target.closest("button.confirm_delete");
            if (confirmDeleteButton) {
                persons = personsToKeep;
                displayPersonsList(persons);
                destroyPopup(deleteContainerPopup);
                table.dispatchEvent(new CustomEvent('updateList'));
            }

        })

        // Cancel if the user doesn't wanna delete yet
        deleteContainerPopup.addEventListener("click", (e) => {
            e.preventDefault()
            const cancelDeleteButton = e.target.closest("button.cancel_delete");
            if (cancelDeleteButton) {
                destroyPopup(deleteContainerPopup);
            }
        })
        table.dispatchEvent(new CustomEvent('updateList'));
    }




    // All event listners
    addList.addEventListener("click", addNewPerson);
    window.addEventListener("click", deletePerson);
    window.addEventListener("click", editPerson);
    table.addEventListener("updateList", mirrorToLocalStorage);
    initLocalStorage();
}


fetchPersons();