import React, {Component, PureComponent} from 'react'
import ReactDOM from 'react-dom'
import './styles.scss'
import GithubKitty from './github.svg'
import './home.font'

/**
 * Timeout/interval handler that works as a promise.
 */
function timeout(delay) {
	return new Promise( (resolve, reject) =>
		setTimeout( resolve, delay )
	)
} // timeout()

/**
 * This is the "target", confined to its parent, play-area. It detects when it
 * has been "hit" and reports it to listeners.
 *
 * Attributes:
 * - onClick {callback} called if the target was "hit"
 * - move {integer} Number of moves the target will make. Zero will keep the
 *        target from moving. You can also specify the number of moves it will
 *        make before stopping.
 */
class Target extends Component {

	constructor(props) {
		super(props)

		this.vector = {x:50, y:50}				// Movement vector
    this.timeSlice = 125              // Animation timeslice, in milliseconds
		this.state = {
			show: false											// Has target been mounted in React?
		}

		this.handleClick = this.handleClick.bind(this)
		this.move = this.move.bind(this)
	} // constructor()

	/**
	 * Since the initial position of the target is relative to the play area, we
	 * have to wait until this component is mounted before we can determine where
	 * to place it.
	 */
	componentDidMount() {
		if (!this.state.show) {
			const prect=this.parentNode.getBoundingClientRect()
			const crect=this.node.firstChild.getBoundingClientRect()
			this.setState({
				show: true,
				x: prect.x + prect.width*Math.random() - crect.width/2,
				y: prect.y + prect.height*Math.random() - crect.height/2
			})
		}
		if (this.props.move !== 0) {
			this.moveCount = Number.isInteger(this.props.move) ? this.props.move : -1
			this.move()
		}
	} // componentDidMount()

	/**
	 * Move the "target" within the play area (the parent area).
	 */
	move() {
//		console.log('move',this.vector, this.state);
		if ( ! this.parentNode || ! this.node.firstChild )
			return;
		const prect=this.parentNode.getBoundingClientRect()
		const crect=this.node.firstChild.getBoundingClientRect()

		this.setState(state => {
//			console.log('child',crect);
//			console.log('parent',prect);
													// Move the target
			state.x += this.vector.x
			state.y += this.vector.y

			// Check to see whether we moved (a little) out of bounds and
			// limit the movement, if it has. Then adjust the movement direction
			// vector so the target doesn't keep trying to move outside the
			// boundary.
			if (state.x < prect.x) {
				state.x = prect.x
				this.vector.x = -this.vector.x
			}
			if (state.y < prect.y) {
				state.y = prect.y
				this.vector.y = -this.vector.y
			}

			if (state.x+crect.width/2 > prect.x+prect.width) {
				state.x = prect.x+prect.width - crect.width/2
				this.vector.x = -this.vector.x
			}
			if (state.y+crect.height/2 > prect.y+prect.height) {
				state.y = prect.y+prect.height - crect.height/2
				this.vector.y = -this.vector.y
			}
			return state
		})
		if (this.moveCount--)				// In case moves are limited
			timeout(this.timeSlice).then(this.move)	// Move, again, after a short pause.
	}

	componentWillUnmount() {
		this.moveCount = 0;
	}

	/**
	 * Propagate "hits" to registered onClick function
	 */
	handleClick(e) {
													// If listener is registered, call it.
		if (typeof this.props.onClick == 'function') {
			this.props.onClick.apply(null,arguments)
//			e.preventDefault()
			e.stopPropagation()
		}
	} // handleClick()

	render() {
		return (
			<span ref={target => (this.node= target,this.parentNode = (target ? target.parentElement : null)) }>
			<GithubKitty
				className='target'
				style={{
          transition: this.timeSlice/1000+'s linear',
					visibility: this.state.show ? 'visible' : 'hidden',
					top: this.state.y,
					left: this.state.x
				}}
				onClick={this.handleClick} />
			</span>
		)
	} // render()
} // class Target

/**
 * Display the score, supplied to the tag.
 *
 * Attributes:
 * - score - integer value that is the score.
 */
function Score(props) {
	let score = props.score ? props.score : 0
	let beers = new Array(score).fill(11)	// Create array so we can use map()

	return (
		<span className='score'>
			{beers.map((i,idx) => (<span key={idx} className="icon icon-beer"/>))}
		</span>
	)
} // Score component


/**
 * The component represents the entire game area. Its tags
 * surround the content which serves as a title.
 *
 * Attributes:
 * - win A numeric value that defines what a winning score is
 *       (default 10)
 *
 * This contains key components:
 * - <Score> - displays the current score
 * - <Target> - the component which which the player "attacks"
 * - <WinnerBanner> - Manages content displayed to a winner.
 */
class GameBoard extends Component {
	constructor(props) {
		super(props)
									// What score is needed to win? Dft: 10
		this.win = props.win ? props.win : 10
		this.state = {
			score: 0,			// Game score
			winner: false		// Did the player win?
		}
		this.onTargetClick = this.onTargetClick.bind(this)
		this.onMissedClick = this.onMissedClick.bind(this)
	}

	/**
	 * Detected a click in the board's area, so it missed! Deduct a point
	 * from the score.
	 */
	onMissedClick(e) {
//		console.log('missed click',e, e.persist(),e.nativeEvent);
		if (!this.state.winner) {
			e.persist()
			this.setState(state => (state.score=Math.max(state.score-1, 0),
											state.missed = {x:e.nativeEvent.x, y:e.nativeEvent.y},
		 									state))
//			timeout(1000).then(this.setState(state => (delete state.missed, state)))
	 	}
	} // onMissedClick()

	/**
	 * Handle "hits" reported by the target object. Increment the score
	 */
	onTargetClick(e) {
		this.setState(
			state => (state.score=Math.min(state.score+1, this.win),
						 delete state.missed,
		 			    state.winner=state.score >=this.win,
		 			 	 state)
		)
	} // onTargetClick()

	/**
	 * Render the game board
	 */
	render() {
		if (this.state.winner) {
			return (
				<div className='board'>
					<WinnerBanner>You won! You're the winner!! You won the game! You killed all the pigs and poked all the cats&hellip; you can rest easy that you are the king of the pigs and one cool cat. Should anyone ever question you, just be sure to tell them that no one handles pigs and cats as will as you do, because, you are THE winner!!
				 </WinnerBanner>
				</div>
			)
		}
		else {
			const title = this.props.children
						   ? (<span className='title'>{this.props.children}</span>)
							: ''

			let missed=''
			if (this.state.missed) {
//				missed=(<Missed x={this.state.missed.x} y={this.state.missed.y} />)
				missed=(<div
                  className='missed'
                  style={{left:this.state.missed.x, top:this.state.missed.y}}>
                    Missed!
                </div>)
			}
			return (
				<div className='board' onClick={this.onMissedClick}>
					{title}
					<Score score={this.state.score}/>
					<Target move={-1} onClick={this.onTargetClick}/>
					{missed}
				</div>
			)
		}
	} // render()
} // class GameBoard

class Missed extends PureComponent {

	constructor(props) {
		super(props)
		console.log('<Missed>', this, props)
	}

	componentWillReceiveProps(props) {
		console.log('componentWillReceiveProps', this.props, props, ReactDOM.findDOMNode(this));
		let me = ReactDOM.findDOMNode(this)
		console.log('styles',me.style, me.style.opacity);
//		console.log('attributes',me.attributes);
		me.style.animation = 'none'
		console.log('styles',me.style, me.style.opacity);
	}

	render() {
		console.log('render', this);
		return (
			<div className='missed' style={{left:this.props.x, top:this.props.y}}>Missed!!</div>
		)
	}
}

/**
 * Displays winner content. Content contained within the
 * component-tags will be used for display.
 */
function WinnerBanner(props) {
	console.log(props);
	return (
		<div className='winningBanner'>{props.children} {props.children}</div>
	)
} // WinnerBanner component

/**
 * A generic anchor, more or less.
 */
class HomeSPA extends PureComponent {
    render(){
        return (
            <div>
                <GameBoard win={10}>Kill the Cat! &hellip; Poke the Pig!</GameBoard>
            </div>
        )
    }
} // class HomeSPA


ReactDOM.render(<HomeSPA />, document.getElementById('react-spa'))
