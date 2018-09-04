import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App, { Search, Button, Table } from './index.js';

Enzyme.configure({ adapter: new Adapter() });

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

//Button component tests
describe('Button', () => {
	it('Renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<Button>Button</Button>, div);
		ReactDOM.unmountComponentAtNode(div);
	});

	test('Has a valid snapshot', () => {
		const component = renderer.create(
			<Button>Button</Button>
		);
		let tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
});

describe('Table', () => {
	const props = {
		list: [
			{ title: '1', author: '1', num_comments: 1, points: 2, objectID: 'y' },
			{ title: '2', author: '2', num_comments: 1, points: 2, objectID: 'z' },
		],
	};

	it('Renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<Table{ ...props } />, div);
	});

	test('Has a valid snapshot', () => {
		const component = renderer.create(
			<Table { ...props } />
		);
		let tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	})

	it('Shows two items in the list', () => {
		const element = shallow(
			<Table { ...props } />
		);

		expect(element.find('.table-row').length).toBe(2);
	})
});