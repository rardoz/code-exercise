import React, {Component} from 'react'
import GithubKitty from './github.svg'
import './Target.css'
/**
 * Timeout/interval handler that works as a promise.
 */
export function timeout(delay) {
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
export default class Target extends Component {

  constructor(props) {
    super(props)

    const too_narrow = 15					// Avoid angles that are to close to vert/horz
    let angle=0
                                  // Get random angle that's not too narrow
    while (angle % 90 < too_narrow | angle % 90 > 90-too_narrow)
      angle = Math.random() * (360-too_narrow) + too_narrow;
    angle *= Math.PI / 180				// Convert to radians

    this.vector = {								// Movement vector
      x: Math.cos(angle) *  50,		// Multiply "angle" by magnitude
      y: Math.sin(angle) * -50		// Vertical coordinates are reversed
    }
    this.timeSlice = 125					// Animation timeslice, in milliseconds
    this.state = {
      show: false									// Has target been mounted in React?
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
      this.setState({						// Turn on target and init its location randomly
        show: true,
        x: prect.left + prect.width *Math.random() - crect.width/2,
        y: prect.top  + prect.height*Math.random() - crect.height/2
      })
      if (this.props.move !== 0) {
        this.moveCount = Number.isInteger(this.props.move) ? this.props.move : -1
        this.move()
      }
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
      // Move the target
      state.x += this.vector.x
      state.y += this.vector.y

      // Check to see whether we moved (a little) out of bounds and
      // limit the movement, if it has. Then adjust the movement direction
      // vector so the target doesn't keep trying to move outside the
      // boundary.
      if (state.x < prect.left) {
        state.x = prect.left
        this.vector.x = -this.vector.x
      }
      if (state.y < prect.top) {
        state.y = prect.top
        this.vector.y = -this.vector.y
      }

      if (state.x+crect.width/2 > prect.left+prect.width) {
        state.x = prect.left+prect.width - crect.width/2
        this.vector.x = -this.vector.x
      }
      if (state.y+crect.height/2 > prect.top+prect.height) {
        state.y = prect.top+prect.height - crect.height/2
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
      // this.setState({reverse: !this.state.reverse})
      e.stopPropagation()
    }
  } // handleClick()

  render() {
    return (
      <span ref={target => (this.node= target,this.parentNode = (target ? target.parentElement : null)) }>
      <GithubKitty
        className='target'
        style={{
          animationDirection: this.state.reverse ? 'reverse' : 'normal',
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
