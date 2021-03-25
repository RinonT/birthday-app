import { persons } from "../script.js";
import { table, body } from "./elements.js";
import { destroyPopup } from "./utils.js";
import { displayPersonsList } from "./displayPeople.js";

// A function that edits the person
export const editPerson = (e) => {
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


// Edit the form
function editPersonPopup(id) {
    const personToEdit = persons.find(person => person.id == id);
    // Create the form element 
    const birthdayDate = new Date(personToEdit.birthday).toISOString().slice(0, 10)
    const maxDate = new Date().toISOString().slice(0, 10);
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
        <input type="date" name="birthday" id="birthday" max="${maxDate}" value="${birthdayDate}">
        <div class="button_container">
            <button class="submit_button confirm_btn" type="submit" data-id="${id}"> Save changes</button>
            <button class="cancel cancel_btn" name="cancel" type="button" data-id="${id}"> Cancel</button>
        </div>
    </div>`);
    document.body.appendChild(formPopup);
    formPopup.classList.add("open");
    body.classList.add("overflow_hidden");

    // Save the changes
    formPopup.addEventListener("submit", (e) => {
        e.preventDefault();
        personToEdit.lastName = formPopup.lastname.value;
        personToEdit.firstName = formPopup.firstname.value;
        personToEdit.birthday = formPopup.birthday.value; 
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
