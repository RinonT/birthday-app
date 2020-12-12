# Term 3 JS Project : Birthday App
<h1 align="center">Birthday App</h1>

<div align="center">
  <h3>
    <a href="https://countryquiz-play.netlify.app/">
      Demo
    </a>
    <span> | </span>
    <a href="https://github.com/ganamavo/birthday-app">
      Solution
    </a>
  </h3>
</div>

## Demo
 The demo of this project can be seen by following this [link](https://birthday-app-rinon.netlify.app/)
## Structure of the project
- I started with fetching the data from the people.json
- Generating a reusable html in a function called `htmlGenerator` so that I can reuse it whenever I want to.
- I wrapped everything inside of the `fetchPeole` function, which is an async function.
- Before displaying the list on the html, the object is store in the local storage.
- I couldn't use the **date-fns**, so I used just vanilla js to get it. It is done before creating the `person` object that is used for sorting the people by the number of the days.
- The filters are set in the `displayPersonList` function so that I can use the new object that is created there.
- After displaying the list is the function that enables us to add a new person followed by the `editPerson` function. 
- I destroy the popup by removing the class **open** from the form. This is used everywhere I have a cancel button.
- To delete the list, I used the filter method which filters the ones that don't have the id that is passed in the condition.

## My experience
The challenge is to create an app that shows people's birthdays, enables users to edit or delete a list, and most importantly, add people to the list. This is build with vanilla js without using any library.


## Most challenging part
 
- Working on the date without date-fns but just with plain js
 
## Comment
It's a nice and helpful project. I have solidified my knowledge because there is a lot of stuff that I gained from it. Thanks for that!


## Contact
 
-  GitHub [@ganamavo](https://github.com/ganamavo)
-  Twitter [@twitter](https://twitter.com/RTendrinomena)

