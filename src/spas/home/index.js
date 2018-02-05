import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import './styles.scss'
import { setTimeout, setInterval } from 'timers';
import { ClickTarget } from './components/clickTarget.js';
import { ScoreCounter } from './components/scoreCounter.js';

class HomeSPA extends Component {
    constructor(props) {
        super(props);

        // Set a random starting x/y position
        this.state = {
            score: 0,
            left: this.getRandomLocation(),
            top: this.getRandomLocation()
        }

        // Timer for slightly less time than the target's css transition so it never stops moving
        this.moveTimer = setInterval(
            () => { this.repositionTarget(); },
            1900
        );
    }

    render() {
        return (
            this.state.score < 10 ? <div className={ 'gameContainer' }>
                <ScoreCounter score={ this.state.score } />
                <ClickTarget 
                    targetClickHandler={ this.onTargetClick.bind(this) }
                    left={ this.state.left }
                    top={ this.state.top }
                />
            </div>
            :
            <div className={ 'winContainer' }>
                <h1>You win!</h1>
            </div>
        )
    }

    // Just log for now until we get scoring figured 
    onTargetClick() {
        let newScore = this.state.score + 1;
        this.setState({
            score: newScore
        });
    }

    // Updates the state to a new random x/y location
    repositionTarget() {
        this.setState({
            left: this.getRandomLocation(),
            top: this.getRandomLocation()
        });
    }

    // Used to give a new random x or y postion to the target
    // Doesn't go too close to 0 or 100 so target doesn't draw offscreen
    getRandomLocation() {
        return Math.floor((Math.random() * 80) + 10);
    }
}


ReactDOM.render(<HomeSPA />, document.getElementById('react-spa'))