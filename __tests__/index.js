import React from 'react'
import { configure, mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import EnzymeToJSON from 'enzyme-to-json'

// Setup Enzyme Adapter
configure({ adapter: new Adapter() })

import Image from '../src/'

import { config } from '../src/index.js'

const image =
	'https://res.cloudinary.com/stackpie/image/upload/v1513979515/-895520106_m1whb3.jpg'

const placeholder = image.replace('/upload/', '/upload/c_thumb,w_30/')

describe('pimg', () => {
	test('renders correctly', () => {
		const component = mount(<Image src={image} />)

		expect(EnzymeToJSON(component)).toMatchSnapshot()
	})
})

describe('Image', () => {
	test('generates placeholder when loading', () => {
		const component = mount(<Image src={image} />)

		if (component.state().loading) {
			expect(component.state().placeholder).toBe(placeholder)
		}
	})

	test('can take a placeholder prop', () => {
		const component = mount(
			<Image src={image} placeholder="http://myPlaceholder" />
		)

		expect(EnzymeToJSON(component)).toMatchSnapshot()
	})

	test('uses the default classNames for placeholders', () => {
		const component = mount(<Image src={image} />)

		if (component.state().loading) {
			expect(component.childAt(0).props().className).toBe(
				'pimg pimg__placeholder'
			)
		}
	})

	test('uses the placeholderClassName passed when loading', () => {
		const component = mount(
			<Image
				className="myImage"
				placeholderClassName="image_is_loading"
				src={image}
			/>
		)

		if (component.state().loading) {
			expect(component.childAt(0).props().className).toBe(
				'myImage image_is_loading'
			)
		}
	})

	test("appends `pimg__placeholder` if placeholderClassName isn't passed", () => {
		const component = mount(<Image className="myImage" src={image} />)

		if (component.state().loading) {
			expect(component.childAt(0).props().className).toBe(
				'myImage pimg__placeholder'
			)
		}
	})
})
