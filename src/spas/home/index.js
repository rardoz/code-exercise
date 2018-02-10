import React, {Component, PureComponent} from 'react'
import ReactDOM from 'react-dom'
import './styles.scss'

import Target from './components/Target'
import Score from './components/Score'

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
      score: 0,       // Game score
      winner: false   // Did the player win?
    }
    this.onTargetClick = this.onTargetClick.bind(this)
    this.onMissedClick = this.onMissedClick.bind(this)
  }

  /**
   * Detected a click in the board's area, so it missed! Deduct a point
   * from the score.
   */
  onMissedClick(e) {
//  console.log('missed click',e, e.persist(),e.nativeEvent);
    if (!this.state.winner) {
      e.persist()
      this.setState(
        state => (state.score=Math.max(state.score-1, 0),
                  state.missed = {x:e.nativeEvent.x, y:e.nativeEvent.y},
                  state))
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
//        missed=(<Missed x={this.state.missed.x} y={this.state.missed.y} />)
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
//    console.log('attributes',me.attributes);
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
