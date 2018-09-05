import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App, { Search, Button, Table } from '../App/index.js';




//Button component tests
describe('Button', () => {
	it('Renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<Button onClick={Button.propTypes.onClick}>Button</Button>, div);
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