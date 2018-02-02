import React, {Component} from 'react'
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
		console.log('Target.props',props);

		this.vector = {x:10, y:10}

		this.state = {
			show: false
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
		console.log('didMount', this.parentNode);
		if (!this.state.show) {
			let rect=this.parentNode.getBoundingClientRect()
			let crect=this.node.firstChild.getBoundingClientRect()
			this.setState( {
				show: true,
				x:rect.x + rect.width/2 - crect.width/2,
				y:rect.y + rect.height/2 - crect.height/2
			})
		}
		if (this.props.move !== 0) {
			this.moveCount = Number.isInteger(this.props.move) ? this.props.move : -1
			timeout(500).then(this.move)
		}
	} // componentDidMount()

	/**
	 * Move the "target" within the play area (the parent area).
	 */
	move() {
//		console.log('move',this.vector, this.state);
		if ( ! this.parentNode || ! this.node.firstChild )
			return;
		let prect=this.parentNode.getBoundingClientRect()
		let crect=this.node.firstChild.getBoundingClientRect()

		this.setState(state => {
//			console.log('child',crect);
//			console.log('parent',prect);
			state.x += this.vector.x
			state.y += this.vector.y

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
		if (this.moveCount--)
			timeout(50).then(this.move)
	}

	componentWillUnmount() {
		console.log('componentWillUnmount()');
		this.moveCount = 0;
	}

	handleClick(e) {
		console.log('target hit',e, e.persist(),e.nativeEvent);
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
	let beers = new Array(score).fill(11)
//	beers = beers.map((i,idx) => (<span key={idx} className="icon icon-beer"/>))

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
		console.log('Game construct');
		super(props)
		this.win = props.win ? props.win : 10
		this.state = {
			score: 0,
			winner: false
		}
		this.onTargetClick = this.onTargetClick.bind(this)
		this.onMissedClick = this.onMissedClick.bind(this)
	}

	/**
	 * Detected a click in the board's area, so it missed! Deduct a point
	 * from the score.
	 */
	onMissedClick(e) {
		console.log('missed click',e, e.persist(),e.nativeEvent);
		if (!this.state.winner) {
			this.setState(state => (state.score=Math.max(state.score-1, 0),
											state.missed = {x:e.nativeEvent.x, y:e.nativeEvent.y},
		 									state))
//			timeout(1000).then(this.setState(state => (delete state.missed, state)))
	 	}
	}
	/**
	 * Handle "hits" reported by the target object. Increment the score
	 */
	onTargetClick(e) {
		console.log('hit click');
		this.setState(state => (state.score=Math.min(state.score+1, this.win),delete state.missed,
		 state.winner=state.score >=this.win,
		 state))
	}

	render() {
		console.log('Game.render()',this.state);
		if (this.state.winner) {
			return (
				<div className='board'>
					<WinnerBanner>You won! You're the winner!! You won the game! You killed all the pigs and poked all the cats&hellip; you can rest easy that you are the king of the pigs and one cool cat. Should anyone ever question you, just be sure to tell them that no one handles pigs and cats as will as you do, because, you are THE winner!!
				 </WinnerBanner>
				</div>
			)
		}
		else {
			let title = this.props.children
						   ? (<span className='title'>{this.props.children}</span>)
							: ''

			let missed=''
			if (this.state.missed)
				missed=(<div key={this.state.missed} className='missed' style={{animation:'fadeout 2s', left:this.state.missed.x, top:this.state.missed.y}}>Missed!</div>)
			return (
				<div className='board' onClick={this.onMissedClick}>
					{title}
					<Score score={this.state.score}/>
					<Target move={-1} onClick={this.onTargetClick}/>
					{missed}
				</div>
			)
		}
	}
} // class GameBoard

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


class HomeSPA extends Component {
    render(){
        return (
            <div>
                <GameBoard win={10}>Kill the Cat! &hellip; Poke the Pig!</GameBoard>
            </div>
        )
    }
} // class HomeSPA


ReactDOM.render(<HomeSPA />, document.getElementById('react-spa'))
