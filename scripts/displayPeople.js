import { persons } from '../script.js'
import { filterByNameInput, selectByMonth } from './elements.js'
import { displayList } from './utils.js'

export let newPeopleArray
// export let sortedPersons;
export const displayPersonsList = () => {
  newPeopleArray = persons.map((data) => {
    // Store all the months in a variable
    const monthName = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]
    // Get the day and month
    let date = new Date(data.birthday),
      day = date.getDate(),
      month = date.getMonth()

    // Adding "st", "nd", "rd" depending on the number
    if (day == 1 || day == 21 || day == 31) {
      day = day + 'st'
    } else if (day == 2 || day == 22) {
      day = day + 'nd'
    } else if (day == 3 || day == 23) {
      day = day + 'rd'
    } else {
      day = day + 'th'
    }

    // Get the full converted date
    const dateString = monthName[month] + ' ' + day

    // To get the number of the days
    const oneDay = 1000 * 60 * 60 * 24
    // get current year
    const today = new Date()
    let birthDayYear

    // A function that calculates the age each person
    function calculateAge(dob) {
      let diffMs = Date.now() - dob.getTime()
      let ageDt = new Date(diffMs)
      return Math.abs(ageDt.getUTCFullYear() - 1970)
    }
    // Assign the age in a variable so that we can use it with the object
    let age = calculateAge(new Date(data.birthday))

    // Set a condition for the number of days untill the birthday comes
    if (date.getMonth() < today.getMonth()) {
      birthDayYear = today.getFullYear() + 1
      age++
    } else if (
      date.getMonth() == today.getMonth() &&
      date.getDate() > today.getDate()
    ) {
      birthDayYear = today.getFullYear()
      age = age
    } else if (
      date.getMonth() == today.getMonth() &&
      date.getDate() < today.getDate()
    ) {
      birthDayYear = today.getFullYear() + 1
      age++
    } else {
      birthDayYear = today.getFullYear()
    }

    let birthdayDate = new Date(birthDayYear, date.getMonth(), date.getDate())
    let diffDays = Math.ceil(
      (birthdayDate.getTime() - today.getTime()) / oneDay
    )

    // This is an object that is used to store the person with the days and date
    const newPerson = {
      firstName: data.firstName,
      lastName: data.lastName,
      id: data.id,
      birthday: data.birthday,
      picture: data.picture,
      ages: age,
      date: dateString,
      days: diffDays,
    }
    return newPerson
  })

  // Sorting people
  const sortedPersons = newPeopleArray.sort(function (a, b) {
    return a.days - b.days
  })

  function filterByName(peopleToFilter) {
    const searchInputValue = filterByNameInput.value.trim()
    // Filter the people that includes what the user types in the search input
    return peopleToFilter.filter(
      (person) =>
        person.firstName
          .toLowerCase()
          .includes(searchInputValue.toLowerCase()) ||
        person.lastName.toLowerCase().includes(searchInputValue.toLowerCase())
    )
  }

  function filterByMonth(peopleToFilter) {
    let selectedMonth = selectByMonth.value
    if (selectedMonth === 'empty') {
      return peopleToFilter
    }
    return peopleToFilter.filter((person) =>
      person.date.toLowerCase().includes(selectedMonth.toLowerCase())
    )
  }

  // Filter the people
  function filterByNameAndMonth(peopleToFilter) {
    const filteredByName = filterByName(peopleToFilter)
    const filteredByNameAndMonth = filterByMonth(filteredByName)
    displayList(filteredByNameAndMonth)
  }
  const fiterListsFunction = () => {
    // Filter the list by firstName and lastName
    filterByNameInput.addEventListener('keyup', () => {
      filterByNameAndMonth(sortedPersons)
    })

    // Filter by month
    selectByMonth.addEventListener('change', () => {
      filterByNameAndMonth(sortedPersons)
    })

    // //Reset the filter by the reset filter button
    // resetFilterButton.addEventListener("click", () => {
    //    // Just call the function with the html
    //    filterForm.reset();
    //    displayList(sortedPersons);
    // });
  }
  fiterListsFunction()
  // Display the sorted list in the document
  displayList(sortedPersons)
}
