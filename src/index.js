import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';


//This is what renders the entire application on the screen
ReactDOM.render(
	<App />, 
	document.getElementById('root')
);


//App reloads in browser without having to refresh the page
if (module.hot){
	module.hot.accept();
}


