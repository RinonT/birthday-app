import { table, addList, body } from "./scripts/elements.js";
import { displayPersonsList } from "./scripts/displayPeople.js";
import { destroyPopup } from "./scripts/utils.js";
import { addNewPerson } from "./scripts/addPerson.js";
import { editPerson } from "./scripts/editPerson.js";

export let persons = [];
export let array;

// Fetch the data
async function fetchPersons() {
    const respose = await fetch("https://gist.githubusercontent.com/Pinois/e1c72b75917985dc77f5c808e876b67f/raw/b17e08696906abeaac8bc260f57738eaa3f6abb1/birthdayPeople.json");
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
        } else {
            persons = person;
        }
    };


    //get the array from the list
    displayPersonsList()

    // *********DELETE THE PERSON******************
    // Delete list from the local storage
    const deletePerson = (e) => {
        const deleteButton = e.target.closest(".delete_btn");
        if (deleteButton) {
            const buttonContainer = e.target.closest('div.delete');
            const idToDelete = buttonContainer.dataset.id;
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
        <div class="delete_container">
            <button class="cancel exit" name="cancel" >
                <svg fill="none" stroke="#094067" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <h3 class="warning_text">
                Are you sure you want to delete?
            </h3>
            <button type="button" name="confirm" class="confirm_delete confirm_btn"> Confirm delete</button>
            <button type="button" name="cancel" class="cancel cancel_delete cancel_btn"> Cancel</button>
        </div>`);
        document.body.appendChild(deleteContainerPopup)
        deleteContainerPopup.classList.add("open");
        body.classList.add("overflow_hidden");

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
            const cancelDeleteButton = e.target.closest("button.cancel");
            if (cancelDeleteButton) {
                destroyPopup(deleteContainerPopup);
            }
        })
        table.dispatchEvent(new CustomEvent('updateList'));
    }
    // if(form.classList.contains("open")) {
    //     main.classList.add("overflow_hidden");
    // }
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