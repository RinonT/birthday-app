import { persons } from "../script";

// Generate the html
export const htmlGenerator = (list) => {
    return list.map(person => {
        return `
        <div data-id="${person.id}" class="list_container">
        <img class="peopleList_image" src="${person.picture}" alt="${person.firstName}'s picture">
	 <div class="peopleList_info">
		<p class="peopleList_name">
        ${person.firstName} ${person.lastName} 
		</p>
        <span class="peopleList_birthday date">
        Turns <strong>${person.ages > 1 ? person.ages + " years" : person.ages + " year"} old</strong> on the ${person.date}
        </span>
        ${person.days == 0 ? 
            `<p class="whishingBirthday_text">
                <svg class="w-6 h-6" fill="none" stroke="pink" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z"></path></svg>
                Wish <span class="personName">${person.firstName}</span> a happy birthday
                <svg class="w-6 h-6" fill="none" stroke="pink" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z"></path></svg> 
            </p>` : ""}
	 </div>
	 <div class="peopleList_access">
         <p class="peopleList_numberOfDays days">
            ${person.days > 1 ? `In ${person.days}` + " days" : person.days == 0 ? `<span class="today"> That's today!</span>` : person.days == 1 ? "Tomorrow" : "Invalid"}
         </p>
         <div class="peopleList_edit">
            <div class="edit">
                <svg class="w-6 h-6 edit" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
            </div>
            <div data-id="${person.id}" class="delete"> 
                <svg class="w-6 h-6 delete_btn"  fill="none" stroke="#EF4565" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"></path></svg>
            </div>
		 </div>
	 </div>
     </div>`}).join("");
}