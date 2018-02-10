import React, {Component, PureComponent} from 'react'
import './Score.font'
import './Score.css'

/**
 * Display the score, supplied to the tag.
 *
 * Attributes:
 * - score - integer value that is the score.
 */
export default function Score(props) {
	let score = props.score ? props.score : 0
	let beers = new Array(score).fill(11)	// Create array so we can use map()

	return (
		<span className='score'>
			{beers.map((i,idx) => (<span key={idx} className="icon icon-beer"/>))}
		</span>
	)
} // Score component
