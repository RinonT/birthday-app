import { table } from './elements';
import { listContainer } from './elements';

//get the array from the list
export function displayPersonsList() {
    const people = persons.map(data => {
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
         
         // This is an object that is used to generate the html with the date properties
         const person = {
             firstName : data.firstName,
             lastName : data.lastName,
             id : data.id,
             birthday : data.birthday,
             picture : data.picture, 
             date: dateString,
             days: diffDays,
           } 
           return person;
         });
         
         // Sorting the people
         const sortedPeople = people.sort(function(x, y) {
             return x.days - y.days;
         });

         // Show the list in the html
         const listHtml = sortedPeople.map(person => 
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
     listContainer.innerHTML = listHtml;
     table.dispatchEvent(new CustomEvent('updateList'));
 }
 