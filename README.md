# Summary
This project was creating while following along with [The Road To Learn React](https://roadtoreact.com/)

The project takes some user input and searches the [Hacker News API](https://hn.algolia.com/) to display a list of results that feature the user input in the title. 

It was developed with React. npm must be installed to run the program. Once downloaded, navigate to the program's folder and type 'npm start'. The program will then open up in your local host where the stories will be displayed. 

## Components
There are three smaller components: Button, Search, and Table. 
1. Button component is used instead of button element. 
2. Search component first focuses the browser on the input field, so you can start typing in it without having to click in it. It is also used to fetch the result object from the API when the submit button is clicked.
3. Table component is used to display the results in a table, where they can be sorted by Title, Author, Comments, Points (ascending or descending) and can remove a result from the table by clicking Dismiss. 

There is one larger component: App.
1. App component is used/instantiated in the main index.js file, in the ReactDOM.render() function. It is the JSX that gets rendered at the root of the DOM. 