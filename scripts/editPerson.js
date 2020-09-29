import { persons } from "../script.js";
import { table } from "./elements.js";
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
