import { htmlGenerator } from "./html_generator.js";
import { listContainer, table } from "./elements.js";
// This is reussable wait function that we can always use when we wanna wait before firing sth
export function wait(ms = 0) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

 // Show the list in the html: this will be a reusabe function
 export const displayList = (object) => {
    const listHtml = htmlGenerator(object);
    listContainer.innerHTML = listHtml; 
    table.dispatchEvent(new CustomEvent('updateList'));
}