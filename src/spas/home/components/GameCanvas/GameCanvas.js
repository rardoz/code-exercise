import React, { Component } from 'react';
// import GithubKitty from '../GithubKitty/GithubKitty';
import GithubKitty from '../../github.svg';

const Ball = ({x, y}) => (
  <div style={{
    display: 'block',
    position: 'absolute',
    width: 20,
    height: 20,
    left: x,
    top: y
  }}>
    <GithubKitty width={20} height={20} />
  </div>
);

class GameBoard extends Component {

  constructor (props) {
    super(props);
    this.state = {
      isWinner: false,
      count: 0,
      angle: GameBoard.getRandomIntInclusive(10, 80),
      speed: 5,
      radians: 0,
      x: 0,
      y: 0,
      ball: {
        x: 20,
        y: 20,
      }
    };

    this.updateBall = this.updateBall.bind(this);
    this.updateAngle = this.updateAngle.bind(this);
    this.drawIcon = this.drawIcon.bind(this);
  }

  static getRandomIntInclusive (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  componentDidMount () {
    const self = this;
    this.updateBall(this.state.angle);
    setInterval(self.drawIcon, 33);
  }

  updateBall (angle) {
    const radians = angle * Math.PI / 180;
    const x = Math.cos(radians) * this.state.speed;
    const y = Math.sin(radians) * this.state.speed;
    this.setState({angle, radians, x, y});
  }

  handleClick (e) {
    // const coords = this.canvas.relMouseCoords(event);
    // console.log(coords.x, coords.y);
  }

  drawIcon () {
    const self = this;
    // const context = this.canvas.getContext('2d');

    // context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // context.drawImage(this.svg, this.ball.x, this.ball.y, 20, 20);

    // context.fillStyle = '#EEEEEE';
    // context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    // context.strokeStyle = '#000000';
    // context.strokeRect(1, 1, this.canvas.width - 2, this.canvas.height - 2);
    //
    this.setState({
      ball: {
        x: this.state.ball.x + this.state.x,
        y: this.state.ball.y + this.state.y
      }
    }, self.updateAngle);
    // this.ball.x += this.state.x;
    // this.ball.y += this.state.y;
    //
    // context.fillStyle = '#000000';
    // context.beginPath();
    // context.arc(this.ball.x, this.ball.y, this.ball.r, 0, Math.PI * 2, true);
    // context.closePath();
    // context.fill();
    //

  }

  updateAngle () {
    const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    console.log(this.state.ball, w);

    if (this.state.ball.x + 20 > w || this.state.ball.x - 20 < 0) {
      console.log('too big x');
      let angle = 180 - this.state.angle;
      this.updateBall(angle);
    } else if (this.state.ball.y + 20 > h || this.state.ball.y - 20 < 0) {
      console.log('too big y');
      let angle = 360 - this.state.angle;
      this.updateBall(angle);
    }
  }

  render () {
    return (
      <main>
        {/*<canvas width={500} height={500}*/}
        {/*ref={(el) => { this.canvas = el; }}*/}
        {/*onClick={this.handleClick.bind(this)}*/}
        {/*/>*/}
        <Ball x={this.state.ball.x} y={this.state.ball.y} />
        {/*<GithubKitty width={this.ball.x} height={this.ball.y} svgRef={(el) => { this.svg = el; }} />*/}
      </main>
    );

  }

  // render () {
  //   return (
  //     <div>
  //       {this.createScoreBoard()}
  //       <span className="icon icon-beer" />
  //       <canvas id="myCanvas" width="100vw" height="100vh" />
  //       {this.state.isWinner
  //         ? <div>Congrats!</div>
  //         : <GithubKitty onClick={this.incrementScore.bind(this)} />}
  //
  //     </div>
  //   );
  // }

}

export default GameBoard;