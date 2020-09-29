import { table, addList, endpoint } from "./scripts/elements.js";
import { displayPersonsList } from "./scripts/displayPeople.js";
import { destroyPopup } from "./scripts/utils.js";
import { addNewPerson } from "./scripts/addPerson.js";
import { editPerson } from "./scripts/editPerson.js"; 

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

    // *********DELETE THE PERSON******************
    // Delete list from the local storage
    const deletePerson = (e) => {
        const deleteButton = e.target.closest(".delete_btn");
        if (deleteButton) {
            const tableRow = e.target.closest('tr');
            const idToDelete = tableRow.dataset.id;
            deleteList(idToDelete);
        }
    }

    // A function that deletes the list
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

    //************ ALL EVENT LISTNERS **************
    // Add the list 
    addList.addEventListener("click", addNewPerson);
    // Delete a person
    window.addEventListener("click", deletePerson);
    // Edit a person
    window.addEventListener("click", editPerson);
    // Local storage
    table.addEventListener("updateList", mirrorToLocalStorage);
    initLocalStorage();
}


fetchPersons();