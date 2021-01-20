/**
 * Thumbnail slider example.
 *
 * @author    Naotoshi Fujita
 * @copyright Naotoshi Fujita. All rights reserved.
 */

import React from 'react';
import { Splide, SplideSlide } from '../../../../src/js';
import { createSlides } from "../utils/slides";

/**
 * The class for dynamic slides example.
 * Slides are defined as state.
 */
export default class DynamicSlidesExample extends React.Component {
	/**
	 * DynamicSlidesExample constructor.
	 *
	 * @param {Object} props - Props.
	 */
	constructor( props ) {
		super( props );

		this.state = {
			slides: createSlides( 2 ),
		};

		this.count = 0;
		this.onClick = this.onClick.bind( this );
	}

	/**
	 * Add a slide when the button is clicked.
	 */
	onClick() {
		const slides = this.state.slides.concat( createSlides( 1, this.count + 100 ) );
		this.setState( { slides }, () => this.count++ );
	}

	/**
	 * Render the component.
	 *
	 * @return {ReactNode} - React component.
	 */
	render() {
		return (
			<div className="wrapper">

				<h2>Dynamic Slides</h2>
				<a
					href="https://github.com/Splidejs/react-splide/blob/master/examples/src/js/components/DynamicSlidesExample.jsx"
					target="_blank"
					rel="noopener"
				>
					View Code
				</a>

				<Splide
					options={ {
						rewind : true,
						perPage: 2,
						gap    : '1rem',
					} }
				>
					{ this.state.slides.map( slide => (
						<SplideSlide key={ slide.src }>
							<img src={ slide.src } alt={ slide.alt } />
						</SplideSlide>
					) ) }
				</Splide>

				<div className="controls">
					<button onClick={ this.onClick }>Add Slide</button>
				</div>
			</div>
		);
	}
}