import  persons  from "../script.js";
import { table } from "./elements.js";
import { displayPersonsList } from "./displayPeople.js";
import { destroyPopup } from "./utils.js"; 
let people = persons; 

export const deletePerson = (e) => {
    const deleteButton = e.target.closest(".delete_btn");
    if (deleteButton) {
        const deleteButtonContainer = e.target.closest('div.delete');
        const idToDelete = deleteButtonContainer.dataset.id;
        deleteList(idToDelete);
    }
}

// A function that deletes the list
const deleteList = (idToDelete) => {
    //(If I use double equals, it doesn't filter)
    const personsToKeep = people.filter(person => person.id != idToDelete);
    // Show a warning before the user decides
    let deleteContainerPopup = document.createElement('div');
    deleteContainerPopup.classList.add('popup', "delete_popup");
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
            people = personsToKeep;
            displayPersonsList(people);
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
