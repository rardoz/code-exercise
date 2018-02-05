import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import './styles.scss'
import GithubKitty from './github.svg'
import './home.font'

class HomeSPA extends Component {
    constructor(props) {
        super(props);
        //x and y are coordinates of kitty on screen
        //dx and dy are distance kitty will move next and it is randomized
        //clicks counts successful clicks on kitty. Game is over after 10 clicks
        this.state = {
            x: 0,
            y: 0,
            dx: Math.random()*10,
            dy: Math.random()*10,
            clicks: 0
        };
        this.moveKitty = this.moveKitty.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    
    componentDidMount() {
        //initial coordinates in middle of screen
        let pageX = (window.innerWidth / 2) - 50;
        let pageY = (window.innerHeight / 2) - 50;
        this.setState( {x: pageX, y: pageY});
        this.setState({ interval: setInterval(this.moveKitty,50)});
    }

    handleClick(e) {
        e.preventDefault();
        this.setState({clicks: this.state.clicks + 1});
    }
    moveKitty() {
        //get next position of kitty by adding dx,dy to current coordinates
        let kittyPos = {
            kittyX: this.state.x + this.state.dx,
            kittyY: this.state.y + this.state.dy,
            kittyDX: this.state.dx,
            kittyDY: this.state.dy
        };

        //vary the direction and speed of motion
        kittyPos.kittyDX +=2*(Math.random()-0.5);
        kittyPos.kittyDY +=2*(Math.random()-0.5);
        if(kittyPos.kittyDX>10) kittyPos.kittyDX = 20-kittyPos.kittyDX;
        if(kittyPos.kittyDX<-10) kittyPos.kittyDX = -20-kittyPos.kittyDX;
        if(kittyPos.kittyDY>10) kittyPos.kittyDY = 20-kittyPos.kittyDY;
        if(kittyPos.kittyDY<-10) kittyPos.kittyDY = -20-kittyPos.kittyDY;
        
        if(kittyPos.kittyX>=window.innerWidth - 100) {
            //too far right!!! go back!!!
            kittyPos.kittyX = window.innerWidth - 100;
            kittyPos.kittyDX = -10*Math.random();
        }
        if(kittyPos.kittyX<=window.pageXOffset) {
            //too far left!!! come back!!!
            kittyPos.kittyX = window.pageXOffset;
            kittyPos.kittyDX = 10*Math.random();
        }
        if(kittyPos.kittyY>=window.innerHeight - 100) {
            //hey kitty, there is nothing down there. 
            kittyPos.kittyY = window.innerHeight -100;
            kittyPos.kittyDY = -10*Math.random();
        }
        if(kittyPos.kittyY<=window.pageYOffset) {
            //too high. place catnip below top of window to encourage cat to come back
            kittyPos.kittyY = window.pageYOffset;
            kittyPos.kittyDY = 10*Math.random();
        }
        
        //set kitty position by setting state
        this.setState ({
            x:kittyPos.kittyX,
            y:kittyPos.kittyY,
            dx:kittyPos.kittyDX,
            dy:kittyPos.kittyDY
        });
    }
    
    render(){
        if(this.state.clicks >= 10) {
            //stop kitty and display winner message after 10 clicks
            clearInterval(this.state.interval);
            return (
                <div className="winner">
                    YOU WON
                </div>
            )
        } else {
            //display kitty and score
            return (
                <div>
                    <Beerlist beerCount={this.state.clicks} />
                    <GithubKitty className="kitty" onClick={this.handleClick} style={{top: this.state.y, left: this.state.x}} />
                </div>
            )
        }
    }
}

function Beerlist(props) {
    //Beerlist shows current score - one beer icon for each click
    const beerCount = props.beerCount ? props.beerCount : 0;
    const beers = Array.apply(null, {length: beerCount}).map(Number.call, Number);
    const listItems = beers.map((beerIndex) =>
        <span key={beerIndex.toString()} className="icon icon-beer" />
    );
    return (
        <div>
            {listItems}
        </div>
    ) 
}


ReactDOM.render(<HomeSPA />, document.getElementById('react-spa'))