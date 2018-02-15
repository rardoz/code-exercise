import React, { Component } from 'react';
import GithubKitty from '../GithubKitty/GithubKitty';
import ScoreBoard from '../ScoreBoard/ScoreBoard';
import ResetButton from '../ResetButton/ResetButton';
import {
  BOARD_HEIGHT,
  BOARD_WIDTH,
  DRAW_RATE,
  ICON_HEIGHT,
  ICON_WIDTH,
  ICON_X_INITIAL,
  ICON_Y_INITIAL,
  SCORE_INCREMENT,
  SCORE_INITIAL,
  SCORE_WINNING,
  SPEED_INCREMENT,
  SPEED_INITIAL
} from './constants';

class GameBoard extends Component {

  state = {
    isWinner: false,
    score: SCORE_INITIAL,
    w: ICON_WIDTH,
    h: ICON_HEIGHT,
    speed: SPEED_INITIAL,
    dx: 0,
    dy: 0,
    x: ICON_X_INITIAL,
    y: ICON_Y_INITIAL,
    drawInterval: null
  };

  style = {
    width: BOARD_WIDTH,
    height: BOARD_HEIGHT,
    backgroundColor: 'rgba(0, 0, 255, 0.2)'
  };

  componentDidMount () {
    window.addEventListener('resize', this.handleWindowResize);
    this.updateBoundingCoords();
    this.initializeGame();
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.handleWindowResize);
    clearInterval(this.drawInterval);
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.state.score >= SCORE_WINNING && !prevState.isWinner) {
      this.setState({isWinner: true}, clearInterval(this.drawInterval));
    }
  }

  static getRandomIntInclusive (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  initializeGame = () => {
    console.log('init');
    this.updateSpeed(GameBoard.getRandomIntInclusive(0, 360));
    this.drawInterval = setInterval(this.drawIcon, DRAW_RATE);
  };

  updateBoundingCoords = () => {
    const {x, y, width, height} = this.canvas.getBoundingClientRect();
    this.setState({
      boardX1: x,
      boardY1: y,
      boardX2: width - x,
      boardY2: height - y,
    });
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
    if (this.state.x < this.state.boardX1 || (this.state.x + this.state.w) > this.state.boardX2) {
      let angle = 180 - this.state.angle;
      this.updateSpeed(angle);
    } else if (this.state.y < this.state.boardY1 || (this.state.y + this.state.h) > this.state.boardY2) {
      let angle = 360 - this.state.angle;
      this.updateSpeed(angle);
    }
  };

  handleReset = () => {
    this.setState({
      speed: SPEED_INITIAL,
      score: SCORE_INITIAL,
      isWinner: false,
    }, this.initializeGame);
  };

  handleIncrementScore = () => {
    this.setState({
      speed: this.state.speed + SPEED_INCREMENT,
      score: this.state.score + SCORE_INCREMENT,
    }, this.updateSpeed);
  };

  handleWindowResize = () => {
    this.updateBoundingCoords();
  };

  render () {
    return (
      <main ref={(el) => this.canvas = el} style={this.style}>
        <ScoreBoard score={this.state.score} />
        <ResetButton hidden={!this.state.isWinner}
                     onClick={this.handleReset} />
        <GithubKitty hidden={this.state.isWinner}
                     w={this.state.w} h={this.state.h} x={this.state.x} y={this.state.y}
                     onClick={this.handleIncrementScore} />
      </main>
    );

  }
}

export default GameBoard;