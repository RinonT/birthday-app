// Generate the html
export const htmlGenerator = (list) => {
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