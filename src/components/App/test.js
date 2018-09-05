import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App, { Search, Button, Table } from './index.js';

//App component has two test
describe('App', () => {

	//it function runs a single test. Checks if app runs without crashing
	it('Renders without crashing', () => {
	  const div = document.createElement('div');
	  ReactDOM.render(<App />, div);
	  ReactDOM.unmountComponentAtNode(div);
	});


	test('Has a valid snapshot', () => {
		//.create creates a snapshot of the App component. Renders and stores in DOM
		const component = renderer.create(
			<App />
		);
		let tree = component.toJSON();

		//Checks if new snapshot matches previous
		expect(tree).toMatchSnapshot();
	})

});
