import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App, { Search, Button, Table } from '../App/index.js';



//Search component also has two tests
describe('Search', () => {

	//First test renders component to DOM, verifies there are no errors
	it('Renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<Search>Search</Search>, div);
		ReactDOM.unmountComponentAtNode(div);
	});

	//Stores snapshot, compares with previous snapshot
	test('Has a valid snapshot', () => {
		const component = renderer.create(
			<Search>Search</Search>
		);

		let tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	})
});
