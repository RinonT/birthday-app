 
// Generate the html
export const htmlGenerator = (list) => {
    return list.map(person => {
        return `<tr data-id="${person.id}" class="list_container">
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
        <td class="days"> ${person.days > 1 ? `After ${person.days}` + " days" : person.days == 0 ? "That's today" : person.days == 1 ? "Tomorrow" : "Invalid"}</td>
        <td> 
                <svg class="w-6 h-6  edit bg-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
        </td>
        <td class="delete"> 
                <svg class="w-6 h-6 delete_btn" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
        </td>
        </tr>`
            }).join("");
}