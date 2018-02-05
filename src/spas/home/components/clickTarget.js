import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import '../styles.scss'
import MosquitoImage from '../images/mosquito.svg'

export class ClickTarget extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div 
                className="targetElement" 
                onClick={ this.onTargetClick.bind(this) }
                style={ { left: `${ this.props.left }%`, top: `${this.props.top }%` } } >
                <MosquitoImage />
            </div>
        )
    }

    onTargetClick() {
        this.props.targetClickHandler();
    }
}