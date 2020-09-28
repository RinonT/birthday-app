import { persons } from "./script.js";
import {filterByNameInput, selectByMonth, resetFilterButton, endpoint} from "./elements.js";
import { displayList } from "./utils.js";

export const displayPersonsList = () => {
    let array = persons.map(data => { 
        // Store all the months in a variable
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

        // This is an object that is used to store the person with the days and date
        const newPerson = {
            firstName: data.firstName,
            lastName: data.lastName,
            id: data.id,
            birthday: data.birthday,
            picture: data.picture,
            date: dateString,
            days: diffDays,
        }
        return newPerson;
    });

    // Sorting people
    const peopleSorted = array.sort(function (a, b) {
        return a.days - b.days;
    });

    // Display the sorted list in the document
    displayList(peopleSorted);

    // Filter the list by firstName and lastName
    filterByNameInput.addEventListener("keyup", () => {
        const searchInputValue = filterByNameInput.value; 
        // Filter the people that includes what the user types in the search input
        let filteredList = array.filter(person => person.firstName.toLowerCase().includes(searchInputValue.toLowerCase()) || person.lastName.toLowerCase().includes(searchInputValue.toLowerCase()));
        // Call the function that generate the lists add pass the filtered variable in it
        displayList(filteredList);
    });

    // Filter by month 
    selectByMonth.addEventListener("change", () => {
        // Get the value from the search by select styles
        let filteredListByMonth = selectByMonth.value;
        // Filter the people that includes what the user types in the search input
        let filteredPeopleByMonth = array.filter(person => person.date.toLowerCase().includes(filteredListByMonth.toLowerCase()));
        // Call the function that generate the lists add pass the filtered variable in it
        displayList(filteredPeopleByMonth);
    });

    //Reset the filter by the reset filter button
    resetFilterButton.addEventListener("click", () => {
       // Just call the function with the html
        displayList(peopleSorted);
    });
}

 