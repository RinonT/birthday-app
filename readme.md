# Term 3 JS Project : Birthday App

## My steps
- I started with fetching the data from the people.json
- Generating a reusable html in a function called `htmlGenerator` so that I can reuse it whenever I want to.
- I wrapped everything inside of the `fetchPeole` function, which is an async function.
- Before displaying the list on the html, the object is store in the local storage.
- I couldn't use the **date-fns**, so I used just vanilla js to get it. It is done before creating the `person` object that is used for sorting the people by the number of the days.
- The filters are set in the `displayPersonList` function so that I can use the new object that is created there.
- After displaying the list is the function that enables us to add a new person followed by the `editPerson` function. 
- I destroy the popup by removing the class **open** from the form. This is used everywhere I have a cancel button.
- To delete the list, I used the filter method which filters the ones that don't have the id that is passed in the condition.

##  What could have done better

- Working on the local storage because it's still fetching
- 
