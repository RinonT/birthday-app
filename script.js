import {table, listContainer, addList, endpoint} from "./elements.js";
import { htmlGenerator } from "./html_generator.js";
import { wait } from "./utils.js"; 
import { displayPersonsList } from "./displayPeople.js";
export let persons = [];

// Fetch the data
async function fetchPersons() {
    const respose = await fetch(`${endpoint}?`);
    let data = await respose.json();
    persons = data;

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
            table.dispatchEvent(new CustomEvent('updateList'));
        }
    };


    //get the array from the list
    displayPersonsList()
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
                const addPersonHtml = htmlGenerator(persons);
                // Append the html to the list container
                listContainer.innerHTML = addPersonHtml;
                displayPersonsList();
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