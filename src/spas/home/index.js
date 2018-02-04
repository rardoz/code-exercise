import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import './styles.scss'
import GithubKitty from './github.svg'
import Cat from './cat.svg'
import Bat from './bat.svg'
import HappyCat from './happyCat.svg'
import './home.font'

class HomeSPA extends Component {


    tick() {
        let count = this.state.count;
        if (count < 10) {
            var left = {
                'left': (Math.random() * (this.state.width))
            };
            var top = {
                'top': (Math.random() * (this.state.height))
            };

            this.setState(top);
            this.setState(left);
        }
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }


    updateCount() {
        let count = this.state.count;
        count++;
        this.setState({
            count
        });
    }

    updateWindowDimensions() {
        this.setState({
            width: window.innerWidth,
            height: window.innerHeight
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            top: 10,
            left: 10,
            position: 'absolute',
            increment: 10,
            count: 0,
            width: window.innerWidth,
            height: window.innerHeight,
            x: 0,
            y: 0
        }
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    handleMouseMove(event) {
        this.setState({
            x: event.clientX - 10,
            y: event.clientY - 10
        });
    }

    render() {
        var cats = [];
        for (var i = 0; i < this.state.count; i++) {
            let left = i * 50;
            cats.push(
                ( <
                    Cat style = {
                        {
                            'top': 0,
                            'left': left,
                            'width': '50px',
                            'height': '50px'
                        }
                    }
                    />
                )
            );
        }
        return ( <
            div style = {
                {
                    'height': this.state.height,
                    'width': this.state.width,
                    'cursor': 'none'
                }
            }
            onMouseMove = {
                (event) => {
                    this.handleMouseMove(event)
                }
            } > {
                cats
            } <
            Bat style = {
                {
                    top: this.state.y,
                    left: this.state.x,
                    position: this.state.position
                }
            }
            /> <
            Cat style = {
                {
                    top: this.state.top + 'px',
                    left: this.state.left + 'px',
                    position: this.state.position,
                    visibility: (this.state.count < 10) ? true : 'hidden'
                }
            }
            onClick = {
                () => {
                    this.updateCount()
                }
            }
            /> {
                (this.state.count >= 10) &&
                <
                div style = {
                        {
                            'font-size': '5em',
                            visibility: true,
                            'text-align': 'center'
                        }
                    } >
                    <
                    div > {
                        `You won a cat!`
                    } < /div> <
                    HappyCat / >
                    <
                    div > {
                        `Please don't hit it with a bat :)!`
                    } < /div> <
                    /div>
            } <
            /div>
        )
    }
}

ReactDOM.render( < HomeSPA / > , document.getElementById('react-spa'))
