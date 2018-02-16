import React, { Component } from 'react';
import _ from 'lodash/function';
import GithubKitty from '../../components/GithubKitty/GithubKitty';
import ScoreBoard from '../../components/ScoreBoard/ScoreBoard';
import ResetButton from '../../components/ResetButton/ResetButton';
import { DRAW_RATE, } from './constants';

class GameBoard extends Component {

  static canvasStyles = {
    border: '1px solid rgb(0, 0, 255)',
    backgroundColor: 'rgba(0, 0, 255, 0.2)'
  };

  static getRandomIntInclusive (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  constructor (props) {
    super(props);
    this.handleIncrementScore = _.debounce(this.handleIncrementScore, 500);
    this.handleReset = _.debounce(this.handleReset, 500);
    this.handleWindowResize = _.debounce(this.handleWindowResize, 500);
    this.state = {
      isWinner: false,
      score: props.scoreInitial,
      speed: props.speedInitial,
      drawInterval: null
    };
    this.style = {
      width: this.props.boardWidth,
      height: this.props.boardHeight,
      ...GameBoard.canvasStyles
    };
  }

  componentDidMount () {
    window.addEventListener('resize', this.handleWindowResize);
    this.updateBoundingCoords(this.initializeGame);
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.handleWindowResize);
    clearInterval(this.drawInterval);
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.state.score >= this.props.scoreWinning && !prevState.isWinner) {
      this.setState({isWinner: true}, clearInterval(this.drawInterval));
    }
  }

  initializeGame = () => {
    console.log('init');
    this.updateSpeed(GameBoard.getRandomIntInclusive(0, 360));
    this.drawInterval = setInterval(this.drawIcon, DRAW_RATE);
  };

  updateBoundingCoords = (cb) => {
    const {x, y, width, height} = this.canvas.getBoundingClientRect();
    this.setState({
      x: x + (width / 2),
      y: y + (height / 2),
      boardX1: x,
      boardY1: y,
      boardX2: width + x,
      boardY2: height + y,
    }, cb);
  };

  updateSpeed = (angle = this.state.angle) => {
    const radians = angle * Math.PI / 180;
    this.setState({
      angle,
      dx: Math.cos(radians) * this.state.speed,
      dy: Math.sin(radians) * this.state.speed
    });
  };

  drawIcon = () => {
    this.setState({
      x: this.state.x + this.state.dx,
      y: this.state.y + this.state.dy
    }, this.updateAngle);
  };

  updateAngle = () => {
    if (this.state.x < this.state.boardX1 || (this.state.x + this.props.iconWidth) > this.state.boardX2) {
      let angle = 180 - this.state.angle;
      this.updateSpeed(angle);
    } else if (this.state.y < this.state.boardY1 || (this.state.y + this.props.iconHeight) > this.state.boardY2) {
      let angle = 360 - this.state.angle;
      this.updateSpeed(angle);
    }
  };

  handleReset = () => {
    this.setState({
      speed: this.props.speedInitial,
      score: this.props.scoreInitial,
      isWinner: false,
    }, this.initializeGame);
  };

  handleIncrementScore = () => {
    this.setState({
      speed: this.state.speed + this.props.speedIncrement,
      score: this.state.score + this.props.scoreIncrement,
    }, this.updateSpeed);
  };

  handleWindowResize = () => {
    this.updateBoundingCoords();
  };

  render () {
    return (
      <main>
        <ScoreBoard score={this.state.score} />
        <ResetButton hidden={!this.state.isWinner}
                     onClick={this.handleReset} />

        <section ref={(el) => this.canvas = el} style={this.style}>
          <GithubKitty hidden={this.state.isWinner}
                       w={this.props.iconWidth}
                       h={this.props.iconHeight}
                       x={this.state.x}
                       y={this.state.y}
                       onClick={this.handleIncrementScore} />
        </section>

      </main>
    );

  }
}

export default GameBoard;