import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import '../styles.scss'
import ScoreIcon from '../images/scoreIcon.svg'

export class ScoreCounter extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={ 'scoreContainer' }>
                { this.createScoreIcons() }
            </div>
        )
    }

    createScoreIcons() {
        let scoreIconList = [];
        for(var i = 0; i < this.props.score; i++) {
            scoreIconList.push(
                <ScoreIcon className={ 'scoreIcon' } key={ i } />
            );
        }

        return scoreIconList;
    }

    onTargetClick() {
        this.props.targetClickHandler();
    }
}